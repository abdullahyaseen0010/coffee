import { SITE_ADDRESS, SITE_EMAIL, SITE_PHONE } from "@/lib/site";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">Contact us</p>
        <h1 className="mt-2 text-4xl font-black tracking-[-0.06em] text-on-dark">We’d love to hear from you</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-6 shadow-[0_18px_45px_rgba(71,47,26,0.04)]">
          <p className="text-sm uppercase tracking-[0.18em] text-[#775538]">Get in touch</p>
          <div className="mt-5 space-y-4 text-sm text-muted-on-light">
            <p>{SITE_EMAIL}</p>
            <p>{SITE_PHONE}</p>
            <p>
              {SITE_ADDRESS[0]}
              <br />
              {SITE_ADDRESS[1]}
            </p>
          </div>
        </div>

        <form className="rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-6 shadow-[0_18px_45px_rgba(71,47,26,0.04)]">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-on-light md:col-span-1">
              <span className="mb-2 block font-medium">Name</span>
              <input className="w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-on-light placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20" placeholder="Your name" />
            </label>
            <label className="text-sm text-on-light md:col-span-1">
              <span className="mb-2 block font-medium">Email</span>
              <input className="w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-on-light placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20" type="email" placeholder="you@example.com" />
            </label>
            <label className="text-sm text-on-light md:col-span-2">
              <span className="mb-2 block font-medium">Message</span>
              <textarea className="min-h-32 w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-on-light placeholder:text-[#6b4f42] outline-none focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20" placeholder="Tell us how we can help" />
            </label>
          </div>
          <button type="submit" className="mt-5 inline-flex rounded-full bg-[#2d1b12] px-5 py-3 text-sm font-semibold text-on-dark">Send message</button>
        </form>
      </div>
    </div>
  );
}
