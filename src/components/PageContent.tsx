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

      // TODO: Create page visit record via API (disabled until DATABASE_URL issue resolved)
      // await fetch('/api/tracking/page-visit', {...})

      // Fire Meta PageView event if configured
      const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1773569730493823'
      console.log('Meta Pixel ID:', pixelId)

      if (pixelId && typeof window !== 'undefined') {
        console.log('Setting up Meta pixel...')

        // Create fbq stub/queue before loading script
        ;(window as any).fbq = (window as any).fbq || function () {
          ;((window as any).fbq.callQueue = (window as any).fbq.callQueue || []).push(arguments)
        }
        ;(window as any).fbq.callQueue = (window as any).fbq.callQueue || []
        ;(window as any).fbq.loaded = true
        ;(window as any).fbq.version = '2.0'

        // Queue init and track calls
        ;(window as any).fbq('init', pixelId)
        ;(window as any).fbq('track', 'PageView')
        console.log('fbq queued, loading script...')

        // Load the Meta pixel script
        const script = document.createElement('script')
        script.async = true
        script.src = 'https://connect.facebook.net/en_US/fbevents.js'
        script.onerror = () => {
          console.error('Failed to load Meta pixel script')
        }
        document.head.appendChild(script)
      } else {
        console.log('Meta pixel not configured or window not available')
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
