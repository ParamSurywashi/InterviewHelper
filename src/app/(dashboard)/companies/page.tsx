'use client'
import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Loader2, ExternalLink, Search } from 'lucide-react'
import { Company } from '@/types'
import { CompanyModal } from '@/components/company-modal'
const PS:Record<string,string> = { High:'bg-red-100 text-red-600 dark:bg-red-500/20', Medium:'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20', Low:'bg-green-100 text-green-600 dark:bg-green-500/20' }
const AS:Record<string,string> = { Yes:'bg-emerald-100 text-emerald-600', No:'bg-slate-100 text-slate-500 dark:bg-slate-700', 'In Progress':'bg-yellow-100 text-yellow-700' }
export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState('All')
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Company|null>(null)
  async function load() { setLoading(true); const d=await fetch('/api/companies').then(r=>r.json()); setCompanies(Array.isArray(d)?d:[]); setLoading(false) }
  useEffect(()=>{load()},[])
  async function del(id:string) { if(!confirm('Remove?')) return; await fetch(`/api/companies/${id}`,{method:'DELETE'}); load() }
  const filtered = companies.filter(c=>{
    const q=search.toLowerCase()
    return (c.companyName.toLowerCase().includes(q)||(c.location||'').toLowerCase().includes(q)||(c.techStack||'').toLowerCase().includes(q))&&(priority==='All'||c.priority===priority)
  })
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h4 className="text-xl font-black text-slate-900 dark:text-white">Company Wishlist</h4><p className="text-sm text-slate-500 dark:text-slate-400">{companies.length} companies • {companies.filter(c=>c.applied==='Yes').length} applied</p></div>
        <button onClick={()=>{setEditing(null);setModal(true)}} className="btn btn-primary self-start"><Plus className="w-4 h-4"/>Add Company</button>
      </div>
      <div className="card p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex gap-2 flex-wrap">
          {['All','High','Medium','Low'].map(p=>(
            <button key={p} onClick={()=>setPriority(p)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${priority===p?'text-white':'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`} style={priority===p?{background:'var(--primary)'}:{}}>
              {p==='High'?'🔴 ':p==='Medium'?'🟡 ':p==='Low'?'🟢 ':''}{p}
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto sm:max-w-xs flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/><input className="form-input pl-9 text-sm" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      </div>
      {loading?<div className="flex items-center justify-center py-20 gap-3 text-slate-400"><Loader2 className="w-6 h-6 animate-spin" style={{color:'var(--primary)'}}/>Loading...</div>
      :filtered.length===0?<div className="card py-20 text-center"><p className="text-5xl mb-3">🏢</p><p className="text-slate-500 mb-4">No companies yet</p><button onClick={()=>{setEditing(null);setModal(true)}} className="btn btn-primary btn-sm"><Plus className="w-4 h-4"/>Add Company</button></div>
      :<div className="grid grid-cols-12 gap-4">
        {filtered.map(c=>(
          <div key={c.id} className="col-span-12 md:col-span-6 xl:col-span-4">
            <div className="card h-full hover:-translate-y-0.5 transition-all duration-150">
              <div className="card-body space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0"><h6 className="font-black text-slate-800 dark:text-white text-base truncate">{c.companyName}</h6><p className="text-xs text-slate-400 mt-0.5">{c.location||'—'} • {c.wfhPolicy}</p></div>
                  <span className={`badge text-xs ${PS[c.priority]||''}`}>{c.priority==='High'?'🔴':c.priority==='Medium'?'🟡':'🟢'} {c.priority}</span>
                </div>
                {c.techStack&&<div className="flex flex-wrap gap-1">{c.techStack.split(',').slice(0,5).map(t=><span key={t} className="px-2 py-0.5 rounded text-[10px] font-semibold" style={{background:'var(--primary-light)',color:'var(--primary)'}}>{t.trim()}</span>)}</div>}
                <div className="flex items-center justify-between">
                  <span className={`badge ${AS[c.applied]||''}`}>{c.applied==='Yes'?'✅':c.applied==='In Progress'?'🔄':'❌'} {c.applied}</span>
                  {c.careersPage&&<a href={c.careersPage} target="_blank" rel="noopener" className="flex items-center gap-1 text-xs hover:underline" style={{color:'var(--primary)'}}><ExternalLink className="w-3 h-3"/>Careers</a>}
                </div>
                {c.notes&&<p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-2">"{c.notes}"</p>}
                <div className="flex justify-end gap-1 pt-1">
                  <button onClick={()=>{setEditing(c);setModal(true)}} className="btn-icon bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500"><Pencil className="w-3.5 h-3.5"/></button>
                  <button onClick={()=>del(c.id)} className="btn-icon bg-red-50 dark:bg-red-900/30 text-red-500"><Trash2 className="w-3.5 h-3.5"/></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>}
      {modal&&<CompanyModal company={editing} onClose={()=>setModal(false)} onSave={load}/>}
    </div>
  )
}