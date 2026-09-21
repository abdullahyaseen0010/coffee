"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type MobileNavProps = {
  isAuthenticated: boolean;
  userName?: string | null;
};

export function MobileNav({ isAuthenticated, userName }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handlePointerDown = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-[#120d0b]/70 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.aside
              ref={panelRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
              className="absolute right-0 top-0 h-full w-[85vw] max-w-sm border-l border-[#d4a87c]/10 bg-[#170f0b] p-5 shadow-[0_0_50px_rgba(0,0,0,0.45)]"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#f1c38e]">Menu</p>
                  <p className="mt-1 text-sm text-[#d7c8bb]">{isAuthenticated ? `Hi, ${userName ?? "friend"}` : "Welcome"}</p>
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d4a87c]/20 bg-[#1a120f] text-[#f4ede7]"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {[
                  { href: "/shop", label: "Shop" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                  isAuthenticated ? { href: "/account", label: "Account" } : { href: "/login", label: "Log in" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl border border-transparent px-4 py-3 text-base font-medium text-[#f5efe7] transition hover:border-[#d4a87c]/20 hover:bg-[#1d120d]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {!isAuthenticated ? (
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#f1c38e] px-5 py-3 text-sm font-bold text-[#17110d]"
                >
                  Create account
                </Link>
              ) : null}
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
