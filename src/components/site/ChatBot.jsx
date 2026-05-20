import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, LayoutGrid } from "lucide-react";

/* ─── FAQ Knowledge Base ──────────────────────────────────────────────────── */
const KB = [
  {
    id: "hours",
    keywords: ["hour", "open", "timing", "time", "close", "when"],
    answer: "🕗 We're open **Monday – Saturday: 7 AM – 9 PM** and **Sunday: 8 AM – 6 PM**. Orders placed before 10 AM get same-day delivery!",
    related: ["delivery", "contact", "price"],
  },
  {
    id: "delivery",
    keywords: ["delivery", "deliver", "ship", "home"],
    answer: "🚚 We deliver within **10 km** of our store. Delivery is **free above ₹499** (or $6). Standard delivery takes 2–4 hours.",
    related: ["price", "custom", "contact"],
  },
  {
    id: "custom",
    keywords: ["custom", "customize", "personalise", "personalize", "special"],
    answer: "🎂 Use our **AI Cake Customizer** to design your dream cake — choose flavour, size, frosting, toppings and a personal message. [Go to Customizer →](/customize)",
    related: ["price", "celebration", "delivery"],
  },
  {
    id: "price",
    keywords: ["price", "cost", "how much", "rate", "inr", "rupee", "usd", "dollar"],
    answer: "💰 Our cakes start at **₹1,500 ($18)**. You can toggle between INR and USD using the currency button in the navbar!",
    related: ["delivery", "custom", "rewards"],
  },
  {
    id: "ingredients",
    keywords: ["ingredient", "fresh", "organic", "quality", "butter", "flour"],
    answer: "🌿 We use **European butter, single-origin Belgian chocolate, and organic flour**. Everything is baked in small batches — nothing sits for more than a day.",
    related: ["allergy", "price", "custom"],
  },
  {
    id: "rewards",
    keywords: ["reward", "point", "loyalty", "club", "member"],
    answer: "🏆 Join the **Krishna Bakers Rewards Club**! Earn 10 pts per ₹100 spent, unlock free cakes, free delivery and more. Tap the 🏆 icon in the navbar.",
    related: ["price", "celebration", "contact"],
  },
  {
    id: "celebration",
    keywords: ["birthday", "anniversary", "celebration", "party", "wedding"],
    answer: "🎉 Custom celebration cakes need **48 hours notice**. Rewards members get a **free birthday cake** every year 🎂",
    related: ["custom", "delivery", "rewards"],
  },
  {
    id: "allergy",
    keywords: ["allerg", "gluten", "vegan", "dairy", "nut", "egg"],
    answer: "🌱 We offer **eggless, nut-free, and reduced-sugar** options. Mention your requirement when ordering and our team will accommodate you.",
    related: ["ingredients", "custom", "contact"],
  },
  {
    id: "contact",
    keywords: ["contact", "phone", "call", "email", "address", "location", "where"],
    answer: "📍 Visit our [Contact page](/contact) for our full address, phone number, and a map. We're in the heart of Mumbai!",
    related: ["hours", "delivery", "refund"],
  },
  {
    id: "refund",
    keywords: ["return", "refund", "cancel", "complaint", "issue", "problem", "wrong"],
    answer: "😟 We're sorry! Please contact us within **2 hours of delivery** with a photo — we'll arrange a replacement or full refund.",
    related: ["contact", "delivery", "price"],
  },
  {
    id: "hello",
    keywords: ["hello", "hi", "hey", "hii", "namaste", "good morning", "good evening"],
    answer: "👋 Hello! I'm **Baker Bot**, your personal guide at Krishna Bakers. What can I help you with today?",
    related: ["hours", "custom", "rewards"],
  },
];

const MENU_ITEMS = [
  { id: "hours",       label: "🕗 Opening hours" },
  { id: "delivery",   label: "🚚 Delivery info" },
  { id: "custom",     label: "🎂 Custom cakes" },
  { id: "price",      label: "💰 Pricing" },
  { id: "rewards",    label: "🏆 Rewards club" },
  { id: "allergy",    label: "🌱 Allergens & diet" },
  { id: "celebration",label: "🎉 Celebrations" },
  { id: "contact",    label: "📍 Contact & location" },
  { id: "refund",     label: "↩️ Returns & refunds" },
];

function findEntry(text) {
  const lower = text.toLowerCase();
  return KB.find((e) => e.keywords.some((k) => lower.includes(k))) ?? null;
}

function labelFor(id) {
  return MENU_ITEMS.find((m) => m.id === id)?.label ?? id;
}

