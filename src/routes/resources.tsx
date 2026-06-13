import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { checkBuyerAccess, getAccessToken } from '../lib/access'

export const Route = createFileRoute('/resources')({
  component: ResourcesPage,
})

export type ResourceType = 'Official Tool' | 'Documentation' | 'Reference Tutorial' | 'Video Reference' | 'GitHub Repo'

export type Resource = {
  title: string
  url: string
  type: ResourceType
}

export type ResourceSection = {
  title: string
  description: string
  notes: string
  resources: Array<Resource>
}

export const TYPE_COLORS: Record<ResourceType, string> = {
  'Official Tool': '#f7d774',
  'Documentation': '#b7791f',
  'Reference Tutorial': '#f59e0b',
  'Video Reference': '#ef4444',
  'GitHub Repo': '#10b981',
}

export const RESOURCE_SECTIONS: Array<ResourceSection> = [
  {
    title: 'Claude Code & AI Coding',
    description:
      'A focused starter path for developers exploring Claude Code and similar AI coding workflows, with official tools, setup references, model-choice notes, and beginner-friendly workflow guidance.',
    notes:
      'Includes a 21k setup checklist, common error fixes, free alternative notes, API safety reminders, and a recommended beginner workflow.',
    resources: [
      { title: 'Claude Code Official', url: 'https://claude.com/product/claude-code', type: 'Official Tool' },
      { title: 'Claude Desktop', url: 'https://claude.com/download', type: 'Official Tool' },
      { title: 'Claude Cowork Docs', url: 'https://support.claude.com/en/articles/14680729-use-claude-cowork-with-third-party-platforms', type: 'Documentation' },
      { title: 'Reference Tutorial', url: 'https://compilefuture.com/blog/claude-code-tutorial/', type: 'Reference Tutorial' },
      { title: 'Reference Tutorial', url: 'https://compilefuture.com/blog/how-to-use-claude-code-free-unlimited/', type: 'Reference Tutorial' },
      { title: 'Video Reference', url: 'https://www.youtube.com/watch?v=vGx5Y_gSEO0', type: 'Video Reference' },
      { title: 'Video Reference', url: 'https://www.youtube.com/watch?v=VwW-VcWdPSA', type: 'Video Reference' },
    ],
  },
  {
    title: 'OpenCode, OpenRouter & Kiro',
    description:
      'A practical comparison area for gateway-style AI coding setups, helping buyers understand API access, coding assistant options, endpoint setup, and tool combinations.',
    notes:
      'Includes a model selection guide, setup sequence, key-management checklist, troubleshooting notes, and copy-ready command snippets.',
    resources: [
      { title: 'OpenCode', url: 'https://opencode.ai/', type: 'Official Tool' },
      { title: 'OpenCode Download', url: 'https://opencode.ai/download', type: 'Official Tool' },
      { title: 'OpenCode Zen', url: 'https://opencode.ai/zen', type: 'Official Tool' },
      { title: 'OpenCode Zen Endpoints', url: 'https://opencode.ai/docs/zen#endpoints', type: 'Documentation' },
      { title: 'OpenRouter', url: 'https://openrouter.ai/', type: 'Official Tool' },
      { title: 'OpenRouter Keys', url: 'https://openrouter.ai/keys', type: 'Official Tool' },
      { title: 'Kiro AI', url: 'https://kiro.dev/', type: 'Official Tool' },
      { title: 'Kiro Gateway', url: 'https://github.com/jwadow/kiro-gateway', type: 'GitHub Repo' },
      { title: 'Reference Tutorial', url: 'https://compilefuture.com/blog/claude-code-free-unlimited-opencode/', type: 'Reference Tutorial' },
      { title: 'Reference Tutorial', url: 'https://compilefuture.com/blog/claude-code-opus-for-free-using-amazon-kiro-ai/', type: 'Reference Tutorial' },
    ],
  },
  {
    title: 'GitHub & Copilot',
    description:
      'A beginner-safe map for GitHub, Copilot, student benefits, and legitimate free-access paths, with activation steps and comparison notes for coding assistants.',
    notes:
      'Includes a verification checklist, student-pack application steps, GitHub setup checklist, and Copilot alternative comparison.',
    resources: [
      { title: 'GitHub', url: 'https://github.com', type: 'Official Tool' },
      { title: 'GitHub Copilot', url: 'https://github.com/features/copilot', type: 'Official Tool' },
      { title: 'GitHub Student Pack', url: 'https://education.github.com/pack', type: 'Official Tool' },
      { title: 'GitHub Education Benefits', url: 'https://github.com/settings/education/benefits', type: 'Official Tool' },
      { title: 'Copilot Student Docs', url: 'https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-your-github-copilot-pro-subscription/getting-free-access-to-copilot-pro-as-a-student-teacher-or-maintainer', type: 'Documentation' },
      { title: 'Reference Tutorial', url: 'https://compilefuture.com/blog/github-student-developer-pack-free-copilot-pro/', type: 'Reference Tutorial' },
      { title: 'Reference Tutorial', url: 'https://compilefuture.com/blog/github-copilot-for-free/', type: 'Reference Tutorial' },
    ],
  },
  {
    title: 'VS Code AI Extensions',
    description:
      'A workspace-building section for developers who want VS Code configured as a reliable AI coding environment with extensions, model setup, and safer automation defaults.',
    notes:
      'Includes a recommended extension stack, Gemini API setup notes, local model setup, and safe auto-approval settings.',
    resources: [
      { title: 'VS Code Download', url: 'https://code.visualstudio.com/download', type: 'Official Tool' },
      { title: 'VS Code Marketplace', url: 'https://marketplace.visualstudio.com/', type: 'Official Tool' },
      { title: 'Codeium Extension', url: 'https://marketplace.visualstudio.com/items?itemName=Codeium.codeium', type: 'Official Tool' },
      { title: 'Continue Extension', url: 'https://marketplace.visualstudio.com/items?itemName=Continue.continue', type: 'Official Tool' },
      { title: 'Continue Model Setup', url: 'https://docs.continue.dev/autocomplete/model-setup', type: 'Documentation' },
      { title: 'Reference Tutorial', url: 'https://compilefuture.com/blog/cursor-ai-for-free/', type: 'Reference Tutorial' },
    ],
  },
  {
    title: 'Website Building & Deployment',
    description:
      'A launch-focused collection for building fast AI-assisted websites with Astro, Tailwind, Cloudflare, and modern design references.',
    notes:
      'Includes a launch checklist, SEO file templates, robots.txt, sitemap template, Cloudflare headers, and website prompt templates.',
    resources: [
      { title: 'Astro Docs', url: 'https://docs.astro.build/en/getting-started/', type: 'Documentation' },
      { title: 'Astro Install', url: 'https://docs.astro.build/en/install-and-setup/', type: 'Documentation' },
      { title: 'Astro Cloudflare Deploy', url: 'https://docs.astro.build/en/guides/deploy/cloudflare/', type: 'Documentation' },
      { title: 'Astro MCP Docs', url: 'https://docs.astro.build/en/guides/build-with-ai/#astro-docs-mcp-server', type: 'Documentation' },
      { title: 'Tailwind Skills', url: 'https://github.com/Lombiq/Tailwind-Agent-Skills', type: 'GitHub Repo' },
      { title: 'Vercel Design MD', url: 'https://getdesign.md/vercel/design-md', type: 'Documentation' },
      { title: 'Google Stitch', url: 'https://stitch.withgoogle.com', type: 'Official Tool' },
    ],
  },
  {
    title: 'SEO, Analytics & Monetization',
    description:
      'A growth section for turning small websites and micro-tools into traffic-backed projects with keyword research, analytics, webmaster tools, and monetization planning.',
    notes:
      'Includes a micro-tool idea sheet, 30-day SEO plan, AdSense checklist, domain research workflow, and monetization roadmap.',
    resources: [
      { title: 'Ahrefs Keyword Generator', url: 'https://ahrefs.com/keyword-generator', type: 'Official Tool' },
      { title: 'Google Analytics', url: 'https://analytics.google.com', type: 'Official Tool' },
      { title: 'Google Search Console', url: 'https://search.google.com/search-console/about', type: 'Official Tool' },
      { title: 'Bing Webmaster', url: 'https://www.bing.com/webmasters/about', type: 'Official Tool' },
      { title: 'Google Ads', url: 'https://ads.google.com', type: 'Official Tool' },
      { title: 'Google AdSense', url: 'https://adsense.google.com/start/', type: 'Official Tool' },
      { title: 'Cloudflare', url: 'https://cloudflare.com', type: 'Official Tool' },
      { title: 'Instant Domain Search', url: 'https://instantdomainsearch.com/', type: 'Official Tool' },
      { title: 'LogoFast', url: 'https://logofa.st/', type: 'Official Tool' },
      { title: 'Example Tool', url: 'https://realonlineruler.com/', type: 'Official Tool' },
      { title: 'Reference Tutorial', url: 'https://compilefuture.com/blog/how-to-earn-using-ai/', type: 'Reference Tutorial' },
    ],
  },
  {
    title: 'Local Models & Developer Setup',
    description:
      'A setup hub for local AI workflows, package managers, Python tooling, Node.js, and local model experiments across common developer machines.',
    notes:
      'Includes install order, Windows setup notes, Mac setup notes, local model checklist, and troubleshooting commands.',
    resources: [
      { title: 'Node.js', url: 'https://nodejs.org/en/download', type: 'Official Tool' },
      { title: 'Chocolatey', url: 'https://chocolatey.org/install', type: 'Official Tool' },
      { title: 'Python', url: 'https://www.python.org/', type: 'Official Tool' },
      { title: 'UV Python', url: 'https://docs.astral.sh/uv/getting-started/installation/', type: 'Documentation' },
      { title: 'NVM Windows', url: 'https://github.com/coreybutler/nvm-windows/releases', type: 'GitHub Repo' },
      { title: 'Ollama', url: 'https://ollama.com/download', type: 'Official Tool' },
      { title: 'Qwen Coder', url: 'https://ollama.com/library/qwen2.5-coder', type: 'Official Tool' },
    ],
  },
  {
    title: 'Video Library',
    description:
      'A buyer-friendly watchlist for learning workflows visually. These are external learning references unless a file is marked as 21k-owned.',
    notes:
      'Includes a viewing order, topic tags, and notes for turning each lesson into an implementation task.',
    resources: [
      { title: 'Video Reference', url: 'https://www.youtube.com/watch?v=hKP9qbBmEqA', type: 'Video Reference' },
      { title: 'Video Reference', url: 'https://www.youtube.com/watch?v=tDeLeyPvZn0', type: 'Video Reference' },
      { title: 'Video Reference', url: 'https://www.youtube.com/watch?v=s4wwQnXI5ek', type: 'Video Reference' },
      { title: 'Video Reference', url: 'https://www.youtube.com/watch?v=tzSdU1TIBvk', type: 'Video Reference' },
      { title: 'Video Reference', url: 'https://www.youtube.com/watch?v=vGx5Y_gSEO0', type: 'Video Reference' },
      { title: 'Video Reference', url: 'https://www.youtube.com/watch?v=b2Fa-4HtC9M', type: 'Video Reference' },
      { title: 'Video Reference', url: 'https://www.youtube.com/watch?v=_kEc5IsadG8', type: 'Video Reference' },
      { title: 'Video Reference', url: 'https://www.youtube.com/watch?v=lhsZao5spSU', type: 'Video Reference' },
      { title: 'Video Reference', url: 'https://www.youtube.com/watch?v=B34cIb1fex0', type: 'Video Reference' },
    ],
  },
]

