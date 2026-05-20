import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, X, Trophy, Home } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { cn } from "@/lib/utils";

const links = [
{ to: "/products", label: "Collections" },
{ to: "/customize", label: "AI Cake Customizer" },
{ to: "/about", label: "Our Story" },
{ to: "/contact", label: "Reviews" }];


export function Navbar() {
  const { count, setOpen } = useCart();
  const { currency, toggle } = useCurrency();
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

  const iconBtn = cn(
    "relative inline-flex h-11 w-11 items-center justify-center rounded-full shadow-soft transition-colors",
    overHero
      ? "bg-white/20 text-white hover:bg-white hover:text-primary backdrop-blur"
      : "bg-card hover:bg-accent hover:text-accent-foreground"
  );

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
          {/* Home icon — first in nav */}
          <Link
            to="/"
            aria-label="Home"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              overHero ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-accent"
            )}>
            <Home className="h-4 w-4" />
          </Link>
          {links.map((l) =>
          <Link
            key={l.label}
            to={l.to}
            className={cn(
              "relative rounded-full px-3 py-2 text-[12px] font-medium uppercase tracking-[0.1em] whitespace-nowrap transition-colors",
              overHero ?
              "text-white/90 hover:text-white" :
              "text-foreground/80 hover:text-accent"
            )}>
            
              {l.label}
            </Link>
          )}
        </nav>

        {/* Right-side icon cluster */}
        <div className="flex items-center gap-2">

          {/* Currency Toggle */}
          <div
            id="currency-toggle"
            role="group"
            aria-label="Currency selector"
            className={cn(
              "hidden sm:inline-flex items-center rounded-full p-0.5 text-[11px] font-bold transition-all duration-300",
              overHero
                ? "bg-white/20 backdrop-blur border border-white/30"
                : "bg-secondary border border-border"
            )}>
            <button
              onClick={() => currency !== "USD" && toggle()}
              className={cn(
                "rounded-full px-3 py-1.5 transition-all duration-200",
                currency === "USD"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : overHero ? "text-white/80 hover:text-white" : "text-foreground/60 hover:text-foreground"
              )}>
              $ USD
            </button>
            <button
              onClick={() => currency !== "INR" && toggle()}
              className={cn(
                "rounded-full px-3 py-1.5 transition-all duration-200",
                currency === "INR"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : overHero ? "text-white/80 hover:text-white" : "text-foreground/60 hover:text-foreground"
              )}>
              ₹ INR
            </button>
          </div>

          {/* Rewards (Trophy) icon button */}
          <Link to="/rewards" aria-label="Rewards" className={iconBtn}>
            <Trophy className="h-5 w-5" />
          </Link>

          {/* Cart icon button */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open cart"
            className={iconBtn}>
            
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

          {/* Mobile hamburger */}
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

      {/* Mobile menu */}
      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur">
          
            <div className="flex flex-col gap-1 px-4 py-4">
              <Link to="/" onClick={() => setMobile(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium hover:bg-secondary">
                <Home className="h-4 w-4 text-accent" /> Home
              </Link>
              {links.map((l) =>
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setMobile(false)}
              className="rounded-xl px-4 py-3 text-base font-medium hover:bg-secondary">
              
                  {l.label}
                </Link>
            )}
              <Link to="/rewards" onClick={() => setMobile(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium hover:bg-secondary">
                <Trophy className="h-4 w-4 text-accent" /> Rewards
              </Link>
              {/* Mobile currency toggle */}
              <div className="mt-2 flex gap-2 px-4">
                <button onClick={() => currency !== "USD" && toggle()} className={cn("flex-1 rounded-full py-2 text-sm font-bold transition", currency === "USD" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground")}>$ USD</button>
                <button onClick={() => currency !== "INR" && toggle()} className={cn("flex-1 rounded-full py-2 text-sm font-bold transition", currency === "INR" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground")}>₹ INR</button>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}