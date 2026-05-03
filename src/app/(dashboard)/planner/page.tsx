'use client'
import { useEffect, useState } from 'react'
import { Plus, Loader2, CheckCircle2, Clock, XCircle } from 'lucide-react'
import { WeeklyPlan } from '@/types'

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const DAY_DEFAULTS = [
  { prep: 'React hooks + DSA Arrays', linkedin: 'Connect 5 recruiters', companies: 'Startups + Fintech', target: 3 },
  { prep: 'System Design basics', linkedin: 'Post project update', companies: 'Product companies', target: 2 },
  { prep: 'Next.js + SSR', linkedin: 'Engage 3 posts', companies: 'Remote-first', target: 3 },
  { prep: 'TypeScript deep dive', linkedin: 'Add 5 connections', companies: 'MNCs + FAANG', target: 2 },
  { prep: 'Mock interview', linkedin: 'Share portfolio', companies: 'Referral-based', target: 3 },
  { prep: 'Resume refresh', linkedin: 'Review profile', companies: 'AngelList startups', target: 2 },
  { prep: 'Plan next week', linkedin: '—', companies: 'Rest & Review', target: 0 },
]

const STATUS_MAP: Record<string, { icon: React.ReactNode; color: string }> = {
  'Planned':  { icon: <Clock className="w-3.5 h-3.5" />,        color: 'bg-slate-100 text-slate-500' },
  'Done ✅':  { icon: <CheckCircle2 className="w-3.5 h-3.5" />, color: 'bg-green-100 text-green-700' },
  'Partial':  { icon: <Clock className="w-3.5 h-3.5" />,        color: 'bg-yellow-100 text-yellow-700' },
  'Skipped':  { icon: <XCircle className="w-3.5 h-3.5" />,      color: 'bg-red-100 text-red-500' },
}
const DAY_BG: Record<string, string> = {
  Monday: 'bg-indigo-50 border-indigo-100', Tuesday: 'bg-purple-50 border-purple-100',
  Wednesday: 'bg-blue-50 border-blue-100', Thursday: 'bg-violet-50 border-violet-100',
  Friday: 'bg-cyan-50 border-cyan-100', Saturday: 'bg-amber-50 border-amber-100', Sunday: 'bg-rose-50 border-rose-100',
}

export default function PlannerPage() {
  const [plans, setPlans] = useState<WeeklyPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [week, setWeek] = useState(1)
  const [generating, setGenerating] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/planner')
    const data = await res.json()
    setPlans(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function generateWeek(w: number) {
    setGenerating(true)
    for (let d = 0; d < 7; d++) {
      const def = DAY_DEFAULTS[d]
      await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weekNumber: w, day: DAYS[d], applyTarget: def.target, companiesToTarget: def.companies, prepTopic: def.prep, linkedinActions: def.linkedin, status: 'Planned' })
      })
    }
    setGenerating(false)
    load()
  }

  async function updateStatus(id: string, status: string) {
    await fetch('/api/planner', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
    setPlans(p => p.map(pl => pl.id === id ? { ...pl, status } : pl))
  }

  const weekPlans = plans.filter(p => p.weekNumber === week)
  const weekNums = [...new Set(plans.map(p => p.weekNumber))].sort()
  const doneCount = weekPlans.filter(p => p.status === 'Done ✅').length

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="page-title">📅 Weekly Planner</h1>
          <p className="page-subtitle">Stay consistent — plan every day of your job hunt journey</p>
        </div>
        <button onClick={() => generateWeek(weekNums.length + 1)} disabled={generating} className="btn-primary">
          {generating ? <><Loader2 className="w-4 h-4 animate-spin" />Generating...</> : <><Plus className="w-4 h-4" />Generate Week {weekNums.length + 1}</>}
        </button>
      </div>

      {/* Week tabs */}
      {weekNums.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {weekNums.map(w => (
            <button key={w} onClick={() => setWeek(w)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${week === w ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'}`}>
              Week {w}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-slate-500"><Loader2 className="w-6 h-6 animate-spin text-indigo-500" /> Loading planner...</div>
      ) : weekPlans.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-5xl mb-4">📅</p>
          <p className="text-slate-500 font-semibold mb-2">No plan for this week yet</p>
          <p className="text-slate-400 text-sm mb-6">Generate a structured weekly plan to stay on track</p>
          <button onClick={() => generateWeek(1)} disabled={generating} className="btn-primary">
            {generating ? 'Generating...' : '✨ Generate Week 1 Plan'}
          </button>
        </div>
      ) : (
        <>
          {/* Progress bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-semibold text-slate-700">Week {week} Progress</span>
                <span className="text-sm text-slate-500">{doneCount}/{weekPlans.length} days done</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${weekPlans.length > 0 ? (doneCount/weekPlans.length)*100 : 0}%`, background: 'linear-gradient(90deg, #6366f1, #10b981)' }} />
              </div>
            </div>
            <div className="text-2xl font-bold text-indigo-600">{weekPlans.length > 0 ? Math.round((doneCount/weekPlans.length)*100) : 0}%</div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {DAYS.map(day => {
              const plan = weekPlans.find(p => p.day === day)
              if (!plan) return null
              const statusInfo = STATUS_MAP[plan.status] || STATUS_MAP['Planned']
              return (
                <div key={day} className={`rounded-2xl border p-4 ${DAY_BG[day] || 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-800 text-sm">{day}</h3>
                    <select value={plan.status} onChange={e => updateStatus(plan.id, e.target.value)}
                      className={`text-xs font-semibold rounded-lg px-2 py-1 border-0 outline-none cursor-pointer ${statusInfo.color}`}>
                      {Object.keys(STATUS_MAP).map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">🎯 Apply Target</p>
                      <p className="text-2xl font-bold text-indigo-600">{plan.applyTarget}</p>
                    </div>
                    {plan.companiesToTarget && <div><p className="text-xs font-bold text-slate-500 mb-0.5">🏢 Target</p><p className="text-xs text-slate-600">{plan.companiesToTarget}</p></div>}
                    {plan.prepTopic && <div><p className="text-xs font-bold text-slate-500 mb-0.5">📚 Prep</p><p className="text-xs text-slate-600">{plan.prepTopic}</p></div>}
                    {plan.linkedinActions && <div><p className="text-xs font-bold text-slate-500 mb-0.5">💼 LinkedIn</p><p className="text-xs text-slate-600">{plan.linkedinActions}</p></div>}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
