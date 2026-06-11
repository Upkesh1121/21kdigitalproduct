import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div style={{ background: '#050810', minHeight: '100vh', padding: '96px 16px 60px', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔒</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', marginBottom: '8px' }}>Buyer Login</h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Access your AI Developer Resource Pack dashboard</p>
        </div>

        <div style={{ background: '#0d1117', border: '1px solid rgba(0,212,255,0.15)', borderRadius: '16px', padding: '32px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                width: '100%', background: '#111827',
                border: '1px solid rgba(0,212,255,0.2)', borderRadius: '8px',
                padding: '12px 16px', color: '#e2e8f0', fontSize: '0.95rem',
                outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              style={{
                width: '100%', background: '#111827',
                border: '1px solid rgba(0,212,255,0.2)', borderRadius: '8px',
                padding: '12px 16px', color: '#e2e8f0', fontSize: '0.95rem',
                outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ background: '#111827', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '8px', padding: '16px', marginBottom: '20px', color: '#64748b', fontSize: '0.875rem', lineHeight: 1.5 }}>
            🔧 Login system is coming soon. After purchase you will receive a direct access link via email.
          </div>

          <button
            type="button"
            disabled
            style={{ width: '100%', background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)', color: 'white', fontWeight: 700, padding: '14px', borderRadius: '8px', border: 'none', cursor: 'not-allowed', fontSize: '15px', opacity: 0.5 }}
          >
            Login (Coming Soon)
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ color: '#475569', fontSize: '0.875rem' }}>
              Don't have access yet?{' '}
              <a href="/checkout" style={{ color: '#00d4ff', textDecoration: 'none' }}>
                Get the pack →
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
