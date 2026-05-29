import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
export async function GET() {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  const c = await prisma.company.findMany({where:{userId:s.user.id},orderBy:{createdAt:'desc'}})
  return NextResponse.json(c)
}
export async function POST(req: NextRequest) {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  const b = await req.json()
  const c = await prisma.company.create({data:{userId:s.user.id,...b}})
  return NextResponse.json(c,{status:201})
}