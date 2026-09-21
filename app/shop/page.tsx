"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Filter, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isFilterOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isFilterOpen]);

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

  const filterPanel = (
    <div className="space-y-6">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6b4f42]" size={16} />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search coffees"
          className="min-h-[44px] w-full rounded-full border border-[#2d1b12]/15 bg-[#fffaf3] py-2.5 pl-9 pr-10 text-sm text-on-light outline-none transition focus:border-[#d38a4f] focus:ring-2 focus:ring-[#d38a4f]/20"
        />
        {search ? (
          <button type="button" aria-label="Clear search" onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#5f453a] hover:bg-[#f3e7db]">
            <X size={14} />
          </button>
        ) : null}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-on-light">Roast</label>
        <div className="flex flex-wrap gap-2">
          {roastOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRoast(item)}
              className={`rounded-full px-3 py-2 text-xs font-semibold ${roast === item ? "bg-[#2d1b12] text-on-dark" : "bg-[#f3e7db] text-muted-on-light"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-on-light">Origin</label>
        <select value={origin} onChange={(event) => setOrigin(event.target.value)} className="min-h-[44px] w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-sm text-on-light outline-none">
          {originOptions.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-on-light">Grind</label>
        <select value={grind} onChange={(event) => setGrind(event.target.value)} className="min-h-[44px] w-full rounded-2xl border border-[#2d1b12]/15 bg-[#fffaf3] px-3 py-2.5 text-sm text-on-light outline-none">
          {grindOptions.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between text-sm font-semibold text-on-light">
          <span>Price</span>
          <span>{formatPrice(price)}</span>
        </div>
        <input type="range" min={20} max={40} value={price} onChange={(event) => setPrice(Number(event.target.value))} className="w-full accent-[#7b4b2c]" />
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">Our collection</p>
        <h1 className="mt-2 text-4xl font-black tracking-[-0.06em] text-on-dark sm:text-5xl md:text-6xl">Shop the coffee bar</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
        <aside className="hidden rounded-[28px] border border-[#2d1b12]/10 bg-white/70 p-5 shadow-[0_16px_40px_rgba(71,47,26,0.05)] lg:sticky lg:top-24 lg:block">
          {filterPanel}
        </aside>

        <div>
          <div className="mb-6 flex flex-col gap-3 rounded-[24px] border border-[#2d1b12]/10 bg-[#f9f2ea] p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-on-light">{filteredProducts.length} coffees available</p>
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#2d1b12]/15 bg-white px-3 py-2 text-sm font-semibold text-on-light lg:hidden"
              >
                <Filter size={16} />
                Filters
              </button>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm font-medium text-muted-on-light">Sort by</label>
              <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)} className="min-h-[44px] rounded-full border border-[#2d1b12]/15 bg-white px-3 py-2 text-sm text-on-light outline-none">
                <option value="featured">Popularity</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[#2d1b12]/20 bg-white/50 p-12 text-center">
              <h3 className="text-2xl font-bold text-on-light">No matches yet</h3>
              <p className="mt-2 text-muted-on-light">Try a broader roast or price filter to uncover more coffees.</p>
            </div>
          ) : (
            <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isFilterOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#120d0b]/70 backdrop-blur-sm lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          >
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
              className="absolute left-0 top-0 h-full w-[85vw] max-w-sm border-r border-[#d4a87c]/10 bg-[#f9f2ea] p-5 shadow-[0_0_50px_rgba(0,0,0,0.35)]"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-on-light">Filters</h2>
                <button
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setIsFilterOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2d1b12]/15 bg-white text-on-light"
                >
                  <X size={18} />
                </button>
              </div>
              {filterPanel}
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#2d1b12] px-5 py-3 text-sm font-semibold text-[#f8efe7]"
              >
                Apply filters
              </button>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
