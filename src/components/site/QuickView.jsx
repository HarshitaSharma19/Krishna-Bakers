import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Star, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "@tanstack/react-router";

export function QuickView({ product, onClose }) {
  const { add } = useCart();
  return (
    <Dialog open={!!product} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl overflow-hidden bg-background p-0 rounded-3xl">
        {product &&
        <div className="grid md:grid-cols-2">
            <div className="aspect-square bg-secondary">
              <img src={product.image} alt={product.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-3 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">{product.category}</p>
              <h3 className="font-display text-3xl text-primary">{product.name}</h3>
              <div className="flex items-center gap-1 text-sm text-accent">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">· {product.popularity}+ orders</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              <p className="font-display text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>
              <div className="mt-2 flex gap-2">
                <button
                onClick={() => {add(product);onClose();}}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition">
                
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </button>
                <Link
                to="/products/$id"
                params={{ id: product.id }}
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition">
                
                  View Details
                </Link>
              </div>
            </div>
          </div>
        }
      </DialogContent>
    </Dialog>);

}