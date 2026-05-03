'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Lock } from 'lucide-react'
import { GuestDashboard } from '@/components/guest-dashboard'

export default function GuestPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-slate-500 hover:text-slate-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
                        <Image
                          src="/IH-logo.png"
                          alt="Interview Helper"
                          width={42}
                          height={42}
                          className="object-cover"
                        />
                      </div>
            <span className="font-bold text-slate-800">InterviewHelper</span>
          </div>
          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Guest View</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-secondary text-sm py-2 px-4">Log In</Link>
          <Link href="/signup" className="btn-primary text-sm py-2 px-4">Sign Up Free</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6 p-4 rounded-2xl border border-amber-200 bg-amber-50 flex items-start gap-3">
          <Lock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800">You are viewing the Guest Demo</p>
            <p className="text-xs text-amber-700 mt-0.5">This shows sample data. <Link href="/signup" className="underline font-semibold">Create a free account</Link> to track your own job applications and get personalised insights.</p>
          </div>
        </div>
        <GuestDashboard />
      </div>
    </div>
  )
}
