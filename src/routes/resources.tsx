import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resources')({
  component: ResourcesPage,
})

const CATEGORIES = ['All', 'AI Coding Tools', 'Setup Commands', 'Prompt Templates', 'VS Code Extensions', 'Website Building', 'SEO & Monetization', 'Checklists']

const RESOURCES = [
  { title: 'OpenCode Zen Setup', category: 'Setup Commands', type: 'Official Tool' },
  { title: 'Claude Code Guide', category: 'AI Coding Tools', type: 'Documentation' },
  { title: 'GitHub Copilot Setup', category: 'AI Coding Tools', type: 'Official Tool' },
  { title: 'VS Code + Cline Extension', category: 'VS Code Extensions', type: 'Documentation' },
  { title: 'OpenRouter API Setup', category: 'AI Coding Tools', type: 'Official Tool' },
  { title: 'Astro Starter Template', category: 'Website Building', type: 'Reference Tutorial' },
  { title: 'Netlify Deploy Guide', category: 'Website Building', type: 'Documentation' },
  { title: 'SEO Launch Checklist', category: 'SEO & Monetization', type: 'Original Content' },
  { title: 'AdSense Setup Notes', category: 'SEO & Monetization', type: 'Original Notes' },
  { title: 'AI Debug Prompts', category: 'Prompt Templates', type: 'Original Content' },
  { title: 'Component Generator Prompt', category: 'Prompt Templates', type: 'Original Content' },
  { title: 'Website Launch Checklist', category: 'Checklists', type: 'Original Content' },
]

const TYPE_COLORS = {
  'Official Tool': '#00d4ff',
  'Documentation': '#8b5cf6',
  'Reference Tutorial': '#f59e0b',
  'Video Reference': '#ef4444',
  'Original Content': '#10b981',
  'Original Notes': '#10b981',
}

function ResourcesPage() {
  return (
    <div style={{ background: '#050810', minHeight: '100vh', padding: '96px 16px 60px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-cyan" style={{ display: 'inline-flex', marginBottom: '16px' }}>
            Resource Library
          </div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#f1f5f9', marginBottom: '12px' }}>
            Preview Resource Library
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            Browse the resource categories. Full access unlocks after purchase.
          </p>
        </div>

        <div style={{
          background: 'rgba(0,212,255,0.04)',
          border: '1px solid rgba(0,212,255,0.15)',
          borderRadius: '10px',
          padding: '16px 20px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}>
          <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
            🔒 Full resource details are locked. Showing previews only.
          </span>
          <a href="/checkout" style={{ background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)', color: 'white', fontWeight: 700, padding: '8px 16px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' }}>
            Unlock All →
          </a>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
          {CATEGORIES.map((cat, i) => (
            <button key={cat} style={{
              background: i === 0 ? 'rgba(0,212,255,0.15)' : 'transparent',
              border: `1px solid ${i === 0 ? 'rgba(0,212,255,0.4)' : 'rgba(0,212,255,0.15)'}`,
              color: i === 0 ? '#00d4ff' : '#64748b',
              padding: '6px 14px',
              borderRadius: '100px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
          {RESOURCES.map(res => {
            const typeColor = TYPE_COLORS[res.type] || '#64748b'
            return (
              <div key={res.title} style={{ background: '#0d1117', border: '1px solid rgba(0,212,255,0.12)', borderRadius: '10px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ background: `${typeColor}18`, border: `1px solid ${typeColor}40`, color: typeColor, padding: '2px 8px', borderRadius: '100px', fontSize: '11px', fontWeight: 600 }}>
                    {res.type}
                  </span>
                  <span className="badge badge-lock" style={{ fontSize: '11px' }}>🔒 Locked</span>
                </div>
                <div style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>{res.title}</div>
                <div style={{ color: '#475569', fontSize: '0.8rem' }}>{res.category}</div>
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>Plus 80+ more resources inside the pack.</p>
          <a href="/checkout" style={{ background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)', color: 'white', fontWeight: 700, padding: '16px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px', display: 'inline-block' }}>
            Get Full Access →
          </a>
        </div>
      </div>
    </div>
  )
}
