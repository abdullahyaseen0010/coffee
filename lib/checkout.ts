export const PROMO_CODES: Record<string, { type: "percent" | "amount" | "shipping"; value: number }> = {
  WELCOME10: { type: "percent", value: 10 },
  FREESHIP: { type: "shipping", value: 699 },
  COFFEELOVE: { type: "amount", value: 500 },
};

export function roundCurrency(value: number) {
  return Math.round(value);
}

export function calculateCartTotals({ subtotal, shippingFee, promoCode }: { subtotal: number; shippingFee: number; promoCode?: string | null }) {
  let discount = 0;

  if (promoCode) {
    const promo = PROMO_CODES[promoCode.toUpperCase()];
    if (promo) {
      if (promo.type === "percent") {
        discount = roundCurrency((subtotal * promo.value) / 100);
      }
      if (promo.type === "amount") {
        discount = promo.value;
      }
      if (promo.type === "shipping") {
        discount = Math.min(shippingFee, promo.value);
      }
    }
  }

  const tax = roundCurrency(subtotal * 0.0825);
  const total = Math.max(0, subtotal + shippingFee + tax - discount);

  return {
    subtotal,
    shipping: shippingFee,
    tax,
    discount,
    total,
  };
}

export function getShippingFee(method?: string | null) {
  switch (method) {
    case "express":
      return 1299;
    case "pickup":
      return 0;
    default:
      return 699;
  }
}

export function getOrderNumber() {
  return `VR-${Date.now().toString().slice(-6)}`;
}
