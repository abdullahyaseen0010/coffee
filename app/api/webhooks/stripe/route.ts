import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { stripe } from "@/lib/stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!webhookSecret || !stripe) {
    return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    logger.error("Stripe webhook signature verification failed", { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const existing = await prisma.processedEvent.findUnique({ where: { eventId: event.id } });
  if (existing) {
    return NextResponse.json({ received: true, idempotent: true });
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.processedEvent.create({
        data: {
          eventId: event.id,
          type: event.type,
        },
      });

      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          const orderId = session.metadata?.orderId;
          if (!orderId) {
            return;
          }

          const order = await tx.order.findUnique({
            where: { id: orderId },
            include: { items: true },
          });

          if (!order) {
            return;
          }

          const paymentIntentId = typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? null;

          await tx.order.update({
            where: { id: order.id },
            data: { status: "paid", stripePaymentIntentId: paymentIntentId },
          });

          for (const item of order.items) {
            const product = await tx.product.findUnique({ where: { id: item.productId }, include: { variants: true } });
            if (!product) continue;
            const variant = item.variantId ? product.variants.find((entry) => entry.id === item.variantId) : null;
            if (variant) {
              await tx.productVariant.update({
                where: { id: variant.id },
                data: { stock: Math.max(0, variant.stock - item.quantity) },
              });
            } else {
              await tx.product.update({
                where: { id: product.id },
                data: { stock: Math.max(0, product.stock - item.quantity) },
              });
            }
          }

          await tx.orderFulfillment.upsert({
            where: { orderId: order.id },
            create: { orderId: order.id, status: "processing" },
            update: { status: "processing" },
          });
          break;
        }

        case "payment_intent.payment_failed": {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          const order = await tx.order.findFirst({
            where: { stripePaymentIntentId: paymentIntent.id },
            include: { items: true },
          });
          if (!order) {
            return;
          }

          await tx.order.update({
            where: { id: order.id },
            data: { status: "failed" },
          });
          break;
        }

        case "charge.refunded": {
          const charge = event.data.object as Stripe.Charge;
          const order = await tx.order.findFirst({
            where: { stripePaymentIntentId: charge.payment_intent as string },
            include: { items: true },
          });
          if (!order) {
            return;
          }

          await tx.order.update({
            where: { id: order.id },
            data: { status: "refunded" },
          });

          for (const item of order.items) {
            const product = await tx.product.findUnique({ where: { id: item.productId }, include: { variants: true } });
            if (!product) continue;
            const variant = item.variantId ? product.variants.find((entry) => entry.id === item.variantId) : null;
            if (variant) {
              await tx.productVariant.update({
                where: { id: variant.id },
                data: { stock: variant.stock + item.quantity },
              });
            } else {
              await tx.product.update({
                where: { id: product.id },
                data: { stock: product.stock + item.quantity },
              });
            }
          }
          break;
        }

        default:
          break;
      }
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error("Stripe webhook processing failed", { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
