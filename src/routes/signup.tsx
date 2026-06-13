import { createFileRoute } from '@tanstack/react-router'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { saveSupabaseSession } from '../lib/access'
import { readApiJson } from '../lib/api'

export const Route = createFileRoute('/signup')({
  component: SignupPage,
})

type AuthResponse = {
  access_token?: string
  refresh_token?: string
  error?: string
}

function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')
    setIsSubmitting(true)

    try {
      const trimmedFullName = fullName.trim()
      const trimmedPhone = phone.trim()
      const trimmedEmail = email.trim()

      if (!trimmedFullName) throw new Error('Enter your full name.')
      if (trimmedPhone.replace(/\D/g, '').length < 10) throw new Error('Enter a valid mobile number.')
      if (!isValidEmail(trimmedEmail)) throw new Error('Enter a valid email address.')
      if (password.length < 8) throw new Error('Password must be at least 8 characters.')

      const signupResponse = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: trimmedFullName, phone: trimmedPhone, email: trimmedEmail, password }),
      })
      const signupData = await readApiJson<{ error?: string }>(signupResponse, '/api/signup')
      if (!signupResponse.ok) throw new Error(signupData.error || 'Could not create account.')

      const loginResponse = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password }),
      })
      const loginData = await readApiJson<AuthResponse>(loginResponse, '/api/login')
      if (!loginResponse.ok || !loginData.access_token) throw new Error(loginData.error || 'Account created. Please login.')

      saveSupabaseSession(loginData.access_token, loginData.refresh_token)
      setMessage('Account created. Continue to payment to unlock your dashboard.')
      window.setTimeout(() => {
        window.location.href = '/checkout'
      }, 700)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not create account.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div className="badge badge-cyan" style={{ display: 'inline-flex', marginBottom: '16px' }}>
          Step 1: Signup
        </div>
        <h1 style={titleStyle}>Create your buyer account</h1>
        <p style={copyStyle}>
          Add your mobile number, Gmail/email, and password. After signup you can pay and unlock the resource dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <Field label="Full name" id="signup-name">
          <input id="signup-name" value={fullName} onChange={event => setFullName(event.target.value)} autoComplete="name" style={fieldStyle} />
        </Field>
        <Field label="Mobile number" id="signup-phone">
          <input id="signup-phone" value={phone} onChange={event => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" placeholder="+91 99999 99999" style={fieldStyle} />
        </Field>
        <Field label="Gmail / email address" id="signup-email">
          <input id="signup-email" type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" placeholder="you@gmail.com" style={fieldStyle} />
        </Field>
        <Field label="Password" id="signup-password">
          <input id="signup-password" type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="new-password" placeholder="Minimum 8 characters" style={fieldStyle} />
        </Field>

        <button type="submit" disabled={isSubmitting} className="btn-primary" style={buttonStyle}>
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <a href="/api/google-login?next=/checkout" className="btn-secondary" style={secondaryButtonStyle}>
        Continue with Google
      </a>

      {message ? <Status message={message} /> : null}

      <p style={footerLinkStyle}>
        Already have an account? <a href="/login" style={linkStyle}>Login</a>
      </p>
    </AuthShell>
  )
}

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="cyber-grid" style={{
      background: 'radial-gradient(circle at 20% 15%, rgba(247,215,116,0.09), transparent 30%), radial-gradient(circle at 80% 10%, rgba(183,121,31,0.1), transparent 34%), #050810',
      minHeight: '100vh',
      padding: '96px 16px 60px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <main style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
        <section style={panelStyle}>{children}</section>
      </main>
    </div>
  )
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

function Status({ message }: { message: string }) {
  return <div role="status" style={statusStyle}>{message}</div>
}

const panelStyle = {
  background: 'linear-gradient(135deg, rgba(13,17,23,0.96), rgba(17,24,39,0.94))',
  border: '1px solid rgba(247,215,116,0.18)',
  borderRadius: '18px',
  padding: 'clamp(24px, 5vw, 36px)',
  boxShadow: '0 0 80px rgba(247,215,116,0.08)',
} as const

const titleStyle = { color: '#f8fafc', fontSize: 'clamp(1.75rem, 7vw, 2.35rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 12px' } as const
const copyStyle = { color: '#94a3b8', fontSize: '0.98rem', lineHeight: 1.65, margin: 0 } as const
const labelStyle = { display: 'block', color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px' } as const
const fieldStyle = { width: '100%', background: '#111827', border: '1px solid rgba(247,215,116,0.2)', borderRadius: '9px', padding: '13px 15px', color: '#e2e8f0', fontSize: '0.96rem', outline: 'none', boxSizing: 'border-box' } as const
const buttonStyle = { width: '100%', marginTop: '6px', textAlign: 'center', boxSizing: 'border-box', padding: '15px 18px' } as const
const secondaryButtonStyle = { width: '100%', textAlign: 'center', boxSizing: 'border-box', marginTop: '14px' } as const
const statusStyle = { background: 'rgba(247,215,116,0.06)', border: '1px solid rgba(247,215,116,0.16)', borderRadius: '9px', padding: '12px 14px', color: '#93c5fd', fontSize: '0.84rem', lineHeight: 1.5, marginTop: '18px' } as const
const footerLinkStyle = { color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', margin: '22px 0 0' } as const
const linkStyle = { color: '#f7d774', fontWeight: 800, textDecoration: 'none' } as const

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}
