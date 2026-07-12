'use client'

import { Suspense } from 'react'
import PageContent from '@/components/PageContent'

export default function Home() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  )
}
