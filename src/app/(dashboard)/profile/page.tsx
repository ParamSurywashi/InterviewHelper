'use client'
import { useEffect, useState } from 'react'
import { Save, Loader2, User, Mail, Briefcase, Clock, Star, TrendingUp } from 'lucide-react'

interface Profile { id: string; name: string; email: string; experience: string; targetRole: string; createdAt: string }

const JOB_ROLES = ['Frontend Developer','React Developer','Senior React Developer','MERN Stack Developer','Software Engineer','Senior Software Engineer','Full Stack Developer','UI Developer','JavaScript Developer','Next.js Developer']

const TIPS = [
  { icon: '🎯', tip: 'Apply to at least 3 companies every weekday to hit 60+ applications per month.' },
  { icon: '📞', tip: "Always send a follow-up email 5-7 days after applying if you haven't heard back." },
  { icon: '💻', tip: 'Practice 2 LeetCode problems daily — focus on Arrays, Strings, and Trees for React roles.' },
  { icon: '🤝', tip: 'Referrals have a 5x higher success rate. Reach out to LinkedIn connections in target companies.' },
  { icon: '📝', tip: 'Tailor your resume for each role — highlight React, TypeScript, and MERN projects prominently.' },
  { icon: '💡', tip: 'Research company tech stack and culture before every interview. Show genuine interest.' },
  { icon: '💰', tip: 'Never reveal your current CTC first. State your expected CTC based on market research.' },
  { icon: '🚀', tip: 'Build and deploy 2-3 strong portfolio projects — a MERN app with auth + real features wins interviews.' },
]

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [form, setForm] = useState({ name: '', experience: '', targetRole: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [stats, setStats] = useState({ total: 0, offers: 0, shortlisted: 0 })

  useEffect(() => {
    fetch('/api/profile').then(r => r.json()).then(d => {
      setProfile(d)
      setForm({ name: d.name, experience: d.experience || '', targetRole: d.targetRole || '' })
    })
    fetch('/api/stats').then(r => r.json()).then(d => {
      setStats({ total: d.totalApplications, offers: d.byStatus?.Offer || 0, shortlisted: d.byStatus?.Shortlisted || 0 })
    })
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch('/api/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const initials = form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  if (!profile) return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="page-title">👤 Profile</h1>
        <p className="page-subtitle">Manage your account details and job hunt preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
              {initials}
            </div>
            <h2 className="font-bold text-slate-800 text-lg">{profile.name}</h2>
            <p className="text-slate-500 text-sm">{profile.email}</p>
            <p className="text-indigo-600 text-sm font-semibold mt-1">{profile.targetRole}</p>
            <p className="text-slate-400 text-xs mt-1">⏱️ {profile.experience}</p>

            <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-slate-100">
              <div className="text-center">
                <p className="text-xl font-bold text-slate-800">{stats.total}</p>
                <p className="text-xs text-slate-400">Applied</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-amber-600">{stats.shortlisted}</p>
                <p className="text-xs text-slate-400">Shortlisted</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-emerald-600">{stats.offers}</p>
                <p className="text-xs text-slate-400">Offers</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4">Member since {new Date(profile.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><User className="w-4 h-4 text-indigo-500" /> Personal Details</h3>
            <form onSubmit={save} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name</label>
                <input className="input-field" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1"><Mail className="w-3 h-3" /> Email (cannot change)</label>
                <input className="input-field bg-slate-50 text-slate-400 cursor-not-allowed" value={profile.email} disabled />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1"><Clock className="w-3 h-3" /> Experience</label>
                <input className="input-field" placeholder="e.g. 3 Years 10 Months" value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1"><Briefcase className="w-3 h-3" /> Target Role</label>
                <select className="input-field" value={form.targetRole} onChange={e => setForm(p => ({ ...p, targetRole: e.target.value }))}>
                  {JOB_ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : saved ? '✅ Saved!' : <><Save className="w-4 h-4" />Save Changes</>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Pro Tips */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500" /> Pro Tips for Getting Hired Faster
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {TIPS.map((t, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xl flex-shrink-0">{t.icon}</span>
              <p className="text-xs text-slate-600 leading-relaxed">{t.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
