'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, Loader2, BarChart2, Target, Shield } from 'lucide-react'
export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email:'', password:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)
  async function handleSubmit(e:React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    const res = await signIn('credentials', { ...form, redirect:false })
    if (res?.ok) router.push('/dashboard')
    else { setError('Invalid email or password.'); setLoading(false) }
  }
  return (
    <div className="loginwrapper">
      <div className="auth-left">
        <div>
          <div className="mb-12">
            <Image src="/logo.png" alt="IH" width={72} height={72} className="rounded-2xl ring-4 ring-white/10 mb-4"/>
            <p className="text-white font-black text-xl leading-none">InterviewHelper</p>
            <p className="text-[10px] text-purple-400 font-bold tracking-widest mt-1">PLAN · APPLY · PREPARE · SUCCEED</p>
          </div>
          <h2 className="text-3xl font-black text-white mb-4 leading-tight">Land your dream<br/><span className="text-yellow-400">tech role faster</span></h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-10">Complete CRM for Frontend, React & MERN developers to track applications, monitor rounds, and stay organised.</p>
          <div className="space-y-4">
            {[{icon:BarChart2,text:'Live charts & analytics'},{icon:Target,text:'Application round tracker'},{icon:Shield,text:'Secure & private'}].map(({icon:Icon,text})=>(
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'rgba(255,255,255,0.1)'}}><Icon className="w-4 h-4 text-purple-300"/></div>
                <span className="text-slate-300 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-600">© 2026 InterviewHelper. All rights reserved.</p>
      </div>
      <div className="auth-right">
        <div className="w-full max-w-[400px]">
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <Image src="/logo.png" alt="IH" width={64} height={64} className="rounded-2xl mb-3"/>
            <p className="font-black text-slate-800 dark:text-white text-lg">InterviewHelper</p>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white text-center">Sign in</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm text-center mt-1 mb-6">Track your job hunt like a pro</p>
          {error && <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl px-4 py-3 text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group mb-0"><label className="form-label">Email</label><input type="email" required placeholder="you@example.com" className="form-input" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))}/></div>
            <div className="form-group mb-0"><label className="form-label">Password</label>
              <div className="relative">
                <input type={showPw?'text':'password'} required placeholder="••••••••" className="form-input pr-10" value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))}/>
                <button type="button" onClick={()=>setShowPw(p=>!p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showPw?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}</button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn btn-dark w-full h-11">
              {loading?<><Loader2 className="w-4 h-4 animate-spin"/>Signing in...</>:'Sign In'}
            </button>
          </form>
          <div className="mt-5 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/40">
            <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1">🎯 Demo Credentials</p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400">demo@interviewhelper.com / password123</p>
          </div>
          <p className="text-center text-sm text-slate-500 mt-5">Don&apos;t have an account? <Link href="/signup" className="font-bold hover:underline" style={{color:'var(--primary)'}}>Sign up free</Link></p>
          <p className="text-center text-xs text-slate-400 mt-2">or <Link href="/guest" className="underline text-slate-500">continue as guest</Link></p>
        </div>
      </div>
    </div>
  )
}