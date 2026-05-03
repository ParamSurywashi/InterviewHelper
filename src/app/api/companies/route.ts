import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const companies = await prisma.company.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(companies)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const company = await prisma.company.create({
    data: { userId: session.user.id, companyName: body.companyName, location: body.location, wfhPolicy: body.wfhPolicy, techStack: body.techStack, careersPage: body.careersPage, linkedinPage: body.linkedinPage, priority: body.priority || 'Medium', applied: body.applied || 'No', notes: body.notes }
  })
  return NextResponse.json(company, { status: 201 })
}
