import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  // Report env presence as booleans only — never expose the values.
  // Also list the NAMES of injected vars (names aren't secrets) to confirm
  // whether Railway is injecting service variables into this deployment.
  const env = {
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    databaseUrlLength: (process.env.DATABASE_URL || '').length,
    deployedService: process.env.RAILWAY_SERVICE_NAME || null,
    deployedEnvironment: process.env.RAILWAY_ENVIRONMENT_NAME || null,
    injectedKeys: Object.keys(process.env)
      .filter((k) => !/(SECRET|PASSWORD|KEY|TOKEN)/i.test(k))
      .sort(),
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
