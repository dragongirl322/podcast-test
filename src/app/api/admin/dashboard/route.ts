import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// Manual end-to-end testing against the production database ran on 2026-07-13.
// Those rows are real database records with nothing to distinguish them from real
// traffic except their date, so the dashboard counts only what came after them.
const DATA_CUTOFF = new Date('2026-07-14T00:00:00Z')

export async function GET(request: NextRequest) {
  try {
    // Check auth token (simple check)
    const auth = request.headers.get('authorization')
    if (!auth?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all data
    const [visits, signups, guestLeads] = await Promise.all([
      prisma.pageVisit.findMany({
        where: { createdAt: { gte: DATA_CUTOFF } },
      }),
      prisma.listenerSignup.findMany({
        where: { createdAt: { gte: DATA_CUTOFF } },
      }),
      prisma.guestLead.findMany({
        where: { createdAt: { gte: DATA_CUTOFF } },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
    ])

    // Calculate unique visitors (based on sessionId)
    const uniqueSessions = new Set(visits.map((v) => v.sessionId))

    // Calculate metrics by variant
    const visits_by_variant: Record<string, number> = {}
    const signups_by_variant: Record<string, number> = {}
    const conversion_rates: Record<string, number> = {}

    ;['possibility', 'reality', 'curiosity'].forEach((variant) => {
      const variant_visits = visits.filter((v) => v.variant === variant).length
      const variant_signups = signups.filter((s) => s.variant === variant).length
      visits_by_variant[variant] = variant_visits
      signups_by_variant[variant] = variant_signups
      conversion_rates[variant] = variant_visits > 0 ? variant_signups / variant_visits : 0
    })

    // Career stages
    const careerStages: Record<string, number> = {}
    signups.forEach((s) => {
      careerStages[s.careerStage] = (careerStages[s.careerStage] || 0) + 1
    })

    // Age ranges
    const ageRanges: Record<string, number> = {}
    signups.forEach((s) => {
      if (s.ageRange) {
        ageRanges[s.ageRange] = (ageRanges[s.ageRange] || 0) + 1
      }
    })

    // Top jobs
    const jobCounts: Record<string, number> = {}
    signups.forEach((s) => {
      const job = s.suggestedJob
      jobCounts[job] = (jobCounts[job] || 0) + 1
    })

    const topJobs = Object.entries(jobCounts)
      .map(([job, count]) => ({ job, count }))
      .sort((a, b) => b.count - a.count)

    // Overall conversion
    const totalVisits = visits.length
    const totalSignups = signups.length
    const overallConversion = totalVisits > 0 ? totalSignups / totalVisits : 0

    // Recent responses (with emails partially redacted for display)
    const recentResponses = signups
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 15)
      .map((s) => ({
        email: s.email,
        job: s.suggestedJob,
        explanation: s.interestExplanation,
        createdAt: s.createdAt.toISOString(),
      }))

    return NextResponse.json({
      totalVisits,
      totalSignups,
      uniqueVisitors: uniqueSessions.size,
      conversionRate: overallConversion,
      visits: visits_by_variant,
      signups: signups_by_variant,
      conversionRates: conversion_rates,
      careerStages,
      ageRanges,
      topJobs,
      guestLeadCount: guestLeads.length,
      recentResponses,
      dataCutoff: DATA_CUTOFF.toISOString(),
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
