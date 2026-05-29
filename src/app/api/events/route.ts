import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
export async function GET(req: NextRequest) {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  const {searchParams} = new URL(req.url)
  const month = searchParams.get('month'), year = searchParams.get('year')
  let where: any = {userId:s.user.id}
  if (month&&year) {
    const start = new Date(parseInt(year),parseInt(month),1)
    const end = new Date(parseInt(year),parseInt(month)+1,0,23,59,59)
    where.eventDate = {gte:start,lte:end}
  }
  const events = await prisma.interviewEvent.findMany({where,orderBy:{eventDate:'asc'}})
  return NextResponse.json(events)
}
export async function POST(req: NextRequest) {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  const b = await req.json()
  const event = await prisma.interviewEvent.create({data:{
    userId:s.user.id,applicationId:b.applicationId||null,title:b.title,
    companyName:b.companyName,roundType:b.roundType||'General',eventDate:new Date(b.eventDate),
    startTime:b.startTime,endTime:b.endTime,notes:b.notes||null,color:b.color||'#4669FA',
    meetingLink:b.meetingLink||null,interviewer:b.interviewer||null,
    reminderMins:b.reminderMins||30,status:b.status||'Scheduled',
  }})
  return NextResponse.json(event,{status:201})
}