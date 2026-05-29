import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
export async function POST(req: NextRequest) {
  try {
    const { name, email, password, experience, targetRole } = await req.json()
    if (!name||!email||!password) return NextResponse.json({error:'Missing fields'},{status:400})
    if (password.length<6) return NextResponse.json({error:'Password too short'},{status:400})
    const existing = await prisma.user.findUnique({where:{email}})
    if (existing) return NextResponse.json({error:'Email already registered'},{status:409})
    const hash = await bcrypt.hash(password,10)
    const user = await prisma.user.create({data:{name,email,password:hash,experience,targetRole}})
    return NextResponse.json({id:user.id,email:user.email},{status:201})
  } catch(e) { return NextResponse.json({error:'Server error'},{status:500}) }
}