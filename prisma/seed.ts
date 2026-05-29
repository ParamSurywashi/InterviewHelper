import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  const hash = await bcrypt.hash('password123', 10)
  const user = await prisma.user.upsert({
    where: { email:'demo@interviewhelper.com' }, update: {},
    create: { email:'demo@interviewhelper.com', name:'Rahul Sharma', password:hash, experience:'3 Years 10 Months', targetRole:'Senior React Developer' }
  })
  const apps = [
    { companyName:'Razorpay',      jobRole:'Senior React Developer', appStatus:'Shortlisted', source:'LinkedIn',  location:'Bangalore', wfhMode:'Hybrid',  telephonicRound:'Passed', technicalRound1:'In Progress', technicalRound2:'Pending', hrRound:'Pending', ctcExpected:'24 LPA', positionType:'Permanent',   expectedExperience:'3-5 years', notes:'Great fintech company, focus on React + system design' },
    { companyName:'Swiggy',        jobRole:'Frontend Developer',     appStatus:'In Progress', source:'Referral',  location:'Bangalore', wfhMode:'Hybrid',  telephonicRound:'Passed', technicalRound1:'Passed',      technicalRound2:'In Progress', hrRound:'Pending', ctcExpected:'20 LPA', positionType:'Permanent',   expectedExperience:'2-4 years', notes:'Good work culture, asked about Next.js and performance optimization' },
    { companyName:'Freshworks',    jobRole:'React Developer',        appStatus:'Applied',     source:'Naukri',    location:'Chennai',   wfhMode:'Hybrid',  telephonicRound:'Pending', technicalRound1:'Pending',     technicalRound2:'Pending',     hrRound:'Pending', ctcExpected:'18 LPA', positionType:'Permanent',   expectedExperience:'3-5 years', notes:'Applied via Naukri, waiting for response' },
    { companyName:'BrowserStack',  jobRole:'Senior Software Engineer',appStatus:'Rejected',   source:'LinkedIn',  location:'Mumbai',    wfhMode:'WFH',     telephonicRound:'Passed', technicalRound1:'Failed',      technicalRound2:'Pending',     hrRound:'Pending', ctcExpected:'22 LPA', positionType:'Permanent',   expectedExperience:'4-6 years', notes:'Technical round was tough - need to improve system design skills', interviewNotes:'Round 1: DSA questions on graphs and DP. Failed on the system design portion - need more practice.' },
    { companyName:'Meesho',        jobRole:'MERN Stack Developer',   appStatus:'Applied',     source:'AngelList', location:'Bangalore', wfhMode:'Hybrid',  telephonicRound:'Pending', technicalRound1:'Pending',     technicalRound2:'Pending',     hrRound:'Pending', ctcExpected:'18 LPA', positionType:'Permanent',   expectedExperience:'2-4 years', notes:'' },
    { companyName:'Groww',         jobRole:'Frontend Developer',     appStatus:'Shortlisted', source:'LinkedIn',  location:'Bangalore', wfhMode:'Hybrid',  telephonicRound:'Passed', technicalRound1:'Pending',     technicalRound2:'Pending',     hrRound:'Pending', ctcExpected:'22 LPA', positionType:'Permanent',   expectedExperience:'3-5 years', notes:'Focus on React + Redux + TypeScript' },
    { companyName:'PhonePe',       jobRole:'Senior React Developer', appStatus:'Offer',       source:'LinkedIn',  location:'Bangalore', wfhMode:'Hybrid',  telephonicRound:'Passed', technicalRound1:'Passed',      technicalRound2:'Passed',      hrRound:'Passed',  ctcExpected:'28 LPA', ctcOffered:'26 LPA', positionType:'Permanent', expectedExperience:'3-6 years', notes:'Great offer! Evaluating vs other offers', interviewNotes:'All rounds went well. HR was very friendly. Offer letter received on May 10.' },
    { companyName:'Juspay',        jobRole:'Frontend Developer',     appStatus:'In Review',   source:'Instahyre', location:'Remote',    wfhMode:'WFH',     telephonicRound:'Pending', technicalRound1:'Pending',     technicalRound2:'Pending',     hrRound:'Pending', ctcExpected:'20 LPA', positionType:'Contractual', expectedExperience:'2-4 years', notes:'6-month contract role, might convert to permanent' },
  ]
  for (const a of apps) {
    await prisma.application.create({ data: { userId:user.id, ...a, appliedOn: new Date(Date.now() - Math.random()*30*24*60*60*1000) } })
  }
  const companies = [
    { companyName:'Atlassian',   location:'Bangalore', wfhPolicy:'WFH',    techStack:'React, TypeScript, GraphQL', priority:'High',   applied:'No' },
    { companyName:'Postman',     location:'Bangalore', wfhPolicy:'Hybrid', techStack:'React, Node.js, Electron',   priority:'High',   applied:'No' },
    { companyName:'Lenskart',    location:'Gurugram',  wfhPolicy:'Hybrid', techStack:'MERN, React Native',         priority:'Medium', applied:'Yes' },
    { companyName:'ThoughtWorks',location:'Bangalore', wfhPolicy:'Hybrid', techStack:'React, TypeScript, Java',    priority:'Medium', applied:'No' },
    { companyName:'Zepto',       location:'Mumbai',    wfhPolicy:'On-Site',techStack:'React, Node.js, Go',         priority:'Low',    applied:'No' },
  ]
  for (const c of companies) {
    await prisma.company.create({ data: { userId:user.id, ...c } })
  }
  console.log('✅ Seed complete! Login: demo@interviewhelper.com / password123')
}
main().catch(console.error).finally(() => prisma.$disconnect())