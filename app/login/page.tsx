"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/account";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setError(payload.error ?? "Invalid email or password.");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Unable to sign in right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 md:px-6">
      <div className="rounded-[30px] border border-[#2d1b12]/10 bg-white/70 p-7 shadow-[0_18px_45px_rgba(71,47,26,0.04)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">Welcome back</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.06em] text-on-dark">Login</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm text-on-light">
            <span className="mb-2 block font-medium">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-h-[44px] w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-on-light placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>
          <label className="block text-sm text-on-light">
            <span className="mb-2 block font-medium">Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="min-h-[44px] w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-on-light placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

          <div className="flex items-center justify-between text-sm text-muted-on-light">
            <label className="inline-flex items-center gap-2"><input type="checkbox" /> Remember me</label>
            <Link href="/forgot-password" className="font-medium text-[#6f432b]">Forgot password?</Link>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[44px] w-full rounded-full bg-[#2d1b12] px-5 py-3 text-sm font-semibold text-on-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Log in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-on-light">
          Don’t have an account? <Link href="/register" className="font-semibold text-[#6f432b]">Create one</Link>
        </div>
      </div>
    </div>
  );
}
