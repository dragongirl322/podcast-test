import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import MetaPixel from '@/components/MetaPixel'

export const metadata: Metadata = {
  title: 'Career Podcast Research',
  description: 'Help us decide if this podcast about interesting careers should exist',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''

  return (
    <html lang="en">
      <body>
        {children}
        <MetaPixel pixelId={pixelId} />
      </body>
    </html>
  )
}
