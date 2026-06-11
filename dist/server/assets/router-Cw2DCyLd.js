import { createRootRoute, HeadContent, Outlet, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const Route$6 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "21k — AI Developer Resource Pack" },
      {
        name: "description",
        content: "21k AI Developer Resource Pack for builders who want to build, learn, and earn with AI coding workflows."
      },
      { name: "theme-color", content: "#050810" }
    ]
  }),
  shellComponent: RootDocument
});
function Nav() {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "nav-blur", style: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }, children: [
    /* @__PURE__ */ jsx("div", { style: { maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }, children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }, children: [
      /* @__PURE__ */ jsx("a", { href: "/", style: { display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }, children: /* @__PURE__ */ jsx("div", { style: {
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 25%, #fff3b0, #d69e2e 38%, #050810 70%)",
        border: "1px solid rgba(247,215,116,0.65)",
        boxShadow: "0 0 18px rgba(247,215,116,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }, children: /* @__PURE__ */ jsx("span", { style: { color: "#090806", fontWeight: 900, fontSize: "13px", letterSpacing: "-0.04em" }, children: "21K" }) }) }),
      /* @__PURE__ */ jsxs("nav", { className: "desktop-nav", style: { alignItems: "center", gap: "32px" }, children: [
        /* @__PURE__ */ jsx("a", { href: "/#resources", style: { color: "#94a3b8", textDecoration: "none", fontSize: "14px", fontWeight: 500 }, children: "Resources" }),
        /* @__PURE__ */ jsx("a", { href: "/#whats-inside", style: { color: "#94a3b8", textDecoration: "none", fontSize: "14px", fontWeight: 500 }, children: "What's Inside" }),
        /* @__PURE__ */ jsx("a", { href: "/#pricing", style: { color: "#94a3b8", textDecoration: "none", fontSize: "14px", fontWeight: 500 }, children: "Pricing" }),
        /* @__PURE__ */ jsx("a", { href: "/#faq", style: { color: "#94a3b8", textDecoration: "none", fontSize: "14px", fontWeight: 500 }, children: "FAQ" }),
        /* @__PURE__ */ jsx("a", { href: "/login", style: { color: "#94a3b8", textDecoration: "none", fontSize: "14px", fontWeight: 500 }, children: "Login" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "desktop-nav", style: { alignItems: "center", gap: "12px" }, children: /* @__PURE__ */ jsx("a", { href: "/checkout", className: "btn-primary", style: { fontSize: "14px", padding: "8px 20px" }, children: "Get Pack" }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          style: {
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#94a3b8",
            padding: "8px",
            display: "none"
          },
          className: "mobile-hamburger",
          onClick: () => setOpen(!open),
          "aria-label": "Toggle menu",
          children: open ? /* @__PURE__ */ jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { d: "M18 6L6 18M6 6l12 12" }) }) : /* @__PURE__ */ jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { d: "M3 12h18M3 6h18M3 18h18" }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: `mobile-menu ${open ? "open" : ""}`, style: { background: "#0d1117", borderTop: "1px solid rgba(247,215,116,0.12)" }, children: /* @__PURE__ */ jsxs("nav", { style: { display: "flex", flexDirection: "column", padding: "16px", gap: "16px" }, children: [
      /* @__PURE__ */ jsx("a", { href: "/#resources", style: { color: "#cbd5e1", textDecoration: "none", fontWeight: 500 }, onClick: () => setOpen(false), children: "Resources" }),
      /* @__PURE__ */ jsx("a", { href: "/#whats-inside", style: { color: "#cbd5e1", textDecoration: "none", fontWeight: 500 }, onClick: () => setOpen(false), children: "What's Inside" }),
      /* @__PURE__ */ jsx("a", { href: "/#pricing", style: { color: "#cbd5e1", textDecoration: "none", fontWeight: 500 }, onClick: () => setOpen(false), children: "Pricing" }),
      /* @__PURE__ */ jsx("a", { href: "/#faq", style: { color: "#cbd5e1", textDecoration: "none", fontWeight: 500 }, onClick: () => setOpen(false), children: "FAQ" }),
      /* @__PURE__ */ jsx("a", { href: "/login", style: { color: "#cbd5e1", textDecoration: "none", fontWeight: 500 }, onClick: () => setOpen(false), children: "Login" }),
      /* @__PURE__ */ jsx("a", { href: "/checkout", className: "btn-primary", style: { textAlign: "center" }, onClick: () => setOpen(false), children: "Get Pack" })
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { style: { borderTop: "1px solid rgba(247,215,116,0.12)", background: "#050810", padding: "48px 16px" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: "1280px", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", marginBottom: "40px" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { gridColumn: "span 2" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }, children: [
          /* @__PURE__ */ jsx("div", { style: {
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 25%, #fff3b0, #d69e2e 38%, #050810 70%)",
            border: "1px solid rgba(247,215,116,0.65)",
            boxShadow: "0 0 18px rgba(247,215,116,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }, children: /* @__PURE__ */ jsx("span", { style: { color: "#090806", fontWeight: 900, fontSize: "13px", letterSpacing: "-0.04em" }, children: "21K" }) }),
          /* @__PURE__ */ jsx("span", { style: {
            fontWeight: 900,
            fontSize: "18px",
            background: "linear-gradient(135deg, #fff3b0, #f7d774, #b7791f)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }, children: "21k" })
        ] }),
        /* @__PURE__ */ jsx("p", { style: { color: "#94a3b8", fontSize: "13px", fontWeight: 700, margin: "0 0 8px" }, children: "Build. Learn. Earn." }),
        /* @__PURE__ */ jsx("p", { style: { color: "#475569", fontSize: "14px", lineHeight: 1.6, maxWidth: "300px", margin: "0 0 12px" }, children: "Premium curated AI developer resources, tools, prompts, and guides organized in one pack." }),
        /* @__PURE__ */ jsx("p", { style: { color: "#334155", fontSize: "12px", lineHeight: 1.6, maxWidth: "340px", margin: 0 }, children: "This website curates public tools, official documentation, third-party tutorials, and original notes/checklists. All third-party links belong to their respective owners." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { style: { color: "#cbd5e1", fontWeight: 600, fontSize: "14px", marginBottom: "12px" }, children: "Product" }),
        /* @__PURE__ */ jsxs("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }, children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/#whats-inside", style: { color: "#475569", textDecoration: "none", fontSize: "14px" }, children: "What's Inside" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/#resources", style: { color: "#475569", textDecoration: "none", fontSize: "14px" }, children: "Preview Resources" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/#pricing", style: { color: "#475569", textDecoration: "none", fontSize: "14px" }, children: "Pricing" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/checkout", style: { color: "#475569", textDecoration: "none", fontSize: "14px" }, children: "Buy Now" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { style: { color: "#cbd5e1", fontWeight: 600, fontSize: "14px", marginBottom: "12px" }, children: "Account" }),
        /* @__PURE__ */ jsxs("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }, children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/login", style: { color: "#475569", textDecoration: "none", fontSize: "14px" }, children: "Login" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/dashboard", style: { color: "#475569", textDecoration: "none", fontSize: "14px" }, children: "Dashboard" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/resources", style: { color: "#475569", textDecoration: "none", fontSize: "14px" }, children: "Resource Library" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/#faq", style: { color: "#475569", textDecoration: "none", fontSize: "14px" }, children: "FAQ" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { borderTop: "1px solid rgba(247,215,116,0.1)", paddingTop: "24px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }, children: [
      /* @__PURE__ */ jsx("p", { style: { color: "#334155", fontSize: "12px", margin: 0 }, children: "© 2026 21k. All rights reserved." }),
      /* @__PURE__ */ jsx("p", { style: { color: "#1e293b", fontSize: "12px", margin: 0 }, children: "External resources belong to their respective owners." })
    ] })
  ] }) });
}
function ScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const main = document.querySelector("main");
    if (!main) return;
    const firstSection = main.querySelector("section");
    const candidates = Array.from(
      main.querySelectorAll("section, .card-glow")
    ).filter((element) => element !== firstSection);
    if (reduceMotion || !("IntersectionObserver" in window)) {
      candidates.forEach((element) => element.classList.add("reveal-visible", "reveal-done"));
      return;
    }
    const completeReveal = (element) => {
      element.classList.add("reveal-visible");
      window.setTimeout(() => {
        element.classList.add("reveal-done");
      }, window.innerWidth < 768 ? 420 : 760);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target;
          completeReveal(element);
          observer.unobserve(element);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    candidates.forEach((element) => {
      element.classList.add("reveal-item");
      if (element.getBoundingClientRect().top < window.innerHeight * 0.85) {
        completeReveal(element);
        return;
      }
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(HeadContent, {}),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }),
      /* @__PURE__ */ jsx("link", { href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap", rel: "stylesheet" }),
      /* @__PURE__ */ jsx("style", { children: `
          @media (max-width: 768px) {
            .mobile-hamburger { display: block !important; }
          }
        ` })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Nav, {}),
      /* @__PURE__ */ jsx("main", { style: { paddingTop: "64px" }, children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx(ScrollReveal, {}),
      /* @__PURE__ */ jsx(Footer, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$5 = () => import("./resources-C3jsk5vi.js");
const Route$5 = createFileRoute("/resources")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./login-CKqCdcnT.js");
const Route$4 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./dashboard-C_OZSmaL.js");
const Route$3 = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./checkout-BRqXNLVq.js");
const Route$2 = createFileRoute("/checkout")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-DH-gO3V9.js");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const products = [
  {
    id: 1,
    name: "Product 1",
    image: "/placeholder.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    shortDescription: "A generic product description for your first product.",
    price: 3e3
  }
];
const $$splitComponentImporter = () => import("./_productId-1bcproWk.js");
const Route = createFileRoute("/products/$productId")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  loader: async ({
    params
  }) => {
    const product = products.find((product2) => product2.id === +params.productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }
});
const ResourcesRoute = Route$5.update({
  id: "/resources",
  path: "/resources",
  getParentRoute: () => Route$6
});
const LoginRoute = Route$4.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$6
});
const DashboardRoute = Route$3.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$6
});
const CheckoutRoute = Route$2.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$6
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const ProductsProductIdRoute = Route.update({
  id: "/products/$productId",
  path: "/products/$productId",
  getParentRoute: () => Route$6
});
const rootRouteChildren = {
  IndexRoute,
  CheckoutRoute,
  DashboardRoute,
  LoginRoute,
  ResourcesRoute,
  ProductsProductIdRoute
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  router as r
};
