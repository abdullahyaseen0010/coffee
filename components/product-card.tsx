"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Star } from "lucide-react";
import type { MouseEvent } from "react";
import { formatPrice, type Product } from "@/lib/data";
import { useCart } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addItem({
      id: `${product.slug}-250-whole-bean`,
      slug: product.slug,
      name: product.name,
      price: product.basePrice,
      image: product.images[0],
      selectedWeight: 250,
      selectedGrind: "Whole bean",
      quantity: 1,
    });
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[#d4a87c]/15 bg-[#17110f] transition-colors duration-200 hover:border-[#f1c38e]/40 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-[#f1c38e]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#221915]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-sm bg-[#17110f]/85 px-2 py-1 text-[11px] font-medium text-[#f1c38e] backdrop-blur-sm">
            {product.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-3 text-xs text-[#d9b78b]">
          <p className="truncate">
            {product.category} · {product.origin}
          </p>
          <p className="flex shrink-0 items-center gap-1 tabular-nums">
            <Star size={12} className="fill-current text-[#f1c38e]" />
            {product.rating}
          </p>
        </div>

        <h3 className="mt-2 text-lg font-semibold leading-snug text-on-dark line-clamp-2">
          <Link
            href={`/shop/${product.slug}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 min-h-10 text-sm leading-5 text-[#d7c8bb]/80 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#d4a87c]/10 pt-4">
          <p className="text-lg font-semibold tabular-nums text-[var(--text-on-dark)]">
            {formatPrice(product.basePrice)}
          </p>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className="relative z-10 inline-flex items-center gap-1.5 rounded-md bg-[#f1c38e] px-3.5 py-2 text-sm font-medium text-[#17110d] transition hover:bg-[#f5d7a4] active:scale-[0.97]"
          >
            <Plus size={14} strokeWidth={2.5} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}