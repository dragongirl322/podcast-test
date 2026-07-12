'use client'

import { useState } from 'react'
import GuestLeadForm from './GuestLeadForm'

interface GuestLeadPromptProps {
  signupId: string
}

export default function GuestLeadPrompt({ signupId }: GuestLeadPromptProps) {
  const [selection, setSelection] = useState<'self' | 'referral' | 'skip' | null>(null)
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="p-6 bg-brand-green bg-opacity-10 border border-brand-green rounded-lg">
          <h3 className="font-fraunces text-lg font-bold text-brand-green mb-2">
            Thank you!
          </h3>
          <p className="text-brand-slate">
            We've received your information. You'll hear from us soon.
          </p>
        </div>
      </div>
    )
  }

  if (selection && selection !== 'skip') {
    return (
      <GuestLeadForm
        signupId={signupId}
        nominationType={selection}
        onSuccess={() => setSubmitted(true)}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-brand-green bg-opacity-10 border border-brand-green rounded-lg mb-8">
        <h3 className="font-fraunces text-lg font-bold text-brand-navy mb-2">
          Thank you—you're helping decide whether this podcast should exist.
        </h3>
        <p className="text-brand-slate">
          Next, we'd like to learn about interesting work you know about.
        </p>
      </div>

      <div className="space-y-4">
        <p className="font-medium text-brand-navy">
          Do you—or someone you know—have a job more people should understand?
        </p>

        <div className="space-y-3">
          <button
            onClick={() => setSelection('self')}
            className="w-full p-4 text-left border-2 border-brand-gray hover:border-brand-ochre rounded-lg transition-colors"
          >
            <p className="font-medium text-brand-navy">I do</p>
            <p className="text-sm text-brand-slate">Tell us about your job</p>
          </button>

          <button
            onClick={() => setSelection('referral')}
            className="w-full p-4 text-left border-2 border-brand-gray hover:border-brand-ochre rounded-lg transition-colors"
          >
            <p className="font-medium text-brand-navy">I know someone</p>
            <p className="text-sm text-brand-slate">Refer a person for the podcast</p>
          </button>

          <button
            onClick={() => setSelection('skip')}
            className="w-full p-4 text-left border-2 border-brand-gray hover:border-brand-gray rounded-lg transition-colors"
          >
            <p className="font-medium text-brand-navy">Not right now</p>
            <p className="text-sm text-brand-slate">We understand—thanks for joining!</p>
          </button>
        </div>
      </div>
    </div>
  )
}
