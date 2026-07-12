import { prisma } from '@/lib/db'
import { guestLeadSchema } from '@/lib/validation'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate schema
    const validated = guestLeadSchema.parse(body)

    // Create guest lead
    const guestLead = await prisma.guestLead.create({
      data: {
        listenerSignupId: body.listenerSignupId || null,
        nominationType: validated.nominationType,
        jobTitle: validated.jobTitle,
        description: validated.description,
        name: validated.name || null,
        email: validated.email || null,
        linkedInUrl: validated.linkedInUrl || null,
        relationship: validated.relationship || null,
        permissionToContact: validated.permissionToContact,
      },
    })

    return NextResponse.json({
      success: true,
      leadId: guestLead.id,
    })
  } catch (error) {
    console.error('Guest lead error:', error)

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
