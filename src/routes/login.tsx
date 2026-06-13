import { createFileRoute } from '@tanstack/react-router'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { checkBuyerAccess, saveSupabaseHashSession, saveSupabaseSession } from '../lib/access'
import { readApiJson } from '../lib/api'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

type LoginResponse = {
  access_token?: string
  refresh_token?: string
  email?: string
  error?: string
}

type PaymentVerification = {
  paid?: boolean
  unlocked?: boolean
  email?: string
  status?: string
  error?: string
}

type MagicLinkVerification = {
  access_token?: string
  refresh_token?: string
  error?: string
}

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPaymentAction, setShowPaymentAction] = useState(false)
  const [nextPath, setNextPath] = useState('/resources')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedNext = getSafeNextPath(params.get('next'))
    setNextPath(requestedNext)

    const token = saveSupabaseHashSession()
    if (token) {
      finishLogin(token, requestedNext)
      return
    }

    const tokenHash = params.get('token_hash')
    if (tokenHash) {
      verifyMagicLink(tokenHash, params.get('type') || 'email', requestedNext)
      return
    }

    const orderId = params.get('order_id')
    if (params.get('payment') === 'return' && orderId) verifyPayment(orderId)
  }, [])

  const finishLogin = async (token: string, next = nextPath) => {
    setMessage('Checking your dashboard access...')
    const result = await checkBuyerAccess(token)
    if (result.has_access) {
      window.location.href = next
      return
    }

    setShowPaymentAction(true)
    setMessage('Login successful. Complete payment to unlock the buyer dashboard.')
  }

  const verifyMagicLink = async (tokenHash: string, type: string, next: string) => {
    setMessage('Verifying your login link...')
    try {
      const response = await fetch('/api/verify-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token_hash: tokenHash, type }),
      })
      const data = await readApiJson<MagicLinkVerification>(response, '/api/verify-magic-link')
      if (!response.ok || !data.access_token) throw new Error(data.error || 'Login link could not be verified.')

      saveSupabaseSession(data.access_token, data.refresh_token)
      window.history.replaceState(null, '', '/login')
      await finishLogin(data.access_token, next)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login link could not be verified.')
    }
  }

  const verifyPayment = async (orderId: string) => {
    setMessage('Verifying your payment...')
    try {
      const response = await fetch(`/api/verify-cashfree-order?order_id=${encodeURIComponent(orderId)}`)
      const data = await readApiJson<PaymentVerification>(response, '/api/verify-cashfree-order')
      if (!response.ok) throw new Error(data.error || 'Could not verify payment.')
      if (!data.paid || !data.unlocked) {
        setMessage(`Payment is ${data.status || 'pending'}. If you paid successfully, wait a moment and refresh this page.`)
        return
      }

      setEmail(data.email || '')
      setMessage('Payment verified. Login with your password to open the dashboard.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not verify payment.')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')
    setShowPaymentAction(false)
    setIsSubmitting(true)

    try {
      if (!isValidEmail(email)) throw new Error('Enter a valid email address.')
      if (!password) throw new Error('Enter your password.')

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      })
      const data = await readApiJson<LoginResponse>(response, '/api/login')
      if (!response.ok || !data.access_token) throw new Error(data.error || 'Invalid email or password.')

      saveSupabaseSession(data.access_token, data.refresh_token)
      await finishLogin(data.access_token)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not login.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const sendMagicLink = async () => {
    setMessage('')
    if (!email.trim()) {
      setMessage('Enter your email first, then request a login link.')
      return
    }

    setIsSubmitting(true)
    try {
      if (!isValidEmail(email)) throw new Error('Enter a valid email address.')

      const response = await fetch('/api/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), next: nextPath }),
      })
      const data = await readApiJson<{ error?: string }>(response, '/api/send-magic-link')
      if (!response.ok) throw new Error(data.error || 'Could not send login link.')
      setMessage('Check your email for the secure login link.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not send login link.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="cyber-grid" style={{
      background: 'radial-gradient(circle at 20% 15%, rgba(247,215,116,0.09), transparent 30%), radial-gradient(circle at 80% 10%, rgba(183,121,31,0.1), transparent 34%), #050810',
      minHeight: '100vh',
      padding: '96px 16px 60px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <main style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
        <section style={panelStyle}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div className="badge badge-cyan" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              Step 2: Login
            </div>
            <h1 style={titleStyle}>Login to your account</h1>
            <p style={copyStyle}>
              Use your email and password. If payment is complete, you will go straight to the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="login-email" style={labelStyle}>Gmail / email address</label>
              <input id="login-email" type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" placeholder="you@gmail.com" style={fieldStyle} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="login-password" style={labelStyle}>Password</label>
              <input id="login-password" type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" style={fieldStyle} />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary" style={buttonStyle}>
              {isSubmitting ? 'Logging In...' : 'Login'}
            </button>
          </form>

          <a href={`/api/google-login?next=${encodeURIComponent(nextPath)}`} className="btn-secondary" style={secondaryButtonStyle}>
            Continue with Google
          </a>

          <button type="button" disabled={isSubmitting} onClick={sendMagicLink} className="btn-secondary" style={{ ...secondaryButtonStyle, background: 'transparent' }}>
            Email Me a Backup Login Link
          </button>

          {message ? (
            <div role="status" style={statusStyle}>
              {message}
              {showPaymentAction ? (
                <div style={{ marginTop: '12px' }}>
                  <a href="/checkout" className="btn-primary" style={{ width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
                    Continue to Payment
                  </a>
                </div>
              ) : null}
            </div>
          ) : null}

          <div style={noteStyle}>
            Account login and payment access are separate. Login proves the buyer email; payment unlocks resources for that email.
          </div>

          <p style={footerLinkStyle}>
            New buyer? <a href="/signup" style={linkStyle}>Create account</a>
          </p>
        </section>
      </main>
    </div>
  )
}

const panelStyle = { background: 'linear-gradient(135deg, rgba(13,17,23,0.96), rgba(17,24,39,0.94))', border: '1px solid rgba(247,215,116,0.18)', borderRadius: '18px', padding: 'clamp(24px, 5vw, 36px)', boxShadow: '0 0 80px rgba(247,215,116,0.08)' } as const
const titleStyle = { color: '#f8fafc', fontSize: 'clamp(1.75rem, 7vw, 2.35rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 12px' } as const
const copyStyle = { color: '#94a3b8', fontSize: '0.98rem', lineHeight: 1.65, margin: 0 } as const
const labelStyle = { display: 'block', color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px' } as const
const fieldStyle = { width: '100%', background: '#111827', border: '1px solid rgba(247,215,116,0.2)', borderRadius: '9px', padding: '13px 15px', color: '#e2e8f0', fontSize: '0.96rem', outline: 'none', boxSizing: 'border-box' } as const
const buttonStyle = { width: '100%', textAlign: 'center', boxSizing: 'border-box', padding: '15px 18px' } as const
const secondaryButtonStyle = { width: '100%', textAlign: 'center', boxSizing: 'border-box', marginTop: '14px' } as const
const statusStyle = { background: 'rgba(247,215,116,0.06)', border: '1px solid rgba(247,215,116,0.16)', borderRadius: '9px', padding: '12px 14px', color: '#93c5fd', fontSize: '0.84rem', lineHeight: 1.5, marginTop: '18px' } as const
const noteStyle = { background: '#111827', border: '1px solid rgba(183,121,31,0.2)', borderRadius: '9px', padding: '14px', marginTop: '18px', color: '#64748b', fontSize: '0.84rem', lineHeight: 1.55 } as const
const footerLinkStyle = { color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', margin: '22px 0 0' } as const
const linkStyle = { color: '#f7d774', fontWeight: 800, textDecoration: 'none' } as const

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function getSafeNextPath(value: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/resources'
  return value
}
