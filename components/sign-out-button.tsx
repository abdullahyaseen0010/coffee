"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignOutButton({ label = "Sign out" }: { label?: string }) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="rounded-full border border-[#2d1b12]/15 bg-white px-5 py-3 text-sm font-semibold text-[#2d1b12] transition hover:bg-[#f9f2ea] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSigningOut ? "Signing out..." : label}
    </button>
  );
}
