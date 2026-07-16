import { verifyAuthHeader } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

function escapeCSV(value: string | null | undefined): string {
  if (!value) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function generateSignupsCSV(signups: any[]): string {
  const headers = [
    'Email',
    'Career Stage',
    'Age Range',
    'Suggested Job',
    'Interest Explanation',
    'Variant',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign',
    'UTM Content',
    'Consent Date',
    'Created At',
    'Unsubscribed At',
  ]

  const rows = signups.map((s) => [
    escapeCSV(s.email),
    escapeCSV(s.careerStage),
    escapeCSV(s.ageRange),
    escapeCSV(s.suggestedJob),
    escapeCSV(s.interestExplanation),
    escapeCSV(s.variant),
    escapeCSV(s.utmSource),
    escapeCSV(s.utmMedium),
    escapeCSV(s.utmCampaign),
    escapeCSV(s.utmContent),
    escapeCSV(s.consentAt.toISOString()),
    escapeCSV(s.createdAt.toISOString()),
    escapeCSV(s.unsubscribedAt ? s.unsubscribedAt.toISOString() : ''),
  ])

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
}

function generateLeadsCSV(leads: any[]): string {
  const headers = [
    'ID',
    'Job Title',
    'Description',
    'Name',
    'Email',
    'LinkedIn URL',
    'Relationship',
    'Nomination Type',
    'Permission to Contact',
    'Created At',
  ]

  const rows = leads.map((l) => [
    escapeCSV(l.id),
    escapeCSV(l.jobTitle),
    escapeCSV(l.description),
    escapeCSV(l.name),
    escapeCSV(l.email),
    escapeCSV(l.linkedInUrl),
    escapeCSV(l.relationship),
    escapeCSV(l.nominationType),
    escapeCSV(l.permissionToContact ? 'Yes' : 'No'),
    escapeCSV(l.createdAt.toISOString()),
  ])

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
}

function generateSummaryCSV(visits: any[], signups: any[]): string {
  const headers = ['Metric', 'Possibility', 'Reality', 'Curiosity', 'Total']
  const metrics = ['Visits', 'Signups', 'Conversion Rate (%)']

  const variants = ['possibility', 'reality', 'curiosity']
  const data: Record<string, any[]> = {
    Visits: variants.map((v) => visits.filter((x) => x.variant === v).length),
    Signups: variants.map((v) => signups.filter((x) => x.variant === v).length),
  }

  data['Conversion Rate (%)'] = variants.map((v, idx) => {
    const v_visits = data.Visits[idx]
    return v_visits > 0 ? ((data.Signups[idx] / v_visits) * 100).toFixed(1) : 'N/A'
  })

  const rows = metrics.map((metric) => {
    const values = data[metric] || []
    const total = metric === 'Visits' || metric === 'Signups' ? values.reduce((a: number, b: number) => a + b, 0) : 'N/A'
    return [metric, ...values, total]
  })

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
}

export async function GET(request: NextRequest) {
  try {
    if (!verifyAuthHeader(request.headers.get('authorization'))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const type = request.nextUrl.searchParams.get('type') || 'summary'

    const [visits, signups, leads] = await Promise.all([
      prisma.pageVisit.findMany(),
      prisma.listenerSignup.findMany(),
      prisma.guestLead.findMany(),
    ])

    let csv = ''
    let filename = 'export.csv'

    if (type === 'signups') {
      csv = generateSignupsCSV(signups)
      filename = `signups-${new Date().toISOString().split('T')[0]}.csv`
    } else if (type === 'leads') {
      csv = generateLeadsCSV(leads)
      filename = `guest-leads-${new Date().toISOString().split('T')[0]}.csv`
    } else {
      csv = generateSummaryCSV(visits, signups)
      filename = `summary-${new Date().toISOString().split('T')[0]}.csv`
    }

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500 }
    )
  }
}
