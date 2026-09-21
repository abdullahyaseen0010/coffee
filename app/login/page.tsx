import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 md:px-6">
      <div className="rounded-[30px] border border-[#2d1b12]/10 bg-white/70 p-7 shadow-[0_18px_45px_rgba(71,47,26,0.04)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">Welcome back</p>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.06em] text-[var(--text-on-dark)]">Login</h1>

        <form className="mt-6 space-y-4">
          <label className="block text-sm text-[#2d1b12]">
            <span className="mb-2 block font-medium">Email</span>
            <input className="w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-[#2d1b12] placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20" type="email" placeholder="you@example.com" />
          </label>
          <label className="block text-sm text-[#2d1b12]">
            <span className="mb-2 block font-medium">Password</span>
            <input className="w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-[#2d1b12] placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20" type="password" placeholder="••••••••" />
          </label>
          <div className="flex items-center justify-between text-sm text-[#4a3429]">
            <label className="inline-flex items-center gap-2"><input type="checkbox" /> Remember me</label>
            <Link href="/forgot-password" className="font-medium text-[#6f432b]">Forgot password?</Link>
          </div>
          <button type="submit" className="w-full rounded-full bg-[#2d1b12] px-5 py-3 text-sm font-semibold text-[#f8efe7]">Log in</button>
        </form>

        <div className="mt-6 text-center text-sm text-[#4a3429]">
          Don’t have an account? <Link href="/register" className="font-semibold text-[#6f432b]">Create one</Link>
        </div>
      </div>
    </div>
  );
}
