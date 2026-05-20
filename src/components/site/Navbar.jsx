import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const links = [
{ to: "/products", label: "Collections" },
{ to: "/products", label: "AI Cake Customizer" },
{ to: "/about", label: "Our Story" },
{ to: "/about", label: "Rewards" },
{ to: "/contact", label: "Reviews" }];


export function Navbar() {
  const { count, setOpen } = useCart();
  const [open, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-500",
        scrolled ?
        "glass shadow-soft border-b border-white/30" :
        "bg-transparent"
      )}>
      
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className={cn(
              "font-display text-xl sm:text-2xl font-semibold tracking-[0.18em] transition-colors",
              overHero ? "text-white drop-shadow" : "text-primary"
            )}>
            
            KRISHNA <span className="text-accent">BAKERS</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) =>
          <Link
            key={l.label}
            to={l.to}
            className={cn(
              "relative rounded-full px-4 py-2 text-[13px] font-medium uppercase tracking-[0.15em] transition-colors",
              overHero ?
              "text-white/90 hover:text-white" :
              "text-foreground/80 hover:text-accent"
            )}>
            
              {l.label}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/products"
            className={cn(
              "hidden sm:inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-all",
              overHero ?
              "bg-white text-primary hover:bg-accent hover:text-accent-foreground" :
              "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
            )}>
            
            Order Online
          </Link>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open cart"
            className={cn(
              "relative inline-flex h-11 w-11 items-center justify-center rounded-full shadow-soft transition-colors",
              overHero ?
              "bg-white/20 text-white hover:bg-white hover:text-primary backdrop-blur" :
              "bg-card hover:bg-accent hover:text-accent-foreground"
            )}>
            
            <ShoppingBag className="h-5 w-5" />
            {count > 0 &&
            <motion.span
              key={count}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
              
                {count}
              </motion.span>
            }
          </button>
          <button
            onClick={() => setMobile((v) => !v)}
            aria-label="Toggle menu"
            className={cn(
              "lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full shadow-soft",
              overHero ? "bg-white/20 text-white backdrop-blur" : "bg-card"
            )}>
            
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur">
          
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((l) =>
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setMobile(false)}
              className="rounded-xl px-4 py-3 text-base font-medium hover:bg-secondary">
              
                  {l.label}
                </Link>
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}