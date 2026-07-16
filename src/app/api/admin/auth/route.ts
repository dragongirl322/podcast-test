import { createSessionToken, verifyResultsPassword } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { error: 'Password required' },
        { status: 400 }
      )
    }

    if (!verifyResultsPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    return NextResponse.json({ token: createSessionToken() })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
