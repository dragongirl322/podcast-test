import bcrypt from 'bcryptjs'

const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-secret-change-in-production'
const RESULTS_PASSWORD = process.env.RESULTS_PASSWORD || 'password'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function verifyResultsPassword(password: string): boolean {
  return password === RESULTS_PASSWORD
}

export function getSessionSecret(): string {
  return SESSION_SECRET
}
