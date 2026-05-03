'use client'
import { useEffect, useState, useMemo } from 'react'
import { Plus, Search, Filter, Loader2, Pencil, Trash2, ChevronDown } from 'lucide-react'
import { Application } from '@/types'
import { ApplicationModal } from '@/components/application-modal'
import { StatusBadge } from '@/components/status-badge'
import { RoundBadge } from '@/components/round-badge'
import { formatDate, STATUSES } from '@/lib/utils'

const STAGES = ['All', ...STATUSES]

export default function ApplicationsPage() {
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Application | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/applications')
    const data = await res.json()
    setApps(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const filtered = useMemo(() => apps.filter(a => {
    const q = search.toLowerCase()
    const matchSearch = a.companyName.toLowerCase().includes(q) || a.jobRole.toLowerCase().includes(q) || (a.location || '').toLowerCase().includes(q)
    const matchStatus = statusFilter === 'All' || a.appStatus === statusFilter
    return matchSearch && matchStatus
  }), [apps, search, statusFilter])

  async function deleteApp(id: string) {
    if (!confirm('Delete this application?')) return
    setDeleting(id)
    await fetch(`/api/applications/${id}`, { method: 'DELETE' })
    setDeleting(null)
    load()
  }

  function openAdd() { setEditing(null); setModalOpen(true) }
  function openEdit(a: Application) { setEditing(a); setModalOpen(true) }

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: apps.length }
    apps.forEach(a => { c[a.appStatus] = (c[a.appStatus] || 0) + 1 })
    return c
  }, [apps])

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">🎯 Applications</h1>
          <p className="page-subtitle">{apps.length} total applications • {apps.filter(a => a.appStatus === 'Offer').length} offers received</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Application
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 flex-wrap">
        {STAGES.map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${statusFilter === s ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'}`}>
            {s} {counts[s] !== undefined ? <span className="opacity-70">({counts[s]})</span> : ''}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input className="input-field pl-9 text-sm py-2.5" placeholder="Search by company, role, location..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {search && <button onClick={() => setSearch('')} className="text-xs text-indigo-600 hover:underline">Clear</button>}
        <p className="text-sm text-slate-500 ml-auto">{filtered.length} results</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500" /> Loading applications...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-slate-400 text-lg mb-2">No applications found</p>
            <p className="text-slate-300 text-sm mb-4">Start tracking by adding your first application</p>
            <button onClick={openAdd} className="btn-primary text-sm">
              <Plus className="w-4 h-4" /> Add First Application
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company & Role</th>
                  <th>Location</th>
                  <th>Applied</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>📞 Telephonic</th>
                  <th>🖥️ Tech 1</th>
                  <th>💻 Tech 2</th>
                  <th>🤝 HR</th>
                  <th>CTC</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, i) => (
                  <tr key={a.id} className="group">
                    <td className="text-slate-400 text-xs font-mono">{i + 1}</td>
                    <td>
                      <div className="font-semibold text-slate-800 text-sm">{a.companyName}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{a.jobRole}</div>
                    </td>
                    <td>
                      <div className="text-sm text-slate-600">{a.location || '—'}</div>
                      <div className="text-xs text-slate-400">{a.wfhMode}</div>
                    </td>
                    <td className="text-sm text-slate-500 whitespace-nowrap">{formatDate(a.appliedOn)}</td>
                    <td className="text-sm text-slate-600">{a.source || '—'}</td>
                    <td><StatusBadge status={a.appStatus} /></td>
                    <td><RoundBadge status={a.telephonicRound} /></td>
                    <td><RoundBadge status={a.technicalRound1} /></td>
                    <td><RoundBadge status={a.technicalRound2} /></td>
                    <td><RoundBadge status={a.hrRound} /></td>
                    <td>
                      <div className="text-xs font-semibold text-slate-700">{a.ctcExpected || '—'}</div>
                      {a.ctcOffered && <div className="text-xs text-emerald-600 mt-0.5">{a.ctcOffered} ✅</div>}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(a)} className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 flex items-center justify-center transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteApp(a.id)} disabled={deleting === a.id} className="w-7 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors">
                          {deleting === a.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && <ApplicationModal app={editing} onClose={() => setModalOpen(false)} onSave={load} />}
    </div>
  )
}
