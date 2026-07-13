import { NextResponse } from 'next/server'

// TEMPORARY diagnostic route — remove after confirming Resend config.
// Only ever sends to the project owner's address so it cannot be abused.
export async function GET() {
  const from = process.env.EMAIL_FROM || null
  const hasKey = Boolean(process.env.RESEND_API_KEY)

  if (!from || !hasKey) {
    return NextResponse.json({ from, hasKey, note: 'EMAIL_FROM or RESEND_API_KEY missing' })
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
      from,
      to: 'tam@tammysnow.com',
      subject: 'Resend diagnostic test',
      html: '<p>Resend diagnostic test — safe to ignore.</p>',
    })
    return NextResponse.json({ from, hasKey, sentId: data?.id ?? null, error: error ?? null })
  } catch (e) {
    return NextResponse.json({ from, hasKey, thrown: e instanceof Error ? e.message : String(e) })
  }
}
