'use client'

import { useState } from 'react'
import { CAREER_STAGES, AGE_RANGES } from '@/lib/validation'

const CAREER_STAGE_LABELS: Record<string, string> = {
  high_school: 'High school student',
  college_or_training: 'College or training program',
  early_career: 'Early career: 0–5 years',
  developing_career: 'Developing career: 6–10 years',
  mid_career: 'Mid-career',
  career_change: 'Considering a career change',
  generally_curious: 'Generally curious about work',
  other: 'Other',
}

const AGE_RANGE_LABELS: Record<string, string> = {
  under_18: 'Under 18',
  '18_20': '18–20',
  '21_24': '21–24',
  '25_29': '25–29',
  '30_39': '30–39',
  '40_49': '40–49',
  '50_59': '50–59',
  '60_plus': '60+',
}

interface ListenerFormProps {
  variant: string
  onSuccess: (signupId: string) => void
}

export default function ListenerForm({ variant, onSuccess }: ListenerFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [formData, setFormData] = useState({
    email: '',
    careerStage: '',
    suggestedJob: '',
    ageRange: '',
    interestExplanation: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/forms/listener-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          variant,
          consent: true,
          honeypot: '',
          utmSource: new URLSearchParams(window.location.search).get('utm_source'),
          utmMedium: new URLSearchParams(window.location.search).get('utm_medium'),
          utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign'),
          utmContent: new URLSearchParams(window.location.search).get('utm_content'),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'An error occurred. Please try again.')
        return
      }

      // Fire Meta Lead event if pixel is configured
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          variant,
        })
      }

      onSuccess(data.signupId)
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Form submission error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-inter font-medium text-brand-navy mb-2">
          Email address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-ochre focus:border-transparent"
          placeholder="you@example.com"
        />
      </div>

      {/* Career Stage */}
      <div>
        <label htmlFor="careerStage" className="block font-inter font-medium text-brand-navy mb-2">
          Career stage <span className="text-red-500">*</span>
        </label>
        <select
          id="careerStage"
          name="careerStage"
          value={formData.careerStage}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-ochre focus:border-transparent"
        >
          <option value="">Select a career stage</option>
          {CAREER_STAGES.map((stage) => (
            <option key={stage} value={stage}>
              {CAREER_STAGE_LABELS[stage]}
            </option>
          ))}
        </select>
      </div>

      {/* Suggested Job */}
      <div>
        <label htmlFor="suggestedJob" className="block font-inter font-medium text-brand-navy mb-2">
          What job would you like the podcast to explore? <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="suggestedJob"
          name="suggestedJob"
          value={formData.suggestedJob}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-ochre focus:border-transparent"
          placeholder="e.g., Harbor pilot, Museum conservator"
        />
      </div>

      {/* Age Range (Optional) */}
      <div>
        <label htmlFor="ageRange" className="block font-inter font-medium text-brand-navy mb-2">
          Age range <span className="text-gray-500 text-sm">(optional)</span>
        </label>
        <select
          id="ageRange"
          name="ageRange"
          value={formData.ageRange}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-ochre focus:border-transparent"
        >
          <option value="">Select an age range</option>
          {AGE_RANGES.map((range) => (
            <option key={range} value={range}>
              {AGE_RANGE_LABELS[range]}
            </option>
          ))}
        </select>
      </div>

      {/* Interest Explanation (Optional) */}
      <div>
        <label htmlFor="interestExplanation" className="block font-inter font-medium text-brand-navy mb-2">
          Why does this idea interest you? <span className="text-gray-500 text-sm">(optional)</span>
        </label>
        <textarea
          id="interestExplanation"
          name="interestExplanation"
          value={formData.interestExplanation}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-ochre focus:border-transparent"
          placeholder="Tell us what appeals to you about this podcast concept..."
        />
      </div>

      {/* Consent Checkbox */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          required
          className="w-4 h-4 mt-1 border border-brand-gray rounded focus:outline-none focus:ring-2 focus:ring-brand-ochre"
        />
        <label htmlFor="consent" className="text-brand-slate">
          I agree to receive occasional updates about this prospective podcast. I can unsubscribe at any time.
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-brand-ochre hover:bg-brand-navy text-white font-inter font-medium rounded-lg transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Submitting...' : 'Help shape the podcast'}
      </button>
    </form>
  )
}
