import Link from "next/link";

const sales = [
  { label: "Revenue", value: "$28.4k", change: "+18.2%" },
  { label: "Orders", value: "412", change: "+9.8%" },
  { label: "Avg. order", value: "$69.00", change: "+4.1%" },
];

const products = [
  { name: "Ethiopian Yirgacheffe", stock: 18, price: "$26" },
  { name: "Velvet Espresso", stock: 11, price: "$30" },
  { name: "Morning Ritual Blend", stock: 27, price: "$23" },
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">Admin dashboard</p>
          <h1 className="mt-2 text-4xl font-black tracking-[-0.06em] text-[var(--text-on-dark)]">Operations overview</h1>
        </div>
        <Link href="/shop" className="rounded-full bg-[#2d1b12] px-5 py-3 text-sm font-semibold text-[#f8efe7]">View storefront</Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {sales.map((stat) => (
          <div key={stat.label} className="rounded-[24px] border border-[#2d1b12]/10 bg-white/70 p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-[#87614a]">{stat.label}</p>
            <p className="mt-3 text-3xl font-black tracking-[-0.06em] text-[#1d120d]">{stat.value}</p>
            <p className="mt-2 text-sm font-medium text-[#6f432b]">{stat.change} vs last month</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-6">
          <h2 className="text-2xl font-bold text-[#1d120d]">Recent orders</h2>
          <div className="mt-5 space-y-3">
            {[
              { id: "VRO-1042", customer: "Maya Quinn", status: "Paid" },
              { id: "VRO-1041", customer: "Theo Ramirez", status: "Packed" },
              { id: "VRO-1040", customer: "Nina Smith", status: "Shipped" },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-2xl border border-[#2d1b12]/10 bg-[#fffaf3] px-4 py-3">
                <div>
                  <p className="font-semibold text-[#1d120d]">{order.id}</p>
                  <p className="text-sm text-[#4a3429]">{order.customer}</p>
                </div>
                <span className="rounded-full bg-[#f0dcc3] px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#6f432b]">{order.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-6">
          <h2 className="text-2xl font-bold text-[#1d120d]">Inventory</h2>
          <div className="mt-5 space-y-3">
            {products.map((product) => (
              <div key={product.name} className="flex items-center justify-between gap-3 rounded-2xl border border-[#2d1b12]/10 bg-[#fffaf3] px-4 py-3">
                <div>
                  <p className="font-semibold text-[#1d120d]">{product.name}</p>
                  <p className="text-sm text-[#4a3429]">{product.stock} units left</p>
                </div>
                <span className="text-sm font-semibold text-[#6f432b]">{product.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
