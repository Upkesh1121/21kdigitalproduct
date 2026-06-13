import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { s as saveSupabaseSession } from "./access-DU0rByU4.js";
import { r as readApiJson } from "./api-CWR5F0Sv.js";
function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);
    try {
      const trimmedFullName = fullName.trim();
      const trimmedPhone = phone.trim();
      const trimmedEmail = email.trim();
      if (!trimmedFullName) throw new Error("Enter your full name.");
      if (trimmedPhone.replace(/\D/g, "").length < 10) throw new Error("Enter a valid mobile number.");
      if (!isValidEmail(trimmedEmail)) throw new Error("Enter a valid email address.");
      if (password.length < 8) throw new Error("Password must be at least 8 characters.");
      const signupResponse = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          full_name: trimmedFullName,
          phone: trimmedPhone,
          email: trimmedEmail,
          password
        })
      });
      const signupData = await readApiJson(signupResponse, "/api/signup");
      if (!signupResponse.ok) throw new Error(signupData.error || "Could not create account.");
      const loginResponse = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password
        })
      });
      const loginData = await readApiJson(loginResponse, "/api/login");
      if (!loginResponse.ok || !loginData.access_token) throw new Error(loginData.error || "Account created. Please login.");
      saveSupabaseSession(loginData.access_token, loginData.refresh_token);
      setMessage("Account created. Continue to payment to unlock your dashboard.");
      window.setTimeout(() => {
        window.location.href = "/checkout";
      }, 700);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not create account.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs(AuthShell, { children: [
    /* @__PURE__ */ jsxs("div", { style: {
      textAlign: "center",
      marginBottom: "28px"
    }, children: [
      /* @__PURE__ */ jsx("div", { className: "badge badge-cyan", style: {
        display: "inline-flex",
        marginBottom: "16px"
      }, children: "Step 1: Signup" }),
      /* @__PURE__ */ jsx("h1", { style: titleStyle, children: "Create your buyer account" }),
      /* @__PURE__ */ jsx("p", { style: copyStyle, children: "Add your mobile number, Gmail/email, and password. After signup you can pay and unlock the resource dashboard." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, noValidate: true, children: [
      /* @__PURE__ */ jsx(Field, { label: "Full name", id: "signup-name", children: /* @__PURE__ */ jsx("input", { id: "signup-name", value: fullName, onChange: (event) => setFullName(event.target.value), autoComplete: "name", style: fieldStyle }) }),
      /* @__PURE__ */ jsx(Field, { label: "Mobile number", id: "signup-phone", children: /* @__PURE__ */ jsx("input", { id: "signup-phone", value: phone, onChange: (event) => setPhone(event.target.value), autoComplete: "tel", inputMode: "tel", placeholder: "+91 99999 99999", style: fieldStyle }) }),
      /* @__PURE__ */ jsx(Field, { label: "Gmail / email address", id: "signup-email", children: /* @__PURE__ */ jsx("input", { id: "signup-email", type: "email", value: email, onChange: (event) => setEmail(event.target.value), autoComplete: "email", placeholder: "you@gmail.com", style: fieldStyle }) }),
      /* @__PURE__ */ jsx(Field, { label: "Password", id: "signup-password", children: /* @__PURE__ */ jsx("input", { id: "signup-password", type: "password", value: password, onChange: (event) => setPassword(event.target.value), autoComplete: "new-password", placeholder: "Minimum 8 characters", style: fieldStyle }) }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: isSubmitting, className: "btn-primary", style: buttonStyle, children: isSubmitting ? "Creating Account..." : "Create Account" })
    ] }),
    /* @__PURE__ */ jsx("a", { href: "/api/google-login?next=/checkout", className: "btn-secondary", style: secondaryButtonStyle, children: "Continue with Google" }),
    message ? /* @__PURE__ */ jsx(Status, { message }) : null,
    /* @__PURE__ */ jsxs("p", { style: footerLinkStyle, children: [
      "Already have an account? ",
      /* @__PURE__ */ jsx("a", { href: "/login", style: linkStyle, children: "Login" })
    ] })
  ] });
}
function AuthShell({
  children
}) {
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
  }, children: /* @__PURE__ */ jsx("section", { style: panelStyle, children }) }) });
}
function Field({
  label,
  id,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { style: {
    marginBottom: "16px"
  }, children: [
    /* @__PURE__ */ jsx("label", { htmlFor: id, style: labelStyle, children: label }),
    children
  ] });
}
function Status({
  message
}) {
  return /* @__PURE__ */ jsx("div", { role: "status", style: statusStyle, children: message });
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
  marginTop: "6px",
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
export {
  SignupPage as component
};
