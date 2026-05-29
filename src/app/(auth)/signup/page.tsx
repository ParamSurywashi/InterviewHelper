'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react'
const ROLES = ['Frontend Developer','React Developer','Senior React Developer','MERN Stack Developer','Software Engineer','Senior Software Engineer','Full Stack Developer']
export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name:'', email:'', password:'', experience:'3 Years 10 Months', targetRole:'Senior React Developer' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)
  async function handleSubmit(e:React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    const res = await fetch('/api/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
    const data = await res.json()
    if (!res.ok) { setError(data.error||'Registration failed'); setLoading(false); return }
    const { signIn } = await import('next-auth/react')
    await signIn('credentials',{email:form.email,password:form.password,redirect:false})
    router.push('/dashboard')
  }
  const f=(k:string)=>(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>setForm(p=>({...p,[k]:e.target.value}))
  return (
    <div className="loginwrapper">
      <div className="auth-left">
        <div>
          <div className="mb-12">
            <Image src="/logo.png" alt="IH" width={72} height={72} className="rounded-2xl ring-4 ring-white/10 mb-4"/>
            <p className="text-white font-black text-xl">InterviewHelper</p>
            <p className="text-[10px] text-purple-400 font-bold tracking-widest mt-1">PLAN · APPLY · PREPARE · SUCCEED</p>
          </div>
          <h2 className="text-3xl font-black text-white mb-4">Start your 30-day<br/><span className="text-yellow-400">job hunt journey</span></h2>
          <div className="space-y-3">
            {['Free forever, no credit card','Track unlimited applications','Mobile & tablet friendly','8 colour themes + dark mode'].map(t=>(
              <div key={t} className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0"/><span className="text-slate-300 text-sm">{t}</span></div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-600">© 2026 InterviewHelper.</p>
      </div>
      <div className="auth-right">
        <div className="w-full max-w-[420px]">
          <div className="flex flex-col items-center mb-6 lg:hidden">
            <Image src="/logo.png" alt="IH" width={56} height={56} className="rounded-2xl mb-3"/>
            <p className="font-black text-slate-800 dark:text-white">InterviewHelper</p>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white text-center">Create Account</h3>
          <p className="text-slate-500 text-sm text-center mt-1 mb-6">Start tracking in under 2 minutes</p>
          {error && <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="form-group mb-0"><label className="form-label">Full Name</label><input className="form-input" placeholder="Rahul Sharma" required value={form.name} onChange={f('name')}/></div>
            <div className="form-group mb-0"><label className="form-label">Email</label><input type="email" className="form-input" placeholder="rahul@example.com" required value={form.email} onChange={f('email')}/></div>
            <div className="form-group mb-0"><label className="form-label">Password</label>
              <div className="relative">
                <input type={showPw?'text':'password'} className="form-input pr-10" placeholder="Min 6 characters" required minLength={6} value={form.password} onChange={f('password')}/>
                <button type="button" onClick={()=>setShowPw(p=>!p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showPw?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="form-group mb-0"><label className="form-label">Experience</label><input className="form-input" placeholder="3 Yrs 10 Mo" value={form.experience} onChange={f('experience')}/></div>
              <div className="form-group mb-0"><label className="form-label">Target Role</label><select className="form-input" value={form.targetRole} onChange={f('targetRole')}>{ROLES.map(r=><option key={r}>{r}</option>)}</select></div>
            </div>
            <button type="submit" disabled={loading} className="btn btn-dark w-full h-11 mt-1">
              {loading?<><Loader2 className="w-4 h-4 animate-spin"/>Creating...</>:'Create Account'}
            </button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-5">Already have an account? <Link href="/login" className="font-bold hover:underline" style={{color:'var(--primary)'}}>Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}