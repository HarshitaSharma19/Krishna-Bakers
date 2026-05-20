import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Award, Clock, Heart, Leaf, Plus, Sparkles, Star, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import heroImg from "@/assets/hero-bakery.jpg";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { QuickView } from "@/components/site/QuickView";
import { ChatBot } from "@/components/site/ChatBot";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
    { title: "Krishna Bakers — Freshly Baked Happiness" },
    { name: "description", content: "Premium artisan bakery in Mumbai. Hand-crafted cakes, pastries, cookies, donuts and breads, baked fresh every morning." },
    { property: "og:title", content: "Krishna Bakers — Freshly Baked Happiness" },
    { property: "og:description", content: "Premium artisan bakery. Hand-crafted cakes, pastries, cookies and breads." }]

  }),
  component: Home
});

const testimonials = [
{ name: "Aanya Sharma", text: "The truffle cake is unreal — it tastes like a Parisian patisserie. My new favourite Sunday ritual.", role: "Regular since 2021" },
{ name: "Rohan Mehta", text: "Their sourdough has the perfect crust. I haven't bought bread anywhere else in two years.", role: "Home chef" },
{ name: "Priya Kapoor", text: "Every birthday cake we've ordered has been picture-perfect and absolutely delicious.", role: "Event planner" }];


const features = [
{ icon: Leaf, title: "Pure Ingredients", text: "European butter, single-origin chocolate, organic flour. Always." },
{ icon: Clock, title: "Baked Daily", text: "Out of the oven before sunrise, in your hands by noon." },
{ icon: Award, title: "Award Winning", text: "Voted Mumbai's best artisan bakery three years running." },
{ icon: Sparkles, title: "Made With Love", text: "Small-batch craftsmanship from a family that's baked since 1998." }];

const journey = [
{ year: "1998", emoji: "🏠", title: "A Kitchen Dream", desc: "Founder Krishnaji started baking traditional mithai and cakes in a tiny home kitchen in Dadar, Mumbai — gifting neighbours every festival." },
{ year: "2003", emoji: "🛒", title: "First Storefront", desc: "Demand grew so fast that a small 200 sq ft shop opened on Linking Road. Customers queued daily for the famous butter croissant." },
{ year: "2009", emoji: "🎂", title: "The Custom Cake Era", desc: "Krishna Bakers became the go-to for celebration cakes in Mumbai. Celebrity orders, wedding cakes, and a waitlist that stretched weeks." },
{ year: "2014", emoji: "🏆", title: "Award-Winning Artisans", desc: "Voted \"Mumbai's Best Artisan Bakery\" at the Maharashtra Food Awards — a title we've held for three consecutive years." },
{ year: "2019", emoji: "🌿", title: "Going Organic", desc: "Switched 100% to organic flour, European-grade butter, and single-origin chocolate. Quality over quantity, always." },
{ year: "2024", emoji: "📱", title: "Digital Bakery", desc: "Launched online ordering, the Rewards Club, and same-day city-wide delivery. Over 5,000 orders delivered monthly." },
{ year: "2026", emoji: "✨", title: "AI Cake Customizer", desc: "Introduced the world's first AI-powered cake builder — letting every customer become their own pastry chef from home." },
];


const moods = [
{ id: "chocolate", label: "Chocolate Lover", emoji: "🍫", match: ["truffle-cake", "choco-cookie", "fudge-brownie", "tiramisu"] },
{ id: "fruity", label: "Fruity Mood", emoji: "🍓", match: ["strawberry-cheesecake", "berry-shortcake", "fruit-tart", "blueberry-pastry"] },
{ id: "sweet", label: "Sweet Cravings", emoji: "🍰", match: ["red-velvet", "vanilla-cupcake", "glazed-donut", "cinnamon-roll"] },
{ id: "coffee", label: "Coffee Companion", emoji: "☕", match: ["butter-croissant", "lemon-tea-cake", "blueberry-muffin", "tiramisu"] },
{ id: "party", label: "Party Time", emoji: "🎉", match: ["macaron-box", "pink-macaron", "truffle-cake", "strawberry-cheesecake"] }];


