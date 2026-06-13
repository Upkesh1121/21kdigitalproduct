import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { g as getAccessToken, c as checkBuyerAccess } from "./access-DU0rByU4.js";
import "./api-CWR5F0Sv.js";
const DASH_SECTIONS = [{
  marker: "01",
  title: "Resource Library",
  desc: "100+ categorized AI tool links",
  count: "100+"
}, {
  marker: "02",
  title: "Prompt Library",
  desc: "Copy-paste prompts for practical workflows",
  count: "30+"
}, {
  marker: "03",
  title: "Setup Commands",
  desc: "Developer setup commands ready to use",
  count: "50+"
}, {
  marker: "04",
  title: "Tool Guides",
  desc: "Step-by-step setup walkthroughs",
  count: "10+"
}, {
  marker: "05",
  title: "PDF Downloads",
  desc: "Included guides for offline reference",
  count: "PDF"
}, {
  marker: "06",
  title: "Updates",
  desc: "Future resource updates included",
  count: "Live"
}];
function DashboardPage() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const token = getAccessToken();
    setIsLoggedIn(Boolean(token));
    checkBuyerAccess(token).then((result) => {
      if (!cancelled) {
        setAccessGranted(result.has_access);
        setIsLoggedIn(Boolean(token && result.email));
      }
    }).catch(() => {
      if (!cancelled) setAccessGranted(false);
    }).finally(() => {
      if (!cancelled) setIsCheckingAccess(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const statusTitle = accessGranted ? "Access Active" : isLoggedIn ? "Purchase Verification Required" : "Login Required";
  const statusText = isCheckingAccess ? "Checking your buyer access..." : accessGranted ? "Your buyer access is active. Open the resource library, prompts, setup commands, and downloads." : isLoggedIn ? "Your account is ready. Complete payment with the same email to unlock the full 21k Resource Pack." : "Login with your buyer email first. If you are new, create an account before checkout.";
  const lockedActionHref = isLoggedIn ? "/checkout" : "/login?next=/dashboard";
  const lockedActionLabel = isLoggedIn ? "Continue to Payment" : "Login to Continue";
  return /* @__PURE__ */ jsx("div", { style: {
    background: "#050810",
    minHeight: "100vh",
    padding: "96px 16px 60px"
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    maxWidth: "900px",
    margin: "0 auto"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: statusPanelStyle, children: [
      /* @__PURE__ */ jsx("span", { style: {
        width: "38px",
        height: "38px",
        borderRadius: "50%",
        background: accessGranted ? "rgba(16,185,129,0.16)" : "rgba(247,215,116,0.12)",
        color: accessGranted ? "#10b981" : "#f7d774",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 900,
        fontSize: accessGranted ? "0.72rem" : "0.62rem",
        letterSpacing: "0.04em"
      }, children: accessGranted ? "OK" : "LOCK" }),
      /* @__PURE__ */ jsxs("div", { style: {
        flex: 1
      }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          color: "#e2e8f0",
          fontWeight: 800,
          marginBottom: "4px"
        }, children: statusTitle }),
        /* @__PURE__ */ jsx("div", { style: {
          color: "#64748b",
          fontSize: "0.875rem",
          lineHeight: 1.5
        }, children: statusText })
      ] }),
      /* @__PURE__ */ jsx("a", { href: accessGranted ? "/resources" : lockedActionHref, style: primaryLinkStyle, children: accessGranted ? "Open Library" : lockedActionLabel })
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
        color: "#64748b",
        margin: 0
      }, children: accessGranted ? "Your private buyer dashboard is active." : isLoggedIn ? "Your account is created. Complete payment to activate the private dashboard." : "Login or create your account to activate the private dashboard." })
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
      }, children: DASH_SECTIONS.map((section) => /* @__PURE__ */ jsxs("div", { style: cardStyle, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            color: "#f7d774",
            fontSize: "0.82rem",
            fontWeight: 900,
            letterSpacing: "0.08em"
          }, children: section.marker }),
          /* @__PURE__ */ jsx("span", { style: countStyle, children: section.count })
        ] }),
        /* @__PURE__ */ jsx("div", { style: {
          color: "#e2e8f0",
          fontWeight: 800,
          marginBottom: "6px"
        }, children: section.title }),
        /* @__PURE__ */ jsx("div", { style: {
          color: "#475569",
          fontSize: "0.875rem",
          lineHeight: 1.5
        }, children: section.desc })
      ] }, section.title)) }),
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
          fontWeight: 700,
          fontSize: "0.875rem"
        }, children: "Recent Resources" }),
        ["OpenCode Zen Setup", "Claude Code Alternatives", "GitHub Student Pack Guide", "VS Code + Cline Config"].map((resource) => /* @__PURE__ */ jsxs("div", { style: {
          padding: "14px 24px",
          borderBottom: "1px solid rgba(247,215,116,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: {
            color: "#94a3b8",
            fontSize: "0.875rem"
          }, children: resource }),
          /* @__PURE__ */ jsx("span", { style: {
            color: "#10b981",
            fontSize: "0.8rem",
            fontWeight: 800
          }, children: "Available" })
        ] }, resource))
      ] })
    ] }),
    !accessGranted ? /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      marginTop: "40px"
    }, children: [
      /* @__PURE__ */ jsx("p", { style: {
        color: "#64748b",
        marginBottom: "16px"
      }, children: isLoggedIn ? "Complete secure payment to activate your private dashboard." : "Login first so your dashboard can be matched to your buyer email." }),
      /* @__PURE__ */ jsx("a", { href: lockedActionHref, style: {
        ...primaryLinkStyle,
        display: "inline-block",
        padding: "16px 32px",
        fontSize: "16px"
      }, children: lockedActionLabel })
    ] }) : null
  ] }) });
}
const statusPanelStyle = {
  background: "linear-gradient(135deg, rgba(247,215,116,0.06), rgba(183,121,31,0.06))",
  border: "1px solid rgba(247,215,116,0.2)",
  borderRadius: "12px",
  padding: "20px 24px",
  marginBottom: "32px",
  display: "flex",
  alignItems: "center",
  gap: "14px",
  flexWrap: "wrap"
};
const primaryLinkStyle = {
  background: "linear-gradient(135deg, #f7d774, #b7791f)",
  color: "#090806",
  fontWeight: 800,
  padding: "10px 20px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "14px",
  flexShrink: 0
};
const cardStyle = {
  background: "#0d1117",
  border: "1px solid rgba(247,215,116,0.12)",
  borderRadius: "12px",
  padding: "24px"
};
const countStyle = {
  background: "rgba(247,215,116,0.1)",
  border: "1px solid rgba(247,215,116,0.2)",
  color: "#f7d774",
  padding: "2px 8px",
  borderRadius: "6px",
  fontSize: "0.75rem",
  fontWeight: 800
};
export {
  DashboardPage as component
};
