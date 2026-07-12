import Link from 'next/link'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-brand-ivory">
      <header className="border-b border-brand-gray">
        <nav className="mx-auto max-w-2xl px-6 py-6">
          <Link href="/" className="text-brand-navy hover:text-brand-ochre">
            ← Back
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="font-fraunces text-4xl font-bold text-brand-navy mb-8">Privacy Policy</h1>

        <div className="space-y-8 text-brand-slate leading-relaxed">
          <section>
            <h2 className="font-fraunces text-2xl font-bold text-brand-navy mb-4">
              What data we collect
            </h2>
            <p>
              When you sign up to help with this research, we collect:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Your email address</li>
              <li>Career stage</li>
              <li>Age range (optional)</li>
              <li>Suggested job title</li>
              <li>Why the podcast interests you (optional)</li>
              <li>UTM campaign parameters (if provided)</li>
              <li>Referrer information</li>
              <li>An anonymous session ID</li>
            </ul>
          </section>

          <section>
            <h2 className="font-fraunces text-2xl font-bold text-brand-navy mb-4">
              Why we collect it
            </h2>
            <p>
              We're using this data to understand:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Whether people would listen to this podcast</li>
              <li>Which positioning message resonates most</li>
              <li>What audience segments are most interested</li>
              <li>What jobs people want to hear about</li>
            </ul>
          </section>

          <section>
            <h2 className="font-fraunces text-2xl font-bold text-brand-navy mb-4">
              How we store it
            </h2>
            <p>
              Your data is stored in a secure database hosted on Railway. We do not store raw IP addresses. Access is restricted to authorized personnel.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-2xl font-bold text-brand-navy mb-4">
              Who receives your data
            </h2>
            <p>
              Your data is used only for this experiment. We do not sell, share, or distribute your information except:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>
                <strong>Meta Pixel:</strong> If you arrive via Meta advertising, Meta receives tracking data to measure campaign performance.
              </li>
              <li>
                <strong>Resend:</strong> If you opt in to email communication, Resend delivers our emails on our behalf.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-fraunces text-2xl font-bold text-brand-navy mb-4">
              How to delete your data
            </h2>
            <p>
              Email <a href="mailto:contact@example.com" className="text-brand-ochre">contact@example.com</a> to request deletion of your information.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-2xl font-bold text-brand-navy mb-4">
              About this research
            </h2>
            <p>
              This podcast is currently an idea, not an existing show. We're researching whether people would find it useful and entertaining before producing it.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-2xl font-bold text-brand-navy mb-4">
              Contact
            </h2>
            <p>
              Questions about this policy? Email{' '}
              <a href="mailto:contact@example.com" className="text-brand-ochre">contact@example.com</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
