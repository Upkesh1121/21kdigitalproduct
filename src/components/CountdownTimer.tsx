import { useEffect, useState } from 'react'

export function CountdownTimer({ compact = false }: { compact?: boolean }) {
  const offerDurationMs = 24 * 60 * 60 * 1000
  const storageKey = '21k-digital-offer-ends-at'
  const [timeLeft, setTimeLeft] = useState(offerDurationMs)

  useEffect(() => {
    const getOfferEndsAt = () => {
      const savedEndsAt = window.localStorage.getItem(storageKey)
      if (savedEndsAt) return Number(savedEndsAt)

      const endsAt = Date.now() + offerDurationMs
      window.localStorage.setItem(storageKey, String(endsAt))
      return endsAt
    }

    const endsAt = getOfferEndsAt()
    const updateTimeLeft = () => {
      setTimeLeft(Math.max(0, endsAt - Date.now()))
    }

    updateTimeLeft()
    const interval = window.setInterval(updateTimeLeft, 1000)

    return () => window.clearInterval(interval)
  }, [])

  const totalSeconds = Math.floor(timeLeft / 1000)
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
  const seconds = String(totalSeconds % 60).padStart(2, '0')

  return (
    <div style={{
      margin: compact ? '10px 0 0 auto' : '16px auto 0',
      padding: compact ? '8px 10px' : '10px 14px',
      borderRadius: '10px',
      border: '1px solid rgba(16,185,129,0.25)',
      background: 'rgba(16,185,129,0.08)',
      color: '#d1fae5',
      fontWeight: 700,
      fontSize: compact ? '0.78rem' : '0.95rem',
      width: 'fit-content',
      whiteSpace: 'nowrap',
    }}>
      Offer ends in: {hours}:{minutes}:{seconds}
    </div>
  )
}
