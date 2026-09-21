"use client";

import Link from "next/link";
import { Coffee, ShoppingBag } from "lucide-react";

import { MobileNav } from "@/components/mobile-nav";
import { useSession } from "@/lib/session-client";
import { useCart } from "@/lib/store";

export function SiteHeader() {
  const { itemCount, isHydrated } = useCart();
  const { isAuthenticated, user } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-[#d4a87c]/10 bg-[#0f0a08]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f1c38e] to-[#b77741] text-[#18110d] shadow-[0_0_30px_rgba(216,149,87,0.38)]">
            <Coffee size={18} strokeWidth={2.4} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xl font-black tracking-[-0.08em] text-white">
              Brew<span className="text-[#f1c38e]">Craft</span>
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#d7c8bb] md:flex">
          <Link href="/shop" className="transition hover:text-white">Shop</Link>
          <Link href="/about" className="transition hover:text-white">About</Link>
          <Link href="/contact" className="transition hover:text-white">Contact</Link>
          {isAuthenticated ? (
            <Link href="/account" className="transition hover:text-white">Account</Link>
          ) : (
            <Link href="/login" className="transition hover:text-white">Log in</Link>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <Link href="/account" className="hidden rounded-full border border-[#f1c38e]/30 bg-[#1a120f] px-4 py-2.5 text-sm font-medium text-[#f3dcc0] transition hover:border-[#f1c38e]/50 hover:text-white md:inline-flex">
              Account
            </Link>
          ) : (
            <Link href="/login" className="hidden rounded-full border border-[#f1c38e]/30 bg-[#1a120f] px-4 py-2.5 text-sm font-medium text-[#f3dcc0] transition hover:border-[#f1c38e]/50 hover:text-white md:inline-flex">
              Log in
            </Link>
          )}

          <Link href="/cart" className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f1c38e] to-[#d38a4f] px-3 py-2.5 text-sm font-bold text-[#17110d] shadow-[0_10px_35px_rgba(211,138,79,0.3)] transition hover:brightness-110 sm:px-4">
            <ShoppingBag size={15} />
            <span className="hidden sm:inline">Cart</span>
            {isHydrated ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1d120d] px-1 text-[10px] font-bold text-[#f2d7af]">
                {itemCount}
              </span>
            ) : null}
          </Link>

          <MobileNav isAuthenticated={isAuthenticated} userName={user?.name} />
        </div>
      </div>
    </header>
  );
}
