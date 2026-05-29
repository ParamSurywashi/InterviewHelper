'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Save, Loader2, Mail, Briefcase, Clock, Star } from 'lucide-react'
const ROLES=['Frontend Developer','React Developer','Senior React Developer','MERN Stack Developer','Software Engineer','Senior Software Engineer','Full Stack Developer']
const TIPS=[
  {e:'🎯',t:'Apply to at least 3 companies every weekday — aim for 60+ applications per month.'},
  {e:'📞',t:'Follow up by email 5-7 days after applying if no response received.'},
  {e:'💻',t:'Practice 2 LeetCode problems daily — Arrays, Strings, Trees for React roles.'},
  {e:'🤝',t:'Referrals have 5x higher success rate. Reach out to LinkedIn connections daily.'},
  {e:'📝',t:'Tailor your resume for each role — highlight React, TypeScript, MERN projects.'},
  {e:'💡',t:'Research company tech stack before every interview — show genuine interest.'},
  {e:'💰',t:"Never reveal current CTC first. State expected CTC based on market research."},
  {e:'🚀',t:'Build 2-3 strong portfolio projects with auth + real features — wins interviews.'},
]
interface Profile { id:string;name:string;email:string;experience:string;targetRole:string;createdAt:string }
export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile|null>(null)
  const [form, setForm] = useState({name:'',experience:'',targetRole:''})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [stats, setStats] = useState({total:0,offers:0,shortlisted:0})
  useEffect(()=>{
    fetch('/api/profile').then(r=>r.json()).then(d=>{setProfile(d);setForm({name:d.name,experience:d.experience||'',targetRole:d.targetRole||''})})
    fetch('/api/stats').then(r=>r.json()).then(d=>{setStats({total:d.totalApplications,offers:d.byStatus?.Offer||0,shortlisted:d.byStatus?.Shortlisted||0})})
  },[])
  async function save(e:React.FormEvent) { e.preventDefault();setSaving(true);await fetch('/api/profile',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});setSaving(false);setSaved(true);setTimeout(()=>setSaved(false),2500) }
  const initials=form.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)
  if(!profile) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin" style={{color:'var(--primary)'}}/></div>
  return (
    <div className="space-y-5 animate-fade-in">
      <div><h4 className="text-xl font-black text-slate-900 dark:text-white">My Profile</h4><p className="text-sm text-slate-500 dark:text-slate-400">Manage your account and job hunt preferences</p></div>
      <div className="card overflow-hidden">
        <div className="h-20" style={{background:'linear-gradient(135deg,#1e1b4b 0%,var(--primary) 100%)'}}/>
        <div className="px-6 pb-6 -mt-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 rounded-2xl border-4 border-white dark:border-slate-800 overflow-hidden flex-shrink-0">
                <Image src="/logo.png" alt="Profile" width={80} height={80} className="object-cover w-full h-full"/>
              </div>
              <div className="pb-1">
                <h5 className="text-lg font-black text-slate-900 dark:text-white">{profile.name}</h5>
                <p className="text-sm text-slate-500">{profile.email}</p>
                <p className="text-xs font-medium mt-0.5" style={{color:'var(--primary)'}}>{profile.targetRole} • {profile.experience}</p>
              </div>
            </div>
            <div className="flex gap-6 pb-1">
              {[['Applied',stats.total,'var(--primary)'],['Shortlisted',stats.shortlisted,'#f59e0b'],['Offers',stats.offers,'#10b981']].map(([l,v,c])=>(
                <div key={String(l)} className="text-center"><p className="text-xl font-black" style={{color:String(c)}}>{v}</p><p className="text-xs text-slate-400">{l}</p></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-5">
          <div className="card h-full">
            <div className="card-header"><p className="card-title">Edit Profile</p></div>
            <div className="card-body">
              <form onSubmit={save} className="space-y-4">
                <div className="form-group mb-0"><label className="form-label">Full Name</label><input className="form-input" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} required/></div>
                <div className="form-group mb-0"><label className="form-label flex items-center gap-1"><Mail className="w-3.5 h-3.5"/>Email (read-only)</label><input className="form-input bg-slate-50 dark:bg-slate-700 text-slate-400 cursor-not-allowed" value={profile.email} disabled/></div>
                <div className="form-group mb-0"><label className="form-label flex items-center gap-1"><Clock className="w-3.5 h-3.5"/>Experience</label><input className="form-input" placeholder="3 Years 10 Months" value={form.experience} onChange={e=>setForm(p=>({...p,experience:e.target.value}))}/></div>
                <div className="form-group mb-0"><label className="form-label flex items-center gap-1"><Briefcase className="w-3.5 h-3.5"/>Target Role</label><select className="form-input" value={form.targetRole} onChange={e=>setForm(p=>({...p,targetRole:e.target.value}))}>{ROLES.map(r=><option key={r}>{r}</option>)}</select></div>
                <button type="submit" disabled={saving} className="btn btn-dark w-full">
                  {saving?<><Loader2 className="w-4 h-4 animate-spin"/>Saving...</>:saved?'✅ Saved!':<><Save className="w-4 h-4"/>Save Changes</>}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="card h-full">
            <div className="card-header"><p className="card-title flex items-center gap-2"><Star className="w-4 h-4 text-amber-400"/>Pro Tips</p><p className="card-subtitle">For 3+ yr experienced engineers</p></div>
            <div className="card-body">
              <div className="grid sm:grid-cols-2 gap-3">
                {TIPS.map((tip,i)=>(
                  <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                    <span className="text-xl flex-shrink-0">{tip.e}</span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{tip.t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}