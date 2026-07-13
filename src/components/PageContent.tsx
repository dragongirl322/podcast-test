'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import LandingPage from '@/components/LandingPage'
import { generateSessionId, parseVariant, getDeviceCategory } from '@/lib/tracking'

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

      // Create page visit record via API
      await fetch('/api/tracking/page-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          variant,
          utmSource: searchParams.get('utm_source') || null,
          utmMedium: searchParams.get('utm_medium') || null,
          utmCampaign: searchParams.get('utm_campaign') || null,
          utmContent: searchParams.get('utm_content') || null,
          referrer: document.referrer || null,
          deviceCategory: getDeviceCategory(navigator.userAgent),
        }),
      }).catch((err) => console.error('Failed to track page visit:', err))

      // Fire Meta PageView event if configured
      if (process.env.NEXT_PUBLIC_META_PIXEL_ID && typeof window !== 'undefined') {
        // Load the Meta pixel script
        const script = document.createElement('script')
        script.async = true
        script.src = 'https://connect.facebook.net/en_US/fbevents.js'
        script.onload = () => {
          // Initialize Meta Pixel after script loads
          ;(window as any).fbq('init', process.env.NEXT_PUBLIC_META_PIXEL_ID)
          ;(window as any).fbq('track', 'PageView')
        }
        document.head.appendChild(script)
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
