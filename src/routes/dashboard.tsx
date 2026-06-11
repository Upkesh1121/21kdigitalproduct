import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

const DASH_SECTIONS = [
  { icon: '📚', title: 'Resource Library', desc: '100+ categorized AI tool links', count: '100+' },
  { icon: '💬', title: 'Prompt Library', desc: 'Copy-paste prompts for every task', count: '30+' },
  { icon: '⚡', title: 'Setup Commands', desc: 'Terminal commands ready to paste', count: '50+' },
  { icon: '🗂️', title: 'Tool Guides', desc: 'Step-by-step setup walkthroughs', count: '10+' },
  { icon: '📦', title: 'Download ZIP', desc: 'All files bundled for offline use', count: '1 ZIP' },
  { icon: '🔄', title: 'Updates', desc: 'New resources added regularly', count: 'Live' },
]

function DashboardPage() {
  return (
    <div style={{ background: '#050810', minHeight: '100vh', padding: '96px 16px 60px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(247,215,116,0.06), rgba(183,121,31,0.06))',
          border: '1px solid rgba(247,215,116,0.2)',
          borderRadius: '12px',
          padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '1.5rem' }}>🔒</span>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: '4px' }}>Access Required</div>
            <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
              This dashboard is for buyers only. Purchase the 21k AI Developer Resource Pack to unlock full access.
            </div>
          </div>
          <a href="/checkout" style={{ background: 'linear-gradient(135deg, #f7d774, #b7791f)', color: '#090806', fontWeight: 700, padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', flexShrink: 0 }}>
            Get Access →
          </a>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f1f5f9', marginBottom: '8px' }}>
            AI Developer Dashboard
          </h1>
          <p style={{ color: '#64748b' }}>Preview of what awaits after purchase</p>
        </div>

        <div style={{ position: 'relative', filter: 'blur(2px)', pointerEvents: 'none', userSelect: 'none' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {DASH_SECTIONS.map(s => (
              <div key={s.title} style={{ background: '#0d1117', border: '1px solid rgba(247,215,116,0.12)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.75rem' }}>{s.icon}</span>
                  <span style={{ background: 'rgba(247,215,116,0.1)', border: '1px solid rgba(247,215,116,0.2)', color: '#f7d774', padding: '2px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>{s.count}</span>
                </div>
                <div style={{ color: '#e2e8f0', fontWeight: 700, marginBottom: '6px' }}>{s.title}</div>
                <div style={{ color: '#475569', fontSize: '0.875rem' }}>{s.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#0d1117', border: '1px solid rgba(247,215,116,0.12)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(247,215,116,0.08)', color: '#94a3b8', fontWeight: 600, fontSize: '0.875rem' }}>
              Recent Resources
            </div>
            {['OpenCode Zen Setup', 'Claude Code Alternatives', 'GitHub Student Pack Guide', 'VS Code + Cline Config'].map(r => (
              <div key={r} style={{ padding: '14px 24px', borderBottom: '1px solid rgba(247,215,116,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{r}</span>
                <span style={{ color: '#10b981', fontSize: '0.8rem' }}>✓ Available</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ color: '#64748b', marginBottom: '16px' }}>Get the pack to unlock your full dashboard</p>
          <a href="/checkout" style={{ background: 'linear-gradient(135deg, #f7d774, #b7791f)', color: '#090806', fontWeight: 700, padding: '16px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px', display: 'inline-block' }}>
            Unlock Dashboard →
          </a>
        </div>
      </div>
    </div>
  )
}
