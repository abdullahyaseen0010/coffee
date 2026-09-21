import Link from "next/link";
import { Camera, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#d4a87c]/10 bg-[#0f0a08] text-[#f3ecdf]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <Link href="/" className="inline-block text-2xl font-black tracking-[-0.08em] text-white">
            Brew<span className="text-[#f1c38e]">Craft</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#d7c8bb]">
            Thoughtful coffees and tools for slow mornings, good conversation, and beautifully brewed rituals.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f1c38e]">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm text-[#d7c8bb]">
            <li><Link href="/shop" className="transition hover:text-white">Shop</Link></li>
            <li><Link href="/about" className="transition hover:text-white">About</Link></li>
            <li><Link href="/contact" className="transition hover:text-white">Contact</Link></li>
            <li><Link href="/account" className="transition hover:text-white">Account</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f1c38e]">Visit</h3>
          <ul className="mt-4 space-y-3 text-sm text-[#d7c8bb]">
            <li className="flex items-center gap-2"><MapPin size={16} className="text-[#f1c38e]" /> 142 Cedar Row, Portland, OR</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-[#f1c38e]" /> (503) 555-0147</li>
            <li className="flex items-center gap-2"><Mail size={16} className="text-[#f1c38e]" /> hello@brewcraft.coffee</li>
            <li className="flex items-center gap-2"><Camera size={16} className="text-[#f1c38e]" /> @brewcraftcoffee</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#d4a87c]/10 py-4 text-center text-xs text-[#d7c8bb]">
        © {year} BrewCraft. All rights reserved.
      </div>
    </footer>
  );
}
