'use client'
import { useState, useEffect } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import { Company } from '@/types'
interface Props { company?: Company | null; onClose: () => void; onSave: () => void }
const empty = { companyName: '', location: '', wfhPolicy: 'Hybrid', techStack: '', careersPage: '', linkedinPage: '', priority: 'Medium', applied: 'No', notes: '' }
export function CompanyModal({ company, onClose, onSave }: Props) {
  const [form, setForm] = useState<typeof empty>(empty)
  const [saving, setSaving] = useState(false)
  useEffect(() => { if (company) setForm({ companyName: company.companyName, location: company.location || '', wfhPolicy: company.wfhPolicy || 'Hybrid', techStack: company.techStack || '', careersPage: company.careersPage || '', linkedinPage: company.linkedinPage || '', priority: company.priority, applied: company.applied, notes: company.notes || '' }); else setForm(empty) }, [company])
  const f = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [k]: e.target.value }))
  async function save() {
    if (!form.companyName) return; setSaving(true)
    await fetch(company ? `/api/companies/${company.id}` : '/api/companies', { method: company ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false); onSave(); onClose()
  }
  const L = ({ c }: { c: string }) => <label className="form-label">{c}</label>
  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-content max-w-lg">
        <div className="modal-header">
          <h5 className="text-base font-black text-slate-900 dark:text-white">{company ? '✏️ Edit Company' : '🏢 Add Dream Company'}</h5>
          <button onClick={onClose} className="btn-icon text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6 grid grid-cols-2 gap-3">
          <div className="col-span-2 form-group mb-0"><L c="Company Name *" /><input className="form-input text-sm" placeholder="e.g. Razorpay" value={form.companyName} onChange={f('companyName')} required /></div>
          <div className="form-group mb-0"><L c="Location" /><input className="form-input text-sm" placeholder="Bangalore" value={form.location} onChange={f('location')} /></div>
          <div className="form-group mb-0"><L c="WFH Policy" /><select className="form-input text-sm" value={form.wfhPolicy} onChange={f('wfhPolicy')}>{['Hybrid', 'WFH', 'On-Site'].map(o => <option key={o}>{o}</option>)}</select></div>
          <div className="col-span-2 form-group mb-0"><L c="Tech Stack" /><input className="form-input text-sm" placeholder="React, Node.js, TypeScript" value={form.techStack} onChange={f('techStack')} /></div>
          <div className="form-group mb-0"><L c="Priority" /><select className="form-input text-sm" value={form.priority} onChange={f('priority')}>{['High', 'Medium', 'Low'].map(o => <option key={o}>{o}</option>)}</select></div>
          <div className="form-group mb-0"><L c="Applied?" /><select className="form-input text-sm" value={form.applied} onChange={f('applied')}>{['No', 'Yes', 'In Progress'].map(o => <option key={o}>{o}</option>)}</select></div>
          <div className="col-span-2 form-group mb-0"><L c="Careers Page URL" /><input className="form-input text-sm" placeholder="https://..." value={form.careersPage} onChange={f('careersPage')} /></div>
          <div className="col-span-2 form-group mb-0"><L c="Notes" /><textarea className="form-input text-sm resize-none" rows={2} value={form.notes} onChange={f('notes')} placeholder="Interview process, contacts..." /></div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-outline-secondary">Cancel</button>
          <button onClick={save} disabled={saving || !form.companyName} className="btn btn-primary">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save</>}
          </button>
        </div>
      </div>
    </div>
  )
}