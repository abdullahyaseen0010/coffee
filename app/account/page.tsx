import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { SignOutButton } from "@/components/sign-out-button";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AccountPage() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value ?? null;
  const session = verifySessionToken(token);

  if (!session) {
    redirect("/login?callbackUrl=/account");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      addresses: {
        orderBy: { isDefault: "desc" },
        take: 1,
      },
      orders: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!user) {
    redirect("/login?callbackUrl=/account");
  }

  const defaultAddress = user.addresses[0];
  const recentOrders = user.orders.map((order) => ({
    id: order.orderNumber || `#${order.id.slice(0, 6).toUpperCase()}`,
    date: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(order.createdAt),
    total: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(order.total / 100),
    status: order.status,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">Your account</p>
          <h1 className="mt-2 text-4xl font-black tracking-[-0.06em] text-on-dark">Hello, {user.name ?? "there"}</h1>
        </div>
        <SignOutButton />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[24px] border border-[#2d1b12]/10 bg-white/70 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-[#87614a]">Profile</p>
          <p className="mt-3 text-xl font-semibold text-on-light">{user.name}</p>
          <p className="mt-1 text-sm text-muted-on-light">{user.email}</p>
        </div>
        <div className="rounded-[24px] border border-[#2d1b12]/10 bg-white/70 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-[#87614a]">Saved address</p>
          {defaultAddress ? (
            <p className="mt-3 text-sm leading-7 text-muted-on-light">
              {defaultAddress.line1}
              <br />
              {defaultAddress.city}, {defaultAddress.state} {defaultAddress.postalCode}
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted-on-light">No saved address yet.</p>
          )}
        </div>
        <div className="rounded-[24px] border border-[#2d1b12]/10 bg-white/70 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-[#87614a]">Wishlist</p>
          <p className="mt-3 text-xl font-semibold text-on-light">0 items</p>
        </div>
      </div>

      <div className="mt-10 rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-on-light">Recent orders</h2>
          <Link href="/shop" className="text-sm font-semibold text-[#6f432b]">Shop again</Link>
        </div>

        <div className="overflow-x-auto rounded-[20px] border border-[#2d1b12]/10">
          <table className="min-w-full text-left text-sm text-on-light">
            <thead className="bg-[#f3e7db] text-muted-on-light">
              <tr>
                <th className="px-4 py-3 font-semibold">Order</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-t border-[#2d1b12]/10">
                    <td className="px-4 py-3 font-medium">{order.id}</td>
                    <td className="px-4 py-3">{order.date}</td>
                    <td className="px-4 py-3">{order.total}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-[#f0dcc3] px-2 py-1 text-xs font-semibold text-[#6f432b]">{order.status}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-muted-on-light">No orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
