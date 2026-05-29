'use client'
import { useState, useEffect } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import { Application } from '@/types'
import { JOB_ROLES, SOURCES, STATUSES, ROUND_STATUSES } from '@/lib/utils'
interface Props { app?:Application|null; onClose:()=>void; onSave:()=>void }
const empty = { companyName:'', jobRole:'Frontend Developer', positionType:'Permanent', expectedExperience:'', location:'', wfhMode:'Hybrid', appliedOn:new Date().toISOString().split('T')[0], source:'LinkedIn', appStatus:'Applied', telephonicRound:'Pending', technicalRound1:'Pending', technicalRound2:'Pending', hrRound:'Pending', ctcExpected:'', ctcOffered:'', noticePeriod:'', notes:'', interviewNotes:'' }
export function ApplicationModal({ app, onClose, onSave }:Props) {
  const [form, setForm] = useState<typeof empty>(empty)
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState<'basic'|'rounds'|'notes'>('basic')
  useEffect(()=>{
    if(app) setForm({ companyName:app.companyName, jobRole:app.jobRole, positionType:app.positionType||'Permanent', expectedExperience:app.expectedExperience||'', location:app.location||'', wfhMode:app.wfhMode||'Hybrid', appliedOn:app.appliedOn?.split('T')[0]||'', source:app.source||'LinkedIn', appStatus:app.appStatus, telephonicRound:app.telephonicRound, technicalRound1:app.technicalRound1, technicalRound2:app.technicalRound2, hrRound:app.hrRound, ctcExpected:app.ctcExpected||'', ctcOffered:app.ctcOffered||'', noticePeriod:app.noticePeriod||'', notes:app.notes||'', interviewNotes:app.interviewNotes||'' })
    else { setForm(empty); setTab('basic') }
  },[app])
  const f=(k:string)=>(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>setForm(p=>({...p,[k]:e.target.value}))
  async function save() {
    if(!form.companyName||!form.jobRole) return
    setSaving(true)
    await fetch(app?`/api/applications/${app.id}`:'/api/applications',{method:app?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
    setSaving(false); onSave(); onClose()
  }
  const L=({c}:{c:React.ReactNode})=><label className="form-label">{c}</label>
  const S=({n,opts}:{n:keyof typeof form;opts:string[]})=><select className="form-input text-sm" value={form[n]} onChange={f(n)}>{opts.map(o=><option key={o}>{o}</option>)}</select>
  return (
    <div className="modal-backdrop" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-content max-w-2xl">
        <div className="modal-header">
          <h5 className="text-base font-black text-slate-900 dark:text-white">{app?'✏️ Edit Application':'➕ New Application'}</h5>
          <button onClick={onClose} className="btn-icon text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><X className="w-4 h-4"/></button>
        </div>
        <div className="flex gap-1 px-6 pt-4 border-b border-slate-100 dark:border-slate-700">
          {(['basic','rounds','notes'] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 text-sm font-bold rounded-t-lg border-b-2 -mb-px capitalize transition-all ${tab===t?'border-current':'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`} style={tab===t?{borderColor:'var(--primary)',color:'var(--primary)'}:{}}>{t}</button>
          ))}
        </div>
        <div className="p-6 min-h-[320px]">
          {tab==='basic' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 form-group mb-0"><L c="Company Name *"/><input className="form-input text-sm" placeholder="e.g. Razorpay" required value={form.companyName} onChange={f('companyName')}/></div>
              <div className="col-span-2 form-group mb-0"><L c="Job Role *"/><S n="jobRole" opts={JOB_ROLES}/></div>
              <div className="form-group mb-0"><L c="Position Type"/><S n="positionType" opts={['Permanent','Contractual']}/></div>
              <div className="form-group mb-0"><L c="Exp. Required by Company"/><input className="form-input text-sm" placeholder="e.g. 3-5 years" value={form.expectedExperience} onChange={f('expectedExperience')}/></div>
              <div className="form-group mb-0"><L c="Location"/><input className="form-input text-sm" placeholder="Bangalore / Remote" value={form.location} onChange={f('location')}/></div>
              <div className="form-group mb-0"><L c="Work Mode"/><S n="wfhMode" opts={['Hybrid','WFH','On-Site']}/></div>
              <div className="form-group mb-0"><L c="Applied On"/><input type="date" className="form-input text-sm" value={form.appliedOn} onChange={f('appliedOn')}/></div>
              <div className="form-group mb-0"><L c="Source"/><S n="source" opts={SOURCES}/></div>
              <div className="form-group mb-0"><L c="Status"/><S n="appStatus" opts={STATUSES}/></div>
              <div className="form-group mb-0"><L c="Notice Period"/><input className="form-input text-sm" placeholder="e.g. 30 days" value={form.noticePeriod} onChange={f('noticePeriod')}/></div>
              <div className="form-group mb-0"><L c="CTC Expected"/><input className="form-input text-sm" placeholder="e.g. 20 LPA" value={form.ctcExpected} onChange={f('ctcExpected')}/></div>
              <div className="form-group mb-0"><L c="CTC Offered"/><input className="form-input text-sm" placeholder="e.g. 18 LPA" value={form.ctcOffered} onChange={f('ctcOffered')}/></div>
            </div>
          )}
          {tab==='rounds' && (
            <div className="p-4 rounded-xl border space-y-3" style={{background:'rgba(70,105,250,0.04)',borderColor:'rgba(70,105,250,0.2)'}}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{color:'var(--primary)'}}>Interview Rounds</p>
              <div className="grid grid-cols-2 gap-3">
                {([['📞 Telephonic','telephonicRound'],['🖥️ Technical 1','technicalRound1'],['💻 Technical 2','technicalRound2'],['🤝 HR Round','hrRound']] as [string,keyof typeof form][]).map(([label,key])=>(
                  <div key={key} className="form-group mb-0"><L c={label}/><S n={key} opts={ROUND_STATUSES}/></div>
                ))}
              </div>
            </div>
          )}
          {tab==='notes' && (
            <div className="space-y-4">
              <div className="form-group mb-0"><L c="📝 General Notes"/><textarea className="form-input text-sm resize-none" rows={4} placeholder="Company culture, contacts, salary details, prep notes..." value={form.notes} onChange={f('notes')}/></div>
              <div className="form-group mb-0"><L c="🎤 Interview Notes & Feedback"/><textarea className="form-input text-sm resize-none" rows={5} placeholder="What questions were asked? How did it go? What to improve?..." value={form.interviewNotes} onChange={f('interviewNotes')}/></div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-outline-secondary">Cancel</button>
          <button onClick={save} disabled={saving||!form.companyName} className="btn btn-primary">
            {saving?<><Loader2 className="w-4 h-4 animate-spin"/>Saving...</>:<><Save className="w-4 h-4"/>{app?'Update':'Add Application'}</>}
          </button>
        </div>
      </div>
    </div>
  )
}