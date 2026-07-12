'use client'

import { useState } from 'react'

interface GuestLeadFormProps {
  signupId: string
  nominationType: 'self' | 'referral'
  onSuccess: () => void
}

export default function GuestLeadForm({
  signupId,
  nominationType,
  onSuccess,
}: GuestLeadFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    name: '',
    email: '',
    linkedInUrl: '',
    relationship: '',
    permissionToContact: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target as any
    const isCheckbox = type === 'checkbox'
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : false
    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/forms/guest-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          listenerSignupId: signupId,
          nominationType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'An error occurred. Please try again.')
        return
      }

      onSuccess()
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

      {/* Job Title */}
      <div>
        <label htmlFor="jobTitle" className="block font-inter font-medium text-brand-navy mb-2">
          Job title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-ochre focus:border-transparent"
          placeholder="e.g., Harbor pilot"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block font-inter font-medium text-brand-navy mb-2">
          What makes this job interesting? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-ochre focus:border-transparent"
          placeholder="Tell us why this job should be explored in the podcast..."
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block font-inter font-medium text-brand-navy mb-2">
          Name <span className="text-gray-500 text-sm">(optional)</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-ochre focus:border-transparent"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-inter font-medium text-brand-navy mb-2">
          Email <span className="text-gray-500 text-sm">(optional)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-ochre focus:border-transparent"
          placeholder="you@example.com"
        />
      </div>

      {/* LinkedIn URL */}
      <div>
        <label htmlFor="linkedInUrl" className="block font-inter font-medium text-brand-navy mb-2">
          LinkedIn profile <span className="text-gray-500 text-sm">(optional)</span>
        </label>
        <input
          type="url"
          id="linkedInUrl"
          name="linkedInUrl"
          value={formData.linkedInUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-ochre focus:border-transparent"
          placeholder="https://linkedin.com/in/..."
        />
      </div>

      {/* Relationship */}
      {nominationType === 'referral' && (
        <div>
          <label htmlFor="relationship" className="block font-inter font-medium text-brand-navy mb-2">
            Relationship to this person <span className="text-gray-500 text-sm">(optional)</span>
          </label>
          <input
            type="text"
            id="relationship"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-ochre focus:border-transparent"
            placeholder="e.g., Colleague, friend, family member"
          />
        </div>
      )}

      {/* Permission to Contact */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="permissionToContact"
          name="permissionToContact"
          checked={formData.permissionToContact}
          onChange={handleChange}
          className="w-4 h-4 mt-1 border border-brand-gray rounded focus:outline-none focus:ring-2 focus:ring-brand-ochre"
        />
        <label htmlFor="permissionToContact" className="text-brand-slate">
          You can contact me or the person about being a guest on the podcast
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-brand-ochre hover:bg-brand-navy text-white font-inter font-medium rounded-lg transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Submitting...' : 'Submit guest lead'}
      </button>
    </form>
  )
}
