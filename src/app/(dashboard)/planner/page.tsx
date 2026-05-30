'use client'
import { useEffect, useState } from 'react'
import { Plus, Loader2, CheckCircle2, Clock, XCircle } from 'lucide-react'
import { WeeklyPlan } from '@/types'
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const DEFS = [
  {prep:'React hooks + DSA Arrays',li:'Connect 5 recruiters',co:'Startups + Fintech',t:3},
  {prep:'System Design basics',li:'Post project update',co:'Product companies',t:2},
  {prep:'Next.js + SSR',li:'Engage 3 posts',co:'Remote-first',t:3},
  {prep:'TypeScript deep dive',li:'Add 5 connections',co:'MNCs + FAANG',t:2},
  {prep:'Mock interview session',li:'Share portfolio',co:'Referral-based',t:3},
  {prep:'Resume refresh',li:'Review profile',co:'AngelList startups',t:2},
  {prep:'Plan next week',li:'—',co:'Rest & Review',t:0},
]
const SC:Record<string,{cls:string}> = {
  'Planned':{cls:'bg-slate-100 dark:bg-slate-700 text-slate-500'},
  'Done ✅':{cls:'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'},
  'Partial':{cls:'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600'},
  'Skipped':{cls:'bg-red-100 dark:bg-red-900/30 text-red-500'},
}
const DA=['border-t-blue-500','border-t-purple-500','border-t-cyan-500','border-t-violet-500','border-t-indigo-500','border-t-amber-500','border-t-rose-500']
export default function PlannerPage() {
  const [plans, setPlans] = useState<WeeklyPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [week, setWeek] = useState(1)
  const [gen, setGen] = useState(false)
  async function load() { setLoading(true); const d=await fetch('/api/planner').then(r=>r.json()); setPlans(Array.isArray(d)?d:[]); setLoading(false) }
  useEffect(()=>{load()},[])
  async function generateWeek(w:number) {
    setGen(true)
    for(let d=0;d<7;d++) await fetch('/api/planner',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({weekNumber:w,day:DAYS[d],applyTarget:DEFS[d].t,companiesToTarget:DEFS[d].co,prepTopic:DEFS[d].prep,linkedinActions:DEFS[d].li,status:'Planned'})})
    setGen(false); load()
  }
  async function updStatus(id:string,status:string) { await fetch('/api/planner',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status})}); setPlans(p=>p.map(pl=>pl.id===id?{...pl,status}:pl)) }
  const wp = plans.filter(p=>p.weekNumber===week)
  const wns = Array.from(new Set(plans.map(p => p.weekNumber))).sort((a, b) => a - b)
  const done = wp.filter(p=>p.status==='Done ✅').length
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h4 className="text-xl font-black text-slate-900 dark:text-white">Weekly Planner</h4><p className="text-sm text-slate-500 dark:text-slate-400">Plan every day • Stay consistent • Get hired faster</p></div>
        <button onClick={()=>generateWeek(wns.length+1)} disabled={gen} className="btn btn-primary self-start">
          {gen?<><Loader2 className="w-4 h-4 animate-spin"/>Generating...</>:<><Plus className="w-4 h-4"/>Generate Week {wns.length+1}</>}
        </button>
      </div>
      {wns.length>0&&<div className="flex gap-2 flex-wrap">{wns.map(w=><button key={w} onClick={()=>setWeek(w)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${week===w?'text-white shadow-sm':'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`} style={week===w?{background:'var(--primary)'}:{}}>Week {w}</button>)}</div>}
      {wp.length>0&&<div className="card p-4 flex items-center gap-4"><div className="flex-1"><div className="flex justify-between mb-2"><span className="text-sm font-bold text-slate-700 dark:text-white">Week {week} Progress</span><span className="text-sm text-slate-500">{done}/{wp.length} done</span></div><div className="progress h-2.5"><div className="progress-bar" style={{width:`${wp.length>0?(done/wp.length)*100:0}%`,background:'linear-gradient(90deg,var(--primary),#10b981)'}}/></div></div><div className="text-2xl font-black" style={{color:'var(--primary)'}}>{wp.length>0?Math.round((done/wp.length)*100):0}%</div></div>}
      {loading?<div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin" style={{color:'var(--primary)'}}/></div>
      :wp.length===0?<div className="card py-20 text-center"><p className="text-5xl mb-4">📅</p><p className="text-slate-500 font-semibold mb-2">No plan yet</p><p className="text-slate-400 text-sm mb-6">Generate a structured weekly plan</p><button onClick={()=>generateWeek(1)} disabled={gen} className="btn btn-primary">{gen?'Generating...':'✨ Generate Week 1'}</button></div>
      :<div className="grid grid-cols-12 gap-4">
        {DAYS.map((day,idx)=>{
          const plan=wp.find(p=>p.day===day); if(!plan) return null
          const sc=SC[plan.status]||SC['Planned']
          return (
            <div key={day} className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3">
              <div className={`card h-full border-t-4 ${DA[idx]}`}>
                <div className="card-header py-3">
                  <h6 className="text-sm font-black text-slate-800 dark:text-white">{day}</h6>
                  <select value={plan.status} onChange={e=>updStatus(plan.id,e.target.value)} className={`text-xs font-bold rounded-lg px-2 py-1 border-0 outline-none cursor-pointer ${sc.cls}`}>
                    {Object.keys(SC).map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="card-body py-4 space-y-3">
                  <div><p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">🎯 Apply Target</p><p className="text-2xl font-black" style={{color:'var(--primary)'}}>{plan.applyTarget}</p></div>
                  {plan.companiesToTarget&&<div><p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-0.5">🏢 Target</p><p className="text-xs text-slate-600 dark:text-slate-300">{plan.companiesToTarget}</p></div>}
                  {plan.prepTopic&&<div><p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-0.5">📚 Prep</p><p className="text-xs text-slate-600 dark:text-slate-300">{plan.prepTopic}</p></div>}
                  {plan.linkedinActions&&<div><p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-0.5">💼 LinkedIn</p><p className="text-xs text-slate-600 dark:text-slate-300">{plan.linkedinActions}</p></div>}
                </div>
              </div>
            </div>
          )
        })}
      </div>}
    </div>
  )
}