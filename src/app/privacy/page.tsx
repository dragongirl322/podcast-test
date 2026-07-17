import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy — Career Podcast Research',
  description: 'What this research project collects, why, and how to have your data removed.',
}

const CONTACT_EMAIL = 'Noreply@podcast.3tinteractive.com'

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 font-inter text-brand-slate">
      <h1 className="font-fraunces text-3xl font-bold text-brand-navy mb-2">Privacy</h1>
      <p className="text-sm mb-10">Last updated 17 July 2026</p>

      <section className="space-y-4 mb-10">
        <p>
          This is a research project, not a live podcast. Its only purpose is to find out whether
          a podcast about unusual and unfamiliar careers is worth producing. We collect as little
          as we can to answer that question, and you can have anything you give us deleted at any
          time.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="font-fraunces text-xl font-bold text-brand-navy">What we collect</h2>
        <p>
          <strong>When you visit the page.</strong> We record which headline version you saw, a
          random session identifier, your device type (mobile, tablet, or desktop), where you
          arrived from, and any campaign tags in the link you followed. We do not store your IP
          address or your name.
        </p>
        <p>
          <strong>If you join the research list.</strong> We store your email address and the
          answers you choose to give: your stage of career, a job you find interesting, and
          optionally your age range and a note about what appeals to you.
        </p>
        <p>
          <strong>If you suggest a guest.</strong> We store the job and description you provide,
          and optionally the person&apos;s name, email, LinkedIn URL, your relationship to them,
          and whether you&apos;ve confirmed it&apos;s okay to contact them.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="font-fraunces text-xl font-bold text-brand-navy">Who else receives data</h2>
        <p>
          <strong>Meta (Facebook).</strong> This site loads the Meta Pixel, which reports your
          visit to Meta so we can measure whether ads are reaching interested people. Meta receives
          the fact of your visit along with the technical information a browser normally sends, such
          as your IP address. This is governed by Meta&apos;s own privacy policy.
        </p>
        <p>
          <strong>Resend.</strong> If you join the list, we send your confirmation email through
          Resend, an email delivery service. Resend receives your email address in order to
          deliver that message.
        </p>
        <p>
          <strong>Railway.</strong> The site and its database are hosted on Railway, which stores
          the information above on our behalf.
        </p>
        <p>We do not sell your data, and we do not share it with anyone beyond the services above.</p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="font-fraunces text-xl font-bold text-brand-navy">Your choices</h2>
        <p>
          Every email we send includes an unsubscribe link that stops all further email
          immediately. To have your stored information deleted entirely, or to ask what we hold
          about you, email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-ochre hover:underline">
            {CONTACT_EMAIL}
          </a>{' '}
          and we&apos;ll take care of it.
        </p>
      </section>

      <Link href="/" className="text-brand-ochre hover:underline">
        ← Back to the research page
      </Link>
    </main>
  )
}
