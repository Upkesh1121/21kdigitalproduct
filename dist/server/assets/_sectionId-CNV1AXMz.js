import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from "react";
import { g as getAccessToken, c as checkBuyerAccess } from "./access-DU0rByU4.js";
import { a as Route, R as RESOURCE_SECTIONS, r as resourceSectionSlug, T as TYPE_COLORS } from "./router-DbbVgeJc.js";
import "./api-CWR5F0Sv.js";
import "@tanstack/react-router";
function ResourceSectionPage() {
  const {
    sectionId
  } = Route.useParams();
  const [accessGranted, setAccessGranted] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const section = useMemo(() => RESOURCE_SECTIONS.find((item) => resourceSectionSlug(item.title) === sectionId), [sectionId]);
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
  if (isCheckingAccess) {
    return /* @__PURE__ */ jsx(StatusShell, { badge: "Checking Access", title: "Opening resource section", text: "Verifying your buyer email and purchase status." });
  }
  if (!section) {
    return /* @__PURE__ */ jsx(StatusShell, { badge: "Not Found", title: "Resource section not found", text: "Return to the resource dashboard to browse all available sections.", actionHref: "/resources", actionLabel: "Open Resources" });
  }
  if (!accessGranted) {
    return /* @__PURE__ */ jsx(StatusShell, { badge: "Buyer Access Required", title: isLoggedIn ? "Complete payment for this account" : "Login to open this resource section", text: isLoggedIn ? "This account is logged in, but this section opens only after a verified 21k purchase with the same email." : "Login with your buyer email first. New users can create an account and complete payment to unlock the library.", actionHref: isLoggedIn ? "/checkout" : `/login?next=/resources/${sectionId}`, actionLabel: isLoggedIn ? "Complete Payment" : "Login to Continue" });
  }
  return /* @__PURE__ */ jsx("div", { style: {
    background: "#050810",
    minHeight: "100vh",
    padding: "96px 16px 60px"
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    maxWidth: "1080px",
    margin: "0 auto"
  }, children: [
    /* @__PURE__ */ jsx("a", { href: "/resources", style: {
      color: "#94a3b8",
      textDecoration: "none",
      fontSize: "0.9rem",
      fontWeight: 800
    }, children: "Back to Resource Dashboard" }),
    /* @__PURE__ */ jsxs("header", { style: {
      margin: "26px 0 28px"
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "badge badge-cyan", style: {
        display: "inline-flex",
        marginBottom: "16px"
      }, children: "Premium Section" }),
      /* @__PURE__ */ jsx("h1", { style: {
        color: "#f8fafc",
        fontSize: "clamp(2rem, 5vw, 3.25rem)",
        lineHeight: 1.05,
        fontWeight: 900,
        margin: "0 0 14px"
      }, children: section.title }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "#94a3b8",
        fontSize: "1rem",
        lineHeight: 1.7,
        maxWidth: "780px",
        margin: 0
      }, children: section.description })
    ] }),
    /* @__PURE__ */ jsxs("section", { style: {
      background: "rgba(16,185,129,0.06)",
      border: "1px solid rgba(16,185,129,0.18)",
      borderRadius: "12px",
      padding: "18px",
      color: "#a7f3d0",
      fontSize: "0.92rem",
      lineHeight: 1.65,
      marginBottom: "22px"
    }, children: [
      /* @__PURE__ */ jsx("strong", { style: {
        color: "#10b981"
      }, children: "Premium 21k Notes:" }),
      " ",
      section.notes
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "14px"
    }, children: section.resources.map((resource, index) => {
      const typeColor = TYPE_COLORS[resource.type];
      return /* @__PURE__ */ jsxs("a", { href: resource.url, target: "_blank", rel: "noreferrer", style: {
        background: "#0d1117",
        border: "1px solid rgba(247,215,116,0.12)",
        borderRadius: "12px",
        padding: "18px",
        color: "#e2e8f0",
        textDecoration: "none",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "14px"
      }, children: [
        /* @__PURE__ */ jsx("span", { style: {
          color: "#f8fafc",
          fontWeight: 850,
          fontSize: "0.98rem",
          lineHeight: 1.35
        }, children: resource.title }),
        /* @__PURE__ */ jsx("span", { style: {
          background: `${typeColor}18`,
          border: `1px solid ${typeColor}40`,
          color: typeColor,
          padding: "4px 9px",
          borderRadius: "100px",
          fontSize: "11px",
          fontWeight: 800,
          width: "fit-content"
        }, children: resource.type })
      ] }, `${resource.url}-${index}`);
    }) })
  ] }) });
}
function StatusShell({
  badge,
  title,
  text,
  actionHref,
  actionLabel
}) {
  return /* @__PURE__ */ jsx("div", { style: {
    background: "#050810",
    minHeight: "100vh",
    padding: "96px 16px 60px"
  }, children: /* @__PURE__ */ jsxs("div", { style: {
    maxWidth: "760px",
    margin: "0 auto",
    textAlign: "center"
  }, children: [
    /* @__PURE__ */ jsx("div", { className: "badge badge-cyan", style: {
      display: "inline-flex",
      marginBottom: "16px"
    }, children: badge }),
    /* @__PURE__ */ jsx("h1", { style: {
      fontSize: "clamp(1.85rem, 4vw, 2.75rem)",
      fontWeight: 900,
      color: "#f1f5f9",
      marginBottom: "12px"
    }, children: title }),
    /* @__PURE__ */ jsx("p", { style: {
      color: "#94a3b8",
      fontSize: "1rem",
      maxWidth: "590px",
      margin: "0 auto 22px",
      lineHeight: 1.7
    }, children: text }),
    actionHref && actionLabel ? /* @__PURE__ */ jsx("a", { href: actionHref, className: "btn-primary", children: actionLabel }) : null
  ] }) });
}
export {
  ResourceSectionPage as component
};
