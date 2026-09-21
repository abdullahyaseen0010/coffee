"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingCart, Star } from "lucide-react";
import type { MouseEvent } from "react";
import { formatPrice, type Product } from "@/lib/data";
import { useCart } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();

  const handleAdd = (event?: MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
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

  const handleOpen = () => {
    router.push(`/shop/${product.slug}`);
  };

  return (
    <article
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[28px] border border-[#d4a87c]/15 bg-[#17110f] shadow-[0_22px_45px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-[#f1c38e]/30 hover:shadow-[0_26px_60px_rgba(211,138,79,0.12)]"
      onClick={handleOpen}
      role="link"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpen();
        }
      }}
    >
      <div className="block overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          {product.badge ? (
            <span className="absolute left-4 top-4 rounded-full bg-[#f1c38e] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1a120f]">
              {product.badge}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f1c38e]">{product.category}</p>
            <Link href={`/shop/${product.slug}`} className="mt-1 block cursor-pointer text-xl font-semibold leading-tight text-on-dark line-clamp-2">
              {product.name}
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#f1c38e]/10 px-2 py-1 text-xs font-semibold text-[#f5d7a4]">
            <Star size={12} fill="currentColor" /> {product.rating}
          </div>
        </div>

        <p className="mt-4 min-h-[3.25rem] text-sm leading-6 text-[#d7c8bb] line-clamp-2">{product.description}</p>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-2xl font-black tracking-[-0.06em] text-[var(--text-on-dark)]">{formatPrice(product.basePrice)}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-[#d9b78b]">{product.origin}</p>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f1c38e] to-[#d38a4f] px-4 py-2.5 text-sm font-semibold text-[#17110d] transition hover:brightness-110"
            >
              <ShoppingCart size={15} /> Add
            </button>
          </div>

          <Link
            href={`/shop/${product.slug}`}
            className="mt-3 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#f1c38e]"
            onClick={(event) => event.stopPropagation()}
          >
            View details <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
