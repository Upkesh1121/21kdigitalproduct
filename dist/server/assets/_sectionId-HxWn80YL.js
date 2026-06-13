import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { g as getAccessToken, c as checkBuyerAccess } from "./access-DU0rByU4.js";
import { r as readApiJson } from "./api-CWR5F0Sv.js";
import { R as Route, a as ResourceLink } from "./router-CRNgXt45.js";
import "@tanstack/react-router";
function ResourceSectionPage() {
  const {
    sectionId
  } = Route.useParams();
  const [accessGranted, setAccessGranted] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [section, setSection] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    let cancelled = false;
    const token = getAccessToken();
    setIsLoggedIn(Boolean(token));
    checkBuyerAccess(token).then(async (result) => {
      if (cancelled) return;
      setAccessGranted(result.has_access);
      setIsLoggedIn(Boolean(token && result.email));
      if (!result.has_access || !token) return;
      const response = await fetch(`/api/resources?section=${encodeURIComponent(sectionId)}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      const data = await readApiJson(response, "/api/resources");
      if (!response.ok || !data.section) throw new Error(data.error || "Resource section not found.");
      if (!cancelled) setSection(data.section);
    }).catch((error) => {
      if (!cancelled) {
        setAccessGranted(false);
        setMessage(error instanceof Error ? error.message : "Could not load this resource section.");
      }
    }).finally(() => {
      if (!cancelled) setIsCheckingAccess(false);
    });
    return () => {
      cancelled = true;
    };
  }, [sectionId]);
  if (isCheckingAccess) {
    return /* @__PURE__ */ jsx(StatusShell, { badge: "Checking Access", title: "Opening resource section", text: "Verifying your buyer email and purchase status." });
  }
  if (!accessGranted) {
    return /* @__PURE__ */ jsx(StatusShell, { badge: "Buyer Access Required", title: isLoggedIn ? "Complete payment for this account" : "Login to open this resource section", text: isLoggedIn ? "This account is logged in, but this section opens only after a verified 21k purchase with the same email." : "Login with your buyer email first. New users can create an account and complete payment to unlock the library.", actionHref: isLoggedIn ? "/checkout" : `/login?next=/resources/${sectionId}`, actionLabel: isLoggedIn ? "Complete Payment" : "Login to Continue" });
  }
  if (!section) {
    return /* @__PURE__ */ jsx(StatusShell, { badge: "Not Found", title: "Resource section not found", text: message || "Return to the resource dashboard to browse all available sections.", actionHref: "/resources", actionLabel: "Open Resources" });
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
    }, children: section.resources.map((resource, index) => /* @__PURE__ */ jsx(ResourceLink, { resource }, `${resource.url}-${index}`)) })
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
