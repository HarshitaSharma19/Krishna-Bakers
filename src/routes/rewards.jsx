import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trophy, Gift, Star, Zap, Crown, Coffee, Cake, Truck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Rewards Club — Krishna Bakers" },
      { name: "description", content: "Earn points on every order, unlock birthday cakes, free delivery and surprise pastries with Krishna Bakers Rewards Club." },
    ],
  }),
  component: Rewards,
});

/* ─── DATA ─────────────────────────────────────────────────────────────────── */

const tiers = [
  {
    id: "silver",
    name: "Silver Baker",
    icon: Star,
    color: "from-zinc-400 to-zinc-300",
    textColor: "text-zinc-600",
    range: "0 – 499 pts",
    perks: ["5% off every order", "Birthday treat", "Early newsletter access"],
  },
  {
    id: "gold",
    name: "Gold Baker",
    icon: Trophy,
    color: "from-amber-500 to-yellow-400",
    textColor: "text-amber-600",
    range: "500 – 999 pts",
    perks: ["10% off every order", "Free delivery on ₹499+", "Monthly surprise box", "Seasonal previews"],
    featured: true,
  },
  {
    id: "elite",
    name: "Sweet Lover Elite",
    icon: Crown,
    color: "from-accent to-primary",
    textColor: "text-accent",
    range: "1000+ pts",
    perks: ["15% off every order", "Always free delivery", "Buy 5 get 1 free", "Chef's table events", "Custom cake priority"],
  },
];

const rewards = [
  { icon: Gift, title: "₹50 Off Voucher", points: 200, category: "Discount", available: true },
  { icon: Cake, title: "Free Birthday Cake (6\")", points: 500, category: "Free Item", available: true },
  { icon: Truck, title: "5× Free Delivery", points: 300, category: "Delivery", available: true },
  { icon: Coffee, title: "Free Croissant Box", points: 150, category: "Free Item", available: true },
  { icon: Trophy, title: "Mystery Pastry Box", points: 450, category: "Surprise", available: false },
  { icon: Star, title: "1-on-1 Baking Session", points: 1000, category: "Experience", available: false },
];

const howToEarn = [
  { emoji: "🛒", title: "Place an Order", desc: "Earn 10 pts for every ₹100 spent", pts: "+10 pts / ₹100" },
  { emoji: "⭐", title: "Leave a Review", desc: "Share your experience after delivery", pts: "+25 pts" },
  { emoji: "📲", title: "Refer a Friend", desc: "When they place their first order", pts: "+100 pts" },
  { emoji: "🎂", title: "Birthday Bonus", desc: "Celebrate with double points for 7 days", pts: "2× points" },
  { emoji: "📧", title: "Subscribe to Newsletter", desc: "Stay in the loop, earn instantly", pts: "+50 pts" },
];

const history = [
  { date: "18 May 2026", desc: "Order #KB-1091 — Truffle Cake", pts: "+45", positive: true },
  { date: "12 May 2026", desc: "Order #KB-1078 — Macaron Box", pts: "+30", positive: true },
  { date: "05 May 2026", desc: "Redeemed ₹50 Off Voucher", pts: "−200", positive: false },
  { date: "28 Apr 2026", desc: "Left a review", pts: "+25", positive: true },
  { date: "20 Apr 2026", desc: "Order #KB-1043 — Sourdough + Croissants", pts: "+60", positive: true },
];

/* ─── COMPONENT ─────────────────────────────────────────────────────────────── */

function Rewards() {
  const userPoints = 620;
  const nextTierPts = 1000;
  const progress = (userPoints / nextTierPts) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-grain gradient-warm pt-14 pb-20">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Krishna Bakers</p>
            <h1 className="mt-2 font-display text-4xl md:text-6xl text-primary text-balance">
              Rewards Club
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Every bite earns you more. Collect points, climb tiers, unlock sweet perks.
            </p>
          </motion.div>

          {/* Points card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 mx-auto max-w-2xl rounded-[2rem] bg-card shadow-elegant p-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Your Balance</p>
                <p className="mt-1 font-display text-5xl font-semibold text-primary">{userPoints} <span className="text-2xl text-muted-foreground font-normal">pts</span></p>
                <p className="mt-1 text-sm text-muted-foreground">🏅 Gold Baker — {nextTierPts - userPoints} pts to Sweet Lover Elite</p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-yellow-400 shadow-glow">
                <Trophy className="h-9 w-9 text-white" />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-2">
                <span>Gold Baker (500)</span>
                <span>Sweet Lover Elite (1000)</span>
              </div>
              <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-accent"
                />
              </div>
              <p className="mt-2 text-sm text-right text-muted-foreground">{userPoints} / {nextTierPts} pts</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tiers */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Membership Tiers</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary">The sweeter you bake, the better you get</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 shadow-soft ${tier.featured ? "ring-2 ring-accent shadow-elegant" : "bg-card"}`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                  Your Tier
                </div>
              )}
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tier.color}`}>
                <tier.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="mt-4 font-display text-xl text-primary">{tier.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{tier.range}</p>
              <ul className="mt-5 space-y-2">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm">
                    <div className={`h-1.5 w-1.5 rounded-full bg-accent`} />
                    {perk}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Redeem Rewards */}
      <section className="bg-secondary/60 bg-grain">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Redeem</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary">Your rewards</h2>
            </div>
            <p className="text-sm text-muted-foreground">You have <span className="font-semibold text-primary">{userPoints} pts</span> available</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rewards.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`rounded-3xl bg-card p-6 shadow-soft transition-all ${r.available ? "hover:shadow-elegant" : "opacity-60"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                    <r.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {r.category}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg text-primary">{r.title}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <p className="flex items-center gap-1 text-sm font-bold text-accent">
                    <Zap className="h-3.5 w-3.5" /> {r.points} pts
                  </p>
                  <button
                    disabled={!r.available || userPoints < r.points}
                    className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {!r.available ? "Coming soon" : userPoints < r.points ? "Not enough pts" : "Redeem"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Earn */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Earn More</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary">How to collect points</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {howToEarn.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl bg-card p-6 shadow-soft text-center hover:shadow-elegant transition-all"
            >
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-display text-base text-primary">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
              <p className="mt-3 font-bold text-accent text-sm">{item.pts}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Points History */}
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Activity</p>
          <h2 className="mt-2 font-display text-3xl text-primary">Points history</h2>
        </div>
        <div className="rounded-3xl bg-card shadow-soft overflow-hidden divide-y divide-border">
          {history.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center justify-between px-6 py-4"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{h.desc}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{h.date}</p>
              </div>
              <span className={`font-bold text-sm tabular-nums ${h.positive ? "text-green-600" : "text-destructive"}`}>
                {h.pts}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-8 py-14 text-center shadow-elegant">
          <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Start Earning</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary-foreground">
              380 pts away from Elite
            </h2>
            <p className="mt-3 text-primary-foreground/80 max-w-md mx-auto">
              Place your next order to keep climbing. Every croissant, every cake, every cookie counts.
            </p>
            <a
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground hover:opacity-90 transition"
            >
              Shop & Earn <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
