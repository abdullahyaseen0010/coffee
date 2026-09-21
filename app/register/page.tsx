"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setError(payload.error ?? "We couldn’t create your account.");
        return;
      }

      router.push("/account");
      router.refresh();
    } catch {
      setError("Unable to create your account right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 md:px-6">
      <div className="rounded-[30px] border border-[#2d1b12]/10 bg-white/70 p-7 shadow-[0_18px_45px_rgba(71,47,26,0.04)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">Create account</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.06em] text-on-dark">Register</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm text-on-light">
            <span className="mb-2 block font-medium">Full name</span>
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="min-h-[44px] w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-on-light placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20"
              type="text"
              placeholder="Maya Quinn"
              autoComplete="name"
              required
            />
          </label>
          <label className="block text-sm text-on-light">
            <span className="mb-2 block font-medium">Email</span>
            <input
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
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
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              className="min-h-[44px] w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-on-light placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          </label>

          {error ? <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[44px] w-full rounded-full bg-[#2d1b12] px-5 py-3 text-sm font-semibold text-on-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-on-light">
          Already have an account? <Link href="/login" className="font-semibold text-[#6f432b]">Log in</Link>
        </div>
      </div>
    </div>
  );
}
