import { NextRequest, NextResponse } from "next/server";

import { getAuthenticatedUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logger } from "@/lib/logger";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getAuthenticatedUser(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order || (order.userId && order.userId !== user.id && user.role !== "admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!(order.status === "pending" || order.status === "paid")) {
    return NextResponse.json({ error: "Order cannot be cancelled in its current state" }, { status: 400 });
  }

  try {
    if (order.status === "paid" && stripe && order.stripePaymentIntentId) {
      await stripe.refunds.create({ payment_intent: order.stripePaymentIntentId });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { status: "cancelled" },
    });

    logger.info("Order cancelled", { orderId: order.id, userId: user.id });
    return NextResponse.json({ ok: true, status: "cancelled" });
  } catch (error) {
    logger.error("Failed to cancel order", { error: error instanceof Error ? error.message : String(error), orderId: order.id });
    return NextResponse.json({ error: "Unable to cancel order" }, { status: 500 });
  }
}
