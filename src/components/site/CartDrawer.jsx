import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { open, setOpen, items, total, setQty, remove, clear } = useCart();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md bg-background">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl text-primary">Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ?
        <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-primary">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <p className="mt-4 font-display text-xl">Your cart is empty</p>
            <p className="mt-1 text-sm text-muted-foreground">Add something sweet to get started.</p>
          </div> :

        <>
            <div className="flex-1 overflow-y-auto px-1 py-4 space-y-3">
              {items.map(({ product, qty }) =>
            <div key={product.id} className="flex gap-3 rounded-2xl bg-card p-3 shadow-soft">
                  <img src={product.image} alt={product.name} loading="lazy" decoding="async" className="h-20 w-20 rounded-xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="font-medium leading-tight">{product.name}</p>
                      <button onClick={() => remove(product.id)} aria-label="remove" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border bg-background">
                        <button onClick={() => setQty(product.id, qty - 1)} className="p-1.5 hover:text-accent"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-7 text-center text-sm">{qty}</span>
                        <button onClick={() => setQty(product.id, qty + 1)} className="p-1.5 hover:text-accent"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <p className="font-semibold text-primary">${(qty * product.price).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
            )}
            </div>
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span><span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span><span className="text-primary">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full h-12">
                Checkout
              </Button>
              <button onClick={clear} className="w-full text-xs text-muted-foreground hover:text-foreground">
                Clear cart
              </button>
            </div>
          </>
        }
      </SheetContent>
    </Sheet>);

}