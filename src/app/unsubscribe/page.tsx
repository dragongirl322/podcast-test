'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'

function UnsubscribeForm() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  // Unsubscribing requires this click rather than happening on page load:
  // mail clients and security scanners prefetch links, which would otherwise
  // unsubscribe people who never opened the email.
  const handleUnsubscribe = async () => {
    setStatus('loading')
    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setStatus(response.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (!id) {
    return (
      <p className="text-brand-slate">
        This unsubscribe link is missing its identifier. Please use the link at the bottom
        of the email you received, or reply to that email and I&apos;ll remove you manually.
      </p>
    )
  }

  if (status === 'done') {
    return (
      <>
        <h1 className="font-fraunces text-3xl font-bold text-brand-navy mb-4">
          You&apos;re unsubscribed
        </h1>
        <p className="text-brand-slate">
          You won&apos;t receive any further emails about this podcast research. Thank you for
          taking a look.
        </p>
      </>
    )
  }

  return (
    <>
      <h1 className="font-fraunces text-3xl font-bold text-brand-navy mb-4">
        Unsubscribe
      </h1>
      <p className="text-brand-slate mb-6">
        Confirm below and you&apos;ll stop receiving emails about this podcast research.
      </p>
      <button
        onClick={handleUnsubscribe}
        disabled={status === 'loading'}
        className="px-6 py-3 bg-brand-navy text-white rounded-lg font-medium disabled:opacity-60"
      >
        {status === 'loading' ? 'Unsubscribing…' : 'Unsubscribe me'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-600 mt-4">
          Something went wrong. Please try again, or reply to the email you received and
          I&apos;ll remove you manually.
        </p>
      )}
    </>
  )
}

export default function UnsubscribePage() {
  return (
    <main className="max-w-xl mx-auto px-6 py-20">
      <Suspense fallback={<p className="text-brand-slate">Loading…</p>}>
        <UnsubscribeForm />
      </Suspense>
    </main>
  )
}
