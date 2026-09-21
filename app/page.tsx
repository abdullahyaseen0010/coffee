"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Coffee, Leaf, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

import { ProductCard } from "@/components/product-card";
import { ActionLink } from "@/components/ui/ActionLink";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { brewingMethods, featuredProducts, testimonials } from "@/lib/data";

const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
});

function FeaturedRoastCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % featuredProducts.length);
    }, 4200);

    return () => window.clearInterval(id);
  }, []);

  const product = featuredProducts[index];

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[#d4a87c]/20 bg-[#1a120f] p-3 shadow-[0_40px_80px_rgba(0,0,0,0.35)]">
      <div className="absolute -left-10 top-10 h-52 w-52 rounded-full bg-[#d38a4f]/20 blur-3xl" />

      <Link
        href={`/shop/${product.slug}`}
        className="group relative block overflow-hidden rounded-[24px] transition duration-300 hover:scale-[1.01] hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f1c38e]/80"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              width={900}
              height={1100}
              className="h-[540px] w-full object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#120d0b]/85 via-[#120d0b]/20 to-transparent" />

        <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-[#18110d]/80 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#f1c38e]">Featured roast</p>
              <h2 className="mt-2 text-xl font-bold text-[var(--text-on-dark)]">{product.name}</h2>
            </div>
            <div className="rounded-full bg-[#f1c38e] px-3 py-2 text-sm font-semibold text-[#17110d]">${product.basePrice}</div>
          </div>
        </div>
      </Link>

      <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous featured roast"
          onClick={(event) => {
            event.stopPropagation();
            setIndex((current) => (current - 1 + featuredProducts.length) % featuredProducts.length);
          }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#120d0b]/60 text-[#f7f1ea] backdrop-blur-sm transition hover:bg-[#120d0b]/80"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          aria-label="Next featured roast"
          onClick={(event) => {
            event.stopPropagation();
            setIndex((current) => (current + 1) % featuredProducts.length);
          }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#120d0b]/60 text-[#f7f1ea] backdrop-blur-sm transition hover:bg-[#120d0b]/80"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {featuredProducts.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Show featured roast ${item.name}`}
            onClick={(event) => {
              event.stopPropagation();
              setIndex(itemIndex);
            }}
            className={`h-2.5 rounded-full transition-all ${itemIndex === index ? "w-8 bg-[#f1c38e]" : "w-2.5 bg-white/40 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleNewsletterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0].message);
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.data.email }),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to subscribe.");
      }

      setStatus("success");
      setMessage("You’re on the list. Watch for the next roast drop.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to subscribe right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-[#120d0b] text-[var(--text-on-dark)]">
      <section className="relative overflow-hidden border-b border-[#d4a87c]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(203,128,72,0.18),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(0,0,0,0.25),transparent)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div className="relative z-10">
            <SectionEyebrow className="mb-5">Small-batch coffee ritual</SectionEyebrow>
            <h1 className="max-w-xl text-5xl font-black tracking-[-0.06em] text-[var(--text-on-dark)] md:text-7xl">
              The morning brew, elevated.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-[var(--text-muted-on-dark)]">
              Thoughtfully sourced coffees, expertly roasted, and delivered to your door with the warmth of a neighborhood café.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href="/shop">Shop now</ActionLink>
              <ActionLink href="/about" variant="secondary">
                Learn our story
              </ActionLink>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 text-sm text-[var(--text-muted-on-dark)]">
              {["Free shipping over $35", "Ethically sourced", "Roasted weekly"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#f1c38e]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <FeaturedRoastCarousel />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 pt-8 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Coffee, title: "Roasted weekly", body: "Freshly roasted in small batches to preserve sweetness and clarity." },
            { icon: Leaf, title: "Sourced responsibly", body: "Direct relationships with producers who share our quality standards." },
            { icon: Truck, title: "Delivered fast", body: "Fast, reliable shipping from roast date to your countertop." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-[24px] border border-[#d4a87c]/10 bg-[#17110f] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
              <div className="mb-4 inline-flex rounded-full bg-[#f1c38e]/10 p-3 text-[#f1c38e]">
                <Icon size={20} />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-on-dark)]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-muted-on-dark)]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <SectionEyebrow className="mb-0 border-0 bg-transparent px-0 text-[#f1c38e]">Shop favorites</SectionEyebrow>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[var(--text-on-dark)] md:text-4xl">Popular pours</h2>
          </div>
          <ActionLink href="/shop" variant="secondary" className="border-0 bg-transparent px-0 text-[#f1c38e] hover:text-white">
            Browse all
          </ActionLink>
        </div>

        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-[#15100d] py-20 text-[#f7f1ea]">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <SectionEyebrow className="mb-0 border-0 bg-transparent px-0 text-[#f1c38e]">Brewing methods</SectionEyebrow>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[var(--text-on-dark)] md:text-4xl">Find your perfect ritual</h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {brewingMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.title} className="h-full rounded-[28px] border border-[#d4a87c]/10 bg-[#1a120f] p-6">
                  <div className="mb-4 inline-flex rounded-full bg-[#f1c38e]/10 p-3 text-[#f1c38e]"><Icon size={22} /></div>
                  <h3 className="text-2xl font-semibold text-[var(--text-on-dark)]">{method.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-muted-on-dark)]">{method.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-10 text-center">
          <SectionEyebrow className="mb-0 border-0 bg-transparent px-0 text-[#f1c38e]">Testimonials</SectionEyebrow>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[var(--text-on-dark)] md:text-4xl">Loved by slow-living coffee fans</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-[24px] border border-[#d4a87c]/10 bg-[#17110f] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
              <div className="mb-4 flex items-center gap-1 text-[#f1c38e]">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-base leading-7 text-[#f3ecdf]">“{testimonial.quote}”</p>
              <div className="mt-6">
                <p className="font-semibold text-[var(--text-on-dark)]">{testimonial.name}</p>
                <p className="text-sm text-[var(--text-muted-on-dark)]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24 md:px-6">
        <div className="rounded-[32px] border border-[#d4a87c]/10 bg-[linear-gradient(135deg,#1a120f,#221915)] px-6 py-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.25)] md:px-12">
          <SectionEyebrow className="mb-0 border-0 bg-transparent px-0 text-[#f1c38e]">Newsletter</SectionEyebrow>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[var(--text-on-dark)] md:text-4xl">Get fresh roasts, brew tips, and early access.</h2>

          <form onSubmit={handleNewsletterSubmit} className="mt-6">
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <input
                aria-label="Email address"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
                className="min-w-0 flex-1 rounded-full border border-[#d4a87c]/15 bg-[#120d0b] px-5 py-3 text-[#f3ecdf] outline-none placeholder:text-[#b59f8c] focus:border-[#f1c38e] focus:ring-2 focus:ring-[#f1c38e]/30"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-gradient-to-r from-[#f1c38e] to-[#d38a4f] px-6 py-3 text-sm font-semibold text-[#17110d] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Joining..." : "Join now"}
              </button>
            </div>

            {message ? (
              <p className={`mt-3 text-sm ${status === "success" ? "text-[#b9e5b3]" : "text-[#f0b5a2]"}`}>
                {message}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}
