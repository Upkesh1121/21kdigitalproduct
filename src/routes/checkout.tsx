import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
})

function CheckoutPage() {
  return (
    <div style={{ background: '#050810', minHeight: '100vh', padding: '96px 16px 60px' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-cyan" style={{ display: 'inline-flex', marginBottom: '20px' }}>
            Secure Checkout
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#f1f5f9', marginBottom: '8px' }}>
            AI Developer Resource Pack
          </h1>
          <p style={{ color: '#64748b' }}>Lifetime access · Instant delivery</p>
        </div>

        <div style={{ background: '#0d1117', border: '1px solid rgba(0,212,255,0.15)', borderRadius: '16px', padding: '32px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <div style={{ color: '#e2e8f0', fontWeight: 700 }}>AI Developer Resource Pack</div>
              <div style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>100+ resources · Full lifetime access</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#00d4ff', fontSize: '1.5rem', fontWeight: 900 }}>₹499</div>
              <div style={{ color: '#475569', fontSize: '0.8rem' }}>$9 USD</div>
            </div>
          </div>

          <div style={{ background: '#111827', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '10px', padding: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#8b5cf6', fontWeight: 600, fontSize: '0.95rem' }}>
              <span>🔧</span>
              <span>Checkout coming soon</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
              Payment integration is being set up. Checkout will be available via Stripe or Lemon Squeezy shortly. Check back soon.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['100+ curated resource links', 'Prompt template library', 'Copy-paste setup commands', 'Tool setup guides', 'Downloadable ZIP', 'Future updates included'].map(f => (
              <div key={f} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ color: '#10b981' }}>✓</span>
                <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="/#pricing" style={{ color: '#475569', fontSize: '0.875rem', textDecoration: 'none' }}>
            ← Back to pricing
          </a>
        </div>
      </div>
    </div>
  )
}
