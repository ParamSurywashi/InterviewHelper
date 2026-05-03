import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const apps = await prisma.application.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(apps)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const app = await prisma.application.create({
    data: {
      userId: session.user.id,
      companyName: body.companyName,
      jobRole: body.jobRole,
      location: body.location || null,
      wfhMode: body.wfhMode || 'Hybrid',
      appliedOn: body.appliedOn ? new Date(body.appliedOn) : new Date(),
      source: body.source || 'LinkedIn',
      appStatus: body.appStatus || 'Applied',
      telephonicRound: body.telephonicRound || 'Pending',
      technicalRound1: body.technicalRound1 || 'Pending',
      technicalRound2: body.technicalRound2 || 'Pending',
      hrRound: body.hrRound || 'Pending',
      currentStage: body.currentStage || null,
      ctcExpected: body.ctcExpected || null,
      ctcOffered: body.ctcOffered || null,
      notes: body.notes || null,
    }
  })
  return NextResponse.json(app, { status: 201 })
}
