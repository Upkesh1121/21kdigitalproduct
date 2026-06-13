import { createFileRoute } from '@tanstack/react-router'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { checkBuyerAccess, getAccessToken } from '../lib/access'
import { readApiJson } from '../lib/api'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

type GrantResponse = {
  ok?: boolean
  email?: string
  role?: string
  paid_order_id?: string | null
  error?: string
}

function AdminPage() {
  const [adminKey, setAdminKey] = useState('')
  const [adminStatus, setAdminStatus] = useState<'checking' | 'admin' | 'locked'>('checking')
  const [adminEmail, setAdminEmail] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [orderId, setOrderId] = useState('')
  const [cfPaymentId, setCfPaymentId] = useState('')
  const [role, setRole] = useState<'buyer' | 'admin'>('buyer')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    checkBuyerAccess()
      .then(result => {
        if (cancelled) return
        setAdminEmail(result.email)
        setAdminStatus(result.role === 'admin' ? 'admin' : 'locked')
      })
      .catch(() => {
        if (!cancelled) setAdminStatus('locked')
      })

    return () => {
      cancelled = true
    }
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')

    if (!email.trim()) {
      setMessage('Enter the buyer email.')
      return
    }

    if (adminStatus !== 'admin' && !adminKey.trim()) {
      setMessage('Login with your admin Gmail first, or enter ADMIN_ACCESS_KEY.')
      return
    }

    setIsSubmitting(true)
    try {
      const token = getAccessToken()
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }
      if (token) headers.authorization = `Bearer ${token}`
      if (adminKey.trim()) headers['x-admin-key'] = adminKey.trim()

      const response = await fetch('/api/admin-grant-access', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email,
          role,
          order_id: orderId,
          cf_payment_id: cfPaymentId,
          mark_paid: true,
        }),
      })
      const data = await readApiJson<GrantResponse>(response, '/api/admin-grant-access')
      if (!response.ok) throw new Error(data.error || 'Could not grant access.')
      setMessage(`Access granted for ${data.email} as ${data.role}${data.paid_order_id ? ` and order ${data.paid_order_id} marked paid` : ''}.`)
      setEmail('')
      setOrderId('')
      setCfPaymentId('')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not grant access.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="cyber-grid" style={{ background: '#050810', minHeight: '100vh', padding: '112px 16px 72px' }}>
      <main style={{ maxWidth: '560px', margin: '0 auto' }}>
        <section style={{
          background: 'linear-gradient(135deg, rgba(13,17,23,0.97), rgba(17,24,39,0.94))',
          border: '1px solid rgba(247,215,116,0.18)',
          borderRadius: '16px',
          padding: 'clamp(24px, 5vw, 34px)',
          boxShadow: '0 20px 80px rgba(0,0,0,0.34)',
        }}>
          <div className="badge badge-cyan" style={{ display: 'inline-flex', marginBottom: '16px' }}>
            Admin Access
          </div>
          <h1 style={{ color: '#f8fafc', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', lineHeight: 1.1, margin: '0 0 10px', fontWeight: 900 }}>
            Grant buyer access
          </h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.65, margin: '0 0 26px' }}>
            Login with your admin Gmail to grant buyer access. ADMIN_ACCESS_KEY is an optional backup secret from Cloudflare.
          </p>

          <div style={{
            background: adminStatus === 'admin' ? 'rgba(16,185,129,0.08)' : 'rgba(247,215,116,0.07)',
            border: `1px solid ${adminStatus === 'admin' ? 'rgba(16,185,129,0.22)' : 'rgba(247,215,116,0.18)'}`,
            borderRadius: '10px',
            padding: '13px 15px',
            color: adminStatus === 'admin' ? '#a7f3d0' : '#f8e7a0',
            fontSize: '0.88rem',
            lineHeight: 1.55,
            marginBottom: '18px',
          }}>
            {adminStatus === 'checking'
              ? 'Checking admin login...'
              : adminStatus === 'admin'
                ? `Admin logged in${adminEmail ? ` as ${adminEmail}` : ''}.`
                : 'Not logged in as admin. Login with the email in ADMIN_EMAILS, or use ADMIN_ACCESS_KEY below.'}
          </div>

          <form onSubmit={handleSubmit}>
            <AdminField label="Admin key (optional if admin Gmail is logged in)" id="admin-key">
              <input
                id="admin-key"
                type="password"
                value={adminKey}
                onChange={event => setAdminKey(event.target.value)}
                placeholder="ADMIN_ACCESS_KEY"
                style={fieldStyle}
                autoComplete="off"
              />
            </AdminField>

            <AdminField label="Buyer email" id="buyer-email">
              <input
                id="buyer-email"
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="buyer@example.com"
                style={fieldStyle}
                autoComplete="email"
              />
            </AdminField>

            <AdminField label="Order ID (optional)" id="order-id">
              <input
                id="order-id"
                value={orderId}
                onChange={event => setOrderId(event.target.value)}
                placeholder="Leave blank to mark latest order for this email"
                style={fieldStyle}
                autoComplete="off"
              />
            </AdminField>

            <AdminField label="Cashfree payment ID (optional)" id="cf-payment-id">
              <input
                id="cf-payment-id"
                value={cfPaymentId}
                onChange={event => setCfPaymentId(event.target.value)}
                placeholder="cf_payment_id from Cashfree, if available"
                style={fieldStyle}
                autoComplete="off"
              />
            </AdminField>

            <AdminField label="Role" id="buyer-role">
              <select
                id="buyer-role"
                value={role}
                onChange={event => setRole(event.target.value === 'admin' ? 'admin' : 'buyer')}
                style={fieldStyle}
              >
                <option value="buyer">Buyer</option>
                <option value="admin">Admin</option>
              </select>
            </AdminField>

            <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ width: '100%', marginTop: '8px' }}>
              {isSubmitting ? 'Granting Access...' : 'Grant Access'}
            </button>
          </form>

          {message ? (
            <div role="status" style={{
              background: 'rgba(247,215,116,0.07)',
              border: '1px solid rgba(247,215,116,0.18)',
              borderRadius: '10px',
              color: '#f8e7a0',
              fontSize: '0.9rem',
              lineHeight: 1.55,
              padding: '13px 15px',
              marginTop: '18px',
            }}>
              {message}
            </div>
          ) : null}
        </section>
      </main>
    </div>
  )
}

function AdminField({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label htmlFor={id} style={{ display: 'block', color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 800, marginBottom: '8px' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const fieldStyle = {
  width: '100%',
  background: '#111827',
  border: '1px solid rgba(247,215,116,0.2)',
  borderRadius: '10px',
  padding: '13px 14px',
  color: '#e2e8f0',
  fontSize: '0.96rem',
  outline: 'none',
  boxSizing: 'border-box',
} as const
