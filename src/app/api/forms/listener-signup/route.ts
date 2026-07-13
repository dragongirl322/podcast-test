import { prisma } from '@/lib/db'
import { listenerSignupSchema } from '@/lib/validation'
import { normalizeEmail, parseVariant } from '@/lib/utils'
import { checkDuplicateEmail } from '@/lib/tracking'
import { sendConfirmationEmail } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate honeypot (should be empty)
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json(
        { error: 'Form submission failed validation' },
        { status: 400 }
      )
    }

    // Validate schema
    const validated = listenerSignupSchema.parse(body)

    // Normalize email
    const email = normalizeEmail(validated.email)

    // Check for duplicates
    const isDuplicate = await checkDuplicateEmail(email)
    if (isDuplicate) {
      // Soft fail - don't reveal that email exists
      return NextResponse.json(
        {
          success: true,
          message: "Thank you—you're helping decide whether this podcast should exist.",
          isDuplicate: true,
        }
      )
    }

    // Parse variant from query params or body
    const variant = parseVariant(body.variant || 'possibility')

    // Create signup
    const signup = await prisma.listenerSignup.create({
      data: {
        email,
        careerStage: validated.careerStage,
        ageRange: validated.ageRange || null,
        suggestedJob: validated.suggestedJob,
        interestExplanation: validated.interestExplanation || null,
        variant,
        utmSource: body.utmSource || null,
        utmMedium: body.utmMedium || null,
        utmCampaign: body.utmCampaign || null,
        utmContent: body.utmContent || null,
        consentAt: new Date(),
      },
    })

    // Send confirmation email (fire and forget with idempotency protection)
    const emailSent = await sendConfirmationEmail(email, signup.id)
    if (emailSent) {
      // Mark when the confirmation email was sent for idempotency
      await prisma.listenerSignup.update({
        where: { id: signup.id },
        data: { confirmationEmailSentAt: new Date() },
      })
    }

    return NextResponse.json(
      {
        success: true,
        signupId: signup.id,
        message: "Thank you—you're helping decide whether this podcast should exist.",
      }
    )
  } catch (error) {
    console.error('Signup error:', error)

    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        { error: 'Invalid form submission' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
