import { prisma } from './db'

interface CreatePageVisitParams {
  sessionId: string
  variant: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  referrer?: string
  deviceCategory?: string
}

export async function createPageVisit(params: CreatePageVisitParams) {
  return prisma.pageVisit.create({
    data: params,
  })
}

export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

export async function checkDuplicateEmail(email: string): Promise<boolean> {
  const normalized = normalizeEmail(email)
  const existing = await prisma.listenerSignup.findUnique({
    where: { email: normalized },
  })
  return !!existing
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function parseVariant(variant: unknown): string {
  const validVariants = ['possibility', 'reality', 'curiosity']
  if (typeof variant === 'string' && validVariants.includes(variant)) {
    return variant
  }
  return 'possibility'
}

export function getDeviceCategory(userAgent?: string): string {
  if (!userAgent) return 'unknown'

  const ua = userAgent.toLowerCase()
  if (/mobile|android|iphone|ipod/.test(ua)) return 'mobile'
  if (/tablet|ipad|android|kindle/.test(ua)) return 'tablet'
  return 'desktop'
}
