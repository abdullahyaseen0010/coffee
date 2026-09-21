import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getAuthenticatedUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getCartSummary } from "@/lib/cart";
import { logger } from "@/lib/logger";

const updateSchema = z.object({
  quantity: z.number().int().min(0).max(20),
});

async function resolveCartForItem(request: NextRequest, itemId: string) {
  const user = await getAuthenticatedUser(request);
  if (user) {
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: { items: true },
    });
    if (!cart) {
      return null;
    }
    const item = cart.items.find((entry) => entry.id === itemId) ?? null;
    return item ? { cart, item } : null;
  }

  const guestKey = request.cookies.get("velvet_roast_cart_key")?.value ?? null;
  if (!guestKey) {
    return null;
  }

  const cart = await prisma.cart.findUnique({
    where: { guestKey },
    include: { items: true },
  });

  if (!cart) {
    return null;
  }

  const item = cart.items.find((entry) => entry.id === itemId) ?? null;
  return item ? { cart, item } : null;
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;
  try {
    const parsed = updateSchema.parse(await request.json());
    const match = await resolveCartForItem(request, itemId);
    if (!match) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    const { item, cart } = match;
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
      include: { variants: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const variant = item.variantId ? product.variants.find((entry) => entry.id === item.variantId) ?? null : null;
    const availableStock = variant?.stock ?? product.stock;

    if (parsed.quantity > 0 && parsed.quantity > availableStock) {
      return NextResponse.json({ error: "Requested quantity exceeds current stock" }, { status: 409 });
    }

    const updated = await prisma.cartItem.update({
      where: { id: item.id },
      data: {
        quantity: parsed.quantity,
        unitPrice: variant?.price ?? product.basePrice,
      },
    });

    const summary = await getCartSummary(cart.id);
    logger.info("Cart item updated", { cartId: cart.id, itemId: item.id, quantity: parsed.quantity });
    return NextResponse.json({ ok: true, item: updated, summary });
  } catch (error) {
    logger.error("Failed to update cart item", { error: error instanceof Error ? error.message : String(error) });
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to update cart item" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;
  const match = await resolveCartForItem(request, itemId);
  if (!match) {
    return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
  }

  await prisma.cartItem.delete({ where: { id: itemId } });
  const summary = await getCartSummary(match.cart.id);
  logger.info("Cart item removed", { cartId: match.cart.id, itemId });
  return NextResponse.json({ ok: true, summary });
}
