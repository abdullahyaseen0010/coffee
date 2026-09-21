"use client";

import { CartProvider as CartContextProvider } from "@/lib/store";

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <CartContextProvider>{children}</CartContextProvider>;
}
