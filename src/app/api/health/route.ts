import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  // Report env presence as booleans only — never expose the values
  const env = {
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    hasMetaPixelId: Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID),
  }

  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`

    return NextResponse.json({
      status: 'healthy',
      env,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    // Surface the error code/name (not the message, which can contain the URL)
    const detail =
      error instanceof Error ? error.name : 'UnknownError'
    console.error('Health check failed:', error)
    return NextResponse.json(
      { status: 'unhealthy', env, error: detail },
      { status: 503 }
    )
  }
}
