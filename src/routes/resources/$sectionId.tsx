import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { checkBuyerAccess, getAccessToken } from '../../lib/access'
import { readApiJson } from '../../lib/api'
import { ResourceLink, type ResourceSection } from '../resources'

export const Route = createFileRoute('/resources/$sectionId')({
  component: ResourceSectionPage,
})

type ResourceSectionResponse = {
  section?: ResourceSection
  error?: string
}

function ResourceSectionPage() {
  const { sectionId } = Route.useParams()
  const [accessGranted, setAccessGranted] = useState(false)
  const [isCheckingAccess, setIsCheckingAccess] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [section, setSection] = useState<ResourceSection | null>(null)
  const [message, setMessage] = useState('')

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

        const response = await fetch(`/api/resources?section=${encodeURIComponent(sectionId)}`, {
          headers: { authorization: `Bearer ${token}` },
        })
        const data = await readApiJson<ResourceSectionResponse>(response, '/api/resources')
        if (!response.ok || !data.section) throw new Error(data.error || 'Resource section not found.')
        if (!cancelled) setSection(data.section)
      })
      .catch(error => {
        if (!cancelled) {
          setAccessGranted(false)
          setMessage(error instanceof Error ? error.message : 'Could not load this resource section.')
        }
      })
      .finally(() => {
        if (!cancelled) setIsCheckingAccess(false)
      })

    return () => {
      cancelled = true
    }
  }, [sectionId])

  if (isCheckingAccess) {
    return <StatusShell badge="Checking Access" title="Opening resource section" text="Verifying your buyer email and purchase status." />
  }

  if (!accessGranted) {
    return (
      <StatusShell
        badge="Buyer Access Required"
        title={isLoggedIn ? 'Complete payment for this account' : 'Login to open this resource section'}
        text={isLoggedIn
          ? 'This account is logged in, but this section opens only after a verified 21k purchase with the same email.'
          : 'Login with your buyer email first. New users can create an account and complete payment to unlock the library.'}
        actionHref={isLoggedIn ? '/checkout' : `/login?next=/resources/${sectionId}`}
        actionLabel={isLoggedIn ? 'Complete Payment' : 'Login to Continue'}
      />
    )
  }

  if (!section) {
    return <StatusShell badge="Not Found" title="Resource section not found" text={message || 'Return to the resource dashboard to browse all available sections.'} actionHref="/resources" actionLabel="Open Resources" />
  }

  return (
    <div style={{ background: '#050810', minHeight: '100vh', padding: '96px 16px 60px' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <a href="/resources" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 800 }}>
          Back to Resource Dashboard
        </a>

        <header style={{ margin: '26px 0 28px' }}>
          <div className="badge badge-cyan" style={{ display: 'inline-flex', marginBottom: '16px' }}>
            Premium Section
          </div>
          <h1 style={{ color: '#f8fafc', fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.05, fontWeight: 900, margin: '0 0 14px' }}>
            {section.title}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, maxWidth: '780px', margin: 0 }}>
            {section.description}
          </p>
        </header>

        <section style={{
          background: 'rgba(16,185,129,0.06)',
          border: '1px solid rgba(16,185,129,0.18)',
          borderRadius: '12px',
          padding: '18px',
          color: '#a7f3d0',
          fontSize: '0.92rem',
          lineHeight: 1.65,
          marginBottom: '22px',
        }}>
          <strong style={{ color: '#10b981' }}>Premium 21k Notes:</strong> {section.notes}
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '14px' }}>
          {section.resources.map((resource, index) => (
            <ResourceLink key={`${resource.url}-${index}`} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatusShell({
  badge,
  title,
  text,
  actionHref,
  actionLabel,
}: {
  badge: string
  title: string
  text: string
  actionHref?: string
  actionLabel?: string
}) {
  return (
    <div style={{ background: '#050810', minHeight: '100vh', padding: '96px 16px 60px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
        <div className="badge badge-cyan" style={{ display: 'inline-flex', marginBottom: '16px' }}>
          {badge}
        </div>
        <h1 style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', fontWeight: 900, color: '#f1f5f9', marginBottom: '12px' }}>
          {title}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '590px', margin: '0 auto 22px', lineHeight: 1.7 }}>
          {text}
        </p>
        {actionHref && actionLabel ? <a href={actionHref} className="btn-primary">{actionLabel}</a> : null}
      </div>
    </div>
  )
}
