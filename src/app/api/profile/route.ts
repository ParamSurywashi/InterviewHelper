import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
export async function GET() {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  const u = await prisma.user.findUnique({where:{id:s.user.id},select:{id:true,name:true,email:true,experience:true,targetRole:true,createdAt:true}})
  return NextResponse.json(u)
}
export async function PUT(req: NextRequest) {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  const b = await req.json()
  const u = await prisma.user.update({where:{id:s.user.id},data:{name:b.name,experience:b.experience,targetRole:b.targetRole}})
  return NextResponse.json(u)
}