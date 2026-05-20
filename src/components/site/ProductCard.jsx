import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Eye, Plus } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

export function ProductCard({ product, onQuickView }) {
  const { add } = useCart();
  const { fmt } = useCurrency();
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft hover:shadow-elegant transition-all duration-500">
      
      <Link to="/products/$id" params={{ id: product.id }} className="relative block aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={900}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        
        <div className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
          {product.category}
        </div>
        {onQuickView &&
        <button
          onClick={(e) => {e.preventDefault();onQuickView(product);}}
          aria-label="Quick view"
          className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-primary opacity-0 group-hover:opacity-100 translate-y-[-4px] group-hover:translate-y-0 transition-all hover:bg-accent hover:text-accent-foreground">
          
            <Eye className="h-4 w-4" />
          </button>
        }
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-1 text-xs text-accent">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="font-semibold">{product.rating}</span>
          <span className="text-muted-foreground">· {product.popularity}+ orders</span>
        </div>
        <Link to="/products/$id" params={{ id: product.id }} className="font-display text-lg leading-tight hover:text-accent transition-colors">
          {product.name}
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-xl font-semibold text-primary">{fmt(product.price)}</span>
          <button
            onClick={() => add(product)}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
            
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </motion.article>);

}