import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const app = await prisma.application.updateMany({
    where: { id: params.id, userId: session.user.id },
    data: {
      companyName: body.companyName,
      jobRole: body.jobRole,
      location: body.location || null,
      wfhMode: body.wfhMode || 'Hybrid',
      appliedOn: body.appliedOn ? new Date(body.appliedOn) : undefined,
      source: body.source,
      appStatus: body.appStatus,
      telephonicRound: body.telephonicRound,
      technicalRound1: body.technicalRound1,
      technicalRound2: body.technicalRound2,
      hrRound: body.hrRound,
      ctcExpected: body.ctcExpected || null,
      ctcOffered: body.ctcOffered || null,
      notes: body.notes || null,
    }
  })
  return NextResponse.json(app)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await prisma.application.deleteMany({ where: { id: params.id, userId: session.user.id } })
  return NextResponse.json({ success: true })
}
