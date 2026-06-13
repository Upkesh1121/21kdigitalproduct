import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { a as saveSupabaseHashSession, c as checkBuyerAccess, s as saveSupabaseSession } from "./access-DU0rByU4.js";
import { r as readApiJson } from "./api-CWR5F0Sv.js";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentAction, setShowPaymentAction] = useState(false);
  const [nextPath, setNextPath] = useState("/resources");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedNext = getSafeNextPath(params.get("next"));
    setNextPath(requestedNext);
    const token = saveSupabaseHashSession();
    if (token) {
      finishLogin(token, requestedNext);
      return;
    }
    const tokenHash = params.get("token_hash");
    if (tokenHash) {
      verifyMagicLink(tokenHash, params.get("type") || "email", requestedNext);
      return;
    }
    const orderId = params.get("order_id");
    if (params.get("payment") === "return" && orderId) verifyPayment(orderId);
  }, []);
  const finishLogin = async (token, next = nextPath) => {
    setMessage("Checking your dashboard access...");
    const result = await checkBuyerAccess(token);
    if (result.has_access) {
      window.location.href = next;
      return;
    }
    setShowPaymentAction(true);
    setMessage("Login successful. Complete payment to unlock the buyer dashboard.");
  };
  const verifyMagicLink = async (tokenHash, type, next) => {
    setMessage("Verifying your login link...");
    try {
      const response = await fetch("/api/verify-magic-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token_hash: tokenHash,
          type
        })
      });
      const data = await readApiJson(response, "/api/verify-magic-link");
      if (!response.ok || !data.access_token) throw new Error(data.error || "Login link could not be verified.");
      saveSupabaseSession(data.access_token, data.refresh_token);
      window.history.replaceState(null, "", "/login");
      await finishLogin(data.access_token, next);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login link could not be verified.");
    }
  };
  const verifyPayment = async (orderId) => {
    setMessage("Verifying your payment...");
    try {
      const response = await fetch(`/api/verify-cashfree-order?order_id=${encodeURIComponent(orderId)}`);
      const data = await readApiJson(response, "/api/verify-cashfree-order");
      if (!response.ok) throw new Error(data.error || "Could not verify payment.");
      if (!data.paid || !data.unlocked) {
        setMessage(`Payment is ${data.status || "pending"}. If you paid successfully, wait a moment and refresh this page.`);
        return;
      }
      setEmail(data.email || "");
      setMessage("Payment verified. Login with your password to open the dashboard.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not verify payment.");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setShowPaymentAction(false);
    setIsSubmitting(true);
    try {
      if (!isValidEmail(email)) throw new Error("Enter a valid email address.");
      if (!password) throw new Error("Enter your password.");
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim(),
          password
        })
      });
      const data = await readApiJson(response, "/api/login");
      if (!response.ok || !data.access_token) throw new Error(data.error || "Invalid email or password.");
      saveSupabaseSession(data.access_token, data.refresh_token);
      await finishLogin(data.access_token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not login.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const sendMagicLink = async () => {
    setMessage("");
    if (!email.trim()) {
      setMessage("Enter your email first, then request a login link.");
      return;
    }
    setIsSubmitting(true);
    try {
      if (!isValidEmail(email)) throw new Error("Enter a valid email address.");
      const response = await fetch("/api/send-magic-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim(),
          next: nextPath
        })
      });
      const data = await readApiJson(response, "/api/send-magic-link");
      if (!response.ok) throw new Error(data.error || "Could not send login link.");
      setMessage("Check your email for the secure login link.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not send login link.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "cyber-grid", style: {
    background: "radial-gradient(circle at 20% 15%, rgba(247,215,116,0.09), transparent 30%), radial-gradient(circle at 80% 10%, rgba(183,121,31,0.1), transparent 34%), #050810",
    minHeight: "100vh",
    padding: "96px 16px 60px",
    display: "flex",
    alignItems: "center"
  }, children: /* @__PURE__ */ jsx("main", { style: {
    maxWidth: "500px",
    margin: "0 auto",
    width: "100%"
  }, children: /* @__PURE__ */ jsxs("section", { style: panelStyle, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      marginBottom: "28px"
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "badge badge-cyan", style: {
        display: "inline-flex",
        marginBottom: "16px"
      }, children: "Step 2: Login" }),
      /* @__PURE__ */ jsx("h1", { style: titleStyle, children: "Login to your account" }),
      /* @__PURE__ */ jsx("p", { style: copyStyle, children: "Use your email and password. If payment is complete, you will go straight to the dashboard." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [
      /* @__PURE__ */ jsxs("div", { style: {
        marginBottom: "16px"
      }, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "login-email", style: labelStyle, children: "Gmail / email address" }),
        /* @__PURE__ */ jsx("input", { id: "login-email", type: "email", value: email, onChange: (event) => setEmail(event.target.value), autoComplete: "email", placeholder: "you@gmail.com", style: fieldStyle })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        marginBottom: "16px"
      }, children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "login-password", style: labelStyle, children: "Password" }),
        /* @__PURE__ */ jsx("input", { id: "login-password", type: "password", value: password, onChange: (event) => setPassword(event.target.value), autoComplete: "current-password", style: fieldStyle })
      ] }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: isSubmitting, className: "btn-primary", style: buttonStyle, children: isSubmitting ? "Logging In..." : "Login" })
    ] }),
    /* @__PURE__ */ jsx("a", { href: `/api/google-login?next=${encodeURIComponent(nextPath)}`, className: "btn-secondary", style: secondaryButtonStyle, children: "Continue with Google" }),
    /* @__PURE__ */ jsx("button", { type: "button", disabled: isSubmitting, onClick: sendMagicLink, className: "btn-secondary", style: {
      ...secondaryButtonStyle,
      background: "transparent"
    }, children: "Email Me a Backup Login Link" }),
    message ? /* @__PURE__ */ jsxs("div", { role: "status", style: statusStyle, children: [
      message,
      showPaymentAction ? /* @__PURE__ */ jsx("div", { style: {
        marginTop: "12px"
      }, children: /* @__PURE__ */ jsx("a", { href: "/checkout", className: "btn-primary", style: {
        width: "100%",
        textAlign: "center",
        boxSizing: "border-box"
      }, children: "Continue to Payment" }) }) : null
    ] }) : null,
    /* @__PURE__ */ jsx("div", { style: noteStyle, children: "Account login and payment access are separate. Login proves the buyer email; payment unlocks resources for that email." }),
    /* @__PURE__ */ jsxs("p", { style: footerLinkStyle, children: [
      "New buyer? ",
      /* @__PURE__ */ jsx("a", { href: "/signup", style: linkStyle, children: "Create account" })
    ] })
  ] }) }) });
}
const panelStyle = {
  background: "linear-gradient(135deg, rgba(13,17,23,0.96), rgba(17,24,39,0.94))",
  border: "1px solid rgba(247,215,116,0.18)",
  borderRadius: "18px",
  padding: "clamp(24px, 5vw, 36px)",
  boxShadow: "0 0 80px rgba(247,215,116,0.08)"
};
const titleStyle = {
  color: "#f8fafc",
  fontSize: "clamp(1.75rem, 7vw, 2.35rem)",
  fontWeight: 900,
  lineHeight: 1.1,
  margin: "0 0 12px"
};
const copyStyle = {
  color: "#94a3b8",
  fontSize: "0.98rem",
  lineHeight: 1.65,
  margin: 0
};
const labelStyle = {
  display: "block",
  color: "#cbd5e1",
  fontSize: "0.88rem",
  fontWeight: 700,
  marginBottom: "8px"
};
const fieldStyle = {
  width: "100%",
  background: "#111827",
  border: "1px solid rgba(247,215,116,0.2)",
  borderRadius: "9px",
  padding: "13px 15px",
  color: "#e2e8f0",
  fontSize: "0.96rem",
  outline: "none",
  boxSizing: "border-box"
};
const buttonStyle = {
  width: "100%",
  textAlign: "center",
  boxSizing: "border-box",
  padding: "15px 18px"
};
const secondaryButtonStyle = {
  width: "100%",
  textAlign: "center",
  boxSizing: "border-box",
  marginTop: "14px"
};
const statusStyle = {
  background: "rgba(247,215,116,0.06)",
  border: "1px solid rgba(247,215,116,0.16)",
  borderRadius: "9px",
  padding: "12px 14px",
  color: "#93c5fd",
  fontSize: "0.84rem",
  lineHeight: 1.5,
  marginTop: "18px"
};
const noteStyle = {
  background: "#111827",
  border: "1px solid rgba(183,121,31,0.2)",
  borderRadius: "9px",
  padding: "14px",
  marginTop: "18px",
  color: "#64748b",
  fontSize: "0.84rem",
  lineHeight: 1.55
};
const footerLinkStyle = {
  color: "#94a3b8",
  fontSize: "0.9rem",
  textAlign: "center",
  margin: "22px 0 0"
};
const linkStyle = {
  color: "#f7d774",
  fontWeight: 800,
  textDecoration: "none"
};
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
function getSafeNextPath(value) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/resources";
  return value;
}
export {
  LoginPage as component
};
