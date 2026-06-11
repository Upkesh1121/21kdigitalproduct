import { jsxs, jsx } from "react/jsx-runtime";
import { C as CountdownTimer } from "./CountdownTimer-BzbsmKR_.js";
import "react";
function HomePage() {
  return /* @__PURE__ */ jsxs("div", { style: {
    background: "#050810",
    minHeight: "100vh"
  }, children: [
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsx(ProblemSection, {}),
    /* @__PURE__ */ jsx(WhatsInsideSection, {}),
    /* @__PURE__ */ jsx(ResourcePreviewSection, {}),
    /* @__PURE__ */ jsx(PremiumPackSection, {}),
    /* @__PURE__ */ jsx(PricingSection, {}),
    /* @__PURE__ */ jsx(DashboardPreviewSection, {}),
    /* @__PURE__ */ jsx(FaqSection, {})
  ] });
}
function HeroSection() {
  return /* @__PURE__ */ jsxs("section", { className: "cyber-grid", style: {
    padding: "clamp(72px, 10vw, 120px) 16px 80px",
    position: "relative",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsx("div", { style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      height: "400px",
      background: "radial-gradient(ellipse, rgba(247,215,116,0.07) 0%, transparent 70%)",
      pointerEvents: "none"
    } }),
    /* @__PURE__ */ jsxs("div", { style: {
      maxWidth: "960px",
      margin: "0 auto",
      textAlign: "center",
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsxs("div", { className: "badge badge-cyan", style: {
        margin: "0 auto 24px",
        display: "inline-flex"
      }, children: [
        /* @__PURE__ */ jsx("span", { children: "✦" }),
        /* @__PURE__ */ jsx("span", { children: "Build. Learn. Earn." })
      ] }),
      /* @__PURE__ */ jsxs("h1", { style: {
        fontSize: "clamp(2rem, 5.5vw, 3.75rem)",
        fontWeight: 900,
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
        marginBottom: "24px",
        color: "#f1f5f9"
      }, children: [
        "Unlock The Complete",
        " ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "21k AI Developer Resource Pack" })
      ] }),
      /* @__PURE__ */ jsx("p", { style: {
        fontSize: "clamp(1rem, 2vw, 1.2rem)",
        color: "#94a3b8",
        maxWidth: "660px",
        margin: "0 auto 40px",
        lineHeight: 1.7
      }, children: "Build faster with organized AI coding tools, official links, setup commands, prompts, checklists, video references, and launch templates curated by 21k." }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        gap: "16px",
        justifyContent: "center",
        flexWrap: "wrap"
      }, children: [
        /* @__PURE__ */ jsx("a", { href: "#pricing", className: "btn-primary", style: {
          fontSize: "16px",
          padding: "16px 32px"
        }, children: "Get 21k Pack" }),
        /* @__PURE__ */ jsx("a", { href: "#resources", className: "btn-secondary", style: {
          fontSize: "16px",
          padding: "16px 32px"
        }, children: "Preview Resources" })
      ] }),
      /* @__PURE__ */ jsx("div", { style: {
        marginTop: "56px",
        display: "flex",
        justifyContent: "center",
        gap: "48px",
        flexWrap: "wrap"
      }, children: [{
        value: "100+",
        label: "Curated Resources"
      }, {
        value: "10+",
        label: "Tool Categories"
      }, {
        value: "1",
        label: "Organized Pack"
      }].map((stat) => /* @__PURE__ */ jsxs("div", { style: {
        textAlign: "center"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          fontSize: "2rem",
          fontWeight: 900,
          color: "#f7d774"
        }, children: stat.value }),
        /* @__PURE__ */ jsx("div", { style: {
          fontSize: "0.85rem",
          color: "#64748b",
          marginTop: "4px"
        }, children: stat.label })
      ] }, stat.label)) })
    ] })
  ] });
}
function ProblemSection() {
  const problems = [{
    icon: "🔗",
    text: "Too many tools scattered across the web"
  }, {
    icon: "🚫",
    text: "Broken and outdated tutorials"
  }, {
    icon: "🔍",
    text: "Hard-to-find setup commands"
  }, {
    icon: "🌀",
    text: "No organized developer workflow"
  }, {
    icon: "💸",
    text: "Free resources mixed with paid walls"
  }, {
    icon: "⏳",
    text: "Beginners waste hours just searching"
  }];
  return /* @__PURE__ */ jsx("section", { style: {
    background: "#080c14",
    padding: "96px 16px"
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    maxWidth: "1120px",
    margin: "0 auto"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      marginBottom: "48px"
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "badge badge-purple", style: {
        display: "inline-flex",
        marginBottom: "16px"
      }, children: "Problem" }),
      /* @__PURE__ */ jsxs("h2", { style: {
        fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
        fontWeight: 800,
        color: "#f1f5f9",
        lineHeight: 1.2,
        marginBottom: "16px"
      }, children: [
        "AI Coding Resources Are",
        " ",
        /* @__PURE__ */ jsx("span", { style: {
          color: "#ef4444"
        }, children: "Scattered Everywhere" })
      ] }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "#64748b",
        maxWidth: "520px",
        margin: "0 auto",
        fontSize: "1.05rem"
      }, children: "Developers waste hours jumping between tabs, dead links, and paywalls just to find the right tools." })
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "16px"
    }, children: problems.map((p) => /* @__PURE__ */ jsxs("div", { className: "card-glow", style: {
      borderRadius: "12px",
      padding: "20px 24px",
      display: "flex",
      alignItems: "flex-start",
      gap: "14px"
    }, children: [
      /* @__PURE__ */ jsx("span", { style: {
        fontSize: "1.5rem",
        flexShrink: 0
      }, children: p.icon }),
      /* @__PURE__ */ jsx("span", { style: {
        color: "#94a3b8",
        fontSize: "0.95rem",
        lineHeight: 1.5
      }, children: p.text })
    ] }, p.text)) })
  ] }) });
}
function WhatsInsideSection() {
  const categories = [{
    icon: "🤖",
    title: "AI Coding Tools",
    desc: "Top AI assistants with setup notes and comparisons",
    color: "#f7d774"
  }, {
    icon: "🔷",
    title: "Claude Code & Alternatives",
    desc: "Claude, Cline, Continue, and more compared",
    color: "#b7791f"
  }, {
    icon: "🌐",
    title: "OpenCode / OpenRouter / Kiro",
    desc: "Open model access and routing platforms",
    color: "#10b981"
  }, {
    icon: "🐙",
    title: "GitHub & Copilot",
    desc: "Student pack guide and Copilot setup tips",
    color: "#f7d774"
  }, {
    icon: "🧩",
    title: "VS Code AI Extensions",
    desc: "Best extensions with install commands",
    color: "#f59e0b"
  }, {
    icon: "🌍",
    title: "Website Building",
    desc: "Frameworks, templates, and deployment guides",
    color: "#b7791f"
  }, {
    icon: "📈",
    title: "SEO & Monetization",
    desc: "AdSense, SEO tools, and micro-income strategies",
    color: "#10b981"
  }, {
    icon: "💬",
    title: "Prompt Templates",
    desc: "Ready-to-use AI prompts for common tasks",
    color: "#f7d774"
  }, {
    icon: "⚡",
    title: "Setup Commands",
    desc: "Copy-paste terminal commands for quick setup",
    color: "#f59e0b"
  }, {
    icon: "✅",
    title: "Checklists & Downloads",
    desc: "Launch checklists and downloadable ZIP files",
    color: "#b7791f"
  }];
  return /* @__PURE__ */ jsx("section", { id: "whats-inside", className: "cyber-grid", style: {
    background: "#050810",
    padding: "96px 16px"
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    maxWidth: "1120px",
    margin: "0 auto"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      marginBottom: "48px"
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "badge badge-cyan", style: {
        display: "inline-flex",
        marginBottom: "16px"
      }, children: "What's Inside" }),
      /* @__PURE__ */ jsxs("h2", { style: {
        fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
        fontWeight: 800,
        color: "#f1f5f9",
        lineHeight: 1.2,
        marginBottom: "16px"
      }, children: [
        "Everything You Need,",
        " ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "Organized" })
      ] }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "#64748b",
        maxWidth: "520px",
        margin: "0 auto",
        fontSize: "1.05rem"
      }, children: "Ten resource categories covering every aspect of AI-powered development." })
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "16px"
    }, children: categories.map((cat) => /* @__PURE__ */ jsxs("div", { className: "card-glow", style: {
      borderRadius: "12px",
      padding: "24px"
    }, children: [
      /* @__PURE__ */ jsx("div", { style: {
        fontSize: "2rem",
        marginBottom: "12px"
      }, children: cat.icon }),
      /* @__PURE__ */ jsx("h3", { style: {
        color: cat.color,
        fontWeight: 700,
        fontSize: "1rem",
        marginBottom: "8px",
        margin: "0 0 8px"
      }, children: cat.title }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "#64748b",
        fontSize: "0.875rem",
        lineHeight: 1.5,
        margin: 0
      }, children: cat.desc })
    ] }, cat.title)) })
  ] }) });
}
const PREVIEW_RESOURCES = [{
  title: "OpenCode Zen Setup",
  summary: "Step-by-step OpenCode terminal config with themes, keybindings, and model setup.",
  category: "Setup Commands",
  link: "https://opencode.ai",
  linkLabel: "Official Tool"
}, {
  title: "Claude Code Alternatives",
  summary: "Side-by-side comparison of Claude Code, Cline, Continue, and Cursor with pros/cons.",
  category: "AI Coding Tools",
  link: "https://docs.anthropic.com",
  linkLabel: "Documentation"
}, {
  title: "GitHub Student Pack Guide",
  summary: "How to activate GitHub Student Developer Pack and claim all included tools.",
  category: "GitHub & Copilot",
  link: "https://education.github.com/pack",
  linkLabel: "Official Tool"
}, {
  title: "VS Code + Cline Setup",
  summary: "Install Cline extension, connect to OpenRouter, and configure your first AI coding session.",
  category: "VS Code Extensions",
  link: "https://marketplace.visualstudio.com",
  linkLabel: "Documentation"
}, {
  title: "Astro Website Launch Checklist",
  summary: "Full checklist from Astro setup to Netlify deploy — with SEO meta tags included.",
  category: "Checklists",
  link: "https://astro.build",
  linkLabel: "Reference Tutorial"
}, {
  title: "SEO + AdSense Micro Tool Plan",
  summary: "Minimal viable content strategy to get AdSense approved on a new developer blog.",
  category: "SEO & Monetization",
  link: "/checkout",
  linkLabel: "Documentation"
}, {
  title: "AI Prompt Library",
  summary: "30+ reusable prompts for coding, debugging, writing docs, and generating components.",
  category: "Prompt Templates",
  link: "/checkout",
  linkLabel: "Documentation"
}, {
  title: "Full Resource Links Database",
  summary: "100+ verified and categorized links to official AI tools, docs, and video references.",
  category: "All Categories",
  link: "/checkout",
  linkLabel: "Documentation"
}];
function ResourcePreviewSection() {
  return /* @__PURE__ */ jsx("section", { id: "resources", style: {
    background: "#080c14",
    padding: "96px 16px"
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    maxWidth: "1120px",
    margin: "0 auto"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      marginBottom: "48px"
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "badge badge-green", style: {
        display: "inline-flex",
        marginBottom: "16px"
      }, children: "Preview" }),
      /* @__PURE__ */ jsx("h2", { style: {
        fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
        fontWeight: 800,
        color: "#f1f5f9",
        lineHeight: 1.2,
        marginBottom: "16px"
      }, children: "Sample Resources From The Pack" }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "#64748b",
        maxWidth: "520px",
        margin: "0 auto",
        fontSize: "1.05rem"
      }, children: "Here's a preview of what's organized inside. Full details unlock after purchase." })
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "16px"
    }, children: PREVIEW_RESOURCES.map((res) => /* @__PURE__ */ jsxs("div", { className: "card-glow", style: {
      borderRadius: "12px",
      padding: "24px"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "12px",
        gap: "8px",
        flexWrap: "wrap"
      }, children: [
        /* @__PURE__ */ jsx("span", { className: "badge badge-cyan", style: {
          fontSize: "11px"
        }, children: res.category }),
        /* @__PURE__ */ jsx("span", { className: "badge badge-lock", style: {
          fontSize: "11px"
        }, children: "🔒 Locked" })
      ] }),
      /* @__PURE__ */ jsx("h3", { style: {
        color: "#e2e8f0",
        fontWeight: 700,
        fontSize: "1rem",
        marginBottom: "8px",
        margin: "0 0 8px"
      }, children: res.title }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "#64748b",
        fontSize: "0.875rem",
        lineHeight: 1.5,
        marginBottom: "16px"
      }, children: res.summary }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid rgba(247,215,116,0.1)",
        paddingTop: "12px"
      }, children: [
        /* @__PURE__ */ jsxs("a", { href: res.link, target: res.link.startsWith("http") ? "_blank" : void 0, rel: "noopener noreferrer", style: {
          color: "#f7d774",
          fontSize: "0.8rem",
          textDecoration: "none"
        }, children: [
          res.linkLabel,
          " ↗"
        ] }),
        /* @__PURE__ */ jsx("span", { style: {
          color: "#475569",
          fontSize: "0.8rem"
        }, children: "Included in Pack" })
      ] })
    ] }, res.title)) }),
    /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      marginTop: "40px"
    }, children: [
      /* @__PURE__ */ jsx("p", { style: {
        color: "#475569",
        fontSize: "0.9rem",
        marginBottom: "20px"
      }, children: "Full resource details, links, and commands unlock after purchase." }),
      /* @__PURE__ */ jsx("a", { href: "/checkout", className: "btn-primary", children: "Unlock All Resources →" })
    ] })
  ] }) });
}
function PremiumPackSection() {
  const includes = ["100+ curated and verified resource links", "Copy-paste terminal setup commands", "Prompt template library (30+ prompts)", "Tool setup guides with instructions", "Official documentation references", "Video companion links (third-party)", "Website launch checklist", "SEO monetization checklist", "Downloadable ZIP with all files", "Future updates included"];
  return /* @__PURE__ */ jsx("section", { style: {
    background: "#050810",
    padding: "96px 16px"
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center"
  }, children: [
    /* @__PURE__ */ jsx("div", { className: "badge badge-cyan", style: {
      display: "inline-flex",
      marginBottom: "20px"
    }, children: "Premium Pack" }),
    /* @__PURE__ */ jsx("h2", { style: {
      fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
      fontWeight: 800,
      color: "#f1f5f9",
      lineHeight: 1.2,
      marginBottom: "16px"
    }, children: "Get The Full 21k Pack" }),
    /* @__PURE__ */ jsx("p", { style: {
      color: "#64748b",
      maxWidth: "520px",
      margin: "0 auto 48px",
      fontSize: "1.05rem"
    }, children: "Stop wasting time searching. Everything organized, verified, and ready to use." }),
    /* @__PURE__ */ jsxs("div", { style: {
      background: "#0d1117",
      border: "1px solid rgba(247,215,116,0.2)",
      borderRadius: "16px",
      padding: "40px",
      boxShadow: "0 0 60px rgba(247,215,116,0.05)"
    }, children: [
      /* @__PURE__ */ jsx("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "12px",
        textAlign: "left",
        marginBottom: "32px"
      }, children: includes.map((item) => /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        alignItems: "flex-start",
        gap: "10px"
      }, children: [
        /* @__PURE__ */ jsx("span", { style: {
          color: "#10b981",
          fontSize: "1rem",
          flexShrink: 0
        }, children: "✓" }),
        /* @__PURE__ */ jsx("span", { style: {
          color: "#94a3b8",
          fontSize: "0.875rem",
          lineHeight: 1.4
        }, children: item })
      ] }, item)) }),
      /* @__PURE__ */ jsx("a", { href: "/checkout", className: "btn-primary", style: {
        width: "100%",
        textAlign: "center",
        display: "block",
        fontSize: "16px",
        padding: "16px",
        boxSizing: "border-box"
      }, children: "Get The Pack →" })
    ] })
  ] }) });
}
function PricingSection() {
  return /* @__PURE__ */ jsx("section", { id: "pricing", style: {
    background: "#080c14",
    padding: "96px 16px"
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    maxWidth: "520px",
    margin: "0 auto",
    textAlign: "center"
  }, children: [
    /* @__PURE__ */ jsx("div", { className: "badge badge-green", style: {
      display: "inline-flex",
      marginBottom: "16px"
    }, children: "Pricing" }),
    /* @__PURE__ */ jsx("h2", { style: {
      fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
      fontWeight: 800,
      color: "#f1f5f9",
      lineHeight: 1.2,
      marginBottom: "16px"
    }, children: "One Pack. One Price." }),
    /* @__PURE__ */ jsx("p", { style: {
      color: "#64748b",
      marginBottom: "48px",
      fontSize: "1.05rem"
    }, children: "No subscriptions. No hidden fees. Just everything you need." }),
    /* @__PURE__ */ jsxs("div", { style: {
      background: "linear-gradient(135deg, rgba(247,215,116,0.05), rgba(183,121,31,0.05))",
      border: "1px solid rgba(247,215,116,0.25)",
      borderRadius: "20px",
      padding: "40px",
      boxShadow: "0 0 80px rgba(247,215,116,0.08)"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "16px"
      }, children: [
        /* @__PURE__ */ jsx("div", { className: "badge badge-green", style: {
          display: "inline-flex"
        }, children: "Most Popular" }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "4px 12px",
          borderRadius: "100px",
          fontSize: "12px",
          fontWeight: 800,
          letterSpacing: "0.05em",
          background: "rgba(239,68,68,0.12)",
          border: "1px solid rgba(239,68,68,0.35)",
          color: "#f87171"
        }, children: "Limited Offer" }),
        /* @__PURE__ */ jsx("div", { className: "badge badge-green", style: {
          display: "inline-flex"
        }, children: "80% OFF" })
      ] }),
      /* @__PURE__ */ jsx("h3", { style: {
        color: "#f1f5f9",
        fontSize: "1.5rem",
        fontWeight: 800,
        margin: "0 0 8px"
      }, children: "21k AI Developer Resource Pack" }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "#64748b",
        marginBottom: "28px"
      }, children: "Complete lifetime access to all resources" }),
      /* @__PURE__ */ jsxs("div", { style: {
        marginBottom: "28px"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          color: "#64748b",
          fontSize: "1.2rem",
          fontWeight: 800,
          marginBottom: "4px"
        }, children: /* @__PURE__ */ jsx("span", { style: {
          textDecoration: "line-through"
        }, children: "₹999" }) }),
        /* @__PURE__ */ jsx("div", { style: {
          color: "#64748b",
          fontSize: "0.95rem",
          fontWeight: 700,
          marginBottom: "8px"
        }, children: /* @__PURE__ */ jsx("span", { style: {
          textDecoration: "line-through"
        }, children: "₹499" }) }),
        /* @__PURE__ */ jsx("div", { style: {
          fontSize: "3.4rem",
          fontWeight: 900,
          color: "#f8fafc",
          lineHeight: 1
        }, children: "₹199" }),
        /* @__PURE__ */ jsx("div", { style: {
          color: "#10b981",
          fontSize: "0.9rem",
          fontWeight: 800,
          marginTop: "12px"
        }, children: "Special launch discount for first 100 buyers" }),
        /* @__PURE__ */ jsx(CountdownTimer, {})
      ] }),
      /* @__PURE__ */ jsx("a", { href: "/checkout", className: "btn-primary", style: {
        display: "block",
        textAlign: "center",
        fontSize: "17px",
        padding: "18px",
        marginBottom: "14px",
        boxSizing: "border-box"
      }, children: "Buy Now" }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "#475569",
        fontSize: "0.875rem",
        margin: 0
      }, children: "⚡ Instant access after purchase" }),
      /* @__PURE__ */ jsx("div", { style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
        marginTop: "28px",
        textAlign: "left"
      }, children: ["100+ curated resources", "Prompt library", "Setup commands", "Tool setup guides", "Download ZIP", "Future updates"].map((f) => /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        gap: "8px",
        alignItems: "center"
      }, children: [
        /* @__PURE__ */ jsx("span", { style: {
          color: "#10b981"
        }, children: "✓" }),
        /* @__PURE__ */ jsx("span", { style: {
          color: "#94a3b8",
          fontSize: "0.875rem"
        }, children: f })
      ] }, f)) })
    ] })
  ] }) });
}
function DashboardPreviewSection() {
  const sections = [{
    icon: "📚",
    title: "Resource Library",
    desc: "100+ categorized links"
  }, {
    icon: "💬",
    title: "Prompt Library",
    desc: "30+ copy-paste prompts"
  }, {
    icon: "⚡",
    title: "Setup Commands",
    desc: "Terminal commands ready"
  }, {
    icon: "📦",
    title: "Download ZIP",
    desc: "All files in one download"
  }, {
    icon: "🔄",
    title: "Updates",
    desc: "New resources added"
  }, {
    icon: "🔒",
    title: "Buyer-Only Access",
    desc: "Secure member portal"
  }];
  return /* @__PURE__ */ jsx("section", { style: {
    background: "#050810",
    padding: "96px 16px"
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    maxWidth: "900px",
    margin: "0 auto"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      marginBottom: "48px"
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "badge badge-purple", style: {
        display: "inline-flex",
        marginBottom: "16px"
      }, children: "Dashboard Preview" }),
      /* @__PURE__ */ jsx("h2", { style: {
        fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
        fontWeight: 800,
        color: "#f1f5f9",
        lineHeight: 1.2,
        marginBottom: "16px"
      }, children: "Your Buyer Dashboard" }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "#64748b",
        maxWidth: "460px",
        margin: "0 auto",
        fontSize: "1.05rem"
      }, children: "Full dashboard unlocks after purchase. Here's what's waiting for you." })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      background: "#0d1117",
      border: "1px solid rgba(247,215,116,0.15)",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 20px 80px rgba(0,0,0,0.4)"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        background: "#111827",
        borderBottom: "1px solid rgba(247,215,116,0.1)",
        padding: "12px 16px",
        display: "flex",
        gap: "8px",
        alignItems: "center"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#ef4444"
        } }),
        /* @__PURE__ */ jsx("div", { style: {
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#f59e0b"
        } }),
        /* @__PURE__ */ jsx("div", { style: {
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: "#10b981"
        } }),
        /* @__PURE__ */ jsx("div", { style: {
          flex: 1,
          background: "#1e293b",
          borderRadius: "6px",
          padding: "4px 12px",
          marginLeft: "8px"
        }, children: /* @__PURE__ */ jsx("span", { style: {
          color: "#475569",
          fontSize: "0.75rem"
        }, children: "21k.com/dashboard" }) }),
        /* @__PURE__ */ jsx("span", { className: "badge badge-green", style: {
          fontSize: "11px"
        }, children: "🔒 Secure" })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        padding: "32px",
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px"
        }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { style: {
              color: "#f1f5f9",
              fontWeight: 800,
              margin: 0,
              fontSize: "1.25rem"
            }, children: "Welcome back, Developer 👋" }),
            /* @__PURE__ */ jsx("p", { style: {
              color: "#475569",
              margin: "4px 0 0",
              fontSize: "0.875rem"
            }, children: "Your AI Resource Pack is ready" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "badge badge-green", children: "✓ Pack Active" })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
          marginBottom: "0"
        }, children: sections.map((s) => /* @__PURE__ */ jsxs("div", { style: {
          background: "#111827",
          border: "1px solid rgba(247,215,116,0.1)",
          borderRadius: "10px",
          padding: "18px"
        }, children: [
          /* @__PURE__ */ jsx("div", { style: {
            fontSize: "1.5rem",
            marginBottom: "8px"
          }, children: s.icon }),
          /* @__PURE__ */ jsx("div", { style: {
            color: "#e2e8f0",
            fontWeight: 600,
            fontSize: "0.875rem",
            marginBottom: "4px"
          }, children: s.title }),
          /* @__PURE__ */ jsx("div", { style: {
            color: "#475569",
            fontSize: "0.8rem"
          }, children: s.desc })
        ] }, s.title)) }),
        /* @__PURE__ */ jsx("div", { style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background: "linear-gradient(to bottom, transparent, rgba(13,17,23,0.97))",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "32px"
        }, children: /* @__PURE__ */ jsxs("div", { style: {
          textAlign: "center"
        }, children: [
          /* @__PURE__ */ jsx("div", { style: {
            fontSize: "2rem",
            marginBottom: "8px"
          }, children: "🔒" }),
          /* @__PURE__ */ jsx("p", { style: {
            color: "#94a3b8",
            fontWeight: 600,
            marginBottom: "16px",
            margin: "0 0 16px"
          }, children: "Full dashboard unlocks after purchase" }),
          /* @__PURE__ */ jsx("a", { href: "/checkout", className: "btn-primary", children: "Unlock Dashboard →" })
        ] }) })
      ] })
    ] })
  ] }) });
}
const FAQ_ITEMS = [{
  q: "What do I get after purchase?",
  a: "You get immediate access to 100+ curated AI developer resources including tool links, setup commands, prompt templates, checklists, and a downloadable ZIP file — all organized in a private buyer dashboard."
}, {
  q: "Are these resources original?",
  a: "The pack includes 21k notes, checklists, and prompt templates created for this pack, plus curated links to official third-party tools and documentation. External links are labeled as Official Tool, Documentation, Reference Tutorial, Video Reference, or GitHub Repo."
}, {
  q: "Do I need coding experience?",
  a: "Basic familiarity with the command line helps, but most resources include step-by-step guidance. The pack covers beginner-friendly setup guides as well as advanced tool configurations."
}, {
  q: "Will links be updated?",
  a: "Yes. The pack includes future updates at no extra cost. As tools evolve and new resources are added, buyers receive access to updated versions."
}, {
  q: "Is this a course or a resource pack?",
  a: "It is a curated resource pack — not a course. You get organized links, commands, templates, and guides in a structured format, not video lessons or live coaching."
}, {
  q: "How do I access the pack after payment?",
  a: "After completing checkout you will receive an email with your login link. Use that to access your private dashboard where all resources are available."
}, {
  q: "Can I use this to build my own website?",
  a: "Yes! The pack includes website-building resources, Astro and Netlify setup guides, and an SEO launch checklist specifically for building and monetizing developer websites."
}];
function FaqSection() {
  return /* @__PURE__ */ jsx("section", { id: "faq", style: {
    background: "#080c14",
    padding: "96px 16px"
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    maxWidth: "720px",
    margin: "0 auto"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      marginBottom: "48px"
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "badge badge-cyan", style: {
        display: "inline-flex",
        marginBottom: "16px"
      }, children: "FAQ" }),
      /* @__PURE__ */ jsx("h2", { style: {
        fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
        fontWeight: 800,
        color: "#f1f5f9",
        lineHeight: 1.2
      }, children: "Frequently Asked Questions" })
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }, children: FAQ_ITEMS.map((item) => /* @__PURE__ */ jsxs("details", { style: {
      background: "#0d1117",
      border: "1px solid rgba(247,215,116,0.12)",
      borderRadius: "10px",
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsxs("summary", { style: {
        padding: "18px 22px",
        cursor: "pointer",
        color: "#e2e8f0",
        fontWeight: 600,
        fontSize: "0.95rem",
        listStyle: "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px"
      }, children: [
        item.q,
        /* @__PURE__ */ jsx("span", { style: {
          color: "#f7d774",
          flexShrink: 0
        }, children: "+" })
      ] }),
      /* @__PURE__ */ jsx("div", { style: {
        padding: "0 22px 18px",
        color: "#64748b",
        lineHeight: 1.7,
        fontSize: "0.9rem"
      }, children: item.a })
    ] }, item.q)) }),
    /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      marginTop: "48px",
      padding: "32px",
      background: "#0d1117",
      border: "1px solid rgba(247,215,116,0.15)",
      borderRadius: "16px"
    }, children: [
      /* @__PURE__ */ jsx("h3", { style: {
        color: "#f1f5f9",
        fontWeight: 700,
        marginBottom: "8px",
        margin: "0 0 8px"
      }, children: "Ready to get organized?" }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "#64748b",
        marginBottom: "20px",
        fontSize: "0.95rem"
      }, children: "Stop searching. Start building." }),
      /* @__PURE__ */ jsx("a", { href: "/checkout", className: "btn-primary", style: {
        fontSize: "16px",
        padding: "16px 32px"
      }, children: "Get The Resource Pack →" })
    ] })
  ] }) });
}
export {
  HomePage as component
};
