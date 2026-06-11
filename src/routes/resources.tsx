import { createFileRoute } from '@tanstack/react-router'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/resources')({
  component: ResourcesPage,
})

type ResourceType = 'Official Tool' | 'Documentation' | 'Reference Tutorial' | 'Video Reference' | 'GitHub Repo'

type Resource = {
  title: string
  url: string
  type: ResourceType
}

type ResourceSection = {
  title: string
  description: string
  notes: string
  resources: Array<Resource>
}

const TYPE_COLORS: Record<ResourceType, string> = {
  'Official Tool': '#f7d774',
  'Documentation': '#b7791f',
  'Reference Tutorial': '#f59e0b',
  'Video Reference': '#ef4444',
  'GitHub Repo': '#10b981',
}

const RESOURCE_SECTIONS: Array<ResourceSection> = [
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

const DOWNLOAD_FILES = [
  '21k-ai-tools-links.md',
  '21k-setup-commands.md',
  '21k-prompt-library.md',
  '21k-website-launch-checklist.md',
  '21k-seo-checklist.md',
  '21k-micro-tool-business-plan.md',
  '21k-full-resource-pack.zip',
]

const ACCESS_STORAGE_KEY = '21k-resource-library-access'

function normalizeCode(code: string) {
  return code.trim().toUpperCase()
}

function getAllowedAccessCodes() {
  const configuredCodes = ((import.meta.env.VITE_21K_ACCESS_CODES as string | undefined) ?? '')
    .split(',')
    .map(normalizeCode)
    .filter(Boolean)

  if (import.meta.env.DEV) {
    configuredCodes.push('21K-BUYER-DEMO')
  }

  return configuredCodes
}

function ResourcesPage() {
  const [accessGranted, setAccessGranted] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [accessMessage, setAccessMessage] = useState('')

  useEffect(() => {
    setAccessGranted(window.localStorage.getItem(ACCESS_STORAGE_KEY) === 'granted')
  }, [])

  const handleAccessSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const allowedCodes = getAllowedAccessCodes()
    const enteredCode = normalizeCode(accessCode)

    if (allowedCodes.includes(enteredCode)) {
      window.localStorage.setItem(ACCESS_STORAGE_KEY, 'granted')
      setAccessGranted(true)
      setAccessMessage('')
      return
    }

    setAccessMessage('Invalid or already-used access code. Check the code from your purchase email and try again.')
  }

  if (!accessGranted) {
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
              Your premium resources, setup notes, prompt files, and downloadable pack are available only after purchase.
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(247,215,116,0.05), rgba(183,121,31,0.06))',
            border: '1px solid rgba(247,215,116,0.18)',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: '0 0 70px rgba(247,215,116,0.06)',
          }}>
            <form onSubmit={handleAccessSubmit}>
              <label style={{ display: 'block', color: '#e2e8f0', fontWeight: 800, marginBottom: '10px' }}>
                Enter buyer access code
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input
                  value={accessCode}
                  onChange={event => setAccessCode(event.target.value)}
                  placeholder="21K-XXXX-XXXX"
                  style={{
                    flex: '1 1 240px',
                    background: '#111827',
                    border: '1px solid rgba(247,215,116,0.25)',
                    borderRadius: '8px',
                    padding: '13px 14px',
                    color: '#e2e8f0',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '13px 22px' }}>
                  Unlock Library
                </button>
              </div>
              {accessMessage ? (
                <p style={{ color: '#f87171', fontSize: '0.85rem', margin: '12px 0 0' }}>{accessMessage}</p>
              ) : null}
            </form>

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
                <div><strong style={{ color: '#f7d774' }}>1.</strong> Complete payment from the checkout page.</div>
                <div><strong style={{ color: '#f7d774' }}>2.</strong> Your unique 21k access code is shown after payment and sent to your mailbox.</div>
                <div><strong style={{ color: '#f7d774' }}>3.</strong> Return here, enter the code, and unlock your buyer-only library.</div>
                <div><strong style={{ color: '#f7d774' }}>4.</strong> Each buyer should receive a separate one-use code tied to their order/email.</div>
              </div>
            </div>

            <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.6, margin: '18px 0 0' }}>
              Note: this page is ready for access-code gating. True one-code-per-buyer validation and automatic email delivery require a payment provider, backend database, and email service integration.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '26px' }}>
            <a href="/checkout" className="btn-secondary">Buy 21k Access</a>
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
            Locked premium access: full notes, checklists, commands, and downloadable files unlock for buyers.
          </span>
          <a href="/checkout" className="btn-primary" style={{ fontSize: '14px', padding: '10px 18px' }}>
            Unlock 21k
          </a>
        </div>

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
                <span className="badge badge-lock" style={{ height: 'fit-content' }}>Premium</span>
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
              <h2 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: 850, margin: '0 0 6px' }}>Downloadable Premium Files</h2>
              <p style={{ color: '#64748b', margin: 0, fontSize: '0.92rem' }}>Included in the buyer pack for quick offline use.</p>
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
