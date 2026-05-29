import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
export async function GET() {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  const p = await prisma.weeklyPlan.findMany({where:{userId:s.user.id},orderBy:[{weekNumber:'asc'},{id:'asc'}]})
  return NextResponse.json(p)
}
export async function POST(req: NextRequest) {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  const b = await req.json()
  const p = await prisma.weeklyPlan.create({data:{userId:s.user.id,...b}})
  return NextResponse.json(p,{status:201})
}
export async function PUT(req: NextRequest) {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  const b = await req.json()
  await prisma.weeklyPlan.updateMany({where:{id:b.id,userId:s.user.id},data:b})
  return NextResponse.json({success:true})
}