/* ─── Markdown-lite renderer ─────────────────────────────────────────────── */
function Render({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**"))
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        const lm = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (lm)
          return <a key={i} href={lm[2]} className="underline font-semibold">{lm[1]}</a>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

/* ─── Typing dots ─────────────────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          className="h-2 w-2 rounded-full bg-accent/70"
        />
      ))}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export function ChatBot() {
  const [open, setOpen] = useState(false);
  // Each message: { role: "user"|"bot"|"menu", text?, related?: string[] }
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Hi! I'm **Baker Bot**. What can I help you with today?",
      related: ["hours", "delivery", "custom", "rewards"],
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function pushBotReply(entry) {
    const text = entry
      ? entry.answer
      : "🤔 I'm not sure about that! Visit our [Contact page](/contact) or ask something from the menu below.";
    setMessages((prev) => [
      ...prev,
      { role: "bot", text, related: entry?.related ?? [] },
    ]);
  }

  function sendText(text) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      pushBotReply(findEntry(msg));
    }, 800 + Math.random() * 400);
  }

  function selectTopic(id) {
    const entry = KB.find((k) => k.id === id);
    const label = labelFor(id).replace(/^\S+\s/, ""); // strip emoji
    setMessages((prev) => [...prev, { role: "user", text: label }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      pushBotReply(entry ?? null);
    }, 700);
  }

  function openMenu() {
    setMessages((prev) => [...prev, { role: "menu" }]);
  }

  return (
    <>
      {/* Floating pill button */}
      <motion.button
        id="chatbot-toggle"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat with Baker Bot"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <MessageCircle className="h-5 w-5" />
        <span>{open ? "Close Chat" : "Chat with our Baker"}</span>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] rounded-3xl bg-card shadow-elegant border border-border flex flex-col overflow-hidden"
            style={{ maxHeight: "72vh" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-primary text-primary-foreground shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Baker Bot</p>
                <p className="text-[11px] text-primary-foreground/70">Always here to help 🍰</p>
              </div>
              {/* Main menu trigger in header */}
              <button
                onClick={openMenu}
                title="Main Menu"
                className="opacity-70 hover:opacity-100 transition mr-2"
                aria-label="Open main menu"
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button onClick={() => setOpen(false)} className="opacity-70 hover:opacity-100 transition" aria-label="Close chat">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => {
                /* ── Main Menu card ── */
                if (m.role === "menu") {
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                      <div className="max-w-[90%] bg-secondary rounded-2xl rounded-bl-sm px-4 py-3">
                        <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">📋 Main Menu</p>
                        <div className="flex flex-wrap gap-1.5">
                          {MENU_ITEMS.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => selectTopic(item.id)}
                              className="rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-medium hover:bg-accent hover:text-accent-foreground transition whitespace-nowrap"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                }

                /* ── User message ── */
                if (m.role === "user") {
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-4 py-2.5 text-sm leading-relaxed">
                        {m.text}
                      </div>
                    </motion.div>
                  );
                }

                /* ── Bot message ── */
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                    <div className="max-w-[88%] space-y-2">
                      {/* Bubble */}
                      <div className="rounded-2xl rounded-bl-sm bg-secondary text-foreground px-4 py-2.5 text-sm leading-relaxed">
                        <Render text={m.text} />
                      </div>
                      {/* Related chips + Main Menu — always shown for every bot message */}
                      {(m.related?.length > 0) && (
                        <div className="flex flex-wrap gap-1.5">
                          {m.related.map((id) => (
                            <button
                              key={id}
                              onClick={() => selectTopic(id)}
                              className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-medium hover:bg-accent hover:text-accent-foreground transition whitespace-nowrap"
                            >
                              {labelFor(id)}
                            </button>
                          ))}
                          {/* Always show Main Menu button */}
                          <button
                            onClick={openMenu}
                            className="inline-flex items-center gap-1 rounded-full border border-accent/50 bg-accent/10 text-accent px-3 py-1 text-[11px] font-semibold hover:bg-accent hover:text-accent-foreground transition whitespace-nowrap"
                          >
                            <LayoutGrid className="h-3 w-3" /> Main Menu
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-2xl rounded-bl-sm">
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendText(); }}
              className="flex items-center gap-2 px-4 py-3 border-t border-border shrink-0"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a question or pick from menu…"
                className="flex-1 rounded-full bg-secondary px-4 py-2.5 text-sm outline-none focus:ring-2 ring-accent transition"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground hover:opacity-90 transition disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
