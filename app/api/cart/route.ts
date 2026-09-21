import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getAuthenticatedUser, getCartCookieValue, setCartCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getCartSummary, mergeGuestCartIntoUser } from "@/lib/cart";
import { logger } from "@/lib/logger";

const addItemSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional(),
  quantity: z.number().int().min(1).max(10),
  name: z.string().min(1),
  selectedWeight: z.number().int().optional(),
  selectedGrind: z.string().optional(),
});

async function getOrCreateCartForRequest(request: NextRequest, response: NextResponse) {
  const user = await getAuthenticatedUser(request);
  let cart = null;

  if (user) {
    cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
        include: { items: true },
      });
    }

    const guestKey = getCartCookieValue(request);
    if (guestKey) {
      await mergeGuestCartIntoUser(user.id, guestKey);
      response.cookies.delete("velvet_roast_cart_key");
    }

    return { cart, userId: user.id, guestKey: null };
  }

  let guestKey = getCartCookieValue(request);
  if (!guestKey) {
    guestKey = crypto.randomUUID();
    setCartCookie(response, guestKey);
  }

  cart = await prisma.cart.findUnique({
    where: { guestKey },
    include: { items: true },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { guestKey },
      include: { items: true },
    });
  }

  return { cart, userId: null, guestKey };
}

export async function GET(request: NextRequest) {
  const response = NextResponse.json({ items: [], subtotal: 0, itemCount: 0 });
  const { cart } = await getOrCreateCartForRequest(request, response);
  const summary = await getCartSummary(cart.id);
  return NextResponse.json({ ...summary });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = addItemSchema.parse(body);
    const response = NextResponse.json({ ok: true, item: null }, { status: 200 });
    const { cart } = await getOrCreateCartForRequest(request, response);

    const product = await prisma.product.findUnique({
      where: { id: parsed.productId },
      include: { variants: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const variant = parsed.variantId ? product.variants.find((entry) => entry.id === parsed.variantId) ?? null : null;
    const currentPrice = variant?.price ?? product.basePrice;
    const currentStock = variant?.stock ?? product.stock;

    if (currentStock < parsed.quantity) {
      return NextResponse.json({ error: "Requested quantity exceeds current stock" }, { status: 409 });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: parsed.productId,
        variantId: parsed.variantId ?? null,
        selectedGrind: parsed.selectedGrind ?? null,
        selectedWeight: parsed.selectedWeight ?? null,
      },
    });

    let item;
    if (existingItem) {
      item = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + parsed.quantity,
          unitPrice: currentPrice,
          name: parsed.name,
        },
      });
    } else {
      item = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: parsed.productId,
          variantId: parsed.variantId ?? null,
          quantity: parsed.quantity,
          unitPrice: currentPrice,
          name: parsed.name,
          selectedWeight: parsed.selectedWeight ?? null,
          selectedGrind: parsed.selectedGrind ?? null,
        },
      });
    }

    const summary = await getCartSummary(cart.id);
    logger.info("Cart item added", { cartId: cart.id, productId: parsed.productId, quantity: parsed.quantity });
    return NextResponse.json({ ok: true, item, summary });
  } catch (error) {
    logger.error("Failed to add cart item", { error: error instanceof Error ? error.message : String(error) });
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to add item to cart" }, { status: 400 });
  }
}
