import { jsx, jsxs } from "react/jsx-runtime";
const DASH_SECTIONS = [{
  icon: "📚",
  title: "Resource Library",
  desc: "100+ categorized AI tool links",
  count: "100+"
}, {
  icon: "💬",
  title: "Prompt Library",
  desc: "Copy-paste prompts for every task",
  count: "30+"
}, {
  icon: "⚡",
  title: "Setup Commands",
  desc: "Terminal commands ready to paste",
  count: "50+"
}, {
  icon: "🗂️",
  title: "Tool Guides",
  desc: "Step-by-step setup walkthroughs",
  count: "10+"
}, {
  icon: "📦",
  title: "PDF Downloads",
  desc: "Included guides for offline use",
  count: "PDF"
}, {
  icon: "🔄",
  title: "Updates",
  desc: "New resources added regularly",
  count: "Live"
}];
function DashboardPage() {
  return /* @__PURE__ */ jsx("div", { style: {
    background: "#050810",
    minHeight: "100vh",
    padding: "96px 16px 60px"
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    maxWidth: "900px",
    margin: "0 auto"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      background: "linear-gradient(135deg, rgba(247,215,116,0.06), rgba(183,121,31,0.06))",
      border: "1px solid rgba(247,215,116,0.2)",
      borderRadius: "12px",
      padding: "20px 24px",
      marginBottom: "32px",
      display: "flex",
      alignItems: "center",
      gap: "14px",
      flexWrap: "wrap"
    }, children: [
      /* @__PURE__ */ jsx("span", { style: {
        fontSize: "1.5rem"
      }, children: "🔒" }),
      /* @__PURE__ */ jsxs("div", { style: {
        flex: 1
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          color: "#e2e8f0",
          fontWeight: 700,
          marginBottom: "4px"
        }, children: "Access Required" }),
        /* @__PURE__ */ jsx("div", { style: {
          color: "#64748b",
          fontSize: "0.875rem"
        }, children: "This dashboard is for buyers only. Purchase the 21k AI Developer Resource Pack to unlock full access." })
      ] }),
      /* @__PURE__ */ jsx("a", { href: "/checkout", style: {
        background: "linear-gradient(135deg, #f7d774, #b7791f)",
        color: "#090806",
        fontWeight: 700,
        padding: "10px 20px",
        borderRadius: "8px",
        textDecoration: "none",
        fontSize: "14px",
        flexShrink: 0
      }, children: "Get Access →" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      marginBottom: "32px"
    }, children: [
      /* @__PURE__ */ jsx("h1", { style: {
        fontSize: "1.75rem",
        fontWeight: 900,
        color: "#f1f5f9",
        marginBottom: "8px"
      }, children: "AI Developer Dashboard" }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "#64748b"
      }, children: accessGranted ? "Your buyer dashboard is active" : "Preview of what awaits after purchase" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      position: "relative",
      filter: accessGranted ? "none" : "blur(2px)",
      pointerEvents: accessGranted ? "auto" : "none",
      userSelect: accessGranted ? "auto" : "none"
    }, children: [
      /* @__PURE__ */ jsx("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "16px",
        marginBottom: "24px"
      }, children: DASH_SECTIONS.map((s) => /* @__PURE__ */ jsxs("div", { style: {
        background: "#0d1117",
        border: "1px solid rgba(247,215,116,0.12)",
        borderRadius: "12px",
        padding: "24px"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            fontSize: "1.75rem"
          }, children: s.icon }),
          /* @__PURE__ */ jsx("span", { style: {
            background: "rgba(247,215,116,0.1)",
            border: "1px solid rgba(247,215,116,0.2)",
            color: "#f7d774",
            padding: "2px 8px",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: 700
          }, children: s.count })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          color: "#e2e8f0",
          fontWeight: 700,
          marginBottom: "6px"
        }, children: s.title }),
        /* @__PURE__ */ jsx("div", { style: {
          color: "#475569",
          fontSize: "0.875rem"
        }, children: s.desc })
      ] }, s.title)) }),
      /* @__PURE__ */ jsxs("div", { style: {
        background: "#0d1117",
        border: "1px solid rgba(247,215,116,0.12)",
        borderRadius: "12px",
        overflow: "hidden"
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          padding: "16px 24px",
          borderBottom: "1px solid rgba(247,215,116,0.08)",
          color: "#94a3b8",
          fontWeight: 600,
          fontSize: "0.875rem"
        }, children: "Recent Resources" }),
        ["OpenCode Zen Setup", "Claude Code Alternatives", "GitHub Student Pack Guide", "VS Code + Cline Config"].map((r) => /* @__PURE__ */ jsxs("div", { style: {
          padding: "14px 24px",
          borderBottom: "1px solid rgba(247,215,116,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            color: "#94a3b8",
            fontSize: "0.875rem"
          }, children: r }),
          /* @__PURE__ */ jsx("span", { style: {
            color: "#10b981",
            fontSize: "0.8rem"
          }, children: "✓ Available" })
        ] }, r))
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      marginTop: "40px"
    }, children: [
      /* @__PURE__ */ jsx("p", { style: {
        color: "#64748b",
        marginBottom: "16px"
      }, children: "Get the pack to unlock your full dashboard" }),
      /* @__PURE__ */ jsx("a", { href: "/checkout", style: {
        background: "linear-gradient(135deg, #f7d774, #b7791f)",
        color: "#090806",
        fontWeight: 700,
        padding: "16px 32px",
        borderRadius: "8px",
        textDecoration: "none",
        fontSize: "16px",
        display: "inline-block"
      }, children: "Unlock Dashboard →" })
    ] })
  ] }) });
}
export {
  DashboardPage as component
};
