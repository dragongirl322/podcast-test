export async function sendConfirmationEmail(email: string, signupId: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    console.warn('Email service not configured. Skipping confirmation email.')
    return false
  }

  try {
    // Import lazily to avoid issues during build when API key is missing
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://example.com'}/unsubscribe?id=${signupId}`

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to the podcast research',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1E2A38;">
          <h1 style="font-size: 24px; margin-bottom: 16px;">Thank you for joining</h1>

          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            You've successfully joined our research list for a prospective podcast about fascinating and unfamiliar careers.
          </p>

          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            <strong>A quick reminder:</strong> This podcast is currently an idea, not an existing show. I'm researching whether people would find it useful and entertaining before producing it.
          </p>

          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            By joining this list, you're helping me understand whether this concept resonates. You may receive:
          </p>

          <ul style="font-size: 16px; line-height: 1.8; margin-bottom: 16px; margin-left: 20px;">
            <li>Updates about the podcast's progress</li>
            <li>A short follow-up survey about what topics you'd most like to hear</li>
            <li>An invitation to hear an early episode, if production begins</li>
          </ul>

          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            You can unsubscribe at any time by clicking the link at the bottom of this email.
          </p>

          <p style="font-size: 14px; line-height: 1.6; color: #5D6672; margin-top: 32px; padding-top: 16px; border-top: 1px solid #E5E7EB;">
            Questions? Reply to this email.
          </p>

          <p style="font-size: 12px; line-height: 1.6; color: #5D6672; margin-top: 16px;">
            <a href="${unsubscribeUrl}" style="color: #D39B2A; text-decoration: underline;">Unsubscribe from this list</a>
          </p>
        </div>
      `,
    })

    return true
  } catch (error) {
    console.error('Failed to send confirmation email:', error)
    return false
  }
}
