import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
export async function PUT(req: NextRequest, {params}:{params:{id:string}}) {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  const b = await req.json()
  await prisma.application.updateMany({where:{id:params.id,userId:s.user.id},data:{
    companyName:b.companyName,jobRole:b.jobRole,positionType:b.positionType||'Permanent',
    expectedExperience:b.expectedExperience||null,location:b.location||null,wfhMode:b.wfhMode||'Hybrid',
    appliedOn:b.appliedOn?new Date(b.appliedOn):undefined,source:b.source,appStatus:b.appStatus,
    telephonicRound:b.telephonicRound,technicalRound1:b.technicalRound1,technicalRound2:b.technicalRound2,
    hrRound:b.hrRound,ctcExpected:b.ctcExpected||null,ctcOffered:b.ctcOffered||null,
    noticePeriod:b.noticePeriod||null,notes:b.notes||null,interviewNotes:b.interviewNotes||null,
  }})
  return NextResponse.json({success:true})
}
export async function DELETE(_r: NextRequest, {params}:{params:{id:string}}) {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  await prisma.application.deleteMany({where:{id:params.id,userId:s.user.id}})
  return NextResponse.json({success:true})
}