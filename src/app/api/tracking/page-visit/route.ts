import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    await prisma.pageVisit.create({
      data: {
        sessionId: body.sessionId,
        variant: body.variant,
        utmSource: body.utmSource || null,
        utmMedium: body.utmMedium || null,
        utmCampaign: body.utmCampaign || null,
        utmContent: body.utmContent || null,
        referrer: body.referrer || null,
        deviceCategory: body.deviceCategory || null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Page visit tracking error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
