import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="font-display text-2xl font-semibold">Krishna Bakers</div>
            <p className="mt-3 text-sm text-primary-foreground/70 leading-relaxed">
              Freshly baked happiness, hand-crafted every morning since 1998.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) =>
              <a
                key={i}
                href="#"
                aria-label="social"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-colors">
                
                  <Icon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-accent">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/" className="hover:text-accent">Home</Link></li>
              <li><Link to="/products" className="hover:text-accent">Menu</Link></li>
              <li><Link to="/about" className="hover:text-accent">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-accent">Categories</h4>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              <li>Cakes</li><li>Pastries</li><li>Cookies</li><li>Donuts</li><li>Breads</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-accent">Visit Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
              <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-accent" />24 Baker Lane, Mumbai 400001</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-accent" />+91 98765 43210</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-accent" />hello@krishnabakers.in</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Krishna Bakers. All rights reserved.</p>
          <p>Baked with love · Delivered with care</p>
        </div>
      </div>
    </footer>);

}