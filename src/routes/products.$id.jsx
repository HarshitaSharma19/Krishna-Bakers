import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Star, Truck, ShieldCheck, Clock, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/context/CartContext";
import { QuickView } from "@/components/site/QuickView";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ?
    [
    { title: `${loaderData.product.name} — Krishna Bakers` },
    { name: "description", content: loaderData.product.description },
    { property: "og:title", content: `${loaderData.product.name} — Krishna Bakers` },
    { property: "og:description", content: loaderData.product.description },
    { property: "og:image", content: loaderData.product.image }] :

    []
  }),
  notFoundComponent: () =>
  <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="font-display text-4xl text-primary">Not on the menu</h1>
      <p className="mt-2 text-muted-foreground">That bake doesn't exist (yet).</p>
      <Link to="/products" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Back to menu</Link>
    </div>,

  errorComponent: ({ error }) => <div className="p-12 text-center text-destructive">{error.message}</div>,
  component: PDP
});

function PDP() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const { add, setOpen } = useCart();
  const [quick, setQuick] = useState(null);

  const recommended = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const fallback = products.filter((p) => p.id !== product.id).slice(0, 4);
  const recs = recommended.length >= 2 ? recommended : fallback;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to menu
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-card shadow-elegant">
              <div className="absolute -inset-10 -z-10 bg-accent/15 blur-3xl rounded-full" />
              <img src={product.image} alt={product.name} width={900} height={900} fetchpriority="high" decoding="sync" className="aspect-square w-full object-cover" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[product.image, product.image, product.image, product.image].map((src, i) =>
              <button key={i} className="overflow-hidden rounded-2xl bg-card shadow-soft hover:ring-2 ring-accent transition">
                  <img src={src} alt="" loading="lazy" decoding="async" className="aspect-square w-full object-cover opacity-90" />
                </button>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">{product.category}</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl text-primary leading-tight text-balance">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) =>
                <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : "opacity-30"}`} />
                )}
              </div>
              <span className="font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">· {product.popularity}+ orders</span>
            </div>

            <p className="mt-6 text-foreground/80 leading-relaxed">{product.description}</p>

            <div className="mt-7 flex items-baseline gap-3">
              <span className="font-display text-4xl font-semibold text-primary">${product.price.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">${(product.price * 1.2).toFixed(2)}</span>
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">Save 20%</span>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-border bg-card">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:text-accent"><Minus className="h-4 w-4" /></button>
                <span className="w-10 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:text-accent"><Plus className="h-4 w-4" /></button>
              </div>
              <button
                onClick={() => add(product, qty)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-accent hover:text-accent-foreground transition">
                
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => {add(product, qty);setOpen(true);}}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition">
                
                Buy Now
              </button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
              { icon: Truck, label: "Free delivery", text: "Orders over $25" },
              { icon: Clock, label: "Baked today", text: "Out by 6am" },
              { icon: ShieldCheck, label: "Fresh promise", text: "Or it's on us" }].
              map((b) =>
              <div key={b.label} className="rounded-2xl bg-card p-4 shadow-soft">
                  <b.icon className="h-5 w-5 text-accent" />
                  <p className="mt-2 text-sm font-semibold text-primary">{b.label}</p>
                  <p className="text-xs text-muted-foreground">{b.text}</p>
                </div>
              )}
            </div>

            <div className="mt-8 rounded-3xl bg-secondary/60 p-5">
              <h3 className="font-display text-lg text-primary">Specifications</h3>
              <dl className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
                <div className="flex justify-between border-b border-border py-1.5"><dt className="text-muted-foreground">Category</dt><dd className="font-medium">{product.category}</dd></div>
                <div className="flex justify-between border-b border-border py-1.5"><dt className="text-muted-foreground">Serves</dt><dd className="font-medium">2–4 people</dd></div>
                <div className="flex justify-between border-b border-border py-1.5"><dt className="text-muted-foreground">Shelf life</dt><dd className="font-medium">2 days refrigerated</dd></div>
                <div className="flex justify-between border-b border-border py-1.5"><dt className="text-muted-foreground">Allergens</dt><dd className="font-medium">Gluten, dairy</dd></div>
              </dl>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">You might also love</p>
            <h2 className="mt-2 font-display text-3xl text-primary">Pairs perfectly with</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recs.map((p) =>
          <ProductCard key={p.id} product={p} onQuickView={setQuick} />
          )}
        </div>
      </section>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>);

}