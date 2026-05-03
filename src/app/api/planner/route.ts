import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const plans = await prisma.weeklyPlan.findMany({ where: { userId: session.user.id }, orderBy: [{ weekNumber: 'asc' }, { id: 'asc' }] })
  return NextResponse.json(plans)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const plan = await prisma.weeklyPlan.create({ data: { userId: session.user.id, ...body } })
  return NextResponse.json(plan, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  await prisma.weeklyPlan.updateMany({ where: { id: body.id, userId: session.user.id }, data: body })
  return NextResponse.json({ success: true })
}
