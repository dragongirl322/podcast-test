'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import LandingPage from '@/components/LandingPage'
import { generateSessionId, parseVariant, getDeviceCategory } from '@/lib/utils'

export default function PageContent() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Track page visit
    const trackVisit = async () => {
      const variant = parseVariant(searchParams.get('variant'))
      const sessionId = generateSessionId()

      // Store session ID in cookie for duplicate detection
      document.cookie = `session_id=${sessionId}; path=/; max-age=1800`

      try {
        await fetch('/api/tracking/page-visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            variant,
            utmSource: searchParams.get('utm_source'),
            utmMedium: searchParams.get('utm_medium'),
            utmCampaign: searchParams.get('utm_campaign'),
            utmContent: searchParams.get('utm_content'),
            referrer: document.referrer || null,
            deviceCategory: getDeviceCategory(navigator.userAgent),
          }),
        })
      } catch {
        // Non-blocking: page still renders if tracking fails
      }
    }

    trackVisit()
    setMounted(true)
  }, [searchParams])

  if (!mounted) {
    return null
  }

  const variant = parseVariant(searchParams.get('variant'))

  return <LandingPage variant={variant} />
}
