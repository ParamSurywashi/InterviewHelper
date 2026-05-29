import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
export async function PUT(req: NextRequest, {params}:{params:{id:string}}) {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  const b = await req.json()
  await prisma.interviewEvent.updateMany({where:{id:params.id,userId:s.user.id},data:{
    title:b.title,companyName:b.companyName,roundType:b.roundType,eventDate:new Date(b.eventDate),
    startTime:b.startTime,endTime:b.endTime,notes:b.notes||null,color:b.color||'#4669FA',
    meetingLink:b.meetingLink||null,interviewer:b.interviewer||null,reminderMins:b.reminderMins||30,status:b.status||'Scheduled',
  }})
  return NextResponse.json({success:true})
}
export async function DELETE(_r: NextRequest, {params}:{params:{id:string}}) {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  await prisma.interviewEvent.deleteMany({where:{id:params.id,userId:s.user.id}})
  return NextResponse.json({success:true})
}