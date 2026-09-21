import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartProvider } from "@/components/cart-provider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Velvet Roast | Coffee for slow mornings",
    template: "%s | Velvet Roast",
  },
  description:
    "Sourced coffees, small-batch roasts, brewing tools, and a premium coffee ritual designed for thoughtful mornings.",
  metadataBase: new URL("https://velvet-roast.example"),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico", rel: "shortcut icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Velvet Roast",
    description: "Beautifully roasted coffee with a slow, intentional ritual.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-[#120d0b] text-on-dark">
        <CartProvider>
          <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(215,144,86,0.12),transparent_24%),linear-gradient(180deg,#120d0b_0%,#1a130f_100%)]">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
