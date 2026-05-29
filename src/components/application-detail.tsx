'use client'
import { X, Pencil, Trash2, Clock, Calendar, Briefcase, MapPin, DollarSign, Users, Monitor, Phone, MessageSquare, FileText, Tag, TrendingUp, CheckCircle2, XCircle, Loader2, MinusCircle } from 'lucide-react'
import { Application } from '@/types'
import { formatDate } from '@/lib/utils'
interface Props { app:Application|null; onClose:()=>void; onEdit:(a:Application)=>void; onDelete:(id:string)=>void }
const RS:Record<string,string> = { Passed:'bg-emerald-50 text-emerald-600 border-emerald-200', Failed:'bg-red-50 text-red-600 border-red-200', 'In Progress':'bg-amber-50 text-amber-600 border-amber-200', Pending:'bg-slate-50 text-slate-500 border-slate-200', Skipped:'bg-slate-50 text-slate-400 border-slate-200' }
const RI:Record<string,React.ReactNode> = { Passed:<CheckCircle2 className="w-3.5 h-3.5"/>, Failed:<XCircle className="w-3.5 h-3.5"/>, 'In Progress':<Loader2 className="w-3.5 h-3.5 animate-spin"/>, Pending:<Clock className="w-3.5 h-3.5"/>, Skipped:<MinusCircle className="w-3.5 h-3.5"/> }
const AS:Record<string,{bg:string;text:string}> = { Applied:{bg:'#EEF2FF',text:'#4669FA'}, 'In Review':{bg:'#F3E8FF',text:'#7c3aed'}, Shortlisted:{bg:'#FEF9C3',text:'#ca8a04'}, 'In Progress':{bg:'#ECFEFF',text:'#0891b2'}, Rejected:{bg:'#FEF2F2',text:'#dc2626'}, Offer:{bg:'#F0FDF4',text:'#16a34a'}, Withdrawn:{bg:'#F1F5F9',text:'#64748b'}, 'On Hold':{bg:'#FFF7ED',text:'#ea580c'} }
function Row({ icon:Icon, label, value, color='#64748b' }:{ icon:any; label:string; value?:string|null; color?:string }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-50 dark:border-slate-700/50 last:border-0">
      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{background:`${color}15`}}><Icon className="w-3.5 h-3.5" style={{color}}/></div>
      <div className="flex-1 min-w-0"><p className="text-xs font-medium text-slate-400 mb-0.5">{label}</p><p className="text-sm font-semibold text-slate-800 dark:text-slate-100 break-words">{value}</p></div>
    </div>
  )
}
function RRound({ label, status, icon:Icon, color }:{ label:string; status:string; icon:any; color:string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:`${color}18`,border:`1px solid ${color}35`}}><Icon className="w-4 h-4" style={{color}}/></div>
      <span className="flex-1 text-xs font-bold text-slate-700 dark:text-slate-200">{label}</span>
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${RS[status]||RS['Pending']}`}>{RI[status]}{status}</span>
    </div>
  )
}
export function ApplicationDetail({ app, onClose, onEdit, onDelete }:Props) {
  if (!app) return null
  const st = AS[app.appStatus]||AS['Applied']
  const rounds = [
    {label:'📞 Telephonic Round',  status:app.telephonicRound,  icon:Phone,   color:'#4669FA'},
    {label:'🖥️ Technical Round 1', status:app.technicalRound1,  icon:Monitor, color:'#10b981'},
    {label:'💻 Technical Round 2', status:app.technicalRound2,  icon:Monitor, color:'#8b5cf6'},
    {label:'🤝 HR Round',          status:app.hrRound,          icon:Users,   color:'#f59e0b'},
  ]
  const passed = rounds.filter(r=>r.status==='Passed').length
  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9990]" onClick={onClose}/>
      <div className="fixed top-0 right-0 h-screen w-full max-w-[480px] z-[9991] flex flex-col bg-white dark:bg-slate-900 shadow-2xl" style={{animation:'slideFromRight .25s cubic-bezier(.4,0,.2,1)'}}>
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-base flex-shrink-0" style={{background:'linear-gradient(135deg,var(--primary),#4f46e5)'}}>{app.companyName.charAt(0)}</div>
            <div className="min-w-0">
              <h2 className="text-base font-black text-slate-900 dark:text-white truncate">{app.companyName}</h2>
              <p className="text-xs text-slate-400 truncate">{app.jobRole}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button onClick={()=>onEdit(app)} className="btn-icon bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 hover:bg-indigo-100"><Pencil className="w-3.5 h-3.5"/></button>
            <button onClick={()=>{onDelete(app.id);onClose()}} className="btn-icon bg-red-50 dark:bg-red-900/30 text-red-500 hover:bg-red-100"><Trash2 className="w-3.5 h-3.5"/></button>
            <button onClick={onClose} className="btn-icon bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 ml-1"><X className="w-4 h-4"/></button>
          </div>
        </div>
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700" style={{background:`${st.bg}60`}}>
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black" style={{background:st.bg,color:st.text}}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:st.text}}/>
              {app.appStatus}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-500"><Clock className="w-3.5 h-3.5"/>Applied {formatDate(app.appliedOn)}</div>
          </div>
          <div className="flex justify-between items-center mb-1.5">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Interview Progress</p>
            <p className="text-xs font-black" style={{color:'var(--primary)'}}>{passed}/4 rounds passed</p>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700" style={{width:`${passed*25}%`,background:'linear-gradient(90deg,var(--primary),#10b981)'}}/>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Job Details</p>
            <div className="card p-0 overflow-hidden">
              <div className="px-4 py-1">
                <Row icon={Briefcase}  label="Job Role"             value={app.jobRole}              color="#4669FA"/>
                <Row icon={Tag}        label="Position Type"         value={app.positionType}         color="#8b5cf6"/>
                <Row icon={MapPin}     label="Location"              value={app.location}             color="#10b981"/>
                <Row icon={TrendingUp} label="Work Mode"             value={app.wfhMode}              color="#f59e0b"/>
                <Row icon={Users}      label="Experience Required"   value={app.expectedExperience}   color="#f97316"/>
                <Row icon={Briefcase}  label="Source"                value={app.source}               color="#06b6d4"/>
                <Row icon={DollarSign} label="CTC Expected"          value={app.ctcExpected}          color="#10b981"/>
                <Row icon={DollarSign} label="CTC Offered"           value={app.ctcOffered}           color="#16a34a"/>
                <Row icon={Clock}      label="Notice Period"          value={app.noticePeriod}         color="#64748b"/>
                <Row icon={Calendar}   label="Follow-up On"          value={formatDate(app.followUpOn)} color="#4669FA"/>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Interview Rounds</p>
            <div className="space-y-2">{rounds.map(r=><RRound key={r.label} {...r}/>)}</div>
          </div>
          {(app.notes||app.interviewNotes) ? (
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Notes & Feedback</p>
              {app.notes && (
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-3">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-700/40 border-b border-slate-100 dark:border-slate-700">
                    <FileText className="w-3.5 h-3.5 text-slate-400"/><span className="text-xs font-bold text-slate-600 dark:text-slate-300">General Notes</span>
                  </div>
                  <div className="px-4 py-3"><p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{app.notes}</p></div>
                </div>
              )}
              {app.interviewNotes && (
                <div className="rounded-xl overflow-hidden border" style={{borderColor:'rgba(70,105,250,0.2)',background:'rgba(70,105,250,0.04)'}}>
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{borderColor:'rgba(70,105,250,0.15)',background:'rgba(70,105,250,0.08)'}}>
                    <MessageSquare className="w-3.5 h-3.5" style={{color:'var(--primary)'}}/><span className="text-xs font-bold" style={{color:'var(--primary)'}}>Interview Notes & Feedback</span>
                  </div>
                  <div className="px-4 py-3"><p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{app.interviewNotes}</p></div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-700 p-6 text-center">
              <MessageSquare className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2"/>
              <p className="text-sm text-slate-400">No notes yet — click Edit to add notes and interview feedback</p>
            </div>
          )}
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Application Timeline</p>
            <div className="relative pl-4">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-700"/>
              {[
                {label:`Applied via ${app.source||'Unknown'}`, date:formatDate(app.appliedOn), color:'#4669FA', done:true},
                {label:'Telephonic Round', date:app.telephonicRound!=='Pending'?app.telephonicRound:null, color:'#8b5cf6', done:app.telephonicRound==='Passed'},
                {label:'Technical Round 1', date:app.technicalRound1!=='Pending'?app.technicalRound1:null, color:'#10b981', done:app.technicalRound1==='Passed'},
                {label:'Technical Round 2', date:app.technicalRound2!=='Pending'?app.technicalRound2:null, color:'#f59e0b', done:app.technicalRound2==='Passed'},
                {label:'HR Round', date:app.hrRound!=='Pending'?app.hrRound:null, color:'#ef4444', done:app.hrRound==='Passed'},
                ...(app.ctcOffered?[{label:`Offer Received: ${app.ctcOffered}`,date:null,color:'#10b981',done:true}]:[]),
              ].map((ev,i)=>(
                <div key={i} className="relative flex items-start gap-3 mb-4 last:mb-0">
                  <div className="absolute -left-4 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 top-1" style={{background:ev.done?ev.color:'#cbd5e1',boxShadow:ev.done?`0 0 6px ${ev.color}60`:'none'}}/>
                  <div className="ml-3"><p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{ev.label}</p>{ev.date&&<p className="text-xs text-slate-400 mt-0.5">{ev.date}</p>}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-4"/>
        </div>
        <div className="flex-shrink-0 px-6 py-4 border-t border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 flex gap-3">
          <button onClick={()=>onEdit(app)} className="btn btn-primary flex-1"><Pencil className="w-4 h-4"/>Edit Application</button>
          <button onClick={onClose} className="btn btn-outline-secondary px-5">Close</button>
        </div>
      </div>
    </>
  )
}