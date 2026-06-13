import { jsxs, jsx } from "react/jsx-runtime";
import { ChevronLeft, ShieldCheck, CreditCard, WalletCards, Clock, LockKeyhole, Sparkles, Check, Mail, Download, BadgeCheck } from "lucide-react";
import { useState, useMemo } from "react";
import { C as CountdownTimer } from "./CountdownTimer-BzbsmKR_.js";
import { r as readApiJson } from "./api-CWR5F0Sv.js";
const INCLUDED_ITEMS = ["100+ curated AI developer resources", "30+ prompt templates and workflows", "Copy-paste setup commands", "Launch and monetization checklists", "PDF downloads for included guides", "Future resource updates included"];
const DELIVERY_STEPS = [{
  icon: Mail,
  title: "Order confirmation",
  text: "Your purchase email is matched with your buyer account."
}, {
  icon: LockKeyhole,
  title: "Dashboard unlock",
  text: "Access opens automatically after successful payment verification."
}, {
  icon: Download,
  title: "Premium files",
  text: "Included PDF guides and resources stay available in your library."
}];
function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");
  const couponStatus = useMemo(() => {
    if (!coupon.trim()) return null;
    if (coupon.trim().toLowerCase() === "launch21") {
      return {
        valid: true,
        text: "Launch offer already applied."
      };
    }
    return {
      valid: false,
      text: "This code is not active yet."
    };
  }, [coupon]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setMessage("Add your name, email, and phone number so access can be delivered after payment.");
      return;
    }
    const phoneDigits = phone.replace(/\D/g, "").slice(-10);
    if (phoneDigits.length !== 10) {
      setMessage("Enter a valid 10 digit phone number for Cashfree checkout.");
      return;
    }
    setIsSubmitting(true);
    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 25e3);
      const orderResponse = await fetch("/api/create-cashfree-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        signal: controller.signal,
        body: JSON.stringify({
          name,
          email,
          phone: phoneDigits
        })
      });
      window.clearTimeout(timeoutId);
      const orderData = await readApiJson(orderResponse, "/api/create-cashfree-order");
      if (!orderResponse.ok) throw new Error(orderData.error || "Could not start payment.");
      if (!orderData.payment_session_id) throw new Error("Cashfree did not return a payment session.");
      await loadCashfreeSdk();
      const cashfree = window.Cashfree({
        mode: orderData.cashfree_mode || "production"
      });
      await cashfree.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: "_self"
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setMessage("Payment server did not respond. Check Cloudflare environment variables and try again.");
      } else {
        setMessage(error instanceof Error ? error.message : "Payment could not be started.");
      }
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "cyber-grid", style: {
    background: "radial-gradient(circle at 12% 10%, rgba(247,215,116,0.09), transparent 28%), radial-gradient(circle at 86% 18%, rgba(16,185,129,0.08), transparent 30%), #050810",
    minHeight: "100vh",
    padding: "clamp(84px, 9vw, 120px) 16px 72px"
  }, children: [
    /* @__PURE__ */ jsx("style", { children: `
        .checkout-field:focus {
          border-color: rgba(247, 215, 116, 0.66) !important;
          box-shadow: 0 0 0 3px rgba(247, 215, 116, 0.12);
        }

        .checkout-action:focus-visible,
        .checkout-link:focus-visible,
        .checkout-method:focus-visible {
          outline: 2px solid rgba(247, 215, 116, 0.85);
          outline-offset: 3px;
        }

        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }

          .checkout-summary {
            position: static !important;
          }
        }

        @media (max-width: 560px) {
          .checkout-panel,
          .checkout-summary {
            padding: 22px !important;
          }

          .checkout-hero-row,
          .checkout-price-row {
            align-items: flex-start !important;
            flex-direction: column !important;
          }
        }
      ` }),
    /* @__PURE__ */ jsxs("div", { style: {
      maxWidth: "1160px",
      margin: "0 auto"
    }, children: [
      /* @__PURE__ */ jsxs("a", { href: "/#pricing", className: "checkout-link", style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        color: "#94a3b8",
        textDecoration: "none",
        fontSize: "0.9rem",
        fontWeight: 700,
        marginBottom: "26px"
      }, children: [
        /* @__PURE__ */ jsx(ChevronLeft, { size: 16 }),
        "Back to pricing"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "checkout-hero-row", style: {
        display: "flex",
        justifyContent: "space-between",
        gap: "24px",
        alignItems: "flex-end",
        marginBottom: "32px"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          maxWidth: "680px"
        }, children: [
          /* @__PURE__ */ jsx("div", { className: "badge badge-cyan", style: {
            display: "inline-flex",
            marginBottom: "18px"
          }, children: "Step 3: Payment" }),
          /* @__PURE__ */ jsxs("h1", { style: {
            color: "#f8fafc",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            lineHeight: 1.06,
            margin: "0 0 14px"
          }, children: [
            "Unlock your ",
            /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "21k Pack" })
          ] }),
          /* @__PURE__ */ jsx("p", { style: {
            color: "#94a3b8",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            margin: 0
          }, children: "Use the same email you signed up and logged in with. Payment unlocks the buyer dashboard for that email." })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          background: "rgba(16,185,129,0.08)",
          border: "1px solid rgba(16,185,129,0.24)",
          borderRadius: "10px",
          padding: "12px 14px",
          color: "#a7f3d0",
          fontSize: "0.9rem",
          fontWeight: 800,
          whiteSpace: "nowrap"
        }, children: [
          /* @__PURE__ */ jsx(ShieldCheck, { size: 18 }),
          "Buyer access ready"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "checkout-grid", style: {
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 390px",
        gap: "22px",
        alignItems: "start"
      }, children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "checkout-panel", style: {
          background: "linear-gradient(135deg, rgba(13,17,23,0.97), rgba(17,24,39,0.94))",
          border: "1px solid rgba(247,215,116,0.18)",
          borderRadius: "18px",
          padding: "clamp(24px, 4vw, 34px)",
          boxShadow: "0 20px 80px rgba(0,0,0,0.34)"
        }, children: [
          /* @__PURE__ */ jsx(CheckoutSectionHeader, { kicker: "Step 1", title: "Buyer Details", text: "Use the same email as your 21k account so your dashboard unlocks correctly after payment." }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "28px"
          }, children: [
            /* @__PURE__ */ jsx(Field, { label: "Full name", id: "buyer-name", children: /* @__PURE__ */ jsx("input", { id: "buyer-name", className: "checkout-field", value: name, onChange: (event) => setName(event.target.value), placeholder: "Your name", autoComplete: "name", style: fieldStyle }) }),
            /* @__PURE__ */ jsx(Field, { label: "Email address", id: "buyer-email", children: /* @__PURE__ */ jsx("input", { id: "buyer-email", className: "checkout-field", type: "email", value: email, onChange: (event) => setEmail(event.target.value), placeholder: "you@example.com", autoComplete: "email", style: fieldStyle }) }),
            /* @__PURE__ */ jsx(Field, { label: "Phone number", id: "buyer-phone", children: /* @__PURE__ */ jsx("input", { id: "buyer-phone", className: "checkout-field", type: "tel", value: phone, onChange: (event) => setPhone(event.target.value), placeholder: "9876543210", autoComplete: "tel", style: fieldStyle }) })
          ] }),
          /* @__PURE__ */ jsx(CheckoutSectionHeader, { kicker: "Step 2", title: "Payment Method", text: "Choose a secure payment method. You will complete the transaction on Cashfree checkout." }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "12px",
            marginBottom: "22px"
          }, children: [
            /* @__PURE__ */ jsx(PaymentOption, { active: paymentMethod === "card", icon: CreditCard, title: "Card", text: "Credit or debit card", onClick: () => setPaymentMethod("card") }),
            /* @__PURE__ */ jsx(PaymentOption, { active: paymentMethod === "upi", icon: WalletCards, title: "UPI", text: "UPI apps and QR pay", onClick: () => setPaymentMethod("upi") })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: {
            background: "#111827",
            border: "1px solid rgba(183,121,31,0.24)",
            borderRadius: "12px",
            padding: "18px",
            marginBottom: "28px"
          }, children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#f7d774",
              fontWeight: 800,
              marginBottom: "8px"
            }, children: [
              /* @__PURE__ */ jsx(Clock, { size: 18 }),
              "Cashfree secure checkout"
            ] }),
            /* @__PURE__ */ jsx("p", { style: {
              color: "#94a3b8",
              fontSize: "0.9rem",
              lineHeight: 1.65,
              margin: 0
            }, children: "Continue to Cashfree's hosted checkout. Your 21k dashboard unlocks only after the payment is verified successfully." })
          ] }),
          /* @__PURE__ */ jsx(CheckoutSectionHeader, { kicker: "Step 3", title: "Offer Code", text: "Launch discount is already included in the order total." }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            gap: "10px",
            marginBottom: "12px",
            flexWrap: "wrap"
          }, children: [
            /* @__PURE__ */ jsx("input", { className: "checkout-field", value: coupon, onChange: (event) => setCoupon(event.target.value), placeholder: "Optional code", "aria-label": "Offer code", style: {
              ...fieldStyle,
              flex: "1 1 220px"
            } }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "btn-secondary checkout-action", onClick: () => setCoupon(coupon || "LAUNCH21"), style: {
              padding: "12px 18px",
              flex: "0 0 auto"
            }, children: "Apply" })
          ] }),
          couponStatus ? /* @__PURE__ */ jsx("p", { style: {
            color: couponStatus.valid ? "#10b981" : "#f87171",
            fontSize: "0.84rem",
            margin: "0 0 24px"
          }, children: couponStatus.text }) : /* @__PURE__ */ jsx("div", { style: {
            marginBottom: "24px"
          } }),
          /* @__PURE__ */ jsxs("button", { type: "submit", disabled: isSubmitting, className: "btn-primary checkout-action", style: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "16px 18px",
            fontSize: "16px"
          }, children: [
            /* @__PURE__ */ jsx(LockKeyhole, { size: 18 }),
            isSubmitting ? "Starting Payment..." : "Continue to Payment"
          ] }),
          message ? /* @__PURE__ */ jsx("div", { role: "status", style: {
            background: "rgba(247,215,116,0.07)",
            border: "1px solid rgba(247,215,116,0.18)",
            borderRadius: "10px",
            padding: "14px 16px",
            color: "#f8e7a0",
            fontSize: "0.88rem",
            lineHeight: 1.55,
            marginTop: "16px"
          }, children: message }) : null
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "checkout-summary", style: {
          position: "sticky",
          top: "88px",
          background: "linear-gradient(135deg, rgba(13,17,23,0.98), rgba(17,24,39,0.96))",
          border: "1px solid rgba(247,215,116,0.2)",
          borderRadius: "18px",
          padding: "28px",
          boxShadow: "0 24px 90px rgba(0,0,0,0.38)"
        }, children: [
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "18px"
          }, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "badge badge-green", style: {
                display: "inline-flex",
                marginBottom: "12px"
              }, children: "80% OFF" }),
              /* @__PURE__ */ jsx("h2", { style: {
                color: "#f8fafc",
                fontSize: "1.35rem",
                lineHeight: 1.2,
                fontWeight: 900,
                margin: 0
              }, children: "21k AI Developer Resource Pack" })
            ] }),
            /* @__PURE__ */ jsx(Sparkles, { size: 28, color: "#f7d774" })
          ] }),
          /* @__PURE__ */ jsx("p", { style: {
            color: "#94a3b8",
            fontSize: "0.9rem",
            lineHeight: 1.6,
            margin: "0 0 20px"
          }, children: "Organized links, commands, prompts, launch templates, and downloadable PDFs for AI-powered development." }),
          /* @__PURE__ */ jsxs("div", { className: "checkout-price-row", style: {
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px",
            background: "rgba(247,215,116,0.06)",
            border: "1px solid rgba(247,215,116,0.18)",
            borderRadius: "14px",
            padding: "18px",
            marginBottom: "18px"
          }, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { style: {
                color: "#64748b",
                fontWeight: 800,
                textDecoration: "line-through"
              }, children: "Rs. 999" }),
              /* @__PURE__ */ jsx("div", { style: {
                color: "#64748b",
                fontSize: "0.85rem",
                fontWeight: 700,
                textDecoration: "line-through",
                marginTop: "2px"
              }, children: "Rs. 499" })
            ] }),
            /* @__PURE__ */ jsxs("div", { style: {
              textAlign: "right"
            }, children: [
              /* @__PURE__ */ jsx("div", { style: {
                color: "#f8fafc",
                fontSize: "2.8rem",
                fontWeight: 900,
                lineHeight: 0.95
              }, children: "Rs. 199" }),
              /* @__PURE__ */ jsx("div", { style: {
                color: "#10b981",
                fontSize: "0.82rem",
                fontWeight: 900,
                marginTop: "8px"
              }, children: "Launch price" })
            ] })
          ] }),
          /* @__PURE__ */ jsx(CountdownTimer, { compact: true }),
          /* @__PURE__ */ jsx("div", { style: {
            height: "1px",
            background: "rgba(247,215,116,0.12)",
            margin: "22px 0"
          } }),
          /* @__PURE__ */ jsx("div", { style: {
            display: "grid",
            gap: "11px",
            marginBottom: "24px"
          }, children: INCLUDED_ITEMS.map((item) => /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "flex-start",
            gap: "10px"
          }, children: [
            /* @__PURE__ */ jsx("span", { style: {
              width: "19px",
              height: "19px",
              borderRadius: "50%",
              background: "rgba(16,185,129,0.12)",
              color: "#10b981",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "0 0 auto",
              marginTop: "1px"
            }, children: /* @__PURE__ */ jsx(Check, { size: 13, strokeWidth: 3 }) }),
            /* @__PURE__ */ jsx("span", { style: {
              color: "#cbd5e1",
              fontSize: "0.88rem",
              lineHeight: 1.45
            }, children: item })
          ] }, item)) }),
          /* @__PURE__ */ jsx("div", { style: {
            display: "grid",
            gap: "10px"
          }, children: DELIVERY_STEPS.map((step) => {
            const Icon = step.icon;
            return /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              gap: "12px",
              background: "#111827",
              border: "1px solid rgba(247,215,116,0.12)",
              borderRadius: "10px",
              padding: "13px"
            }, children: [
              /* @__PURE__ */ jsx(Icon, { size: 18, color: "#f7d774", style: {
                flex: "0 0 auto",
                marginTop: "2px"
              } }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { style: {
                  color: "#e2e8f0",
                  fontSize: "0.86rem",
                  fontWeight: 800
                }, children: step.title }),
                /* @__PURE__ */ jsx("div", { style: {
                  color: "#64748b",
                  fontSize: "0.8rem",
                  lineHeight: 1.45,
                  marginTop: "3px"
                }, children: step.text })
              ] })
            ] }, step.title);
          }) }),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: "9px",
            color: "#94a3b8",
            fontSize: "0.8rem",
            lineHeight: 1.45,
            marginTop: "18px"
          }, children: [
            /* @__PURE__ */ jsx(BadgeCheck, { size: 17, color: "#10b981", style: {
              flex: "0 0 auto"
            } }),
            "No subscription. Lifetime access after purchase."
          ] })
        ] })
      ] })
    ] })
  ] });
}
function CheckoutSectionHeader({
  kicker,
  title,
  text
}) {
  return /* @__PURE__ */ jsxs("div", { style: {
    marginBottom: "16px"
  }, children: [
    /* @__PURE__ */ jsx("div", { style: {
      color: "#f7d774",
      fontSize: "0.75rem",
      fontWeight: 900,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: "6px"
    }, children: kicker }),
    /* @__PURE__ */ jsx("h2", { style: {
      color: "#f8fafc",
      fontSize: "1.18rem",
      fontWeight: 900,
      margin: "0 0 6px"
    }, children: title }),
    /* @__PURE__ */ jsx("p", { style: {
      color: "#64748b",
      fontSize: "0.9rem",
      lineHeight: 1.55,
      margin: 0
    }, children: text })
  ] });
}
function Field({
  label,
  id,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { htmlFor: id, style: {
      display: "block",
      color: "#cbd5e1",
      fontSize: "0.86rem",
      fontWeight: 800,
      marginBottom: "8px"
    }, children: label }),
    children
  ] });
}
function PaymentOption({
  active,
  icon: Icon,
  title,
  text,
  onClick
}) {
  return /* @__PURE__ */ jsxs("button", { type: "button", className: "checkout-method", onClick, "aria-pressed": active, style: {
    width: "100%",
    textAlign: "left",
    background: active ? "rgba(247,215,116,0.1)" : "#111827",
    border: `1px solid ${active ? "rgba(247,215,116,0.48)" : "rgba(247,215,116,0.14)"}`,
    borderRadius: "12px",
    padding: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  }, children: [
    /* @__PURE__ */ jsx("span", { style: {
      width: "38px",
      height: "38px",
      borderRadius: "10px",
      background: active ? "linear-gradient(135deg, #f7d774, #b7791f)" : "rgba(247,215,116,0.08)",
      color: active ? "#090806" : "#f7d774",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "0 0 auto"
    }, children: /* @__PURE__ */ jsx(Icon, { size: 19 }) }),
    /* @__PURE__ */ jsxs("span", { children: [
      /* @__PURE__ */ jsx("span", { style: {
        display: "block",
        color: "#e2e8f0",
        fontSize: "0.93rem",
        fontWeight: 900
      }, children: title }),
      /* @__PURE__ */ jsx("span", { style: {
        display: "block",
        color: "#64748b",
        fontSize: "0.8rem",
        marginTop: "3px"
      }, children: text })
    ] })
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
function loadCashfreeSdk() {
  if (window.Cashfree) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[src="https://sdk.cashfree.com/js/v3/cashfree.js"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), {
        once: true
      });
      existingScript.addEventListener("error", () => reject(new Error("Could not load Cashfree checkout.")), {
        once: true
      });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Cashfree checkout."));
    document.head.appendChild(script);
  });
}
export {
  CheckoutPage as component
};
