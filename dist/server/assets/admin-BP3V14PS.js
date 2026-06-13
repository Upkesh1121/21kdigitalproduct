import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { c as checkBuyerAccess, g as getAccessToken } from "./access-DU0rByU4.js";
import { r as readApiJson } from "./api-CWR5F0Sv.js";
function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [adminStatus, setAdminStatus] = useState("checking");
  const [adminEmail, setAdminEmail] = useState(null);
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [cfPaymentId, setCfPaymentId] = useState("");
  const [role, setRole] = useState("buyer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    let cancelled = false;
    checkBuyerAccess().then((result) => {
      if (cancelled) return;
      setAdminEmail(result.email);
      setAdminStatus(result.role === "admin" ? "admin" : "locked");
    }).catch(() => {
      if (!cancelled) setAdminStatus("locked");
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    if (!email.trim()) {
      setMessage("Enter the buyer email.");
      return;
    }
    if (adminStatus !== "admin" && !adminKey.trim()) {
      setMessage("Login with your admin Gmail first, or enter ADMIN_ACCESS_KEY.");
      return;
    }
    setIsSubmitting(true);
    try {
      const token = getAccessToken();
      const headers = {
        "Content-Type": "application/json"
      };
      if (token) headers.authorization = `Bearer ${token}`;
      if (adminKey.trim()) headers["x-admin-key"] = adminKey.trim();
      const response = await fetch("/api/admin-grant-access", {
        method: "POST",
        headers,
        body: JSON.stringify({
          email,
          role,
          order_id: orderId,
          cf_payment_id: cfPaymentId,
          mark_paid: true
        })
      });
      const data = await readApiJson(response, "/api/admin-grant-access");
      if (!response.ok) throw new Error(data.error || "Could not grant access.");
      setMessage(`Access granted for ${data.email} as ${data.role}${data.paid_order_id ? ` and order ${data.paid_order_id} marked paid` : ""}.`);
      setEmail("");
      setOrderId("");
      setCfPaymentId("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not grant access.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "cyber-grid", style: {
    background: "#050810",
    minHeight: "100vh",
    padding: "112px 16px 72px"
  }, children: /* @__PURE__ */ jsx("main", { style: {
    maxWidth: "560px",
    margin: "0 auto"
  }, children: /* @__PURE__ */ jsxs("section", { style: {
    background: "linear-gradient(135deg, rgba(13,17,23,0.97), rgba(17,24,39,0.94))",
    border: "1px solid rgba(247,215,116,0.18)",
    borderRadius: "16px",
    padding: "clamp(24px, 5vw, 34px)",
    boxShadow: "0 20px 80px rgba(0,0,0,0.34)"
  }, children: [
    /* @__PURE__ */ jsx("div", { className: "badge badge-cyan", style: {
      display: "inline-flex",
      marginBottom: "16px"
    }, children: "Admin Access" }),
    /* @__PURE__ */ jsx("h1", { style: {
      color: "#f8fafc",
      fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
      lineHeight: 1.1,
      margin: "0 0 10px",
      fontWeight: 900
    }, children: "Grant buyer access" }),
    /* @__PURE__ */ jsx("p", { style: {
      color: "#94a3b8",
      lineHeight: 1.65,
      margin: "0 0 26px"
    }, children: "Login with your admin Gmail to grant buyer access. ADMIN_ACCESS_KEY is an optional backup secret from Cloudflare." }),
    /* @__PURE__ */ jsx("div", { style: {
      background: adminStatus === "admin" ? "rgba(16,185,129,0.08)" : "rgba(247,215,116,0.07)",
      border: `1px solid ${adminStatus === "admin" ? "rgba(16,185,129,0.22)" : "rgba(247,215,116,0.18)"}`,
      borderRadius: "10px",
      padding: "13px 15px",
      color: adminStatus === "admin" ? "#a7f3d0" : "#f8e7a0",
      fontSize: "0.88rem",
      lineHeight: 1.55,
      marginBottom: "18px"
    }, children: adminStatus === "checking" ? "Checking admin login..." : adminStatus === "admin" ? `Admin logged in${adminEmail ? ` as ${adminEmail}` : ""}.` : "Not logged in as admin. Login with the email in ADMIN_EMAILS, or use ADMIN_ACCESS_KEY below." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(AdminField, { label: "Admin key (optional if admin Gmail is logged in)", id: "admin-key", children: /* @__PURE__ */ jsx("input", { id: "admin-key", type: "password", value: adminKey, onChange: (event) => setAdminKey(event.target.value), placeholder: "ADMIN_ACCESS_KEY", style: fieldStyle, autoComplete: "off" }) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Buyer email", id: "buyer-email", children: /* @__PURE__ */ jsx("input", { id: "buyer-email", type: "email", value: email, onChange: (event) => setEmail(event.target.value), placeholder: "buyer@example.com", style: fieldStyle, autoComplete: "email" }) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Order ID (optional)", id: "order-id", children: /* @__PURE__ */ jsx("input", { id: "order-id", value: orderId, onChange: (event) => setOrderId(event.target.value), placeholder: "Leave blank to mark latest order for this email", style: fieldStyle, autoComplete: "off" }) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Cashfree payment ID (optional)", id: "cf-payment-id", children: /* @__PURE__ */ jsx("input", { id: "cf-payment-id", value: cfPaymentId, onChange: (event) => setCfPaymentId(event.target.value), placeholder: "cf_payment_id from Cashfree, if available", style: fieldStyle, autoComplete: "off" }) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Role", id: "buyer-role", children: /* @__PURE__ */ jsxs("select", { id: "buyer-role", value: role, onChange: (event) => setRole(event.target.value === "admin" ? "admin" : "buyer"), style: fieldStyle, children: [
        /* @__PURE__ */ jsx("option", { value: "buyer", children: "Buyer" }),
        /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" })
      ] }) }),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "btn-primary", disabled: isSubmitting, style: {
        width: "100%",
        marginTop: "8px"
      }, children: isSubmitting ? "Granting Access..." : "Grant Access" })
    ] }),
    message ? /* @__PURE__ */ jsx("div", { role: "status", style: {
      background: "rgba(247,215,116,0.07)",
      border: "1px solid rgba(247,215,116,0.18)",
      borderRadius: "10px",
      color: "#f8e7a0",
      fontSize: "0.9rem",
      lineHeight: 1.55,
      padding: "13px 15px",
      marginTop: "18px"
    }, children: message }) : null
  ] }) }) });
}
function AdminField({
  label,
  id,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { style: {
    marginBottom: "16px"
  }, children: [
    /* @__PURE__ */ jsx("label", { htmlFor: id, style: {
      display: "block",
      color: "#cbd5e1",
      fontSize: "0.88rem",
      fontWeight: 800,
      marginBottom: "8px"
    }, children: label }),
    children
  ] });
}
const fieldStyle = {
  width: "100%",
  background: "#111827",
  border: "1px solid rgba(247,215,116,0.2)",
  borderRadius: "10px",
  padding: "13px 14px",
  color: "#e2e8f0",
  fontSize: "0.96rem",
  outline: "none",
  boxSizing: "border-box"
};
export {
  AdminPage as component
};
