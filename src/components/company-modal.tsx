'use client'
import { useState, useEffect } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import { Company } from '@/types'

interface Props { company?: Company | null; onClose: () => void; onSave: () => void }

const empty = { companyName: '', location: '', wfhPolicy: 'Hybrid', techStack: '', careersPage: '', linkedinPage: '', priority: 'Medium', applied: 'No', notes: '' }

export function CompanyModal({ company, onClose, onSave }: Props) {
  const [form, setForm] = useState<typeof empty>(empty)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (company) setForm({ companyName: company.companyName, location: company.location || '', wfhPolicy: company.wfhPolicy || 'Hybrid', techStack: company.techStack || '', careersPage: company.careersPage || '', linkedinPage: company.linkedinPage || '', priority: company.priority, applied: company.applied, notes: company.notes || '' })
    else setForm(empty)
  }, [company])

  const f = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [k]: e.target.value }))

  async function save() {
    if (!form.companyName) return
    setSaving(true)
    const method = company ? 'PUT' : 'POST'
    const url = company ? `/api/companies/${company.id}` : '/api/companies'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false); onSave(); onClose()
  }

  const Label = ({ children }: { children: React.ReactNode }) => <label className="block text-xs font-semibold text-slate-600 mb-1.5">{children}</label>

  return (
    <div className="modal-overlay animate-fade-in" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box animate-slide-in max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">{company ? '✏️ Edit Company' : '🏢 Add Dream Company'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center"><X className="w-4 h-4 text-slate-500" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Company Name *</Label>
              <input className="input-field text-sm py-2" placeholder="e.g. Razorpay" value={form.companyName} onChange={f('companyName')} />
            </div>
            <div>
              <Label>Location</Label>
              <input className="input-field text-sm py-2" placeholder="Bangalore" value={form.location} onChange={f('location')} />
            </div>
            <div>
              <Label>WFH Policy</Label>
              <select className="input-field text-sm py-2" value={form.wfhPolicy} onChange={f('wfhPolicy')}>
                {['Hybrid','WFH','On-Site'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <Label>Tech Stack</Label>
              <input className="input-field text-sm py-2" placeholder="React, Node.js, TypeScript" value={form.techStack} onChange={f('techStack')} />
            </div>
            <div>
              <Label>Priority</Label>
              <select className="input-field text-sm py-2" value={form.priority} onChange={f('priority')}>
                {['High','Medium','Low'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <Label>Applied?</Label>
              <select className="input-field text-sm py-2" value={form.applied} onChange={f('applied')}>
                {['No','Yes','In Progress'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <Label>Careers Page URL</Label>
              <input className="input-field text-sm py-2" placeholder="https://company.com/careers" value={form.careersPage} onChange={f('careersPage')} />
            </div>
            <div className="col-span-2">
              <Label>LinkedIn Page</Label>
              <input className="input-field text-sm py-2" placeholder="https://linkedin.com/company/..." value={form.linkedinPage} onChange={f('linkedinPage')} />
            </div>
            <div className="col-span-2">
              <Label>Notes</Label>
              <textarea className="input-field text-sm py-2 resize-none" rows={2} value={form.notes} onChange={f('notes')} placeholder="Interview process, contacts, etc." />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 pb-6">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={save} disabled={saving || !form.companyName} className="btn-primary">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Company</>}
          </button>
        </div>
      </div>
    </div>
  )
}
