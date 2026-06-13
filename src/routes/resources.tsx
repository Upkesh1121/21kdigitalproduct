import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { checkBuyerAccess, getAccessToken } from '../lib/access'
import { readApiJson } from '../lib/api'

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

type ResourceCatalogResponse = {
  sections?: Array<ResourceSection>
  downloads?: Array<string>
  error?: string
}

export const TYPE_COLORS: Record<ResourceType, string> = {
  'Official Tool': '#f7d774',
  'Documentation': '#b7791f',
  'Reference Tutorial': '#f59e0b',
  'Video Reference': '#ef4444',
  'GitHub Repo': '#10b981',
}

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
  const [sections, setSections] = useState<Array<ResourceSection>>([])
  const [downloads, setDownloads] = useState<Array<string>>([])
  const [resourceMessage, setResourceMessage] = useState('')

  useEffect(() => {
    let cancelled = false
    const token = getAccessToken()
    setIsLoggedIn(Boolean(token))

    checkBuyerAccess(token)
      .then(async result => {
        if (cancelled) return
        setAccessGranted(result.has_access)
        setIsLoggedIn(Boolean(token && result.email))

        if (!result.has_access || !token) return

        const response = await fetch('/api/resources', {
          headers: { authorization: `Bearer ${token}` },
        })
        const data = await readApiJson<ResourceCatalogResponse>(response, '/api/resources')
        if (!response.ok) throw new Error(data.error || 'Could not load resources.')
        if (!cancelled) {
          setSections(data.sections || [])
          setDownloads(data.downloads || [])
        }
      })
      .catch(error => {
        if (!cancelled) {
          setAccessGranted(false)
          setResourceMessage(error instanceof Error ? error.message : 'Could not load resources.')
        }
      })
      .finally(() => {
        if (!cancelled) setIsCheckingAccess(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (isCheckingAccess) {
    return <StatusPage badge="Checking Access" title="Opening your resource library" text="Verifying your buyer email and purchase status." />
  }

  if (!accessGranted) {
    const primaryHref = isLoggedIn ? '/checkout' : '/login?next=/resources'
    const primaryLabel = isLoggedIn ? 'Complete Payment' : 'Login to Continue'

    return (
      <div style={pageStyle}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="badge badge-lock" style={{ display: 'inline-flex', marginBottom: '16px' }}>
              Buyer Access Required
            </div>
            <h1 style={lockedTitleStyle}>21k Resource Library</h1>
            <p style={lockedCopyStyle}>
              Your premium resources, setup notes, prompts, and PDF downloads are available only after purchase.
            </p>
          </div>

          <div style={lockedPanelStyle}>
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

            <div style={howItWorksStyle}>
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
              Resource links are served only after access is verified. Sharing this page URL does not unlock the library for another email.
            </p>
          </div>

          {resourceMessage ? <div role="status" style={statusStyle}>{resourceMessage}</div> : null}
        </div>
      </div>
    )
  }

  if (!sections.length) {
    return <StatusPage badge="Loading Library" title="Preparing your resource dashboard" text={resourceMessage || 'Loading the private resource catalog.'} />
  }

  return (
    <div style={pageStyle}>
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

        <div style={accessPanelStyle}>
          <span style={{ color: '#94a3b8', fontSize: '0.92rem' }}>
            Your buyer access is active. Full notes, checklists, commands, and PDF files are available below.
          </span>
          <a href="/dashboard" className="btn-primary" style={{ fontSize: '14px', padding: '10px 18px' }}>
            Back to Dashboard
          </a>
        </div>

        <section style={{ marginBottom: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
            {sections.map(section => (
              <a key={section.title} href={`/resources/${resourceSectionSlug(section.title)}`} style={sectionCardStyle}>
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
          {sections.map(section => (
            <ResourceSectionCard key={section.title} section={section} />
          ))}
        </div>

        <section style={downloadsPanelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
            <div>
              <h2 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: 850, margin: '0 0 6px' }}>Downloadable PDF Files</h2>
              <p style={{ color: '#64748b', margin: 0, fontSize: '0.92rem' }}>Only included PDF guides are available for download.</p>
            </div>
            <span className="badge badge-purple">Buyer Files</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
            {downloads.map(file => (
              <div key={file} style={downloadItemStyle}>
                <code style={{ color: '#cbd5e1', fontSize: '0.82rem' }}>{file}</code>
                <span style={{ color: '#10b981', fontSize: '0.78rem', fontWeight: 800 }}>Included</span>
              </div>
            ))}
          </div>
        </section>

        <div style={disclaimerStyle}>
          21k curates public tools, official documentation, third-party tutorials, and original notes/checklists. All third-party links belong to their respective owners. External tutorials and videos are provided as references only.
        </div>
      </div>
    </div>
  )
}

function ResourceSectionCard({ section }: { section: ResourceSection }) {
  return (
    <section style={resourcePanelStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '18px' }}>
        <div style={{ maxWidth: '720px' }}>
          <h2 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: 850, margin: '0 0 8px' }}>{section.title}</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.65, margin: 0, fontSize: '0.94rem' }}>{section.description}</p>
        </div>
        <a href={`/resources/${resourceSectionSlug(section.title)}`} className="badge badge-lock" style={{ height: 'fit-content', textDecoration: 'none' }}>Open Page</a>
      </div>

      <div style={notesStyle}>
        <strong style={{ color: '#10b981' }}>Premium 21k Notes:</strong> {section.notes}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
        {section.resources.map((resource, index) => (
          <ResourceLink key={`${section.title}-${resource.url}-${index}`} resource={resource} />
        ))}
      </div>
    </section>
  )
}

export function ResourceLink({ resource }: { resource: Resource }) {
  const typeColor = TYPE_COLORS[resource.type]
  return (
    <a href={resource.url} target="_blank" rel="noreferrer" style={resourceLinkStyle}>
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
}

function StatusPage({ badge, title, text }: { badge: string; title: string; text: string }) {
  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
        <div className="badge badge-cyan" style={{ display: 'inline-flex', marginBottom: '16px' }}>
          {badge}
        </div>
        <h1 style={lockedTitleStyle}>{title}</h1>
        <p style={lockedCopyStyle}>{text}</p>
      </div>
    </div>
  )
}

const pageStyle = { background: '#050810', minHeight: '100vh', padding: '96px 16px 60px' } as const
const lockedTitleStyle = { fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', fontWeight: 900, color: '#f1f5f9', marginBottom: '12px' } as const
const lockedCopyStyle = { color: '#94a3b8', fontSize: '1rem', maxWidth: '590px', margin: '0 auto', lineHeight: 1.7 } as const
const lockedPanelStyle = { background: 'linear-gradient(135deg, rgba(247,215,116,0.05), rgba(183,121,31,0.06))', border: '1px solid rgba(247,215,116,0.18)', borderRadius: '16px', padding: '28px', boxShadow: '0 0 70px rgba(247,215,116,0.06)' } as const
const howItWorksStyle = { marginTop: '24px', background: '#0d1117', border: '1px solid rgba(183,121,31,0.18)', borderRadius: '12px', padding: '18px' } as const
const statusStyle = { background: 'rgba(247,215,116,0.07)', border: '1px solid rgba(247,215,116,0.18)', borderRadius: '10px', color: '#f8e7a0', fontSize: '0.9rem', lineHeight: 1.55, padding: '13px 15px', marginTop: '18px' } as const
const accessPanelStyle = { background: 'linear-gradient(135deg, rgba(247,215,116,0.05), rgba(183,121,31,0.06))', border: '1px solid rgba(247,215,116,0.18)', borderRadius: '12px', padding: '18px 22px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', flexWrap: 'wrap' } as const
const sectionCardStyle = { background: '#0d1117', border: '1px solid rgba(247,215,116,0.12)', borderRadius: '12px', padding: '18px', color: '#e2e8f0', textDecoration: 'none', minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px' } as const
const resourcePanelStyle = { background: '#0d1117', border: '1px solid rgba(247,215,116,0.12)', borderRadius: '12px', padding: '24px' } as const
const notesStyle = { background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: '10px', padding: '14px 16px', marginBottom: '18px', color: '#a7f3d0', fontSize: '0.88rem', lineHeight: 1.6 } as const
const resourceLinkStyle = { background: '#111827', border: '1px solid rgba(247,215,116,0.1)', borderRadius: '10px', padding: '14px', color: '#e2e8f0', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '98px' } as const
const downloadsPanelStyle = { marginTop: '24px', background: '#0d1117', border: '1px solid rgba(183,121,31,0.16)', borderRadius: '12px', padding: '24px' } as const
const downloadItemStyle = { background: '#111827', border: '1px solid rgba(183,121,31,0.14)', borderRadius: '10px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' } as const
const disclaimerStyle = { marginTop: '24px', background: 'rgba(247,215,116,0.04)', border: '1px solid rgba(247,215,116,0.12)', borderRadius: '10px', padding: '18px', color: '#64748b', fontSize: '0.86rem', lineHeight: 1.65 } as const
