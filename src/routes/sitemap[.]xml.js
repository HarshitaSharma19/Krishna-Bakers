import { createFileRoute } from "@tanstack/react-router";

import { products } from "@/lib/products";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
        { path: "/", priority: "1.0" },
        { path: "/products", priority: "0.9" },
        { path: "/about", priority: "0.7" },
        { path: "/contact", priority: "0.7" },
        ...products.map((p) => ({ path: `/products/${p.id}`, priority: "0.6" }))];

        const urls = entries.
        map(
          (e) => `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>weekly</changefreq><priority>${e.priority}</priority></url>`
        ).
        join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" }
        });
      }
    }
  }
});