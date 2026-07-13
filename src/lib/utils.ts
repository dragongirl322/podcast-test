export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim()
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
