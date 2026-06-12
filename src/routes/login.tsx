import { createFileRoute } from '@tanstack/react-router'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { checkBuyerAccess, saveSupabaseHashSession } from '../lib/access'
import { readApiJson } from '../lib/api'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

type LoginErrors = {
  email?: string
  password?: string
}

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [statusMessage, setStatusMessage] = useState('')
  const [isSendingLink, setIsSendingLink] = useState(false)

  useEffect(() => {
    const token = saveSupabaseHashSession()
    if (!token) return

    setStatusMessage('Checking your buyer access...')
    checkBuyerAccess(token).then(result => {
      if (result.has_access) {
        window.location.href = '/dashboard'
        return
      }

      setStatusMessage('Login worked, but this email does not have buyer access yet. Complete checkout first.')
    })
  }, [])

  const validate = (includePassword = true) => {
    const nextErrors: LoginErrors = {}

    if (!email.trim()) {
      nextErrors.email = 'Enter the email address used for purchase.'
    }

    if (includePassword && !password.trim()) {
      nextErrors.password = 'Use magic link to continue.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatusMessage('')

    handleMagicLink()
  }

  const handleMagicLink = async () => {
    setStatusMessage('')

    if (!validate(false)) return

    setIsSendingLink(true)
    try {
      const response = await fetch('/api/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await readApiJson<{ error?: string }>(response, '/api/send-magic-link')
      if (!response.ok) throw new Error(data.error || 'Could not send login link.')
      setStatusMessage('Check your email for the secure login link. Open it on this device to unlock your dashboard.')
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Could not send login link.')
    } finally {
      setIsSendingLink(false)
    }
  }

  return (
    <div className="cyber-grid" style={{
      background:
        'radial-gradient(circle at 20% 15%, rgba(247,215,116,0.09), transparent 30%), radial-gradient(circle at 80% 10%, rgba(183,121,31,0.1), transparent 34%), #050810',
      minHeight: '100vh',
      padding: '96px 16px 60px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <style>{`
        .login-focus-field:focus {
          border-color: rgba(247, 215, 116, 0.65) !important;
          box-shadow: 0 0 0 3px rgba(247, 215, 116, 0.12);
        }
        .login-link:focus-visible,
        .login-action:focus-visible {
          outline: 2px solid rgba(247, 215, 116, 0.85);
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: no-preference) {
          .login-panel {
            animation: login-panel-in 420ms ease both;
          }
          @keyframes login-panel-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>

      <main style={{ maxWidth: '480px', margin: '0 auto', width: '100%' }}>
        <section className="login-panel" style={{
          background: 'linear-gradient(135deg, rgba(13,17,23,0.96), rgba(17,24,39,0.94))',
          border: '1px solid rgba(247,215,116,0.18)',
          borderRadius: '18px',
          padding: 'clamp(24px, 5vw, 36px)',
          boxShadow: '0 0 80px rgba(247,215,116,0.08)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <a href="/" className="login-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '22px' }}>
              <span style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #f7d774, #b7791f)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 900,
                fontSize: '15px',
              }}>
                21
              </span>
              <span className="gradient-text" style={{ fontWeight: 900, fontSize: '1.3rem' }}>21k</span>
            </a>

            <div className="badge badge-cyan" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              Buyer Dashboard
            </div>
            <h1 style={{ color: '#f8fafc', fontSize: 'clamp(1.75rem, 7vw, 2.35rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 12px' }}>
              Access Your 21k Resource Pack
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.98rem', lineHeight: 1.65, margin: 0 }}>
              Login to open your buyer dashboard, resource library, prompts, setup commands, and downloads.
            </p>
          </div>

          <div style={{
            background: 'rgba(16,185,129,0.06)',
            border: '1px solid rgba(16,185,129,0.18)',
            borderRadius: '10px',
            padding: '14px 16px',
            color: '#a7f3d0',
            fontSize: '0.86rem',
            lineHeight: 1.55,
            marginBottom: '22px',
          }}>
            Access is available only for customers who purchased the 21k AI Developer Resource Pack.
          </div>

          <form onSubmit={handleLogin} noValidate>
            <div style={{ marginBottom: '18px' }}>
              <label htmlFor="buyer-email" style={{ display: 'block', color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px' }}>
                Email address
              </label>
              <input
                id="buyer-email"
                className="login-focus-field"
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'buyer-email-error' : undefined}
                style={{
                  width: '100%',
                  background: '#111827',
                  border: `1px solid ${errors.email ? 'rgba(248,113,113,0.65)' : 'rgba(247,215,116,0.2)'}`,
                  borderRadius: '9px',
                  padding: '13px 15px',
                  color: '#e2e8f0',
                  fontSize: '0.96rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {errors.email ? (
                <p id="buyer-email-error" style={{ color: '#f87171', fontSize: '0.8rem', margin: '7px 0 0' }}>{errors.email}</p>
              ) : null}
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <label htmlFor="buyer-password" style={{ color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 700 }}>
                  Password
                </label>
                <a href="/login" className="login-link" style={{ color: '#f7d774', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  Forgot password?
                </a>
              </div>
              <input
                id="buyer-password"
                className="login-focus-field"
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'buyer-password-error' : undefined}
                style={{
                  width: '100%',
                  background: '#111827',
                  border: `1px solid ${errors.password ? 'rgba(248,113,113,0.65)' : 'rgba(247,215,116,0.2)'}`,
                  borderRadius: '9px',
                  padding: '13px 15px',
                  color: '#e2e8f0',
                  fontSize: '0.96rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {errors.password ? (
                <p id="buyer-password-error" style={{ color: '#f87171', fontSize: '0.8rem', margin: '7px 0 0' }}>{errors.password}</p>
              ) : null}
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '9px', color: '#94a3b8', fontSize: '0.86rem', marginBottom: '22px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={event => setRememberMe(event.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#f7d774' }}
              />
              Remember me
            </label>

            <button type="submit" className="btn-primary login-action" style={{ width: '100%', textAlign: 'center', boxSizing: 'border-box', padding: '15px 18px', fontSize: '15px' }}>
              Login to Dashboard
            </button>
          </form>

          <div style={{ marginTop: '20px' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.55, margin: '0 0 12px' }}>
              Prefer email access? We&apos;ll send a secure login link to your inbox.
            </p>
            <button type="button" disabled={isSendingLink} className="btn-secondary login-action" onClick={handleMagicLink} style={{ width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
              {isSendingLink ? 'Sending...' : 'Send Magic Link'}
            </button>
          </div>

          {statusMessage ? (
            <div role="status" style={{
              background: 'rgba(247,215,116,0.06)',
              border: '1px solid rgba(247,215,116,0.16)',
              borderRadius: '9px',
              padding: '12px 14px',
              color: '#93c5fd',
              fontSize: '0.84rem',
              lineHeight: 1.5,
              marginTop: '18px',
            }}>
              {statusMessage}
            </div>
          ) : null}

          <div style={{ background: '#111827', border: '1px solid rgba(183,121,31,0.2)', borderRadius: '9px', padding: '14px', marginTop: '18px', color: '#64748b', fontSize: '0.84rem', lineHeight: 1.55 }}>
            Secure login is connected with Supabase magic links. Only emails marked as buyers in Supabase can open the dashboard/resources.
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', margin: '22px 0 0' }}>
            New here?{' '}
            <a href="/checkout" className="login-link" style={{ color: '#f7d774', fontWeight: 800, textDecoration: 'none' }}>
              Get the Resource Pack
            </a>
          </p>
        </section>

        <p style={{ color: '#475569', fontSize: '0.78rem', lineHeight: 1.6, textAlign: 'center', margin: '22px auto 0', maxWidth: '460px' }}>
          21k curates public tools, official documentation, third-party tutorials, and original notes/checklists. All third-party links belong to their respective owners.
        </p>
      </main>
    </div>
  )
}
