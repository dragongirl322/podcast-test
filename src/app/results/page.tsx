'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ResultsDashboard from '@/components/ResultsDashboard'

interface DashboardData {
  totalVisits: number
  totalSignups: number
  uniqueVisitors: number
  conversionRate: number
  visits: Record<string, number>
  signups: Record<string, number>
  conversionRates: Record<string, number>
  careerStages: Record<string, number>
  ageRanges: Record<string, number>
  topJobs: Array<{ job: string; count: number }>
  guestLeadCount: number
  recentResponses: Array<{ email: string; job: string; explanation?: string; createdAt: string }>
  dataCutoff: string
}

export default function ResultsPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DashboardData | null>(null)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError('Invalid password')
        return
      }

      setAuthenticated(true)
      localStorage.setItem('results_auth', result.token)

      // Fetch dashboard data
      const dataResponse = await fetch('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${result.token}`,
        },
      })

      const dashboardData = await dataResponse.json()
      setData(dashboardData)
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-white border border-brand-gray rounded-lg p-8 space-y-6">
            <div>
              <h1 className="font-fraunces text-2xl font-bold text-brand-navy mb-2">
                Results Dashboard
              </h1>
              <p className="text-sm text-brand-slate">
                Enter your password to view experiment results.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block font-medium text-brand-navy mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-brand-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-ochre focus:border-transparent"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-brand-ochre hover:bg-brand-navy text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div>
              <Link href="/" className="text-sm text-brand-ochre hover:underline">
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center">
        <p className="text-brand-slate">Loading results...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-ivory">
      <header className="border-b border-brand-gray">
        <nav className="mx-auto max-w-4xl px-6 py-6 flex justify-between items-center">
          <h1 className="font-fraunces text-2xl font-bold text-brand-navy">Results Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('results_auth')
              setAuthenticated(false)
              setPassword('')
            }}
            className="text-sm text-brand-ochre hover:underline"
          >
            Sign out
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <ResultsDashboard data={data} />
      </main>
    </div>
  )
}
