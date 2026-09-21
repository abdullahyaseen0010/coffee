import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getAuthenticatedUser, getCartCookieValue } from "@/lib/auth";
import { calculateCartTotals, getOrderNumber, getShippingFee } from "@/lib/checkout";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { assertStripeConfigured, stripe } from "@/lib/stripe";

const checkoutSchema = z.object({
  shippingAddress: z.object({
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(2),
  }),
  billingAddress: z.object({
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(2),
  }).optional(),
  shippingMethod: z.enum(["standard", "express", "pickup"]).default("standard"),
  email: z.string().email().optional(),
  promoCode: z.string().optional(),
});

function rateLimit(ip: string) {
  const now = Date.now();
  const key = `checkout-${ip}`;
  const bucketStore = globalThis as unknown as Record<string, { count: number; resetAt: number }>;
  const bucket = bucketStore[key] ?? { count: 0, resetAt: 0 };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + 60_000;
  }

  bucket.count += 1;
  bucketStore[key] = bucket;

  return bucket.count <= 10;
}

export async function POST(request: NextRequest) {
  if (!rateLimit(request.headers.get("x-forwarded-for") ?? "local")) {
    return NextResponse.json({ error: "Too many checkout attempts" }, { status: 429 });
  }

  try {
    const body = checkoutSchema.parse(await request.json());
    const user = await getAuthenticatedUser(request);
    const guestKey = getCartCookieValue(request);

    const cart = await prisma.cart.findFirst({
      where: user ? { userId: user.id } : { guestKey },
      include: { items: { include: { product: true, variant: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    let subtotal = 0;
    const checkoutItems: Array<{ productId: string; variantId: string | null; name: string; quantity: number; unitPrice: number; productName: string; variantLabel?: string | null }> = [];

    for (const item of cart.items) {
      const product = item.product;
      const variant = item.variant;
      const unitPrice = variant?.price ?? product.basePrice;
      const availableStock = variant ? variant.stock : product.stock;

      if (item.quantity > availableStock) {
        return NextResponse.json({ error: `Requested quantity for ${item.name} exceeds available stock` }, { status: 409 });
      }

      subtotal += item.quantity * unitPrice;
      checkoutItems.push({
        productId: product.id,
        variantId: item.variantId,
        name: item.name,
        quantity: item.quantity,
        unitPrice,
        productName: product.name,
        variantLabel: item.variant ? `${item.variant.weight}g / ${item.variant.grind}` : null,
      });
    }

    const shippingFee = getShippingFee(body.shippingMethod);
    const totals = calculateCartTotals({ subtotal, shippingFee, promoCode: body.promoCode });
    const orderNumber = getOrderNumber();

    await prisma.stockReservation.createMany({
      data: cart.items
        .map((item) => {
          const variant = item.variant;
          if (!variant) return null;
          return {
            productId: item.productId,
            variantId: variant.id,
            quantity: item.quantity,
            cartId: cart.id,
            orderId: null,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000),
            status: "active",
          };
        })
        .filter(Boolean) as Array<{
          productId: string;
          variantId: string;
          quantity: number;
          cartId: string;
          orderId: string | null;
          expiresAt: Date;
          status: string;
        }>,
    });

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user?.id ?? null,
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        tax: totals.tax,
        total: totals.total,
        status: "pending",
        email: body.email ?? user?.email ?? null,
        shippingAddress: body.shippingAddress,
        billingAddress: body.billingAddress ?? body.shippingAddress,
        promoCode: body.promoCode ?? null,
        shippingMethod: body.shippingMethod,
        guestId: user ? null : cart.guestKey ?? guestKey ?? null,
        items: {
          create: cart.items.map((item: { productId: string; variantId: string | null; quantity: number; unitPrice: number; product: { name: string }; variant?: { weight: number; grind: string } | null }) => ({
            productId: item.productId,
            variantId: item.variantId ?? null,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            productName: item.product.name,
            variantLabel: item.variant ? `${item.variant.weight}g / ${item.variant.grind}` : null,
          })),
        },
      },
      include: { items: true },
    });

    assertStripeConfigured();
    const session = await stripe!.checkout.sessions.create({
      mode: "payment",
      line_items: cart.items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: (item.unitPrice ?? item.product.basePrice) * 100,
          product_data: {
            name: item.name,
            description: item.variant ? `${item.variant.weight}g • ${item.variant.grind}` : undefined,
          },
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/order/${order.id}?status=paid`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/checkout?status=cancelled`,
      customer_email: body.email ?? user?.email ?? undefined,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU"],
      },
      metadata: {
        orderId: order.id,
        cartId: cart.id,
        userId: user?.id ?? "guest",
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    logger.info("Checkout session created", { orderId: order.id, sessionId: session.id, cartId: cart.id });

    return NextResponse.json({ ok: true, sessionUrl: session.url, orderId: order.id, total: totals.total });
  } catch (error) {
    logger.error("Checkout session creation failed", { error: error instanceof Error ? error.message : String(error) });
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to create checkout session" }, { status: 400 });
  }
}
