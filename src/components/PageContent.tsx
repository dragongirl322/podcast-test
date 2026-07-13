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

      if (pixelId && typeof window !== 'undefined' && !(window as any).fbq) {
        console.log('Loading Meta pixel script...')

        // Load the Meta pixel script - it will initialize itself
        const script = document.createElement('script')
        script.async = true
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `
        document.head.appendChild(script)
        console.log('Meta pixel initialized')
      } else {
        console.log('Meta pixel already loaded or not configured')
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
