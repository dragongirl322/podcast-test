'use client'

import { useEffect, useState } from 'react'
import ListenerForm from './ListenerForm'
import GuestLeadPrompt from './GuestLeadPrompt'

interface Variant {
  key: string
  headline: string
  description: string
}

const VARIANTS: Record<string, Variant> = {
  possibility: {
    key: 'possibility',
    headline: "Your next career might be one you've never heard of.",
    description:
      "I'm exploring a podcast about the surprising, meaningful, and sometimes unconventional jobs people do. How they found them, what the work is really like, what they love, and what they wish they had known.",
  },
  reality: {
    key: 'reality',
    headline: 'What are interesting jobs really like?',
    description:
      "Job descriptions rarely tell you what work actually feels like. I'm exploring a podcast built around candid conversations with people in fascinating careers: how they got there, what they earn, what they love, what they hate, and whether they would choose the job again.",
  },
  curiosity: {
    key: 'curiosity',
    headline: "The most interesting jobs you've never considered.",
    description:
      "Harbor pilots. Foley artists. Prosthetists. Air-traffic controllers. Conservators. Court reporters. There is an enormous world of work hiding in plain sight. I'm considering a podcast that lets people tell the real story of what they do.",
  },
}

const SAMPLE_TOPICS = [
  'What it is really like to be an air-traffic controller',
  'How someone becomes a museum conservator',
  'The hidden world of harbor pilots',
  'Designing and fitting artificial limbs',
]

const INTERVIEW_TOPICS = [
  'How did you discover the job?',
  'What does a normal day actually involve?',
  'What education, training, or credentials are required?',
  'What does the work pay?',
  'What do you love about it?',
  'What is difficult, frustrating, or misunderstood?',
  'Who thrives in the job, and who probably would not?',
  'Would you choose it again?',
]

export default function LandingPage({ variant: initialVariant }: { variant: string }) {
  const [variant, setVariant] = useState<Variant>(VARIANTS.possibility)
  const [showGuestPrompt, setShowGuestPrompt] = useState(false)
  const [signupId, setSignupId] = useState<string>('')

  useEffect(() => {
    const v = VARIANTS[initialVariant] || VARIANTS.possibility
    setVariant(v)
  }, [initialVariant])

  return (
    <div className="min-h-screen bg-brand-ivory">
      {/* Banner Image */}
      <div className="w-full h-64 md:h-96 relative overflow-hidden">
        <img
          src="/pexels-thefullonmonet-28379844.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <h2 className="font-fraunces text-4xl font-bold text-brand-navy mb-6">
            {variant.headline}
          </h2>
          <p className="text-lg text-brand-slate leading-relaxed mb-8">
            {variant.description}
          </p>
        </section>

        {/* Sample Topics */}
        <section className="mb-12">
          <h3 className="font-fraunces text-2xl font-bold text-brand-navy mb-6">
            Example conversations
          </h3>
          <ul className="space-y-3">
            {SAMPLE_TOPICS.map((topic) => (
              <li key={topic} className="flex items-start gap-3">
                <span className="text-brand-ochre font-bold mt-1">•</span>
                <span className="text-brand-slate">{topic}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Interview Guide */}
        <section className="mb-12 pb-12 border-b border-brand-gray">
          <h3 className="font-fraunces text-2xl font-bold text-brand-navy mb-6">
            What each conversation would explore
          </h3>
          <ul className="space-y-3">
            {INTERVIEW_TOPICS.map((topic) => (
              <li key={topic} className="flex items-start gap-3">
                <span className="text-brand-ochre font-bold mt-1">•</span>
                <span className="text-brand-slate">{topic}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Signup Form */}
        <section className="mb-12">
          <div className="mb-8 p-6 bg-white border border-brand-gray rounded-lg">
            <p className="text-sm text-brand-slate leading-relaxed">
              <strong>Research disclosure:</strong> This podcast is currently an idea, not an existing show. I'm researching whether people would find it useful and entertaining before producing it.
            </p>
          </div>

          {!showGuestPrompt ? (
            <ListenerForm
              variant={variant.key}
              onSuccess={(id) => {
                setSignupId(id)
                setShowGuestPrompt(true)
              }}
            />
          ) : (
            <GuestLeadPrompt signupId={signupId} />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-gray bg-white">
        <div className="mx-auto max-w-2xl px-6 py-8">
          <div className="flex flex-col gap-4 text-sm text-brand-slate">
            <p>
              <a href="mailto:Questions@silioerkai.resend.app" className="text-brand-ochre hover:underline">
                Send Email
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
