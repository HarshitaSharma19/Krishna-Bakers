import { createContext, useContext, useState, useCallback } from "react";
import { toast } from "sonner";



















const Ctx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((p, qty = 1) => {
    setItems((cur) => {
      const found = cur.find((i) => i.product.id === p.id);
      if (found) return cur.map((i) => i.product.id === p.id ? { ...i, qty: i.qty + qty } : i);
      return [...cur, { product: p, qty }];
    });
    toast.success(`${p.name} added to cart`);
  }, []);

  const remove = useCallback((id) => {
    setItems((cur) => cur.filter((i) => i.product.id !== id));
  }, []);

  const setQty = useCallback((id, qty) => {
    setItems((cur) =>
    cur.map((i) => i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.product.price, 0);

  return (
    <Ctx.Provider value={{ items, count, total, open, setOpen, add, remove, setQty, clear }}>
      {children}
    </Ctx.Provider>);

}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}