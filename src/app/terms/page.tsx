import Link from 'next/link'

export default function Terms() {
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
        <h1 className="font-fraunces text-4xl font-bold text-brand-navy mb-8">Terms of Service</h1>

        <div className="space-y-8 text-brand-slate leading-relaxed">
          <section>
            <h2 className="font-fraunces text-2xl font-bold text-brand-navy mb-4">
              What this is
            </h2>
            <p>
              This is a research project to validate whether a podcast about interesting careers should be produced. By signing up, you're helping us understand audience demand.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-2xl font-bold text-brand-navy mb-4">
              What will happen with your information
            </h2>
            <p>
              By joining this research list, you agree that:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>We may contact you with updates about the podcast research</li>
              <li>We may send you a short follow-up survey to better understand your interests</li>
              <li>If we produce the podcast, we may invite you to hear an early episode</li>
              <li>You can unsubscribe at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="font-fraunces text-2xl font-bold text-brand-navy mb-4">
              If you nominate a guest
            </h2>
            <p>
              If you nominate yourself or someone else as a potential podcast guest, we may:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Contact you to learn more about the person and their work</li>
              <li>Invite them to apply to be a podcast guest</li>
              <li>Use the information you've provided for our research and analytics</li>
            </ul>
            <p className="mt-4">
              Submitting a nomination does not guarantee the person will be selected as a guest.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-2xl font-bold text-brand-navy mb-4">
              Content standards
            </h2>
            <p>
              When submitting information, please don't include anything:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>That's illegal or violates anyone's rights</li>
              <li>That's harassing or abusive</li>
              <li>That's spam</li>
              <li>That contains others' private information without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="font-fraunces text-2xl font-bold text-brand-navy mb-4">
              Limitation of liability
            </h2>
            <p>
              This site is provided "as is." We are not liable for any indirect, incidental, special, or consequential damages resulting from your use of this site or inability to use it.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-2xl font-bold text-brand-navy mb-4">
              Changes to these terms
            </h2>
            <p>
              We may update these terms at any time. Continued use of the site means you accept the changes.
            </p>
          </section>

          <section>
            <h2 className="font-fraunces text-2xl font-bold text-brand-navy mb-4">
              Contact
            </h2>
            <p>
              Questions? Email <a href="mailto:contact@example.com" className="text-brand-ochre">contact@example.com</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
