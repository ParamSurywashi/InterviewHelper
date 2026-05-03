import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { subWeeks, startOfWeek, endOfWeek, format } from 'date-fns'

function count(arr: string[], val: string) { return arr.filter(x => x === val).length }

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const apps = await prisma.application.findMany({ where: { userId: session.user.id } })

  const byStatus: Record<string, number> = {}
  const bySource: Record<string, number> = {}
  const byRole: Record<string, number> = {}
  for (const a of apps) {
    byStatus[a.appStatus] = (byStatus[a.appStatus] || 0) + 1
    if (a.source) bySource[a.source] = (bySource[a.source] || 0) + 1
    if (a.jobRole) byRole[a.jobRole] = (byRole[a.jobRole] || 0) + 1
  }

  const byWeek = []
  for (let i = 7; i >= 0; i--) {
    const d = subWeeks(new Date(), i)
    const start = startOfWeek(d)
    const end = endOfWeek(d)
    const cnt = apps.filter(a => a.appliedOn >= start && a.appliedOn <= end).length
    byWeek.push({ week: format(start, 'MMM d'), count: cnt })
  }

  const tel = apps.map(a => a.telephonicRound)
  const t1  = apps.map(a => a.technicalRound1)
  const t2  = apps.map(a => a.technicalRound2)
  const hr  = apps.map(a => a.hrRound)

  return NextResponse.json({
    totalApplications: apps.length,
    byStatus, bySource, byRole, byWeek,
    rounds: {
      telephonic: { passed: count(tel,'Passed'), failed: count(tel,'Failed'), inProgress: count(tel,'In Progress'), pending: count(tel,'Pending') },
      technical1: { passed: count(t1,'Passed'),  failed: count(t1,'Failed'),  inProgress: count(t1,'In Progress'),  pending: count(t1,'Pending') },
      technical2: { passed: count(t2,'Passed'),  failed: count(t2,'Failed'),  inProgress: count(t2,'In Progress'),  pending: count(t2,'Pending') },
      hr:         { passed: count(hr,'Passed'),  failed: count(hr,'Failed'),  inProgress: count(hr,'In Progress'),  pending: count(hr,'Pending') },
    }
  })
}
