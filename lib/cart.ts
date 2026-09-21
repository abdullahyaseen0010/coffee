import crypto from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";

import { getCartCookieValue, setCartCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";

export type CartContext = {
  cartId: string;
  userId: string | null;
  guestKey: string | null;
};

async function findCartByUser(userId: string) {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  });
}

async function findCartByGuestKey(guestKey: string) {
  return prisma.cart.findUnique({
    where: { guestKey },
    include: {
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  });
}

export async function getCartContext(request: NextRequest, response?: NextResponse): Promise<CartContext> {
  const sessionCookieValue = request.cookies.get("velvet_roast_session")?.value ?? null;
  const guestKey = getCartCookieValue(request);

  if (sessionCookieValue) {
    // The session cookie is handled through the auth helper, but this method still needs the user ID.
    const session = request.cookies.get("velvet_roast_session")?.value ?? null;
    const userIdFromSession = session ? JSON.parse(Buffer.from(session.split(".")[0], "base64url").toString("utf8"))?.userId : null;
    if (userIdFromSession) {
      const cart = await findCartByUser(userIdFromSession);
      if (cart) {
        return { cartId: cart.id, userId: userIdFromSession, guestKey: null };
      }

      const created = await prisma.cart.create({
        data: {
          userId: userIdFromSession,
        },
      });

      return { cartId: created.id, userId: userIdFromSession, guestKey: null };
    }
  }

  let resolvedGuestKey = guestKey;
  if (!resolvedGuestKey) {
    resolvedGuestKey = crypto.randomUUID();
    if (response) {
      setCartCookie(response, resolvedGuestKey);
    }
  }

  const existingGuestCart = await findCartByGuestKey(resolvedGuestKey);
  if (existingGuestCart) {
    return { cartId: existingGuestCart.id, userId: null, guestKey: resolvedGuestKey };
  }

  const created = await prisma.cart.create({
    data: {
      guestKey: resolvedGuestKey,
    },
  });

  return { cartId: created.id, userId: null, guestKey: resolvedGuestKey };
}

export async function mergeGuestCartIntoUser(userId: string, guestKey: string) {
  const guestCart = await findCartByGuestKey(guestKey);
  if (!guestCart) {
    return;
  }

  let userCart = await findCartByUser(userId);
  if (!userCart) {
    userCart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });
  }

  for (const guestItem of guestCart.items) {
    const existingItem = userCart.items.find(
      (item) =>
        item.productId === guestItem.productId &&
        item.variantId === guestItem.variantId &&
        item.selectedGrind === guestItem.selectedGrind &&
        item.selectedWeight === guestItem.selectedWeight,
    );

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + guestItem.quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productId: guestItem.productId,
          variantId: guestItem.variantId,
          quantity: guestItem.quantity,
          unitPrice: guestItem.unitPrice,
          name: guestItem.name,
          selectedWeight: guestItem.selectedWeight,
          selectedGrind: guestItem.selectedGrind,
        },
      });
    }
  }

  await prisma.cartItem.deleteMany({ where: { cartId: guestCart.id } });
  await prisma.cart.delete({ where: { id: guestCart.id } });
}

export async function getCartSummary(cartId: string) {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: true,
          variant: true,
        },
      },
    },
  });

  if (!cart) {
    return { items: [], subtotal: 0, itemCount: 0 };
  }

  const items = cart.items.map((item) => ({
    id: item.id,
    cartId: item.cartId,
    productId: item.productId,
    variantId: item.variantId,
    name: item.name,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    selectedWeight: item.selectedWeight,
    selectedGrind: item.selectedGrind,
    image: item.product.images[0] ?? "",
    slug: item.product.slug,
    subtotal: item.quantity * item.unitPrice,
  }));

  return {
    items,
    subtotal: items.reduce((sum, item) => sum + item.subtotal, 0),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}
