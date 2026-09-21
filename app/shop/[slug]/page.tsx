"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Minus, Plus, Star } from "lucide-react";
import { useState } from "react";

import { ProductCard } from "@/components/product-card";
import { formatPrice, getProductBySlug, relatedProducts } from "@/lib/data";
import { useCart } from "@/lib/store";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const product = getProductBySlug(slug);
  const [selectedWeight, setSelectedWeight] = useState<number | null>(null);
  const [selectedGrind, setSelectedGrind] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) {
    notFound();
  }

  const effectiveWeight = selectedWeight ?? product.weightOptions[0];
  const effectiveGrind = selectedGrind ?? product.grindOptions[0];

  const handleAddToCart = () => {
    addItem({
      id: `${product.slug}-${effectiveWeight}-${effectiveGrind}`,
      slug: product.slug,
      name: product.name,
      price: product.basePrice,
      image: product.images[0],
      selectedWeight: effectiveWeight,
      selectedGrind: effectiveGrind,
      quantity,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <Link href="/shop" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#6f432b]">
        <ArrowLeft size={16} /> Back to shop
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="grid gap-4 md:grid-cols-3">
            {product.images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-[28px] border border-[#2d1b12]/10 bg-white/60">
                <Image src={image} alt={`${product.name} view ${index + 1}`} width={900} height={1100} className="h-80 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-[#2d1b12]/10 bg-white/70 p-6 shadow-[0_20px_45px_rgba(71,47,26,0.05)]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#87614a]">{product.category}</p>
            {product.badge ? (
              <span className="rounded-full bg-[#f0dcc3] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f432b]">{product.badge}</span>
            ) : null}
          </div>

          <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-[var(--text-on-light)]">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3 text-sm font-medium text-muted-on-light">
            <div className="flex items-center gap-1 text-[#c98a5b]">
              <Star size={16} fill="currentColor" />
              <span className="text-[var(--text-on-light)]">{product.rating}</span>
            </div>
            <span>{product.reviews} reviews</span>
          </div>

          <p className="mt-5 text-3xl font-black tracking-[-0.06em] text-[var(--text-on-light)]">{formatPrice(product.basePrice)}</p>
          <p className="mt-5 text-base leading-7 text-muted-on-light">{product.description}</p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="mb-2 text-sm font-semibold text-on-light">Weight</p>
              <div className="flex flex-wrap gap-2">
                {product.weightOptions.map((weight) => (
                  <button
                    key={weight}
                    type="button"
                    onClick={() => setSelectedWeight(weight)}
                    className={`rounded-full border px-3 py-2 text-sm ${effectiveWeight === weight ? "border-[#2d1b12] bg-[#2d1b12] text-[#f8efe7]" : "border-[#2d1b12]/15 bg-[#f8f1ea] text-on-light"}`}
                  >
                    {weight} g
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-on-light">Grind</p>
              <div className="flex flex-wrap gap-2">
                {product.grindOptions.map((grind) => (
                  <button
                    key={grind}
                    type="button"
                    onClick={() => setSelectedGrind(grind)}
                    className={`rounded-full border px-3 py-2 text-sm ${effectiveGrind === grind ? "border-[#2d1b12] bg-[#2d1b12] text-[#f8efe7]" : "border-[#2d1b12]/15 bg-[#f8f1ea] text-on-light"}`}
                  >
                    {grind}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-on-light">Quantity</p>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#2d1b12]/15 bg-[#f8f1ea] px-3 py-2 text-on-light shadow-sm">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-on-light transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d38a4f]/40 active:bg-[#f3e7db]"
                >
                  <Minus size={15} />
                </button>
                <span aria-live="polite" className="min-w-6 text-center text-sm font-semibold text-on-light">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-on-light transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d38a4f]/40 active:bg-[#f3e7db]"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={handleAddToCart} className="inline-flex flex-1 items-center justify-center rounded-full bg-[#2d1b12] px-5 py-3 text-sm font-semibold text-[#f8efe7] transition hover:bg-[#1b110d]">
              Add to cart
            </button>
            <button type="button" disabled className="cursor-not-allowed rounded-full border border-[#2d1b12]/15 bg-white px-5 py-3 text-sm font-semibold text-on-light opacity-60">
              Save for later
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-6">
          <h2 className="text-2xl font-bold text-on-light">Tasting notes</h2>
          <ul className="mt-5 space-y-3 text-sm text-muted-on-light">
            {product.tastingNotes.map((note) => (
              <li key={note} className="flex items-center gap-3"><span className="h-2.5 w-2.5 rounded-full bg-[#b9804d]" /> {note}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-6">
          <h2 className="text-2xl font-bold text-on-light">Why it’s special</h2>
          <p className="mt-4 text-base leading-7 text-muted-on-light">
            Grown in the high elevations of {product.origin}, this coffee balances a lively structure with a silky finish and a distinctive profile that shines in pour-over and espresso preparations.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-black tracking-[-0.05em] text-on-light">You may also like</h2>
        </div>
        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
          {relatedProducts(product.slug).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
