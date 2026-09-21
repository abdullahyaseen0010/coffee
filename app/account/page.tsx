import Link from "next/link";

const orders = [
  { id: "#VRO-1042", date: "Sep 18, 2026", total: "$58.00", status: "Shipped" },
  { id: "#VRO-1030", date: "Sep 05, 2026", total: "$81.00", status: "Delivered" },
];

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">Your account</p>
          <h1 className="mt-2 text-4xl font-black tracking-[-0.06em] text-[var(--text-on-dark)]">Hello, Maya</h1>
        </div>
        <Link href="/login" className="rounded-full border border-[#2d1b12]/15 bg-white px-5 py-3 text-sm font-semibold text-[#2d1b12]">
          Sign out
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[24px] border border-[#2d1b12]/10 bg-white/70 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-[#87614a]">Profile</p>
          <p className="mt-3 text-xl font-semibold text-[var(--text-on-light)]">Maya Quinn</p>
          <p className="mt-1 text-sm text-[#4a3429]">maya@cafe.email</p>
        </div>
        <div className="rounded-[24px] border border-[#2d1b12]/10 bg-white/70 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-[#87614a]">Saved address</p>
          <p className="mt-3 text-sm leading-7 text-[#4a3429]">142 Cedar Row<br />Portland, OR 97205</p>
        </div>
        <div className="rounded-[24px] border border-[#2d1b12]/10 bg-white/70 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-[#87614a]">Wishlist</p>
          <p className="mt-3 text-xl font-semibold text-[var(--text-on-light)]">3 items</p>
        </div>
      </div>

      <div className="mt-10 rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[var(--text-on-light)]">Recent orders</h2>
          <Link href="/shop" className="text-sm font-semibold text-[#6f432b]">Shop again</Link>
        </div>

        <div className="overflow-hidden rounded-[20px] border border-[#2d1b12]/10">
          <table className="min-w-full text-left text-sm text-[#2d1b12]">
            <thead className="bg-[#f3e7db] text-[#4a3429]">
              <tr>
                <th className="px-4 py-3 font-semibold">Order</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-[#2d1b12]/10">
                  <td className="px-4 py-3 font-medium">{order.id}</td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">{order.total}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-[#f0dcc3] px-2 py-1 text-xs font-semibold text-[#6f432b]">{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