function HScroll({ items, onQuick }) {
  const { add } = useCart();
  const { fmt } = useCurrency();
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 scroll-smooth snap-x snap-mandatory">
      <div className="flex gap-5 min-w-max">
        {items.map((p) =>
        <motion.article
          key={p.id}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="group snap-start w-64 shrink-0 rounded-3xl bg-card shadow-soft hover:shadow-elegant transition-all overflow-hidden">
          
            <Link to="/products/$id" params={{ id: p.id }} className="relative block aspect-[4/5] overflow-hidden">
              <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <button aria-label="wishlist" className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-accent opacity-0 group-hover:opacity-100 transition-all">
                <Heart className="h-4 w-4" />
              </button>
              <button
              onClick={(e) => {e.preventDefault();onQuick(p);}}
              className="absolute bottom-3 left-3 right-3 rounded-full bg-white/95 backdrop-blur px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
              
                Quick View
              </button>
            </Link>
            <div className="p-4">
              <div className="flex items-center gap-1 text-[11px] text-accent">
                <Star className="h-3 w-3 fill-current" /><span className="font-semibold">{p.rating}</span>
                <span className="text-muted-foreground ml-1">· {p.category}</span>
              </div>
              <h4 className="mt-1 font-display text-base leading-tight">{p.name}</h4>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-primary">{fmt(p.price)}</span>
                <button onClick={() => add(p)} className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-[11px] font-semibold text-primary hover:bg-accent hover:text-accent-foreground transition">
                  <Plus className="h-3 w-3" /> Add
                </button>
              </div>
            </div>
          </motion.article>
        )}
      </div>
    </div>);

}

