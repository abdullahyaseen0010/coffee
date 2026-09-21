"use client";

import Link from "next/link";
import { useState } from "react";

const shippingMethods = [
  { id: "standard", label: "Standard shipping", price: "$6.00", eta: "3–5 days" },
  { id: "express", label: "Express shipping", price: "$12.00", eta: "1–2 days" },
];

export default function CheckoutPage() {
  const [selectedMethod, setSelectedMethod] = useState("standard");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">Checkout</p>
        <h1 className="mt-2 text-4xl font-black tracking-[-0.06em] text-[var(--text-on-dark)]">Complete your order</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <form className="rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-6 shadow-[0_18px_45px_rgba(71,47,26,0.04)]">
            <h2 className="text-xl font-bold text-[#1d120d]">Shipping details</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="text-sm text-[#2d1b12]">
                <span className="mb-2 block font-medium">First name</span>
                <input className="w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-[#2d1b12] placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20" defaultValue="Maya" />
              </label>
              <label className="text-sm text-[#2d1b12]">
                <span className="mb-2 block font-medium">Last name</span>
                <input className="w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-[#2d1b12] placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20" defaultValue="Quinn" />
              </label>
              <label className="md:col-span-2 text-sm text-[#2d1b12]">
                <span className="mb-2 block font-medium">Address</span>
                <input className="w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-[#2d1b12] placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20" defaultValue="142 Cedar Row" />
              </label>
              <label className="text-sm text-[#2d1b12]">
                <span className="mb-2 block font-medium">City</span>
                <input className="w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-[#2d1b12] placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20" defaultValue="Portland" />
              </label>
              <label className="text-sm text-[#2d1b12]">
                <span className="mb-2 block font-medium">ZIP code</span>
                <input className="w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-[#2d1b12] placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20" defaultValue="97205" />
              </label>
            </div>
          </form>

          <div className="rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-6 shadow-[0_18px_45px_rgba(71,47,26,0.04)]">
            <h2 className="text-xl font-bold text-[#1d120d]">Shipping method</h2>
            <div className="mt-5 space-y-3">
              {shippingMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left ${selectedMethod === method.id ? "border-[#2d1b12] bg-[#f3e7db]" : "border-[#2d1b12]/15 bg-[#fffaf3]"}`}
                >
                  <div>
                    <p className="font-semibold text-[#1d120d]">{method.label}</p>
                    <p className="text-sm text-[#4a3429]">{method.eta}</p>
                  </div>
                  <span className="text-sm font-semibold text-[#1d120d]">{method.price}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-6 shadow-[0_18px_45px_rgba(71,47,26,0.04)]">
            <h2 className="text-xl font-bold text-[#1d120d]">Payment</h2>
            <div className="mt-5 rounded-2xl border border-dashed border-[#2d1b12]/20 bg-[#f3e7db] p-4 text-sm text-[#2d1b12]">
              Stripe payment element placeholder. Connect your Stripe publishable key and checkout endpoint to complete live payments.
            </div>
          </div>
        </div>

        <aside className="rounded-[28px] border border-[#2d1b12]/10 bg-[#fffaf3] p-6 shadow-[0_18px_45px_rgba(71,47,26,0.04)]">
          <h2 className="text-xl font-bold text-[#1d120d]">Summary</h2>
          <div className="mt-5 space-y-4 text-sm text-[#4a3429]">
            <div className="flex items-center justify-between"><span>Subtotal</span><span>$84.00</span></div>
            <div className="flex items-center justify-between"><span>Shipping</span><span>$6.00</span></div>
            <div className="flex items-center justify-between"><span>Tax</span><span>$8.36</span></div>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-[#2d1b12]/10 pt-4 text-lg font-bold text-[#1d120d]">
            <span>Total</span>
            <span>$98.36</span>
          </div>
          <Link href="/order/VRO-1042" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#2d1b12] px-5 py-3 text-sm font-semibold text-[#f8efe7]">
            Place order
          </Link>
        </aside>
      </div>
    </div>
  );
}
