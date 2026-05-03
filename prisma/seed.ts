import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hash = await bcrypt.hash('password123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@interviewhelper.com' },
    update: {},
    create: {
      email: 'demo@interviewhelper.com',
      name: 'Rahul Sharma',
      password: hash,
      experience: '3 Years 10 Months',
      targetRole: 'Senior React Developer',
    }
  })

  const companies = [
    { companyName: 'Razorpay', location: 'Bangalore', wfhMode: 'Hybrid', source: 'LinkedIn', appStatus: 'Shortlisted', jobRole: 'Senior React Developer', telephonicRound: 'Passed', technicalRound1: 'In Progress', technicalRound2: 'Pending', hrRound: 'Pending', ctcExpected: '24 LPA', notes: 'Strong fintech product company' },
    { companyName: 'Swiggy', location: 'Bangalore', wfhMode: 'Hybrid', source: 'Referral', appStatus: 'In Progress', jobRole: 'Frontend Developer', telephonicRound: 'Passed', technicalRound1: 'Passed', technicalRound2: 'In Progress', hrRound: 'Pending', ctcExpected: '20 LPA', notes: 'Good work culture' },
    { companyName: 'Freshworks', location: 'Chennai', wfhMode: 'Hybrid', source: 'Naukri', appStatus: 'Applied', jobRole: 'React Developer', telephonicRound: 'Pending', technicalRound1: 'Pending', technicalRound2: 'Pending', hrRound: 'Pending', ctcExpected: '18 LPA', notes: '' },
    { companyName: 'BrowserStack', location: 'Mumbai', wfhMode: 'WFH', source: 'LinkedIn', appStatus: 'Rejected', jobRole: 'Senior Software Engineer', telephonicRound: 'Passed', technicalRound1: 'Failed', technicalRound2: 'Pending', hrRound: 'Pending', ctcExpected: '22 LPA', notes: 'System design was weak area' },
    { companyName: 'Meesho', location: 'Bangalore', wfhMode: 'Hybrid', source: 'AngelList', appStatus: 'Applied', jobRole: 'MERN Stack Developer', telephonicRound: 'Pending', technicalRound1: 'Pending', technicalRound2: 'Pending', hrRound: 'Pending', ctcExpected: '18 LPA', notes: '' },
    { companyName: 'Groww', location: 'Bangalore', wfhMode: 'Hybrid', source: 'LinkedIn', appStatus: 'Shortlisted', jobRole: 'Frontend Developer', telephonicRound: 'Passed', technicalRound1: 'Pending', technicalRound2: 'Pending', hrRound: 'Pending', ctcExpected: '22 LPA', notes: 'Focus on React + Redux' },
    { companyName: 'Cred', location: 'Bangalore', wfhMode: 'Hybrid', source: 'Instahyre', appStatus: 'In Review', jobRole: 'React Developer', telephonicRound: 'Pending', technicalRound1: 'Pending', technicalRound2: 'Pending', hrRound: 'Pending', ctcExpected: '25 LPA', notes: 'Premium product company' },
    { companyName: 'PhonePe', location: 'Bangalore', wfhMode: 'Hybrid', source: 'LinkedIn', appStatus: 'Offer', jobRole: 'Senior React Developer', telephonicRound: 'Passed', technicalRound1: 'Passed', technicalRound2: 'Passed', hrRound: 'Passed', ctcExpected: '28 LPA', ctcOffered: '26 LPA', notes: 'Great offer! Evaluating' },
  ]

  for (const c of companies) {
    await prisma.application.create({
      data: {
        userId: user.id,
        companyName: c.companyName,
        jobRole: c.jobRole,
        location: c.location,
        wfhMode: c.wfhMode,
        source: c.source,
        appStatus: c.appStatus,
        telephonicRound: c.telephonicRound,
        technicalRound1: c.technicalRound1,
        technicalRound2: c.technicalRound2,
        hrRound: c.hrRound,
        ctcExpected: c.ctcExpected,
        ctcOffered: c.ctcOffered || null,
        notes: c.notes,
        appliedOn: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      }
    })
  }

  const wishlistCompanies = [
    { companyName: 'Atlassian', location: 'Bangalore', wfhPolicy: 'WFH', techStack: 'React, TypeScript', priority: 'High' },
    { companyName: 'Postman', location: 'Bangalore', wfhPolicy: 'Hybrid', techStack: 'React, Node.js', priority: 'High' },
    { companyName: 'Lenskart', location: 'Gurugram', wfhPolicy: 'Hybrid', techStack: 'MERN, React', priority: 'Medium' },
    { companyName: 'ThoughtWorks', location: 'Bangalore', wfhPolicy: 'Hybrid', techStack: 'React, TypeScript', priority: 'Medium' },
    { companyName: 'Juspay', location: 'Bangalore', wfhPolicy: 'WFH', techStack: 'React, Haskell', priority: 'Low' },
  ]
  for (const c of wishlistCompanies) {
    await prisma.company.create({ data: { userId: user.id, ...c } })
  }

  console.log('✅ Seed complete! Demo user: demo@interviewhelper.com / password123')
}

main().catch(console.error).finally(() => prisma.$disconnect())
