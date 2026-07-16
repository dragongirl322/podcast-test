import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json()

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 })
    }

    // Already-unsubscribed and unknown ids both report success: the response must
    // not reveal whether a given id maps to a real signup.
    await prisma.listenerSignup.updateMany({
      where: { id, unsubscribedAt: null },
      data: { unsubscribedAt: new Date() },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 })
  }
}
