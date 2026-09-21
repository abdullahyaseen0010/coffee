"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

type MobileNavProps = {
  isAuthenticated: boolean;
  userName?: string | null;
};

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function useHasMounted() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}

export function MobileNav({ isAuthenticated, userName }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useHasMounted();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const links = [
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    isAuthenticated
      ? { href: "/account", label: "Account" }
      : { href: "/login", label: "Log in" },
  ];

  const menu = (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="mobile-nav-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-100 bg-[#0c0806]/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
            className="absolute right-0 top-0 flex h-full w-[85vw] max-w-sm flex-col overflow-hidden border-l border-[#d4a87c]/20 bg-[linear-gradient(180deg,#2a1a12_0%,#1a110c_45%,#110a07_100%)] p-5 shadow-[0_0_50px_rgba(0,0,0,0.6)]"
          >
            {/* warm caramel glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#f1c38e]/10 blur-3xl"
            />

            <div className="relative mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#f1c38e]">
                  BrewCraft
                </p>
                <p className="mt-1 text-sm text-[#d7c8bb]">
                  {isAuthenticated ? `Hi, ${userName ?? "friend"}` : "Welcome"}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d4a87c]/20 bg-[#1a120f] text-[#f4ede7] transition hover:border-[#f1c38e]/40"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="relative flex flex-col gap-2">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-[#d4a87c]/10 bg-[#1d120d] px-4 py-3 text-base font-medium text-[#f5efe7] transition hover:border-[#f1c38e]/30 hover:bg-[#2a1a12]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {!isAuthenticated ? (
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="relative mt-auto inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#f1c38e] px-5 py-3 text-sm font-bold text-[#17110d] transition hover:bg-[#f5cfa3]"
              >
                Create account
              </Link>
            ) : null}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d4a87c]/20 bg-[#1a120f] text-[#f4ede7] transition hover:border-[#f1c38e]/40 hover:text-white md:hidden"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {mounted ? createPortal(menu, document.body) : null}
    </>
  );
}