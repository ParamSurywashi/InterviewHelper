'use client'
import { useEffect, useState, useMemo } from 'react'
import { Plus, Search, Loader2, Pencil, Trash2, Eye } from 'lucide-react'
import { Application } from '@/types'
import { ApplicationModal } from '@/components/application-modal'
import { ApplicationDetail } from '@/components/application-detail'
import { StatusBadge } from '@/components/status-badge'
import { RoundBadge } from '@/components/round-badge'
import { formatDate, STATUSES } from '@/lib/utils'
export default function ApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sf, setSf] = useState('All')
  const [tf, setTf] = useState('All')
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Application|null>(null)
  const [detail, setDetail] = useState<Application|null>(null)
  const [del, setDel] = useState<string|null>(null)
  async function load() { setLoading(true); const d=await fetch('/api/applications').then(r=>r.json()); setApps(Array.isArray(d)?d:[]); setLoading(false) }
  useEffect(()=>{load()},[])
  const filtered = useMemo(()=>apps.filter(a=>{
    const q=search.toLowerCase()
    return (a.companyName.toLowerCase().includes(q)||a.jobRole.toLowerCase().includes(q)||(a.location||'').toLowerCase().includes(q))
      &&(sf==='All'||a.appStatus===sf)&&(tf==='All'||(a.positionType||'Permanent')===tf)
  }),[apps,search,sf,tf])
  async function delApp(id:string) { if(!confirm('Delete?')) return; setDel(id); await fetch(`/api/applications/${id}`,{method:'DELETE'}); setDel(null); load() }
  const counts = useMemo(()=>{ const c:Record<string,number>={All:apps.length}; apps.forEach(a=>{c[a.appStatus]=(c[a.appStatus]||0)+1}); return c },[apps])
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h4 className="text-xl font-black text-slate-900 dark:text-white">Applications</h4><p className="text-sm text-slate-500 dark:text-slate-400">{apps.length} total • click any row to view full details</p></div>
        <button onClick={()=>{setEditing(null);setModal(true)}} className="btn btn-primary self-start"><Plus className="w-4 h-4"/>Add Application</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{l:'Total',v:apps.length,c:'var(--primary)'},{l:'Active',v:apps.filter(a=>['In Progress','Shortlisted'].includes(a.appStatus)).length,c:'#f59e0b'},{l:'Offers 🎉',v:apps.filter(a=>a.appStatus==='Offer').length,c:'#10b981'},{l:'Rejected',v:apps.filter(a=>a.appStatus==='Rejected').length,c:'#ef4444'}].map(s=>(
          <div key={s.l} className="card p-4 text-center"><p className="text-2xl font-black" style={{color:s.c}}>{s.v}</p><p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</p></div>
        ))}
      </div>
      <div className="card p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><input className="form-input pl-9 text-sm" placeholder="Search company, role, location..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
          <select className="form-input text-sm max-w-[160px]" value={tf} onChange={e=>setTf(e.target.value)}><option value="All">All Types</option><option>Permanent</option><option>Contractual</option></select>
          <p className="text-sm text-slate-400 ml-auto">{filtered.length} results</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All',...STATUSES].map(s=>(
            <button key={s} onClick={()=>setSf(s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${sf===s?'text-white shadow-sm':'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`} style={sf===s?{background:'var(--primary)'}:{}}>
              {s} {counts[s]!==undefined&&<span className="opacity-60 ml-0.5">({counts[s]})</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="card overflow-hidden">
        {loading?<div className="flex items-center justify-center py-24 gap-3 text-slate-400"><Loader2 className="w-6 h-6 animate-spin" style={{color:'var(--primary)'}}/>Loading...</div>
        :filtered.length===0?<div className="py-24 text-center"><p className="text-5xl mb-3">📋</p><p className="text-slate-500 dark:text-slate-400 font-semibold mb-1">No applications found</p><p className="text-slate-400 text-sm mb-5">{search||sf!=='All'?'Try clearing filters':'Add your first application to get started'}</p>{!search&&sf==='All'&&<button onClick={()=>{setEditing(null);setModal(true)}} className="btn btn-primary btn-sm"><Plus className="w-4 h-4"/>Add First</button>}</div>
        :<div className="overflow-x-auto">
          <table className="tbl">
            <thead><tr><th>#</th><th>Company & Role</th><th>Type</th><th>Exp Req.</th><th>Location</th><th>Applied</th><th>Source</th><th>Status</th><th>📞</th><th>🖥️T1</th><th>💻T2</th><th>🤝HR</th><th>CTC</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((a,i)=>(
                <tr key={a.id} className="cursor-pointer group" onClick={()=>setDetail(a)}>
                  <td className="text-slate-400 text-xs font-mono">{i+1}</td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{background:'linear-gradient(135deg,var(--primary),#4f46e5)'}}>{a.companyName.charAt(0)}</div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 dark:text-white text-sm cursor-pointer hover:underline" onClick={()=>setDetail(a)}>{a.companyName}</p>
                        <p className="text-xs text-slate-400 truncate max-w-[150px]">{a.jobRole}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className={`badge text-xs ${a.positionType==='Contractual'?'bg-orange-100 dark:bg-orange-900/30 text-orange-600':'bg-blue-100 dark:bg-blue-900/30 text-blue-600'}`}>{a.positionType||'Permanent'}</span></td>
                  <td className="text-xs text-slate-500 whitespace-nowrap">{a.expectedExperience||'—'}</td>
                  <td><p className="text-xs text-slate-600 dark:text-slate-300">{a.location||'—'}</p><p className="text-xs text-slate-400">{a.wfhMode}</p></td>
                  <td className="text-xs text-slate-500 whitespace-nowrap">{formatDate(a.appliedOn)}</td>
                  <td className="text-xs text-slate-600 dark:text-slate-300">{a.source||'—'}</td>
                  <td><StatusBadge status={a.appStatus}/></td>
                  <td><RoundBadge status={a.telephonicRound}/></td>
                  <td><RoundBadge status={a.technicalRound1}/></td>
                  <td><RoundBadge status={a.technicalRound2}/></td>
                  <td><RoundBadge status={a.hrRound}/></td>
                  <td><p className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">{a.ctcExpected||'—'}</p>{a.ctcOffered&&<p className="text-xs text-emerald-500 mt-0.5 whitespace-nowrap">{a.ctcOffered} ✅</p>}</td>
                  <td onClick={e=>e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <button onClick={()=>setDetail(a)} className="btn-icon bg-slate-50 dark:bg-slate-700 text-slate-400 hover:bg-slate-100"><Eye className="w-3.5 h-3.5"/></button>
                      <button onClick={()=>{setEditing(a);setModal(true)}} className="btn-icon bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 hover:bg-indigo-100"><Pencil className="w-3.5 h-3.5"/></button>
                      <button onClick={()=>delApp(a.id)} disabled={del===a.id} className="btn-icon bg-red-50 dark:bg-red-900/30 text-red-500 hover:bg-red-100">{del===a.id?<Loader2 className="w-3 h-3 animate-spin"/>:<Trash2 className="w-3.5 h-3.5"/>}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
      </div>
      {modal&&<ApplicationModal app={editing} onClose={()=>setModal(false)} onSave={load}/>}
      {detail&&<ApplicationDetail app={detail} onClose={()=>setDetail(null)} onEdit={a=>{setDetail(null);setEditing(a);setModal(true)}} onDelete={async id=>{await delApp(id);setDetail(null)}}/>}
    </div>
  )
}