import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-bakery.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
    { title: "Our Story — Krishna Bakers" },
    { name: "description", content: "Three generations of bakers in Mumbai. Discover the story behind Krishna Bakers." },
    { property: "og:title", content: "Our Story — Krishna Bakers" },
    { property: "og:description", content: "Three generations of bakers in Mumbai." }]

  }),
  component: About
});

function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Our story</p>
        <h1 className="mt-2 font-display text-4xl md:text-6xl text-primary text-balance">A small bakery with a big heart.</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Krishna Bakers started in 1998 as a tiny corner shop on Baker Lane. Three generations later, we still mix every dough by hand, proof it slowly, and bake it fresh before sunrise.
        </p>
      </motion.div>
      <div className="mt-12 overflow-hidden rounded-[2.5rem] shadow-elegant">
        <img src={heroImg} alt="Inside Krishna Bakers" fetchpriority="high" decoding="sync" className="aspect-[16/9] w-full object-cover" />
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 text-foreground/80 leading-relaxed">
        <p>What started with a single wood-fired oven and a hand-painted sign is now a beloved Mumbai institution — but the recipes haven't changed. Every loaf, every cake, every flake of pastry still comes from the same family of bakers who believe that good food is made slowly, with care, and with butter. Lots of butter.</p>
        <p>We source our flour from a small organic mill in Punjab, our chocolate from a single estate in Karnataka, and our vanilla from Madagascar. Then we pour our mornings into making sure every order leaves the kitchen exactly the way we'd want to receive it ourselves.</p>
      </div>
    </div>);

}