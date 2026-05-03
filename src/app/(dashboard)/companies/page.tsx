'use client'
import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Loader2, ExternalLink, Search } from 'lucide-react'
import { Company } from '@/types'
import { CompanyModal } from '@/components/company-modal'
import { PRIORITY_COLORS } from '@/lib/utils'
import { formatDate } from '@/lib/utils'

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Company | null>(null)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/companies')
    const data = await res.json()
    setCompanies(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function del(id: string) {
    if (!confirm('Remove this company?')) return
    await fetch(`/api/companies/${id}`, { method: 'DELETE' })
    load()
  }

  const filtered = companies.filter(c => {
    const q = search.toLowerCase()
    return (c.companyName.toLowerCase().includes(q) || (c.location || '').toLowerCase().includes(q) || (c.techStack || '').toLowerCase().includes(q)) &&
      (priority === 'All' || c.priority === priority)
  })

  const appliedCount = companies.filter(c => c.applied === 'Yes').length
  const highPrioCount = companies.filter(c => c.priority === 'High').length

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">🏢 Company Wishlist</h1>
          <p className="page-subtitle">{companies.length} dream companies • {appliedCount} applied • {highPrioCount} high priority</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true) }} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Company
        </button>
      </div>

      {/* Priority filter */}
      <div className="flex items-center gap-3 flex-wrap">
        {['All','High','Medium','Low'].map(p => (
          <button key={p} onClick={() => setPriority(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${priority === p ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'}`}>
            {p === 'High' ? '🔴' : p === 'Medium' ? '🟡' : p === 'Low' ? '🟢' : ''} {p}
          </button>
        ))}
        <div className="relative ml-auto max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input className="input-field pl-9 py-2 text-sm" placeholder="Search companies..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-slate-500"><Loader2 className="w-6 h-6 animate-spin text-indigo-500" /> Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-400 mb-4">No companies yet — add your dream companies!</p>
          <button onClick={() => { setEditing(null); setModalOpen(true) }} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Company</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(c => (
            <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-base">{c.companyName}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{c.location || 'Location TBD'} • {c.wfhPolicy}</p>
                </div>
                <span className={`badge text-xs border ${PRIORITY_COLORS[c.priority] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                  {c.priority === 'High' ? '🔴' : c.priority === 'Medium' ? '🟡' : '🟢'} {c.priority}
                </span>
              </div>

              {c.techStack && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {c.techStack.split(',').map(t => (
                    <span key={t} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium">{t.trim()}</span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <span className={`badge text-xs ${c.applied === 'Yes' ? 'bg-green-100 text-green-700' : c.applied === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'}`}>
                  {c.applied === 'Yes' ? '✅ Applied' : c.applied === 'In Progress' ? '🔄 In Progress' : '❌ Not Applied'}
                </span>
              </div>

              {c.notes && <p className="text-xs text-slate-500 italic mb-3 line-clamp-2">"{c.notes}"</p>}

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="flex gap-2">
                  {c.careersPage && <a href={c.careersPage} target="_blank" rel="noopener" className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-indigo-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors"><ExternalLink className="w-3.5 h-3.5" /></a>}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditing(c); setModalOpen(true) }} className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 flex items-center justify-center"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => del(c.id)} className="w-7 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && <CompanyModal company={editing} onClose={() => setModalOpen(false)} onSave={load} />}
    </div>
  )
}
