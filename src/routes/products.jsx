import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { QuickView } from "@/components/site/QuickView";
import { useCurrency, USD_TO_INR } from "@/context/CurrencyContext";
import { z } from "zod";

const search = z.object({
  category: z.string().optional(),
  q: z.string().optional()
});

export const Route = createFileRoute("/products")({
  validateSearch: search,
  head: () => ({
    meta: [
    { title: "Menu — Krishna Bakers" },
    { name: "description", content: "Browse our full menu of artisan cakes, pastries, cookies, donuts and breads. Filter by category, price and rating." },
    { property: "og:title", content: "Menu — Krishna Bakers" },
    { property: "og:description", content: "Browse our full menu of artisan baked goods." }]

  }),
  component: Listing
});



function Listing() {
  const params = Route.useSearch();
  const navigate = useNavigate({ from: "/products" });
  const { currency, fmt } = useCurrency();
  const [cat, setCat] = useState(params.category || "All");
  const [q, setQ] = useState(params.q || "");
  const [price, setPrice] = useState(30); // always stored in USD
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("popular");
  const [quick, setQuick] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Slider min/max in display currency
  const sliderMin = currency === "INR" ? Math.round(3 * USD_TO_INR) : 3;
  const sliderMax = currency === "INR" ? Math.round(30 * USD_TO_INR) : 30;
  // Display value in current currency
  const displayPrice = currency === "INR" ? Math.round(price * USD_TO_INR) : price;

  // When currency changes, reset slider to max
  useEffect(() => { setPrice(30); }, [currency]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    navigate({ search: { category: cat === "All" ? undefined : cat, q: q || undefined }, replace: true });
  }, [cat, q, navigate]);

  const filtered = useMemo(() => {
    let r = products.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (p.price > price) return false;
      if (p.rating < minRating) return false;
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);else
    if (sort === "newest") r = [...r].sort((a, b) => b.createdAt - a.createdAt);else
    r = [...r].sort((a, b) => b.popularity - a.popularity);
    return r;
  }, [cat, price, minRating, q, sort]);

  const Filters =
  <div className="space-y-7">
      <div>
        <h3 className="font-display text-base text-primary mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) =>
        <button
          key={c.name}
          onClick={() => setCat(c.name)}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
          cat === c.name ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent/20"}`
          }>
          
              {c.emoji} {c.name}
            </button>
        )}
        </div>
      </div>
      <div>
        <h3 className="font-display text-base text-primary mb-3">Max price</h3>
        <input
          type="range"
          min={sliderMin}
          max={sliderMax}
          value={displayPrice}
          onChange={(e) => {
            const v = +e.target.value;
            // Convert back to USD for storage
            setPrice(currency === "INR" ? v / USD_TO_INR : v);
          }}
          className="w-full accent-[var(--accent)]" />
        <p className="text-sm text-muted-foreground mt-1">Up to <span className="font-semibold text-primary">{currency === "INR" ? `₹${displayPrice}` : `$${displayPrice}`}</span></p>
      </div>
      <div>
        <h3 className="font-display text-base text-primary mb-3">Min rating</h3>
        <div className="flex gap-1">
          {[0, 4, 4.5, 4.8].map((r) =>
        <button
          key={r}
          onClick={() => setMinRating(r)}
          className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition ${
          minRating === r ? "bg-accent text-accent-foreground" : "bg-secondary hover:bg-accent/20"}`
          }>
          
              {r === 0 ? "Any" : <><Star className="h-3 w-3 fill-current" />{r}+</>}
            </button>
        )}
        </div>
      </div>
    </div>;


  return (
    <>
      <section className="bg-grain gradient-warm">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Our Menu</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl text-primary">Today's bake</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">Pick what you crave. Filter, sort, and add to cart — we'll have it ready.</p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for cakes, cookies, croissants…"
              className="w-full rounded-full bg-card pl-11 pr-5 py-3 text-sm shadow-soft outline-none focus:ring-2 ring-accent" />
            
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full bg-card px-5 py-3 text-sm shadow-soft outline-none focus:ring-2 ring-accent">
            
            <option value="popular">Popularity</option>
            <option value="low">Price: Low to High</option>
            <option value="newest">Newest</option>
          </select>
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-soft"
            aria-label="Filters">
            
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className={`${filtersOpen ? "block" : "hidden"} lg:block rounded-3xl bg-card p-6 shadow-soft h-fit lg:sticky lg:top-24`}>
            {Filters}
          </aside>

          <div>
            {loading ?
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) =>
              <div key={i} className="rounded-3xl bg-card p-5 shadow-soft animate-pulse">
                    <div className="aspect-square w-full rounded-2xl bg-secondary" />
                    <div className="mt-4 h-3 w-1/3 rounded-full bg-secondary" />
                    <div className="mt-3 h-4 w-2/3 rounded-full bg-secondary" />
                    <div className="mt-2 h-3 w-full rounded-full bg-secondary" />
                  </div>
              )}
              </div> :
            filtered.length === 0 ?
            <div className="rounded-3xl bg-card p-16 text-center shadow-soft">
                <p className="font-display text-2xl text-primary">Nothing matches that yet</p>
                <p className="mt-2 text-muted-foreground">Try clearing some filters.</p>
              </div> :

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) =>
              <ProductCard key={p.id} product={p} onQuickView={setQuick} />
              )}
              </div>
            }
          </div>
        </div>
      </section>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>);

}