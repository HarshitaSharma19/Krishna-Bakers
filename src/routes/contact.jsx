import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
    { title: "Contact — Krishna Bakers" },
    { name: "description", content: "Get in touch with Krishna Bakers for orders, custom cakes and enquiries." },
    { property: "og:title", content: "Contact — Krishna Bakers" },
    { property: "og:description", content: "Get in touch with Krishna Bakers." }]

  }),
  component: Contact
});

function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Say hello</p>
        <h1 className="mt-2 font-display text-4xl md:text-6xl text-primary text-balance">Let's bake something together.</h1>
      </motion.div>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          {[
          { icon: MapPin, label: "Visit", value: "24 Baker Lane, Mumbai 400001" },
          { icon: Phone, label: "Call", value: "+91 98765 43210" },
          { icon: Mail, label: "Email", value: "hello@krishnabakers.in" }].
          map((c) =>
          <div key={c.label} className="flex items-start gap-4 rounded-3xl bg-card p-5 shadow-soft">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</p>
                <p className="mt-0.5 font-display text-lg text-primary">{c.value}</p>
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={(e) => {e.preventDefault();toast.success("Thanks! We'll be in touch soon.");e.target.reset();}}
          className="rounded-3xl bg-card p-6 shadow-soft space-y-3">
          
          <input required placeholder="Your name" className="w-full rounded-2xl bg-secondary px-4 py-3 text-sm outline-none focus:ring-2 ring-accent" />
          <input required type="email" placeholder="Email" className="w-full rounded-2xl bg-secondary px-4 py-3 text-sm outline-none focus:ring-2 ring-accent" />
          <textarea required rows={5} placeholder="Tell us about your order…" className="w-full rounded-2xl bg-secondary px-4 py-3 text-sm outline-none focus:ring-2 ring-accent resize-none" />
          <button className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground transition">
            Send message
          </button>
        </form>
      </div>
    </div>);

}