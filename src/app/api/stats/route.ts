import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
function count(arr:string[],v:string){return arr.filter(x=>x===v).length}
export async function GET() {
  const s = await getServerSession(authOptions)
  if (!s?.user?.id) return NextResponse.json({error:'Unauthorized'},{status:401})
  const apps = await prisma.application.findMany({where:{userId:s.user.id}})
  const byStatus:Record<string,number>={}, bySource:Record<string,number>={}, byRole:Record<string,number>={}
  for(const a of apps){
    byStatus[a.appStatus]=(byStatus[a.appStatus]||0)+1
    if(a.source) bySource[a.source]=(bySource[a.source]||0)+1
    if(a.jobRole) byRole[a.jobRole]=(byRole[a.jobRole]||0)+1
  }
  const byWeek=[]
  for(let i=7;i>=0;i--){
    const d=new Date(); d.setDate(d.getDate()-i*7)
    const start=new Date(d); start.setDate(start.getDate()-start.getDay())
    const end=new Date(start); end.setDate(end.getDate()+6)
    const cnt=apps.filter(a=>a.appliedOn>=start&&a.appliedOn<=end).length
    byWeek.push({week:`${start.getDate()}/${start.getMonth()+1}`,count:cnt})
  }
  const tel=apps.map(a=>a.telephonicRound), t1=apps.map(a=>a.technicalRound1), t2=apps.map(a=>a.technicalRound2), hr=apps.map(a=>a.hrRound)
  return NextResponse.json({
    totalApplications:apps.length,byStatus,bySource,byRole,byWeek,
    rounds:{
      telephonic:{passed:count(tel,'Passed'),failed:count(tel,'Failed'),inProgress:count(tel,'In Progress'),pending:count(tel,'Pending')},
      technical1:{passed:count(t1,'Passed'),failed:count(t1,'Failed'),inProgress:count(t1,'In Progress'),pending:count(t1,'Pending')},
      technical2:{passed:count(t2,'Passed'),failed:count(t2,'Failed'),inProgress:count(t2,'In Progress'),pending:count(t2,'Pending')},
      hr:{passed:count(hr,'Passed'),failed:count(hr,'Failed'),inProgress:count(hr,'In Progress'),pending:count(hr,'Pending')},
    }
  })
}