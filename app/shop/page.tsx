"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { products, formatPrice } from "@/lib/data";

const roastOptions = ["All", "Light", "Medium", "Dark", "Espresso"];
const originOptions = ["All", "Ethiopia", "Colombia", "Jamaica", "Hawaii", "Blend"];
const grindOptions = ["All", "Whole bean", "Espresso", "Pour over", "French press", "Drip"];

export default function ShopPage() {
  const [roast, setRoast] = useState("All");
  const [origin, setOrigin] = useState("All");
  const [grind, setGrind] = useState("All");
  const [price, setPrice] = useState(40);
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const next = products.filter((product) => {
      const searchMatch = !search || `${product.name} ${product.origin} ${product.description}`.toLowerCase().includes(search.toLowerCase());
      const roastMatch = roast === "All" || product.roastLevel === roast;
      const originMatch = origin === "All" || product.origin === origin || (origin === "Blend" && product.category === "Blends");
      const priceMatch = product.basePrice <= price;
      const grindMatch = grind === "All" || product.grindOptions.includes(grind);
      return searchMatch && roastMatch && originMatch && priceMatch && grindMatch;
    });

    return next.sort((a, b) => {
      if (sort === "price-low") return a.basePrice - b.basePrice;
      if (sort === "price-high") return b.basePrice - a.basePrice;
      if (sort === "newest") return b.id - a.id;
      return b.rating - a.rating;
    });
  }, [roast, origin, grind, price, search, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">Our collection</p>
        <h1 className="mt-2 text-4xl font-black tracking-[-0.06em] text-[var(--text-on-dark)] md:text-5xl">Shop the coffee bar</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
        <aside className="lg:sticky lg:top-24 rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-5 shadow-[0_16px_40px_rgba(71,47,26,0.05)]">
          <div className="space-y-6">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6b4f42]" size={16} />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search coffees"
                className="w-full rounded-full border border-[#2d1b12]/15 bg-[#fffaf3] py-2.5 pl-9 pr-10 text-sm text-[#2d1b12] outline-none transition focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20"
              />
              {search ? (
                <button type="button" aria-label="Clear search" onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#5f453a] hover:bg-[#f3e7db]">
                  <X size={14} />
                </button>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2d1b12]">Roast</label>
              <div className="flex flex-wrap gap-2">
                {roastOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setRoast(item)}
                    className={`rounded-full px-3 py-2 text-xs font-semibold ${roast === item ? "bg-[#2d1b12] text-[#f9f1ea]" : "bg-[#f3e7db] text-[#4a3429]"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2d1b12]">Origin</label>
              <select value={origin} onChange={(event) => setOrigin(event.target.value)} className="w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-sm text-[#2d1b12] outline-none">
                {originOptions.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2d1b12]">Grind</label>
              <select value={grind} onChange={(event) => setGrind(event.target.value)} className="w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-sm text-[#2d1b12] outline-none">
                {grindOptions.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-[#2d1b12]">
                <span>Price</span>
                <span>{formatPrice(price)}</span>
              </div>
              <input type="range" min={20} max={40} value={price} onChange={(event) => setPrice(Number(event.target.value))} className="w-full accent-[#7b4b2c]" />
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-col gap-3 rounded-[24px] border border-[#2d1b12]/10 bg-[#f9f2ea] p-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-[#4a3429]">{filteredProducts.length} coffees available</p>
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm font-medium text-[#4a3429]">Sort by</label>
              <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-full border border-[#2d1b12]/15 bg-white px-3 py-2 text-sm text-[#2d1b12] outline-none">
                <option value="featured">Popularity</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[#2d1b12]/20 bg-white/50 p-12 text-center">
              <h3 className="text-2xl font-bold text-[var(--text-on-light)]">No matches yet</h3>
              <p className="mt-2 text-[#4a3429]">Try a broader roast or price filter to uncover more coffees.</p>
            </div>
          ) : (
            <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
