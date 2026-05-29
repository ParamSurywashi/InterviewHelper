'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Lock } from 'lucide-react'
import { GuestDashboard } from '@/components/guest-dashboard'
export default function GuestPage() {
  return (
    <div className="min-h-screen bg-[#EEF1F9] dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 sticky top-0 z-50" style={{boxShadow:'0px 4px 24px rgba(0,0,0,0.06)'}}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-[65px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors"><ArrowLeft className="w-5 h-5"/></Link>
            <Image src="/logo.png" alt="IH" width={34} height={34} className="rounded-lg object-cover"/>
            <div>
              <p className="font-black text-slate-800 dark:text-white text-sm leading-none">InterviewHelper</p>
              <p className="text-[9px] text-purple-500 font-bold tracking-wider">PLAN · APPLY · PREPARE · SUCCEED</p>
            </div>
            <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 text-xs font-bold rounded-full">Guest</span>
          </div>
          <div className="flex gap-2">
            <Link href="/login" className="btn btn-outline-secondary btn-sm">Log In</Link>
            <Link href="/signup" className="btn btn-primary btn-sm">Sign Up Free</Link>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 pb-24">
        <div className="card mb-6 border-l-4 border-l-amber-400">
          <div className="card-body py-4 flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"/>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">Viewing sample demo data</p>
              <p className="text-xs text-slate-500 mt-0.5"><Link href="/signup" className="font-bold underline" style={{color:'var(--primary)'}}>Create a free account</Link> to track your own applications and unlock all features.</p>
            </div>
          </div>
        </div>
        <GuestDashboard/>
      </div>
    </div>
  )
}