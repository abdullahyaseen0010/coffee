import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 md:px-6">
      <div className="rounded-[30px] border border-[#2d1b12]/10 bg-white/70 p-7 shadow-[0_18px_45px_rgba(71,47,26,0.04)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">Password reset</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[var(--text-on-dark)]">Forgot password?</h1>

        <form className="mt-6 space-y-4">
          <label className="block text-sm text-[#2d1b12]">
            <span className="mb-2 block font-medium">Email address</span>
            <input className="w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-[#2d1b12] placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20" type="email" placeholder="you@example.com" />
          </label>
          <button type="submit" className="w-full rounded-full bg-[#2d1b12] px-5 py-3 text-sm font-semibold text-[#f8efe7]">Send reset link</button>
        </form>

        <div className="mt-6 text-center text-sm text-[#4a3429]">
          <Link href="/login" className="font-semibold text-[#6f432b]">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
