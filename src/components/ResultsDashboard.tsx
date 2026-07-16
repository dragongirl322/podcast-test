'use client'

import { useEffect, useState } from 'react'

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

interface ResultsDashboardProps {
  data: DashboardData
}

export default function ResultsDashboard({ data }: ResultsDashboardProps) {
  const [showEmails, setShowEmails] = useState(false)

  const handleCSVExport = async (type: 'signups' | 'leads' | 'summary') => {
    try {
      const response = await fetch(`/api/admin/export?type=${type}`)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `podcast-${type}-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    }
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-brand-slate">
        Counting activity from{' '}
        {new Date(data.dataCutoff).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}{' '}
        onward. Earlier pre-launch test records are excluded.
      </p>

      {/* Key Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-brand-gray rounded-lg">
          <p className="text-sm text-brand-slate mb-2">Total Visits</p>
          <p className="font-fraunces text-3xl font-bold text-brand-navy">
            {data.totalVisits.toLocaleString()}
          </p>
        </div>
        <div className="p-6 bg-white border border-brand-gray rounded-lg">
          <p className="text-sm text-brand-slate mb-2">Unique Visitors</p>
          <p className="font-fraunces text-3xl font-bold text-brand-navy">
            {data.uniqueVisitors.toLocaleString()}
          </p>
        </div>
        <div className="p-6 bg-white border border-brand-gray rounded-lg">
          <p className="text-sm text-brand-slate mb-2">Total Signups</p>
          <p className="font-fraunces text-3xl font-bold text-brand-navy">
            {data.totalSignups.toLocaleString()}
          </p>
        </div>
        <div className="p-6 bg-white border border-brand-gray rounded-lg">
          <p className="text-sm text-brand-slate mb-2">Overall Conversion Rate</p>
          <p className="font-fraunces text-3xl font-bold text-brand-navy">
            {(data.conversionRate * 100).toFixed(1)}%
          </p>
        </div>
      </section>

      {/* By Variant */}
      <section>
        <h3 className="font-fraunces text-2xl font-bold text-brand-navy mb-6">
          Results by Variant
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-gray">
                <th className="text-left py-3 px-4 font-medium text-brand-navy">Variant</th>
                <th className="text-right py-3 px-4 font-medium text-brand-navy">Visits</th>
                <th className="text-right py-3 px-4 font-medium text-brand-navy">Signups</th>
                <th className="text-right py-3 px-4 font-medium text-brand-navy">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {['possibility', 'reality', 'curiosity'].map((variant) => (
                <tr key={variant} className="border-b border-brand-gray hover:bg-brand-ivory">
                  <td className="py-3 px-4 capitalize text-brand-navy font-medium">{variant}</td>
                  <td className="text-right py-3 px-4 text-brand-slate">
                    {(data.visits[variant] || 0).toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4 text-brand-slate">
                    {(data.signups[variant] || 0).toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4 text-brand-slate">
                    {((data.conversionRates[variant] || 0) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Career Stage Breakdown */}
      <section>
        <h3 className="font-fraunces text-2xl font-bold text-brand-navy mb-6">
          Audience by Career Stage
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-gray">
                <th className="text-left py-3 px-4 font-medium text-brand-navy">Career Stage</th>
                <th className="text-right py-3 px-4 font-medium text-brand-navy">Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.careerStages)
                .sort(([, a], [, b]) => b - a)
                .map(([stage, count]) => (
                  <tr key={stage} className="border-b border-brand-gray hover:bg-brand-ivory">
                    <td className="py-3 px-4 text-brand-slate">{stage}</td>
                    <td className="text-right py-3 px-4 text-brand-navy font-medium">
                      {count.toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Top Jobs */}
      <section>
        <h3 className="font-fraunces text-2xl font-bold text-brand-navy mb-6">
          Most Frequently Suggested Jobs
        </h3>
        <div className="space-y-3">
          {data.topJobs.slice(0, 10).map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-white border border-brand-gray rounded-lg">
              <span className="text-brand-slate">{item.job}</span>
              <span className="text-brand-navy font-medium">{item.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Guest Leads Summary */}
      <section>
        <h3 className="font-fraunces text-2xl font-bold text-brand-navy mb-6">
          Guest Leads
        </h3>
        <div className="p-6 bg-white border border-brand-gray rounded-lg">
          <p className="font-medium text-brand-navy mb-2">Total Guest Leads Submitted</p>
          <p className="font-fraunces text-3xl font-bold text-brand-green">{data.guestLeadCount}</p>
        </div>
      </section>

      {/* Recent Responses */}
      <section>
        <h3 className="font-fraunces text-2xl font-bold text-brand-navy mb-6">
          Recent Signups
        </h3>
        <div className="space-y-4">
          {data.recentResponses.map((response, index) => (
            <div key={index} className="p-4 bg-white border border-brand-gray rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  {showEmails ? (
                    <p className="text-sm text-brand-slate font-mono">{response.email}</p>
                  ) : (
                    <p className="text-sm text-brand-slate">[Email redacted]</p>
                  )}
                  <p className="text-sm text-brand-navy font-medium mt-1">{response.job}</p>
                </div>
                <time className="text-xs text-brand-slate">
                  {new Date(response.createdAt).toLocaleDateString()}
                </time>
              </div>
              {response.explanation && (
                <p className="text-sm text-brand-slate italic">{response.explanation}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Exports & Settings */}
      <section className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-white border border-brand-gray rounded-lg">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showEmails}
              onChange={(e) => setShowEmails(e.target.checked)}
              className="w-4 h-4 border border-brand-gray rounded"
            />
            <span className="text-sm font-medium text-brand-navy">
              Show email addresses in recent responses
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleCSVExport('signups')}
            className="p-4 bg-brand-ochre hover:bg-brand-navy text-white rounded-lg font-medium transition-colors"
          >
            Export Signups
          </button>
          <button
            onClick={() => handleCSVExport('leads')}
            className="p-4 bg-brand-green hover:bg-brand-navy text-white rounded-lg font-medium transition-colors"
          >
            Export Guest Leads
          </button>
          <button
            onClick={() => handleCSVExport('summary')}
            className="p-4 bg-brand-slate hover:bg-brand-navy text-white rounded-lg font-medium transition-colors"
          >
            Export Summary
          </button>
        </div>
      </section>
    </div>
  )
}
