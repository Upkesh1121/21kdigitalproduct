import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { g as getAccessToken, c as checkBuyerAccess } from "./access-DU0rByU4.js";
import { r as readApiJson } from "./api-CWR5F0Sv.js";
import { T as TYPE_COLORS } from "./router-CRNgXt45.js";
import "@tanstack/react-router";
function resourceSectionSlug(title) {
  return title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function ResourcesPage() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sections, setSections] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [resourceMessage, setResourceMessage] = useState("");
  useEffect(() => {
    let cancelled = false;
    const token = getAccessToken();
    setIsLoggedIn(Boolean(token));
    checkBuyerAccess(token).then(async (result) => {
      if (cancelled) return;
      setAccessGranted(result.has_access);
      setIsLoggedIn(Boolean(token && result.email));
      if (!result.has_access || !token) return;
      const response = await fetch("/api/resources", {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      const data = await readApiJson(response, "/api/resources");
      if (!response.ok) throw new Error(data.error || "Could not load resources.");
      if (!cancelled) {
        setSections(data.sections || []);
        setDownloads(data.downloads || []);
      }
    }).catch((error) => {
      if (!cancelled) {
        setAccessGranted(false);
        setResourceMessage(error instanceof Error ? error.message : "Could not load resources.");
      }
    }).finally(() => {
      if (!cancelled) setIsCheckingAccess(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  if (isCheckingAccess) {
    return /* @__PURE__ */ jsx(StatusPage, { badge: "Checking Access", title: "Opening your resource library", text: "Verifying your buyer email and purchase status." });
  }
  if (!accessGranted) {
    const primaryHref = isLoggedIn ? "/checkout" : "/login?next=/resources";
    const primaryLabel = isLoggedIn ? "Complete Payment" : "Login to Continue";
    return /* @__PURE__ */ jsx("div", { style: pageStyle, children: /* @__PURE__ */ jsxs("div", { style: {
      maxWidth: "780px",
      margin: "0 auto"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        textAlign: "center",
        marginBottom: "36px"
      }, children: [
        /* @__PURE__ */ jsx("div", { className: "badge badge-lock", style: {
          display: "inline-flex",
          marginBottom: "16px"
        }, children: "Buyer Access Required" }),
        /* @__PURE__ */ jsx("h1", { style: lockedTitleStyle, children: "21k Resource Library" }),
        /* @__PURE__ */ jsx("p", { style: lockedCopyStyle, children: "Your premium resources, setup notes, prompts, and PDF downloads are available only after purchase." })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: lockedPanelStyle, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { style: {
            color: "#f1f5f9",
            fontSize: "1.15rem",
            fontWeight: 900,
            margin: "0 0 8px"
          }, children: isLoggedIn ? "Complete payment for this account" : "Sign in with your buyer account" }),
          /* @__PURE__ */ jsx("p", { style: {
            color: "#94a3b8",
            fontSize: "0.92rem",
            lineHeight: 1.7,
            margin: "0 0 18px"
          }, children: isLoggedIn ? "This account is logged in, but the library opens only after a verified 21k purchase with the same email." : "The library opens only for accounts with a verified 21k purchase. Login first, then complete payment if your account is not unlocked yet." }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }, children: [
            /* @__PURE__ */ jsx("a", { href: primaryHref, className: "btn-primary", style: {
              padding: "13px 22px"
            }, children: primaryLabel }),
            !isLoggedIn ? /* @__PURE__ */ jsx("a", { href: "/signup", className: "btn-secondary", style: {
              padding: "13px 22px"
            }, children: "Create Account" }) : null
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: howItWorksStyle, children: [
          /* @__PURE__ */ jsx("h2", { style: {
            color: "#f1f5f9",
            fontSize: "1rem",
            fontWeight: 800,
            margin: "0 0 12px"
          }, children: "How buyer access works" }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "grid",
            gap: "10px",
            color: "#94a3b8",
            fontSize: "0.9rem",
            lineHeight: 1.6
          }, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { style: {
                color: "#f7d774"
              }, children: "1." }),
              " Create your 21k account with email, mobile number, and password."
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { style: {
                color: "#f7d774"
              }, children: "2." }),
              " Complete checkout through Cashfree using the same email."
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { style: {
                color: "#f7d774"
              }, children: "3." }),
              " Payment verification updates your buyer access automatically."
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("strong", { style: {
                color: "#f7d774"
              }, children: "4." }),
              " Login anytime to open your private resource library."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { style: {
          color: "#64748b",
          fontSize: "0.82rem",
          lineHeight: 1.6,
          margin: "18px 0 0"
        }, children: "Resource links are served only after access is verified. Sharing this page URL does not unlock the library for another email." })
      ] }),
      resourceMessage ? /* @__PURE__ */ jsx("div", { role: "status", style: statusStyle, children: resourceMessage }) : null
    ] }) });
  }
  if (!sections.length) {
    return /* @__PURE__ */ jsx(StatusPage, { badge: "Loading Library", title: "Preparing your resource dashboard", text: resourceMessage || "Loading the private resource catalog." });
  }
  return /* @__PURE__ */ jsx("div", { style: pageStyle, children: /* @__PURE__ */ jsxs("div", { style: {
    maxWidth: "1100px",
    margin: "0 auto"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      marginBottom: "40px"
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "badge badge-cyan", style: {
        display: "inline-flex",
        marginBottom: "16px"
      }, children: "Buyer-Only Resource Library" }),
      /* @__PURE__ */ jsx("h1", { style: {
        fontSize: "clamp(1.85rem, 3.8vw, 2.75rem)",
        fontWeight: 900,
        color: "#f1f5f9",
        marginBottom: "12px"
      }, children: "21k Premium Resource Library" }),
      /* @__PURE__ */ jsx("p", { style: {
        color: "#94a3b8",
        fontSize: "1rem",
        maxWidth: "650px",
        margin: "0 auto",
        lineHeight: 1.7
      }, children: "Build. Learn. Earn. Browse the curated 21k library for AI coding, setup workflows, launch assets, SEO systems, and monetization planning." })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: accessPanelStyle, children: [
      /* @__PURE__ */ jsx("span", { style: {
        color: "#94a3b8",
        fontSize: "0.92rem"
      }, children: "Your buyer access is active. Full notes, checklists, commands, and PDF files are available below." }),
      /* @__PURE__ */ jsx("a", { href: "/dashboard", className: "btn-primary", style: {
        fontSize: "14px",
        padding: "10px 18px"
      }, children: "Back to Dashboard" })
    ] }),
    /* @__PURE__ */ jsx("section", { style: {
      marginBottom: "28px"
    }, children: /* @__PURE__ */ jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: "14px"
    }, children: sections.map((section) => /* @__PURE__ */ jsxs("a", { href: `/resources/${resourceSectionSlug(section.title)}`, style: sectionCardStyle, children: [
      /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("span", { style: {
          display: "block",
          color: "#f8fafc",
          fontSize: "1rem",
          fontWeight: 900,
          lineHeight: 1.25,
          marginBottom: "8px"
        }, children: section.title }),
        /* @__PURE__ */ jsxs("span", { style: {
          display: "block",
          color: "#64748b",
          fontSize: "0.84rem",
          lineHeight: 1.5
        }, children: [
          section.resources.length,
          " resources and premium notes"
        ] })
      ] }),
      /* @__PURE__ */ jsx("span", { style: {
        color: "#f7d774",
        fontSize: "0.82rem",
        fontWeight: 900
      }, children: "Open Section" })
    ] }, section.title)) }) }),
    /* @__PURE__ */ jsx("div", { style: {
      display: "grid",
      gap: "18px"
    }, children: sections.map((section) => /* @__PURE__ */ jsx(ResourceSectionCard, { section }, section.title)) }),
    /* @__PURE__ */ jsxs("section", { style: downloadsPanelStyle, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
        marginBottom: "18px"
      }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { style: {
            color: "#f1f5f9",
            fontSize: "1.25rem",
            fontWeight: 850,
            margin: "0 0 6px"
          }, children: "Downloadable PDF Files" }),
          /* @__PURE__ */ jsx("p", { style: {
            color: "#64748b",
            margin: 0,
            fontSize: "0.92rem"
          }, children: "Only included PDF guides are available for download." })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "badge badge-purple", children: "Buyer Files" })
      ] }),
      /* @__PURE__ */ jsx("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "12px"
      }, children: downloads.map((file) => /* @__PURE__ */ jsxs("div", { style: downloadItemStyle, children: [
        /* @__PURE__ */ jsx("code", { style: {
          color: "#cbd5e1",
          fontSize: "0.82rem"
        }, children: file }),
        /* @__PURE__ */ jsx("span", { style: {
          color: "#10b981",
          fontSize: "0.78rem",
          fontWeight: 800
        }, children: "Included" })
      ] }, file)) })
    ] }),
    /* @__PURE__ */ jsx("div", { style: disclaimerStyle, children: "21k curates public tools, official documentation, third-party tutorials, and original notes/checklists. All third-party links belong to their respective owners. External tutorials and videos are provided as references only." })
  ] }) });
}
function ResourceSectionCard({
  section
}) {
  return /* @__PURE__ */ jsxs("section", { style: resourcePanelStyle, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      gap: "16px",
      flexWrap: "wrap",
      marginBottom: "18px"
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        maxWidth: "720px"
      }, children: [
        /* @__PURE__ */ jsx("h2", { style: {
          color: "#f1f5f9",
          fontSize: "1.25rem",
          fontWeight: 850,
          margin: "0 0 8px"
        }, children: section.title }),
        /* @__PURE__ */ jsx("p", { style: {
          color: "#94a3b8",
          lineHeight: 1.65,
          margin: 0,
          fontSize: "0.94rem"
        }, children: section.description })
      ] }),
      /* @__PURE__ */ jsx("a", { href: `/resources/${resourceSectionSlug(section.title)}`, className: "badge badge-lock", style: {
        height: "fit-content",
        textDecoration: "none"
      }, children: "Open Page" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: notesStyle, children: [
      /* @__PURE__ */ jsx("strong", { style: {
        color: "#10b981"
      }, children: "Premium 21k Notes:" }),
      " ",
      section.notes
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "12px"
    }, children: section.resources.map((resource, index) => /* @__PURE__ */ jsx(ResourceLink, { resource }, `${section.title}-${resource.url}-${index}`)) })
  ] });
}
function ResourceLink({
  resource
}) {
  const typeColor = TYPE_COLORS[resource.type];
  return /* @__PURE__ */ jsxs("a", { href: resource.url, target: "_blank", rel: "noreferrer", style: resourceLinkStyle, children: [
    /* @__PURE__ */ jsx("span", { style: {
      color: "#f8fafc",
      fontWeight: 700,
      fontSize: "0.9rem"
    }, children: resource.title }),
    /* @__PURE__ */ jsx("span", { style: {
      background: `${typeColor}18`,
      border: `1px solid ${typeColor}40`,
      color: typeColor,
      padding: "3px 8px",
      borderRadius: "100px",
      fontSize: "11px",
      fontWeight: 700,
      width: "fit-content"
    }, children: resource.type })
  ] });
}
function StatusPage({
  badge,
  title,
  text
}) {
  return /* @__PURE__ */ jsx("div", { style: pageStyle, children: /* @__PURE__ */ jsxs("div", { style: {
    maxWidth: "780px",
    margin: "0 auto",
    textAlign: "center"
  }, children: [
    /* @__PURE__ */ jsx("div", { className: "badge badge-cyan", style: {
      display: "inline-flex",
      marginBottom: "16px"
    }, children: badge }),
    /* @__PURE__ */ jsx("h1", { style: lockedTitleStyle, children: title }),
    /* @__PURE__ */ jsx("p", { style: lockedCopyStyle, children: text })
  ] }) });
}
const pageStyle = {
  background: "#050810",
  minHeight: "100vh",
  padding: "96px 16px 60px"
};
const lockedTitleStyle = {
  fontSize: "clamp(1.85rem, 4vw, 2.75rem)",
  fontWeight: 900,
  color: "#f1f5f9",
  marginBottom: "12px"
};
const lockedCopyStyle = {
  color: "#94a3b8",
  fontSize: "1rem",
  maxWidth: "590px",
  margin: "0 auto",
  lineHeight: 1.7
};
const lockedPanelStyle = {
  background: "linear-gradient(135deg, rgba(247,215,116,0.05), rgba(183,121,31,0.06))",
  border: "1px solid rgba(247,215,116,0.18)",
  borderRadius: "16px",
  padding: "28px",
  boxShadow: "0 0 70px rgba(247,215,116,0.06)"
};
const howItWorksStyle = {
  marginTop: "24px",
  background: "#0d1117",
  border: "1px solid rgba(183,121,31,0.18)",
  borderRadius: "12px",
  padding: "18px"
};
const statusStyle = {
  background: "rgba(247,215,116,0.07)",
  border: "1px solid rgba(247,215,116,0.18)",
  borderRadius: "10px",
  color: "#f8e7a0",
  fontSize: "0.9rem",
  lineHeight: 1.55,
  padding: "13px 15px",
  marginTop: "18px"
};
const accessPanelStyle = {
  background: "linear-gradient(135deg, rgba(247,215,116,0.05), rgba(183,121,31,0.06))",
  border: "1px solid rgba(247,215,116,0.18)",
  borderRadius: "12px",
  padding: "18px 22px",
  marginBottom: "32px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "14px",
  flexWrap: "wrap"
};
const sectionCardStyle = {
  background: "#0d1117",
  border: "1px solid rgba(247,215,116,0.12)",
  borderRadius: "12px",
  padding: "18px",
  color: "#e2e8f0",
  textDecoration: "none",
  minHeight: "150px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "14px"
};
const resourcePanelStyle = {
  background: "#0d1117",
  border: "1px solid rgba(247,215,116,0.12)",
  borderRadius: "12px",
  padding: "24px"
};
const notesStyle = {
  background: "rgba(16,185,129,0.06)",
  border: "1px solid rgba(16,185,129,0.18)",
  borderRadius: "10px",
  padding: "14px 16px",
  marginBottom: "18px",
  color: "#a7f3d0",
  fontSize: "0.88rem",
  lineHeight: 1.6
};
const resourceLinkStyle = {
  background: "#111827",
  border: "1px solid rgba(247,215,116,0.1)",
  borderRadius: "10px",
  padding: "14px",
  color: "#e2e8f0",
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  minHeight: "98px"
};
const downloadsPanelStyle = {
  marginTop: "24px",
  background: "#0d1117",
  border: "1px solid rgba(183,121,31,0.16)",
  borderRadius: "12px",
  padding: "24px"
};
const downloadItemStyle = {
  background: "#111827",
  border: "1px solid rgba(183,121,31,0.14)",
  borderRadius: "10px",
  padding: "14px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px"
};
const disclaimerStyle = {
  marginTop: "24px",
  background: "rgba(247,215,116,0.04)",
  border: "1px solid rgba(247,215,116,0.12)",
  borderRadius: "10px",
  padding: "18px",
  color: "#64748b",
  fontSize: "0.86rem",
  lineHeight: 1.65
};
export {
  ResourceLink,
  ResourcesPage as component,
  resourceSectionSlug
};
