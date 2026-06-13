import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: '21k - AI Developer Resource Pack' },
      {
        name: 'description',
        content:
          '21k AI Developer Resource Pack for builders who want to build, learn, and earn with AI coding workflows.',
      },
      { name: 'theme-color', content: '#050810' },
    ],
  }),
  shellComponent: RootDocument,
})

function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav-blur" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 25%, #fff3b0, #d69e2e 38%, #050810 70%)',
              border: '1px solid rgba(247,215,116,0.65)',
              boxShadow: '0 0 18px rgba(247,215,116,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#090806', fontWeight: 900, fontSize: '13px', letterSpacing: '-0.04em' }}>21K</span>
            </div>
          </a>

          <nav className="desktop-nav" style={{ alignItems: 'center', gap: '32px' }}>
            <a href="/#resources" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Resources</a>
            <a href="/#whats-inside" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>What's Inside</a>
            <a href="/#pricing" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Pricing</a>
            <a href="/#faq" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>FAQ</a>
            <a href="/signup" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Signup</a>
            <a href="/login" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Login</a>
          </nav>

          <div className="desktop-nav" style={{ alignItems: 'center', gap: '12px' }}>
            <a href="/checkout" className="btn-primary" style={{ fontSize: '14px', padding: '8px 20px' }}>Get Pack</a>
          </div>

          <button
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#94a3b8', padding: '8px', display: 'none',
            }}
            className={`mobile-hamburger hamburger-button ${open ? 'open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="hamburger-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? 'open' : ''}`} style={{ background: '#0d1117', borderTop: '1px solid rgba(247,215,116,0.12)' }}>
        <nav style={{ display: 'flex', flexDirection: 'column', padding: '16px', gap: '16px' }}>
          <a href="/#resources" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 }} onClick={() => setOpen(false)}>Resources</a>
          <a href="/#whats-inside" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 }} onClick={() => setOpen(false)}>What's Inside</a>
          <a href="/#pricing" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 }} onClick={() => setOpen(false)}>Pricing</a>
          <a href="/#faq" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 }} onClick={() => setOpen(false)}>FAQ</a>
          <a href="/signup" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 }} onClick={() => setOpen(false)}>Signup</a>
          <a href="/login" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500 }} onClick={() => setOpen(false)}>Login</a>
          <a href="/checkout" className="btn-primary" style={{ textAlign: 'center' }} onClick={() => setOpen(false)}>Get Pack</a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(247,215,116,0.12)', background: '#050810', padding: '48px 16px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '40px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 25%, #fff3b0, #d69e2e 38%, #050810 70%)',
                border: '1px solid rgba(247,215,116,0.65)',
                boxShadow: '0 0 18px rgba(247,215,116,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#090806', fontWeight: 900, fontSize: '13px', letterSpacing: '-0.04em' }}>21K</span>
              </div>
              <span style={{
                fontWeight: 900, fontSize: '18px',
                background: 'linear-gradient(135deg, #fff3b0, #f7d774, #b7791f)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>21k</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 700, margin: '0 0 8px' }}>
              Build. Learn. Earn.
            </p>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6, maxWidth: '300px', margin: '0 0 12px' }}>
              Premium curated AI developer resources, tools, prompts, and guides organized in one pack.
            </p>
            <p style={{ color: '#334155', fontSize: '12px', lineHeight: 1.6, maxWidth: '340px', margin: 0 }}>
              This website curates public tools, official documentation, third-party tutorials, and original notes/checklists. All third-party links belong to their respective owners.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '14px', marginBottom: '12px' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="/#whats-inside" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px' }}>What's Inside</a></li>
              <li><a href="/#resources" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px' }}>Preview Resources</a></li>
              <li><a href="/#pricing" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px' }}>Pricing</a></li>
              <li><a href="/checkout" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px' }}>Buy Now</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '14px', marginBottom: '12px' }}>Account</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="/login" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px' }}>Login</a></li>
              <li><a href="/dashboard" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px' }}>Dashboard</a></li>
              <li><a href="/resources" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px' }}>Resource Library</a></li>
              <li><a href="/#faq" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px' }}>FAQ</a></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(247,215,116,0.1)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <p style={{ color: '#334155', fontSize: '12px', margin: 0 }}>Copyright 2026 21k. All rights reserved.</p>
          <p style={{ color: '#1e293b', fontSize: '12px', margin: 0 }}>External resources belong to their respective owners.</p>
        </div>
      </div>
    </footer>
  )
}

function ScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const main = document.querySelector('main')
    if (!main) return

    const firstSection = main.querySelector('section')
    const candidates = Array.from(
      main.querySelectorAll<HTMLElement>('section, .card-glow'),
    ).filter(element => element !== firstSection)

    if (reduceMotion || !('IntersectionObserver' in window)) {
      candidates.forEach(element => element.classList.add('reveal-visible', 'reveal-done'))
      return
    }

    const completeReveal = (element: HTMLElement) => {
      element.classList.add('reveal-visible')
      window.setTimeout(() => {
        element.classList.add('reveal-done')
      }, window.innerWidth < 768 ? 420 : 760)
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          const element = entry.target as HTMLElement
          completeReveal(element)
          observer.unobserve(element)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    candidates.forEach(element => {
      element.classList.add('reveal-item')

      if (element.getBoundingClientRect().top < window.innerHeight * 0.85) {
        completeReveal(element)
        return
      }

      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return null
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <style>{`
          @media (max-width: 768px) {
            .mobile-hamburger { display: block !important; }
          }
        `}</style>
      </head>
      <body>
        <Nav />
        <main style={{ paddingTop: '64px' }}>
          <Outlet />
        </main>
        <ScrollReveal />
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}
