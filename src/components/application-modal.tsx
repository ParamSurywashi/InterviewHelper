'use client'
import { useState, useEffect } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import { Application } from '@/types'
import { JOB_ROLES, SOURCES, STATUSES, ROUND_STATUSES } from '@/lib/utils'

interface Props {
  app?: Application | null
  onClose: () => void
  onSave: () => void
}

const empty = {
  companyName: '', jobRole: 'Frontend Developer', location: '', wfhMode: 'Hybrid',
  appliedOn: new Date().toISOString().split('T')[0], source: 'LinkedIn', appStatus: 'Applied',
  telephonicRound: 'Pending', technicalRound1: 'Pending', technicalRound2: 'Pending', hrRound: 'Pending',
  ctcExpected: '', ctcOffered: '', notes: '',
}

export function ApplicationModal({ app, onClose, onSave }: Props) {
  const [form, setForm] = useState<typeof empty>(empty)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (app) {
      setForm({
        companyName: app.companyName, jobRole: app.jobRole, location: app.location || '',
        wfhMode: app.wfhMode || 'Hybrid', appliedOn: app.appliedOn?.split('T')[0] || '',
        source: app.source || 'LinkedIn', appStatus: app.appStatus,
        telephonicRound: app.telephonicRound, technicalRound1: app.technicalRound1,
        technicalRound2: app.technicalRound2, hrRound: app.hrRound,
        ctcExpected: app.ctcExpected || '', ctcOffered: app.ctcOffered || '', notes: app.notes || '',
      })
    } else { setForm(empty) }
  }, [app])

  const f = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  async function save() {
    if (!form.companyName || !form.jobRole) return
    setSaving(true)
    const method = app ? 'PUT' : 'POST'
    const url = app ? `/api/applications/${app.id}` : '/api/applications'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false)
    onSave()
    onClose()
  }

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{children}</label>
  )
  const Select = ({ name, options, ...rest }: any) => (
    <select className="input-field text-sm py-2" name={name} value={form[name as keyof typeof form]} onChange={f(name)} {...rest}>
      {options.map((o: string) => <option key={o}>{o}</option>)}
    </select>
  )

  return (
    <div className="modal-overlay animate-fade-in" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box animate-slide-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">{app ? '✏️ Edit Application' : '➕ Add New Application'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Basic Info */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company & Role</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Company Name *</Label>
                <input className="input-field text-sm py-2" placeholder="e.g. Razorpay" value={form.companyName} onChange={f('companyName')} required />
              </div>
              <div className="col-span-2">
                <Label>Job Role *</Label>
                <Select name="jobRole" options={JOB_ROLES} />
              </div>
              <div>
                <Label>Location</Label>
                <input className="input-field text-sm py-2" placeholder="Bangalore / Remote" value={form.location} onChange={f('location')} />
              </div>
              <div>
                <Label>Work Mode</Label>
                <Select name="wfhMode" options={['Hybrid', 'WFH', 'On-Site']} />
              </div>
            </div>
          </div>

          {/* Application Info */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Application Details</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Applied On</Label>
                <input type="date" className="input-field text-sm py-2" value={form.appliedOn} onChange={f('appliedOn')} />
              </div>
              <div>
                <Label>Source</Label>
                <Select name="source" options={SOURCES} />
              </div>
              <div>
                <Label>Status</Label>
                <Select name="appStatus" options={STATUSES} />
              </div>
            </div>
          </div>

          {/* Interview Rounds */}
          <div className="p-4 rounded-xl border space-y-4" style={{ background: 'rgba(99,102,241,0.03)', borderColor: 'rgba(99,102,241,0.15)' }}>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">🎯 Interview Rounds</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                ['📞 Telephonic Round', 'telephonicRound'],
                ['🖥️ Technical Round 1', 'technicalRound1'],
                ['💻 Technical Round 2', 'technicalRound2'],
                ['🤝 HR Round', 'hrRound'],
              ].map(([label, key]) => (
                <div key={key}>
                  <Label>{label}</Label>
                  <Select name={key} options={ROUND_STATUSES} />
                </div>
              ))}
            </div>
          </div>

          {/* CTC */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Compensation</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>CTC Expected</Label>
                <input className="input-field text-sm py-2" placeholder="e.g. 20 LPA" value={form.ctcExpected} onChange={f('ctcExpected')} />
              </div>
              <div>
                <Label>CTC Offered</Label>
                <input className="input-field text-sm py-2" placeholder="e.g. 18 LPA" value={form.ctcOffered} onChange={f('ctcOffered')} />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label>Notes</Label>
            <textarea className="input-field text-sm py-2 resize-none" rows={3} placeholder="Important notes, contacts, interview feedback..." value={form.notes} onChange={f('notes')} />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 pb-6">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={save} disabled={saving || !form.companyName} className="btn-primary">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Application</>}
          </button>
        </div>
      </div>
    </div>
  )
}
