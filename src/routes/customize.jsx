import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { ShoppingBag, ChevronRight, ChevronLeft, Check, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

export const Route = createFileRoute("/customize")({
  head: () => ({
    meta: [
      { title: "AI Cake Customizer — Krishna Bakers" },
      { name: "description", content: "Design your dream cake step by step. Choose flavors, size, frosting, toppings and a custom message. Baked fresh by Krishna Bakers." },
    ],
  }),
  component: Customize,
});

/* ─── DATA ─────────────────────────────────────────────────────────────────── */

const STEPS = ["Base", "Size", "Frosting", "Toppings", "Message", "Summary"];

const BASES = [
  { id: "vanilla", label: "Vanilla Dream", emoji: "🍦", desc: "Classic Madagascar vanilla sponge", price: 0, color: "#FFF8E7" },
  { id: "chocolate", label: "Dark Chocolate", emoji: "🍫", desc: "Rich Belgian 70% dark chocolate", price: 2, color: "#3D1F00" },
  { id: "red-velvet", label: "Red Velvet", emoji: "🍰", desc: "Velvety red sponge with cocoa hint", price: 2, color: "#8B0000" },
  { id: "strawberry", label: "Strawberry", emoji: "🍓", desc: "Fresh strawberry infused sponge", price: 3, color: "#FF6B9D" },
  { id: "lemon", label: "Lemon Zest", emoji: "🍋", desc: "Bright citrus with lemon curd", price: 2, color: "#FFF176" },
  { id: "coffee", label: "Coffee Tiramisu", emoji: "☕", desc: "Espresso soaked with mascarpone", price: 4, color: "#5D4037" },
];

const SIZES = [
  { id: "6", label: "6 inch", sub: "Serves 6–8", price: 0, emoji: "🎂" },
  { id: "8", label: "8 inch", sub: "Serves 10–14", price: 8, emoji: "🎂" },
  { id: "10", label: "10 inch", sub: "Serves 18–24", price: 18, emoji: "🎂" },
];

const FROSTINGS = [
  { id: "buttercream", label: "Buttercream", desc: "Classic, smooth & sweet", price: 0, color: "#FDEBD0" },
  { id: "cream-cheese", label: "Cream Cheese", desc: "Tangy, rich & velvety", price: 2, color: "#FDFEFE" },
  { id: "ganache", label: "Chocolate Ganache", desc: "Silky dark chocolate gloss", price: 3, color: "#1C1208" },
  { id: "fondant", label: "Fondant", desc: "Smooth finish, sculpt-ready", price: 5, color: "#FADADD" },
  { id: "whipped", label: "Whipped Cream", desc: "Light, airy & delicate", price: 1, color: "#FFFFFF" },
];

const TOPPINGS = [
  { id: "sprinkles", label: "Sprinkles", emoji: "🌈", price: 1 },
  { id: "berries", label: "Fresh Berries", emoji: "🫐", price: 3 },
  { id: "choco-chips", label: "Choco Chips", emoji: "🍫", price: 2 },
  { id: "macarons", label: "Mini Macarons", emoji: "🟣", price: 5 },
  { id: "edible-flowers", label: "Edible Flowers", emoji: "🌸", price: 4 },
  { id: "gold-leaf", label: "Gold Leaf", emoji: "✨", price: 6 },
  { id: "caramel-drip", label: "Caramel Drip", emoji: "🍮", price: 3 },
  { id: "oreos", label: "Oreo Crumbles", emoji: "⚫", price: 2 },
];

const BASE_PRICE = 18;

/* ─── COMPONENT ─────────────────────────────────────────────────────────────── */

function Customize() {
  const [step, setStep] = useState(0);
  const [base, setBase] = useState(null);
  const [size, setSize] = useState(null);
  const [frosting, setFrosting] = useState(null);
  const [toppings, setToppings] = useState([]);
  const [message, setMessage] = useState("");
  const { add } = useCart();
  const { fmt } = useCurrency();

  const totalPrice = useMemo(() => {
    let t = BASE_PRICE;
    if (base) t += base.price;
    if (size) t += size.price;
    if (frosting) t += frosting.price;
    toppings.forEach((tid) => {
      const tp = TOPPINGS.find((x) => x.id === tid);
      if (tp) t += tp.price;
    });
    return t;
  }, [base, size, frosting, toppings]);

  const canNext = [
    !!base,
    !!size,
    !!frosting,
    true, // toppings optional
    true, // message optional
  ][step];

  function toggleTopping(id) {
    setToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function addToCart() {
    const product = {
      id: `custom-${Date.now()}`,
      name: `Custom ${base.label} Cake`,
      price: totalPrice,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&auto=format&fit=crop",
      category: "Custom",
      description: `${size.label} ${base.label} cake with ${frosting.label} frosting${toppings.length ? ", " + toppings.map(t => TOPPINGS.find(x=>x.id===t)?.label).join(", ") : ""}${message ? `. Message: "${message}"` : ""}`,
    };
    add(product);
    setStep(0); setBase(null); setSize(null); setFrosting(null); setToppings([]); setMessage("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/40 to-background">
      {/* Header */}
      <section className="bg-grain gradient-warm pt-10 pb-8">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              <Sparkles className="inline h-3.5 w-3.5 mr-1" />AI Cake Customizer
            </p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl text-primary">Build Your Dream Cake</h1>
            <p className="mt-3 text-muted-foreground">Step by step. Every detail yours.</p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => i < step && setStep(i)}
                className="flex flex-col items-center gap-1 group"
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step ? "bg-accent text-accent-foreground" :
                  i === step ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`hidden sm:block text-[10px] font-medium uppercase tracking-wider transition-colors ${
                  i === step ? "text-primary" : "text-muted-foreground"
                }`}>{s}</span>
              </button>
            ))}
          </div>
          <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
            <motion.div
              animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.4 }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </div>

        {/* Step content */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-card p-6 shadow-soft"
            >
              {/* STEP 0: Base */}
              {step === 0 && (
                <>
                  <h2 className="font-display text-2xl text-primary mb-1">Choose your base</h2>
                  <p className="text-sm text-muted-foreground mb-6">The soul of your cake starts here.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {BASES.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setBase(b)}
                        className={`relative flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                          base?.id === b.id
                            ? "border-accent bg-accent/10 shadow-glow"
                            : "border-border hover:border-accent/40 hover:bg-secondary/50"
                        }`}
                      >
                        <span className="text-3xl">{b.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-primary">{b.label}</p>
                          <p className="text-xs text-muted-foreground truncate">{b.desc}</p>
                          {b.price > 0 && <p className="text-xs font-semibold text-accent mt-0.5">+{fmt(b.price)}</p>}
                        </div>
                        {base?.id === b.id && (
                          <Check className="h-5 w-5 text-accent shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* STEP 1: Size */}
              {step === 1 && (
                <>
                  <h2 className="font-display text-2xl text-primary mb-1">Pick your size</h2>
                  <p className="text-sm text-muted-foreground mb-6">How many people are you celebrating with?</p>
                  <div className="flex flex-col gap-3">
                    {SIZES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSize(s)}
                        className={`flex items-center gap-5 rounded-2xl border-2 p-5 text-left transition-all ${
                          size?.id === s.id
                            ? "border-accent bg-accent/10 shadow-glow"
                            : "border-border hover:border-accent/40 hover:bg-secondary/50"
                        }`}
                      >
                        <span className="text-4xl">{s.emoji}</span>
                        <div className="flex-1">
                          <p className="font-display text-xl text-primary">{s.label}</p>
                          <p className="text-sm text-muted-foreground">{s.sub}</p>
                        </div>
                        <div className="text-right">
                          {s.price > 0 ? (
                            <p className="font-semibold text-accent">+{fmt(s.price)}</p>
                          ) : (
                            <p className="text-xs text-muted-foreground">Included</p>
                          )}
                        </div>
                        {size?.id === s.id && <Check className="h-5 w-5 text-accent shrink-0" />}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* STEP 2: Frosting */}
              {step === 2 && (
                <>
                  <h2 className="font-display text-2xl text-primary mb-1">Choose your frosting</h2>
                  <p className="text-sm text-muted-foreground mb-6">The coat that makes it shine.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {FROSTINGS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFrosting(f)}
                        className={`relative flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                          frosting?.id === f.id
                            ? "border-accent bg-accent/10 shadow-glow"
                            : "border-border hover:border-accent/40 hover:bg-secondary/50"
                        }`}
                      >
                        <div
                          className="h-10 w-10 rounded-full shrink-0 border border-border shadow-inner"
                          style={{ background: f.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-primary">{f.label}</p>
                          <p className="text-xs text-muted-foreground">{f.desc}</p>
                          {f.price > 0 && <p className="text-xs font-semibold text-accent mt-0.5">+{fmt(f.price)}</p>}
                        </div>
                        {frosting?.id === f.id && <Check className="h-5 w-5 text-accent shrink-0" />}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* STEP 3: Toppings */}
              {step === 3 && (
                <>
                  <h2 className="font-display text-2xl text-primary mb-1">Add toppings</h2>
                  <p className="text-sm text-muted-foreground mb-6">Optional — go wild or keep it minimal.</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {TOPPINGS.map((t) => {
                      const selected = toppings.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          onClick={() => toggleTopping(t.id)}
                          className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                            selected
                              ? "border-accent bg-accent/10 shadow-glow"
                              : "border-border hover:border-accent/40 hover:bg-secondary/50"
                          }`}
                        >
                          <span className="text-2xl">{t.emoji}</span>
                          <div className="flex-1">
                            <p className="font-semibold text-primary">{t.label}</p>
                            <p className="text-xs font-semibold text-accent">+{fmt(t.price)}</p>
                          </div>
                          <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            selected ? "border-accent bg-accent" : "border-border"
                          }`}>
                            {selected && <Check className="h-3 w-3 text-accent-foreground" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* STEP 4: Message */}
              {step === 4 && (
                <>
                  <h2 className="font-display text-2xl text-primary mb-1">Add a message</h2>
                  <p className="text-sm text-muted-foreground mb-6">We'll pipe it on top — optional but heartfelt.</p>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, 80))}
                    placeholder="e.g. Happy Birthday Priya! 🎉"
                    rows={4}
                    className="w-full rounded-2xl border-2 border-border bg-secondary/40 p-4 text-sm outline-none focus:border-accent resize-none transition-colors"
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-right">{message.length}/80 characters</p>
                  <div className="mt-6 rounded-2xl bg-secondary/60 p-5 text-sm text-muted-foreground leading-relaxed">
                    💡 <strong className="text-primary">Tip:</strong> Short, punchy messages work best. Our pastry chefs use a fine nozzle for precision lettering.
                  </div>
                </>
              )}

              {/* STEP 5: Summary */}
              {step === 5 && base && size && frosting && (
                <>
                  <h2 className="font-display text-2xl text-primary mb-1">Your masterpiece</h2>
                  <p className="text-sm text-muted-foreground mb-6">Review before adding to cart.</p>
                  <div className="space-y-3 text-sm">
                    {[
                      { label: "Base", value: `${base.emoji} ${base.label}`, extra: base.price > 0 ? `+${fmt(base.price)}` : "Included" },
                      { label: "Size", value: `${size.label} — ${size.sub}`, extra: size.price > 0 ? `+${fmt(size.price)}` : "Included" },
                      { label: "Frosting", value: frosting.label, extra: frosting.price > 0 ? `+${fmt(frosting.price)}` : "Included" },
                      {
                        label: "Toppings",
                        value: toppings.length ? toppings.map((tid) => TOPPINGS.find((x) => x.id === tid)?.emoji + " " + TOPPINGS.find((x) => x.id === tid)?.label).join(", ") : "None",
                        extra: toppings.reduce((s, tid) => s + (TOPPINGS.find((x) => x.id === tid)?.price || 0), 0) > 0
                          ? `+${fmt(toppings.reduce((s, tid) => s + (TOPPINGS.find((x) => x.id === tid)?.price || 0), 0))}` : "",
                      },
                      { label: "Message", value: message || "—", extra: "" },
                    ].map((row) => (
                      <div key={row.label} className="flex items-start justify-between gap-4 rounded-xl bg-secondary/50 px-4 py-3">
                        <span className="text-muted-foreground shrink-0 w-20">{row.label}</span>
                        <span className="flex-1 font-medium text-primary text-right">{row.value}</span>
                        {row.extra && <span className="text-accent font-semibold shrink-0">{row.extra}</span>}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Live Price Sidebar */}
          <div className="rounded-3xl bg-card p-6 shadow-soft sticky top-24">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">Your Cake</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Base price</span><span>{fmt(BASE_PRICE)}</span>
              </div>
              {base?.price > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>{base.label}</span><span>+{fmt(base.price)}</span>
                </div>
              )}
              {size?.price > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>{size.label}</span><span>+{fmt(size.price)}</span>
                </div>
              )}
              {frosting?.price > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>{frosting.label}</span><span>+{fmt(frosting.price)}</span>
                </div>
              )}
              {toppings.map((tid) => {
                const tp = TOPPINGS.find((x) => x.id === tid);
                return tp ? (
                  <div key={tid} className="flex justify-between text-muted-foreground">
                    <span>{tp.emoji} {tp.label}</span><span>+{fmt(tp.price)}</span>
                  </div>
                ) : null;
              })}
              <div className="border-t border-border pt-2 mt-2 flex justify-between font-display text-lg font-semibold text-primary">
                <span>Total</span><span>{fmt(totalPrice)}</span>
              </div>
            </div>

            {step < 5 ? (
              <div className="mt-6 flex gap-2">
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="flex-none inline-flex items-center justify-center h-12 w-12 rounded-full border border-border hover:bg-secondary transition"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground h-12 text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {step === 4 ? "Review" : "Next"} <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => setStep(4)}
                  className="flex-none inline-flex items-center justify-center h-12 w-12 rounded-full border border-border hover:bg-secondary transition"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={addToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground h-12 text-sm font-semibold hover:opacity-90 transition"
                >
                  <ShoppingBag className="h-4 w-4" /> Add to Cart
                </button>
              </div>
            )}
            {!canNext && step < 5 && (
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Please make a selection to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
