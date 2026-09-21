"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/store";
import { formatPrice } from "@/lib/data";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const shipping = subtotal > 35 ? 0 : 8;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-black tracking-[-0.06em] text-[var(--text-on-dark)]">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-[28px] border border-dashed border-[#2d1b12]/20 bg-white/60 p-12 text-center">
          <h2 className="text-2xl font-bold text-[#1d120d]">Your cart is empty</h2>
          <p className="mt-2 text-[#4a3429]">Add a few favorites and we’ll keep them ready for checkout.</p>
          <Link href="/shop" className="mt-6 inline-flex rounded-full bg-[#2d1b12] px-5 py-3 text-sm font-semibold text-[#f8efe7]">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-4 shadow-[0_16px_35px_rgba(71,47,26,0.04)] md:flex-row">
                <div className="relative h-32 w-full overflow-hidden rounded-[20px] md:w-32">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">{item.selectedGrind}</p>
                    <h2 className="mt-2 text-xl font-semibold text-[#1d120d]">{item.name}</h2>
                    <p className="mt-1 text-sm text-[#4a3429]">{item.selectedWeight} g</p>
                  </div>

                  <div className="flex items-center justify-between gap-4 md:items-end md:justify-end">
                    <div className="inline-flex items-center gap-3 rounded-full border border-[#2d1b12]/15 bg-[#f8f1ea] px-3 py-2">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease quantity for ${item.name}`} className="rounded-full p-1 hover:bg-white"><Minus size={14} /></button>
                      <span className="min-w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase quantity for ${item.name}`} className="rounded-full p-1 hover:bg-white"><Plus size={14} /></button>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-[#1d120d]">{formatPrice(item.price * item.quantity)}</p>
                      <button type="button" onClick={() => removeItem(item.id)} className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[#7d4f39]">
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-[28px] border border-[#2d1b12]/10 bg-[#fffaf3] p-6 shadow-[0_18px_45px_rgba(71,47,26,0.04)]">
            <h2 className="text-2xl font-bold text-[#1d120d]">Order summary</h2>
            <div className="mt-6 space-y-4 text-sm text-[#4a3429]">
              <div className="flex items-center justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex items-center justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
              <div className="flex items-center justify-between"><span>Promo code</span><input aria-label="Promo code" placeholder="Enter code" className="max-w-[120px] rounded-full border border-[#2d1b12]/15 bg-white px-3 py-2 text-right text-[#2d1b12] outline-none" /></div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[#2d1b12]/10 pt-4 text-lg font-bold text-[#1d120d]">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link href="/checkout" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#2d1b12] px-5 py-3 text-sm font-semibold text-[#f8efe7]">
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
