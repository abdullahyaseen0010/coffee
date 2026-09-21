import Link from "next/link";

export default function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <div className="rounded-[32px] border border-[#2d1b12]/10 bg-white/70 p-8 text-center shadow-[0_18px_45px_rgba(71,47,26,0.04)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">Order confirmed</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-[var(--text-on-dark)]">Thanks for your order</h1>
        <p className="mt-4 text-base text-[#4a3429]">Your order reference is <span className="font-semibold text-[#1d120d]">VRO-1042</span>. A receipt has been sent to your inbox.</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-6">
          <h2 className="text-xl font-bold text-[#1d120d]">Order details</h2>
          <div className="mt-5 space-y-3 text-sm text-[#4a3429]">
            <div className="flex items-center justify-between"><span>Items</span><span>3</span></div>
            <div className="flex items-center justify-between"><span>Shipping</span><span>Standard</span></div>
            <div className="flex items-center justify-between"><span>Total</span><span>$98.36</span></div>
          </div>
        </div>
        <div className="rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-6">
          <h2 className="text-xl font-bold text-[#1d120d]">Status</h2>
          <p className="mt-5 inline-flex rounded-full bg-[#f0dcc3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#6f432b]">Paid</p>
          <p className="mt-4 text-sm text-[#4a3429]">Your coffee is being prepared and will ship within 48 hours.</p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/shop" className="rounded-full bg-[#2d1b12] px-6 py-3 text-sm font-semibold text-[#f8efe7]">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
