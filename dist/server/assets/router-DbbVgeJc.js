import { createRootRoute, HeadContent, Outlet, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const Route$9 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "21k - AI Developer Resource Pack" },
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
        /* @__PURE__ */ jsx("a", { href: "/signup", style: { color: "#94a3b8", textDecoration: "none", fontSize: "14px", fontWeight: 500 }, children: "Signup" }),
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
          className: `mobile-hamburger hamburger-button ${open ? "open" : ""}`,
          onClick: () => setOpen(!open),
          "aria-label": "Toggle menu",
          "aria-expanded": open,
          children: /* @__PURE__ */ jsxs("span", { className: "hamburger-lines", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("span", {}),
            /* @__PURE__ */ jsx("span", {})
          ] })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: `mobile-menu ${open ? "open" : ""}`, style: { background: "#0d1117", borderTop: "1px solid rgba(247,215,116,0.12)" }, children: /* @__PURE__ */ jsxs("nav", { style: { display: "flex", flexDirection: "column", padding: "16px", gap: "16px" }, children: [
      /* @__PURE__ */ jsx("a", { href: "/#resources", style: { color: "#cbd5e1", textDecoration: "none", fontWeight: 500 }, onClick: () => setOpen(false), children: "Resources" }),
      /* @__PURE__ */ jsx("a", { href: "/#whats-inside", style: { color: "#cbd5e1", textDecoration: "none", fontWeight: 500 }, onClick: () => setOpen(false), children: "What's Inside" }),
      /* @__PURE__ */ jsx("a", { href: "/#pricing", style: { color: "#cbd5e1", textDecoration: "none", fontWeight: 500 }, onClick: () => setOpen(false), children: "Pricing" }),
      /* @__PURE__ */ jsx("a", { href: "/#faq", style: { color: "#cbd5e1", textDecoration: "none", fontWeight: 500 }, onClick: () => setOpen(false), children: "FAQ" }),
      /* @__PURE__ */ jsx("a", { href: "/signup", style: { color: "#cbd5e1", textDecoration: "none", fontWeight: 500 }, onClick: () => setOpen(false), children: "Signup" }),
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
      /* @__PURE__ */ jsx("p", { style: { color: "#334155", fontSize: "12px", margin: 0 }, children: "Copyright 2026 21k. All rights reserved." }),
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
const $$splitComponentImporter$8 = () => import("./signup-Bh8eMBCP.js");
const Route$8 = createFileRoute("/signup")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./resources-DWY7asZD.js");
const Route$7 = createFileRoute("/resources")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const TYPE_COLORS = {
  "Official Tool": "#f7d774",
  "Documentation": "#b7791f",
  "Reference Tutorial": "#f59e0b",
  "Video Reference": "#ef4444",
  "GitHub Repo": "#10b981"
};
const RESOURCE_SECTIONS = [{
  title: "Claude Code & AI Coding",
  description: "A focused starter path for developers exploring Claude Code and similar AI coding workflows, with official tools, setup references, model-choice notes, and beginner-friendly workflow guidance.",
  notes: "Includes a 21k setup checklist, common error fixes, free alternative notes, API safety reminders, and a recommended beginner workflow.",
  resources: [{
    title: "Claude Code Official",
    url: "https://claude.com/product/claude-code",
    type: "Official Tool"
  }, {
    title: "Claude Desktop",
    url: "https://claude.com/download",
    type: "Official Tool"
  }, {
    title: "Claude Cowork Docs",
    url: "https://support.claude.com/en/articles/14680729-use-claude-cowork-with-third-party-platforms",
    type: "Documentation"
  }, {
    title: "Reference Tutorial",
    url: "https://compilefuture.com/blog/claude-code-tutorial/",
    type: "Reference Tutorial"
  }, {
    title: "Reference Tutorial",
    url: "https://compilefuture.com/blog/how-to-use-claude-code-free-unlimited/",
    type: "Reference Tutorial"
  }, {
    title: "Video Reference",
    url: "https://www.youtube.com/watch?v=vGx5Y_gSEO0",
    type: "Video Reference"
  }, {
    title: "Video Reference",
    url: "https://www.youtube.com/watch?v=VwW-VcWdPSA",
    type: "Video Reference"
  }]
}, {
  title: "OpenCode, OpenRouter & Kiro",
  description: "A practical comparison area for gateway-style AI coding setups, helping buyers understand API access, coding assistant options, endpoint setup, and tool combinations.",
  notes: "Includes a model selection guide, setup sequence, key-management checklist, troubleshooting notes, and copy-ready command snippets.",
  resources: [{
    title: "OpenCode",
    url: "https://opencode.ai/",
    type: "Official Tool"
  }, {
    title: "OpenCode Download",
    url: "https://opencode.ai/download",
    type: "Official Tool"
  }, {
    title: "OpenCode Zen",
    url: "https://opencode.ai/zen",
    type: "Official Tool"
  }, {
    title: "OpenCode Zen Endpoints",
    url: "https://opencode.ai/docs/zen#endpoints",
    type: "Documentation"
  }, {
    title: "OpenRouter",
    url: "https://openrouter.ai/",
    type: "Official Tool"
  }, {
    title: "OpenRouter Keys",
    url: "https://openrouter.ai/keys",
    type: "Official Tool"
  }, {
    title: "Kiro AI",
    url: "https://kiro.dev/",
    type: "Official Tool"
  }, {
    title: "Kiro Gateway",
    url: "https://github.com/jwadow/kiro-gateway",
    type: "GitHub Repo"
  }, {
    title: "Reference Tutorial",
    url: "https://compilefuture.com/blog/claude-code-free-unlimited-opencode/",
    type: "Reference Tutorial"
  }, {
    title: "Reference Tutorial",
    url: "https://compilefuture.com/blog/claude-code-opus-for-free-using-amazon-kiro-ai/",
    type: "Reference Tutorial"
  }]
}, {
  title: "GitHub & Copilot",
  description: "A beginner-safe map for GitHub, Copilot, student benefits, and legitimate free-access paths, with activation steps and comparison notes for coding assistants.",
  notes: "Includes a verification checklist, student-pack application steps, GitHub setup checklist, and Copilot alternative comparison.",
  resources: [{
    title: "GitHub",
    url: "https://github.com",
    type: "Official Tool"
  }, {
    title: "GitHub Copilot",
    url: "https://github.com/features/copilot",
    type: "Official Tool"
  }, {
    title: "GitHub Student Pack",
    url: "https://education.github.com/pack",
    type: "Official Tool"
  }, {
    title: "GitHub Education Benefits",
    url: "https://github.com/settings/education/benefits",
    type: "Official Tool"
  }, {
    title: "Copilot Student Docs",
    url: "https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-your-github-copilot-pro-subscription/getting-free-access-to-copilot-pro-as-a-student-teacher-or-maintainer",
    type: "Documentation"
  }, {
    title: "Reference Tutorial",
    url: "https://compilefuture.com/blog/github-student-developer-pack-free-copilot-pro/",
    type: "Reference Tutorial"
  }, {
    title: "Reference Tutorial",
    url: "https://compilefuture.com/blog/github-copilot-for-free/",
    type: "Reference Tutorial"
  }]
}, {
  title: "VS Code AI Extensions",
  description: "A workspace-building section for developers who want VS Code configured as a reliable AI coding environment with extensions, model setup, and safer automation defaults.",
  notes: "Includes a recommended extension stack, Gemini API setup notes, local model setup, and safe auto-approval settings.",
  resources: [{
    title: "VS Code Download",
    url: "https://code.visualstudio.com/download",
    type: "Official Tool"
  }, {
    title: "VS Code Marketplace",
    url: "https://marketplace.visualstudio.com/",
    type: "Official Tool"
  }, {
    title: "Codeium Extension",
    url: "https://marketplace.visualstudio.com/items?itemName=Codeium.codeium",
    type: "Official Tool"
  }, {
    title: "Continue Extension",
    url: "https://marketplace.visualstudio.com/items?itemName=Continue.continue",
    type: "Official Tool"
  }, {
    title: "Continue Model Setup",
    url: "https://docs.continue.dev/autocomplete/model-setup",
    type: "Documentation"
  }, {
    title: "Reference Tutorial",
    url: "https://compilefuture.com/blog/cursor-ai-for-free/",
    type: "Reference Tutorial"
  }]
}, {
  title: "Website Building & Deployment",
  description: "A launch-focused collection for building fast AI-assisted websites with Astro, Tailwind, Cloudflare, and modern design references.",
  notes: "Includes a launch checklist, SEO file templates, robots.txt, sitemap template, Cloudflare headers, and website prompt templates.",
  resources: [{
    title: "Astro Docs",
    url: "https://docs.astro.build/en/getting-started/",
    type: "Documentation"
  }, {
    title: "Astro Install",
    url: "https://docs.astro.build/en/install-and-setup/",
    type: "Documentation"
  }, {
    title: "Astro Cloudflare Deploy",
    url: "https://docs.astro.build/en/guides/deploy/cloudflare/",
    type: "Documentation"
  }, {
    title: "Astro MCP Docs",
    url: "https://docs.astro.build/en/guides/build-with-ai/#astro-docs-mcp-server",
    type: "Documentation"
  }, {
    title: "Tailwind Skills",
    url: "https://github.com/Lombiq/Tailwind-Agent-Skills",
    type: "GitHub Repo"
  }, {
    title: "Vercel Design MD",
    url: "https://getdesign.md/vercel/design-md",
    type: "Documentation"
  }, {
    title: "Google Stitch",
    url: "https://stitch.withgoogle.com",
    type: "Official Tool"
  }]
}, {
  title: "SEO, Analytics & Monetization",
  description: "A growth section for turning small websites and micro-tools into traffic-backed projects with keyword research, analytics, webmaster tools, and monetization planning.",
  notes: "Includes a micro-tool idea sheet, 30-day SEO plan, AdSense checklist, domain research workflow, and monetization roadmap.",
  resources: [{
    title: "Ahrefs Keyword Generator",
    url: "https://ahrefs.com/keyword-generator",
    type: "Official Tool"
  }, {
    title: "Google Analytics",
    url: "https://analytics.google.com",
    type: "Official Tool"
  }, {
    title: "Google Search Console",
    url: "https://search.google.com/search-console/about",
    type: "Official Tool"
  }, {
    title: "Bing Webmaster",
    url: "https://www.bing.com/webmasters/about",
    type: "Official Tool"
  }, {
    title: "Google Ads",
    url: "https://ads.google.com",
    type: "Official Tool"
  }, {
    title: "Google AdSense",
    url: "https://adsense.google.com/start/",
    type: "Official Tool"
  }, {
    title: "Cloudflare",
    url: "https://cloudflare.com",
    type: "Official Tool"
  }, {
    title: "Instant Domain Search",
    url: "https://instantdomainsearch.com/",
    type: "Official Tool"
  }, {
    title: "LogoFast",
    url: "https://logofa.st/",
    type: "Official Tool"
  }, {
    title: "Example Tool",
    url: "https://realonlineruler.com/",
    type: "Official Tool"
  }, {
    title: "Reference Tutorial",
    url: "https://compilefuture.com/blog/how-to-earn-using-ai/",
    type: "Reference Tutorial"
  }]
}, {
  title: "Local Models & Developer Setup",
  description: "A setup hub for local AI workflows, package managers, Python tooling, Node.js, and local model experiments across common developer machines.",
  notes: "Includes install order, Windows setup notes, Mac setup notes, local model checklist, and troubleshooting commands.",
  resources: [{
    title: "Node.js",
    url: "https://nodejs.org/en/download",
    type: "Official Tool"
  }, {
    title: "Chocolatey",
    url: "https://chocolatey.org/install",
    type: "Official Tool"
  }, {
    title: "Python",
    url: "https://www.python.org/",
    type: "Official Tool"
  }, {
    title: "UV Python",
    url: "https://docs.astral.sh/uv/getting-started/installation/",
    type: "Documentation"
  }, {
    title: "NVM Windows",
    url: "https://github.com/coreybutler/nvm-windows/releases",
    type: "GitHub Repo"
  }, {
    title: "Ollama",
    url: "https://ollama.com/download",
    type: "Official Tool"
  }, {
    title: "Qwen Coder",
    url: "https://ollama.com/library/qwen2.5-coder",
    type: "Official Tool"
  }]
}, {
  title: "Video Library",
  description: "A buyer-friendly watchlist for learning workflows visually. These are external learning references unless a file is marked as 21k-owned.",
  notes: "Includes a viewing order, topic tags, and notes for turning each lesson into an implementation task.",
  resources: [{
    title: "Video Reference",
    url: "https://www.youtube.com/watch?v=hKP9qbBmEqA",
    type: "Video Reference"
  }, {
    title: "Video Reference",
    url: "https://www.youtube.com/watch?v=tDeLeyPvZn0",
    type: "Video Reference"
  }, {
    title: "Video Reference",
    url: "https://www.youtube.com/watch?v=s4wwQnXI5ek",
    type: "Video Reference"
  }, {
    title: "Video Reference",
    url: "https://www.youtube.com/watch?v=tzSdU1TIBvk",
    type: "Video Reference"
  }, {
    title: "Video Reference",
    url: "https://www.youtube.com/watch?v=vGx5Y_gSEO0",
    type: "Video Reference"
  }, {
    title: "Video Reference",
    url: "https://www.youtube.com/watch?v=b2Fa-4HtC9M",
    type: "Video Reference"
  }, {
    title: "Video Reference",
    url: "https://www.youtube.com/watch?v=_kEc5IsadG8",
    type: "Video Reference"
  }, {
    title: "Video Reference",
    url: "https://www.youtube.com/watch?v=lhsZao5spSU",
    type: "Video Reference"
  }, {
    title: "Video Reference",
    url: "https://www.youtube.com/watch?v=B34cIb1fex0",
    type: "Video Reference"
  }]
}];
const DOWNLOAD_FILES = ["21k-ai-tools-links.pdf", "21k-setup-commands.pdf", "21k-prompt-library.pdf", "21k-website-launch-checklist.pdf", "21k-seo-checklist.pdf", "21k-micro-tool-business-plan.pdf"];
function resourceSectionSlug(title) {
  return title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
const $$splitComponentImporter$6 = () => import("./login-Dh8L3jlm.js");
const Route$6 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./dashboard-3mAO6E5M.js");
const Route$5 = createFileRoute("/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./checkout-Di6BLMPK.js");
const Route$4 = createFileRoute("/checkout")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin-BP3V14PS.js");
const Route$3 = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-D9TTQW1p.js");
const Route$2 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./_sectionId-CNV1AXMz.js");
const Route$1 = createFileRoute("/resources/$sectionId")({
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
const $$splitComponentImporter = () => import("./_productId-BCyVkiXQ.js");
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
const SignupRoute = Route$8.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$9
});
const ResourcesRoute = Route$7.update({
  id: "/resources",
  path: "/resources",
  getParentRoute: () => Route$9
});
const LoginRoute = Route$6.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$9
});
const DashboardRoute = Route$5.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$9
});
const CheckoutRoute = Route$4.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$9
});
const AdminRoute = Route$3.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$9
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9
});
const ResourcesSectionIdRoute = Route$1.update({
  id: "/$sectionId",
  path: "/$sectionId",
  getParentRoute: () => ResourcesRoute
});
const ProductsProductIdRoute = Route.update({
  id: "/products/$productId",
  path: "/products/$productId",
  getParentRoute: () => Route$9
});
const ResourcesRouteChildren = {
  ResourcesSectionIdRoute
};
const ResourcesRouteWithChildren = ResourcesRoute._addFileChildren(
  ResourcesRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  CheckoutRoute,
  DashboardRoute,
  LoginRoute,
  ResourcesRoute: ResourcesRouteWithChildren,
  SignupRoute,
  ProductsProductIdRoute
};
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
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
  DOWNLOAD_FILES as D,
  RESOURCE_SECTIONS as R,
  TYPE_COLORS as T,
  Route$1 as a,
  Route as b,
  router as c,
  resourceSectionSlug as r
};
