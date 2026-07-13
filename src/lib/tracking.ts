import { prisma } from './db'
import { normalizeEmail, parseVariant } from './utils'

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

export async function checkDuplicateEmail(email: string): Promise<boolean> {
  const normalized = normalizeEmail(email)
  const existing = await prisma.listenerSignup.findUnique({
    where: { email: normalized },
  })
  return !!existing
}
