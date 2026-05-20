import { QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts } from
"@tanstack/react-router";

import appCss from "../styles.css?url";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            
            Go home
          </Link>
        </div>
      </div>
    </div>);

}

function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
            
            Go home
          </a>
        </div>
      </div>
    </div>);

}

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: "Krishna Bakers — Freshly Baked Happiness" },
    { name: "description", content: "Premium artisan bakery. Cakes, pastries, cookies, donuts and breads — freshly baked every day at Krishna Bakers." },
    { name: "author", content: "Krishna Bakers" },
    { property: "og:title", content: "Krishna Bakers — Freshly Baked Happiness" },
    { property: "og:description", content: "Premium artisan bakery. Freshly baked cakes, pastries, cookies, donuts and breads." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/favicon.svg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@krishnabakers" }],

    links: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicon.svg"
    },
    {
      rel: "stylesheet",
      href: appCss
    },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap"
    }]

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});

function RootShell({ children }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>);

}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex min-h-screen flex-col bg-background">
          <Navbar />
          <main className={`flex-1 ${isHome ? "" : "pt-20"}`}>
            <Outlet />
          </main>
          <Footer />
          <CartDrawer />
          <Toaster />
        </div>
      </CartProvider>
    </QueryClientProvider>);

}