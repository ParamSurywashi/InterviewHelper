import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
export async function GET() {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  const apps = await prisma.application.findMany({where:{userId:s.user.id},orderBy:{createdAt:'desc'}})
  return NextResponse.json(apps)
}
export async function POST(req: NextRequest) {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  const b = await req.json()
  const app = await prisma.application.create({data:{
    userId:s.user.id,companyName:b.companyName,jobRole:b.jobRole,
    positionType:b.positionType||'Permanent',expectedExperience:b.expectedExperience||null,
    location:b.location||null,wfhMode:b.wfhMode||'Hybrid',
    appliedOn:b.appliedOn?new Date(b.appliedOn):new Date(),source:b.source||'LinkedIn',
    appStatus:b.appStatus||'Applied',telephonicRound:b.telephonicRound||'Pending',
    technicalRound1:b.technicalRound1||'Pending',technicalRound2:b.technicalRound2||'Pending',
    hrRound:b.hrRound||'Pending',ctcExpected:b.ctcExpected||null,ctcOffered:b.ctcOffered||null,
    noticePeriod:b.noticePeriod||null,notes:b.notes||null,interviewNotes:b.interviewNotes||null,
  }})
  return NextResponse.json(app,{status:201})
}