export const DOWNLOAD_FILES = [
  '21k-ai-tools-links.pdf',
  '21k-setup-commands.pdf',
  '21k-prompt-library.pdf',
  '21k-website-launch-checklist.pdf',
  '21k-seo-checklist.pdf',
  '21k-micro-tool-business-plan.pdf',
]

export function resourceSectionSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function ResourcesPage() {
  const [accessGranted, setAccessGranted] = useState(false)
  const [isCheckingAccess, setIsCheckingAccess] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    let cancelled = false
    const token = getAccessToken()
    setIsLoggedIn(Boolean(token))

    checkBuyerAccess(token)
      .then(result => {
        if (!cancelled) {
          setAccessGranted(result.has_access)
          setIsLoggedIn(Boolean(token && result.email))
        }
      })
      .catch(() => {
        if (!cancelled) setAccessGranted(false)
      })
      .finally(() => {
        if (!cancelled) setIsCheckingAccess(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (isCheckingAccess) {
    return (
      <div style={{ background: '#050810', minHeight: '100vh', padding: '96px 16px 60px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
          <div className="badge badge-cyan" style={{ display: 'inline-flex', marginBottom: '16px' }}>
            Checking Access
          </div>
          <h1 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', fontWeight: 900, color: '#f1f5f9', marginBottom: '12px' }}>
            Opening your resource library
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '590px', margin: '0 auto', lineHeight: 1.7 }}>
            Verifying your buyer email and purchase status.
          </p>
        </div>
      </div>
    )
  }

  if (!accessGranted) {
    const primaryHref = isLoggedIn ? '/checkout' : '/login?next=/resources'
    const primaryLabel = isLoggedIn ? 'Complete Payment' : 'Login to Continue'

    return (
      <div style={{ background: '#050810', minHeight: '100vh', padding: '96px 16px 60px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="badge badge-lock" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              Buyer Access Required
            </div>
            <h1 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', fontWeight: 900, color: '#f1f5f9', marginBottom: '12px' }}>
              21k Resource Library
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '590px', margin: '0 auto', lineHeight: 1.7 }}>
              Your premium resources, setup notes, prompts, and PDF downloads are available only after purchase.
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(247,215,116,0.05), rgba(183,121,31,0.06))',
            border: '1px solid rgba(247,215,116,0.18)',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 0 70px rgba(247,215,116,0.06)',
          }}>
            <div>
            <h2 style={{ color: '#f1f5f9', fontSize: '1.15rem', fontWeight: 900, margin: '0 0 8px' }}>
                {isLoggedIn ? 'Complete payment for this account' : 'Sign in with your buyer account'}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 18px' }}>
                {isLoggedIn
                  ? 'This account is logged in, but the library opens only after a verified 21k purchase with the same email.'
                  : 'The library opens only for accounts with a verified 21k purchase. Login first, then complete payment if your account is not unlocked yet.'}
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={primaryHref} className="btn-primary" style={{ padding: '13px 22px' }}>{primaryLabel}</a>
                {!isLoggedIn ? <a href="/signup" className="btn-secondary" style={{ padding: '13px 22px' }}>Create Account</a> : null}
              </div>
            </div>

            <div style={{
              marginTop: '24px',
              background: '#0d1117',
              border: '1px solid rgba(183,121,31,0.18)',
              borderRadius: '12px',
              padding: '18px',
            }}>
              <h2 style={{ color: '#f1f5f9', fontSize: '1rem', fontWeight: 800, margin: '0 0 12px' }}>
                How buyer access works
              </h2>
              <div style={{ display: 'grid', gap: '10px', color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                <div><strong style={{ color: '#f7d774' }}>1.</strong> Create your 21k account with email, mobile number, and password.</div>
                <div><strong style={{ color: '#f7d774' }}>2.</strong> Complete checkout through Cashfree using the same email.</div>
                <div><strong style={{ color: '#f7d774' }}>3.</strong> Payment verification updates your buyer access automatically.</div>
                <div><strong style={{ color: '#f7d774' }}>4.</strong> Login anytime to open your private resource library.</div>
              </div>
            </div>

            <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.6, margin: '18px 0 0' }}>
              If you already purchased but the library is still locked, contact support with your payment email and order ID.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '26px' }}>
            <a href={primaryHref} className="btn-secondary">{primaryLabel}</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#050810', minHeight: '100vh', padding: '96px 16px 60px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-cyan" style={{ display: 'inline-flex', marginBottom: '16px' }}>
            Buyer-Only Resource Library
          </div>
          <h1 style={{ fontSize: 'clamp(1.85rem, 3.8vw, 2.75rem)', fontWeight: 900, color: '#f1f5f9', marginBottom: '12px' }}>
            21k Premium Resource Library
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
            Build. Learn. Earn. Browse the curated 21k library for AI coding, setup workflows, launch assets, SEO systems, and monetization planning.
          </p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(247,215,116,0.05), rgba(183,121,31,0.06))',
          border: '1px solid rgba(247,215,116,0.18)',
          borderRadius: '12px',
          padding: '18px 22px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '14px',
          flexWrap: 'wrap',
        }}>
          <span style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
            Your buyer access is active. Full notes, checklists, commands, and PDF files are available below.
          </span>
          <a href="/dashboard" className="btn-primary" style={{ fontSize: '14px', padding: '10px 18px' }}>
            Back to Dashboard
          </a>
        </div>

        <section style={{ marginBottom: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
            {RESOURCE_SECTIONS.map(section => (
              <a
                key={section.title}
                href={`/resources/${resourceSectionSlug(section.title)}`}
                style={{
                  background: '#0d1117',
                  border: '1px solid rgba(247,215,116,0.12)',
                  borderRadius: '12px',
                  padding: '18px',
                  color: '#e2e8f0',
                  textDecoration: 'none',
                  minHeight: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px',
                }}
              >
                <span>
                  <span style={{ display: 'block', color: '#f8fafc', fontSize: '1rem', fontWeight: 900, lineHeight: 1.25, marginBottom: '8px' }}>
                    {section.title}
                  </span>
                  <span style={{ display: 'block', color: '#64748b', fontSize: '0.84rem', lineHeight: 1.5 }}>
                    {section.resources.length} resources and premium notes
                  </span>
                </span>
                <span style={{ color: '#f7d774', fontSize: '0.82rem', fontWeight: 900 }}>Open Section</span>
              </a>
            ))}
          </div>
        </section>

        <div style={{ display: 'grid', gap: '18px' }}>
          {RESOURCE_SECTIONS.map(section => (
            <section key={section.title} style={{
              background: '#0d1117',
              border: '1px solid rgba(247,215,116,0.12)',
              borderRadius: '12px',
              padding: '24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '18px' }}>
                <div style={{ maxWidth: '720px' }}>
                  <h2 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: 850, margin: '0 0 8px' }}>{section.title}</h2>
                  <p style={{ color: '#94a3b8', lineHeight: 1.65, margin: 0, fontSize: '0.94rem' }}>{section.description}</p>
                </div>
                <a href={`/resources/${resourceSectionSlug(section.title)}`} className="badge badge-lock" style={{ height: 'fit-content', textDecoration: 'none' }}>Open Page</a>
              </div>

              <div style={{
                background: 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(16,185,129,0.18)',
                borderRadius: '10px',
                padding: '14px 16px',
                marginBottom: '18px',
                color: '#a7f3d0',
                fontSize: '0.88rem',
                lineHeight: 1.6,
              }}>
                <strong style={{ color: '#10b981' }}>Premium 21k Notes:</strong> {section.notes}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                {section.resources.map((resource, index) => {
                  const typeColor = TYPE_COLORS[resource.type]
                  return (
                    <a
                      key={`${section.title}-${resource.url}-${index}`}
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: '#111827',
                        border: '1px solid rgba(247,215,116,0.1)',
                        borderRadius: '10px',
                        padding: '14px',
                        color: '#e2e8f0',
                        textDecoration: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        minHeight: '98px',
                      }}
                    >
                      <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: '0.9rem' }}>{resource.title}</span>
                      <span style={{
                        background: `${typeColor}18`,
                        border: `1px solid ${typeColor}40`,
                        color: typeColor,
                        padding: '3px 8px',
                        borderRadius: '100px',
                        fontSize: '11px',
                        fontWeight: 700,
                        width: 'fit-content',
                      }}>
                        {resource.type}
                      </span>
                    </a>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        <section style={{
          marginTop: '24px',
          background: '#0d1117',
          border: '1px solid rgba(183,121,31,0.16)',
          borderRadius: '12px',
          padding: '24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
            <div>
              <h2 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: 850, margin: '0 0 6px' }}>Downloadable PDF Files</h2>
              <p style={{ color: '#64748b', margin: 0, fontSize: '0.92rem' }}>Only included PDF guides are available for download.</p>
            </div>
            <span className="badge badge-purple">Buyer Files</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
            {DOWNLOAD_FILES.map(file => (
              <div key={file} style={{
                background: '#111827',
                border: '1px solid rgba(183,121,31,0.14)',
                borderRadius: '10px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
              }}>
                <code style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{file}</code>
                <span style={{ color: '#10b981', fontSize: '0.78rem', fontWeight: 800 }}>Included</span>
              </div>
            ))}
          </div>
        </section>

        <div style={{
          marginTop: '24px',
          background: 'rgba(247,215,116,0.04)',
          border: '1px solid rgba(247,215,116,0.12)',
          borderRadius: '10px',
          padding: '18px',
          color: '#64748b',
          fontSize: '0.86rem',
          lineHeight: 1.65,
        }}>
          21k curates public tools, official documentation, third-party tutorials, and original notes/checklists. All third-party links belong to their respective owners. External tutorials and videos are provided as references only.
        </div>
      </div>
    </div>
  )
}