function Home() {
  const [quick, setQuick] = useState(null);
  const [mood, setMood] = useState("chocolate");
  const featured = products.filter((p) => p.featured);
  const bestSellers = [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 8);
  const freshToday = [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);
  const teaTime = products.filter((p) => ["Tea Cakes", "Cookies", "Pastries"].includes(p.category)).slice(0, 8);
  const moodPicks = useMemo(() => {
    const m = moods.find((x) => x.id === mood);
    return products.filter((p) => m.match.includes(p.id));
  }, [mood]);

  return (
    <>
      {/* HERO — fullscreen luxury */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          src={heroImg}
          alt="Krishna Bakers signature dessert"
          fetchpriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover" />
        
        <div className="absolute inset-0 gradient-hero-overlay" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.45em] text-white/90">
            
            EST. 2026 · Handcrafted Desserts
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.05] tracking-tight text-balance max-w-5xl">
            
            Sweet Moments,<br />Beautifully Baked
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-6 max-w-xl text-sm sm:text-base text-white/85 leading-relaxed">
            
            From handcrafted cakes to delightful pastries, Krishna Bakers brings premium desserts crafted with love and elegance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3">
            
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-elegant hover:bg-accent hover:text-accent-foreground transition-all">
              
              Explore Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition-all">
              
              Order Online
            </Link>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 text-[10px] uppercase tracking-[0.4em] text-white/70">
            
            Scroll
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Categories</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary">Pick your craving</h2>
          </div>
          <Link to="/products" className="text-sm font-medium text-primary hover:text-accent">View all →</Link>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-3 lg:grid-cols-9">
          {categories.map((c, i) =>
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}>
            
              <Link
              to="/products"
              search={{ category: c.name }}
              className="group flex flex-col items-center justify-center gap-2 rounded-3xl bg-card p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all">
              
                <span className="text-4xl transition-transform group-hover:scale-110">{c.emoji}</span>
                <span className="text-xs font-medium text-center">{c.name}</span>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Bestsellers</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary">Loved by everyone</h2>
          </div>
          <Link to="/products" className="text-sm font-medium text-primary hover:text-accent">Browse menu →</Link>
        </div>
        <div className="mt-8">
          <HScroll items={bestSellers} onQuick={setQuick} />
        </div>
      </section>

      {/* FRESHLY BAKED */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Out of the oven</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary">Freshly baked today</h2>
          </div>
        </div>
        <div className="mt-8">
          <HScroll items={freshToday} onQuick={setQuick} />
        </div>
      </section>

      {/* MOOD DETECTOR */}
      <section className="bg-secondary/60 bg-grain">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Flavor mood</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl text-primary text-balance">
              What are you craving today?
            </h2>
            <p className="mt-3 text-muted-foreground">Tell us your mood, we'll bake your match.</p>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {moods.map((m) => {
              const active = mood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  className={`group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${
                  active ?
                  "bg-accent text-accent-foreground shadow-glow scale-105" :
                  "bg-card text-foreground shadow-soft hover:bg-accent/15"}`
                  }>
                  
                  <span className="text-lg">{m.emoji}</span>
                  {m.label}
                </button>);

            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={mood}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
              className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              
              {moodPicks.map((p) =>
              <ProductCard key={p.id} product={p} onQuickView={setQuick} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FEATURED GRID */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Trending</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary">Trending desserts</h2>
          </div>
          <Link to="/products" className="text-sm font-medium text-primary hover:text-accent">See all →</Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) =>
          <ProductCard key={p.id} product={p} onQuickView={setQuick} />
          )}
        </div>
      </section>

      {/* TEA TIME */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">4 o'clock ritual</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary">Tea-time favorites</h2>
        </div>
        <div className="mt-8">
          <HScroll items={teaTime} onQuick={setQuick} />
        </div>
      </section>

      {/* GALLERY — Instagram-style masonry */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">@krishnabakers</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-primary text-balance">From our kitchen</h2>
          <p className="mt-3 text-muted-foreground">A peek into the art of the bake.</p>
        </div>
        <div className="mt-10 columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {products.slice(0, 11).map((p, i) =>
          <motion.div
            key={p.id + i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i % 4 * 0.05 }}
            className={`group relative mb-4 break-inside-avoid overflow-hidden rounded-3xl shadow-soft hover:shadow-elegant transition-all ${
            i % 5 === 0 ? "aspect-[3/4]" : i % 3 === 0 ? "aspect-square" : "aspect-[4/5]"}`
            }>
            
              <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 group-hover:opacity-100 transition">
                <span className="font-display text-white text-sm">{p.name}</span>
                <Heart className="h-4 w-4 text-white" />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* LOYALTY / REWARDS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] glass border border-white/40 p-8 md:p-12 shadow-elegant">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative grid gap-10 md:grid-cols-2 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Rewards Club</p>
              <h2 className="mt-2 font-display text-3xl md:text-5xl text-primary text-balance">
                The sweeter you bake, the sweeter you get
              </h2>
              <p className="mt-4 text-muted-foreground max-w-md">
                Earn points on every order, unlock birthday cakes, free delivery and surprise pastries.
              </p>
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Silver Baker</span><span>Gold Baker</span><span>Sweet Lover Elite</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "62%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-accent to-primary" />
                  
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  You're at <span className="font-semibold text-primary">620 / 1000 points</span> — 380 to Gold Baker.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
              { icon: "🎂", title: "Birthday Cake", text: "Free on your big day" },
              { icon: "🚚", title: "Free Delivery", text: "Above ₹499 every time" },
              { icon: "🎁", title: "Buy 5, Get 1", text: "On all signature bakes" },
              { icon: Trophy, title: "Member Drops", text: "Early access to seasonal" }].
              map((c, i) =>
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl bg-card/80 backdrop-blur p-5 shadow-soft">
                
                  <div className="text-2xl">{typeof c.icon === "string" ? c.icon : <Trophy className="h-6 w-6 text-accent" />}</div>
                  <h4 className="mt-2 font-display text-base text-primary">{c.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{c.text}</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-secondary/60 bg-grain">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Why Krishna</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary text-balance">
              Old-school craft. Modern taste.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three generations of bakers, one obsession: getting every single bite right.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) =>
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-3xl bg-card p-6 shadow-soft hover:shadow-elegant transition-all">
              
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg text-primary">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Loved by locals</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary text-balance">
            Sweet words from our regulars
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) =>
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-3xl bg-card p-7 shadow-soft hover:shadow-elegant transition-all">
            
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 font-display text-lg leading-snug text-foreground/90">
                "{t.text}"
              </blockquote>
              <figcaption className="mt-5">
                <p className="font-semibold text-primary">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </motion.figure>
          )}
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Our Story</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-primary text-balance">The journey of Krishna Bakers</h2>
          <p className="mt-3 text-muted-foreground">From a home kitchen to Mumbai's most loved bakery — one bake at a time.</p>
        </div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary/30 to-transparent hidden md:block" />
          <div className="space-y-12">
            {journey.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative flex flex-col md:flex-row items-center gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div className="flex-1 rounded-3xl bg-card p-7 shadow-soft hover:shadow-elegant transition-all">
                  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">{item.year}</p>
                  <h3 className="font-display text-xl text-primary">
                    <span className="mr-2">{item.emoji}</span>{item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
                {/* Centre dot */}
                <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary text-white font-display text-sm font-semibold shadow-glow z-10">
                  {item.year.slice(2)}
                </div>
                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 sm:px-12 sm:py-20">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative z-10 max-w-2xl text-primary-foreground">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Stay sweet</p>
            <h2 className="mt-2 font-display text-3xl md:text-5xl text-balance">
              Get first dibs on seasonal bakes
            </h2>
            <p className="mt-3 text-primary-foreground/80">
              Join our newsletter for new menus, festival specials, and 10% off your first order.
            </p>
            <form
              onSubmit={(e) => {e.preventDefault();toast.success("You're in! Check your inbox 🍰");e.target.reset();}}
              className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md">
              
              <input
                required
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-full bg-primary-foreground/95 px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 ring-accent" />
              
              <button className="rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <QuickView product={quick} onClose={() => setQuick(null)} />
      <ChatBot />
    </>);

}