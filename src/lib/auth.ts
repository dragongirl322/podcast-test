import crypto from 'crypto'

const SESSION_TTL_MS = 12 * 60 * 60 * 1000

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    // Fail closed. Falling back to a default would mean any deployment missing this
    // variable shares a publicly-known secret, leaving tokens forgeable by anyone.
    throw new Error(`${name} is not set`)
  }
  return value
}

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

function sign(payload: string): string {
  return crypto
    .createHmac('sha256', requireEnv('SESSION_SECRET'))
    .update(payload)
    .digest('base64url')
}

export function verifyResultsPassword(password: string): boolean {
  return timingSafeEqual(password, requireEnv('RESULTS_PASSWORD'))
}

export function createSessionToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + SESSION_TTL_MS })
  ).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token) return false

  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false

  if (!timingSafeEqual(signature, sign(payload))) return false

  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return typeof exp === 'number' && Date.now() < exp
  } catch {
    return false
  }
}

export function verifyAuthHeader(header: string | null): boolean {
  if (!header?.startsWith('Bearer ')) return false
  return verifySessionToken(header.slice('Bearer '.length))
}
