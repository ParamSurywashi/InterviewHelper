'use client'
import { useEffect, useState, useMemo, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Plus, X, Save, Loader2, Clock, Link2, User, Bell, Trash2, Calendar, Phone, Monitor, Users, FileText, CheckCircle2 } from 'lucide-react'
import { InterviewEvent } from '@/types'
import { cn } from '@/lib/utils'
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS_S=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const ROUND_TYPES=['General','Telephonic','Technical 1','Technical 2','HR Round','Aptitude','Final Round']
const RC:Record<string,string>={General:'#4669FA',Telephonic:'#0ea5e9','Technical 1':'#10b981','Technical 2':'#8b5cf6','HR Round':'#f59e0b',Aptitude:'#f97316','Final Round':'#ef4444'}
const RI:Record<string,React.ReactNode>={Telephonic:<Phone className="w-3.5 h-3.5"/>,'Technical 1':<Monitor className="w-3.5 h-3.5"/>,'Technical 2':<Monitor className="w-3.5 h-3.5"/>,'HR Round':<Users className="w-3.5 h-3.5"/>,General:<Calendar className="w-3.5 h-3.5"/>,'Final Round':<CheckCircle2 className="w-3.5 h-3.5"/>}
const EF={title:'',companyName:'',roundType:'General',eventDate:'',startTime:'09:00',endTime:'10:00',notes:'',color:'#4669FA',meetingLink:'',interviewer:'',reminderMins:30,status:'Scheduled'}
const HOURS=Array.from({length:14},(_,i)=>i+7)
export default function CalendarPage() {
  const today=new Date()
  const [view,setView]=useState<'month'|'week'|'day'>('month')
  const [cur,setCur]=useState(new Date(today.getFullYear(),today.getMonth(),1))
  const [events,setEvents]=useState<InterviewEvent[]>([])
  const [loading,setLoading]=useState(true)
  const [modal,setModal]=useState<'add'|'edit'|null>(null)
  const [editEv,setEditEv]=useState<InterviewEvent|null>(null)
  const [form,setForm]=useState({...EF})
  const [saving,setSaving]=useState(false)
  const yr=cur.getFullYear(), mo=cur.getMonth()
  const load=useCallback(async()=>{ setLoading(true); const d=await fetch(`/api/events?month=${mo}&year=${yr}`).then(r=>r.json()); setEvents(Array.isArray(d)?d:[]); setLoading(false) },[mo,yr])
  useEffect(()=>{load()},[load])
  const calDays=useMemo(()=>{
    const first=new Date(yr,mo,1).getDay(), total=new Date(yr,mo+1,0).getDate(), prev=new Date(yr,mo,0).getDate()
    const cells:{date:Date;cur:boolean}[]=[]
    for(let i=first-1;i>=0;i--) cells.push({date:new Date(yr,mo-1,prev-i),cur:false})
    for(let d=1;d<=total;d++) cells.push({date:new Date(yr,mo,d),cur:true})
    while(cells.length%7!==0) cells.push({date:new Date(yr,mo+1,cells.length-total-first+1),cur:false})
    return cells
  },[yr,mo])
  const getDayEvs=(d:Date)=>events.filter(e=>{const ed=new Date(e.eventDate);return ed.getFullYear()===d.getFullYear()&&ed.getMonth()===d.getMonth()&&ed.getDate()===d.getDate()})
  const isToday=(d:Date)=>d.getDate()===today.getDate()&&d.getMonth()===today.getMonth()&&d.getFullYear()===today.getFullYear()
  function nav(dir:1|-1){setCur(new Date(yr,mo+dir,1))}
  function openAdd(date?:Date){
    const d=date||today
    setForm({...EF,eventDate:`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`,color:'#4669FA'})
    setModal('add'); setEditEv(null)
  }
  function openEdit(ev:InterviewEvent){
    const d=new Date(ev.eventDate)
    setForm({title:ev.title,companyName:ev.companyName,roundType:ev.roundType,eventDate:`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`,startTime:ev.startTime,endTime:ev.endTime,notes:ev.notes||'',color:ev.color||'#4669FA',meetingLink:ev.meetingLink||'',interviewer:ev.interviewer||'',reminderMins:ev.reminderMins||30,status:ev.status})
    setEditEv(ev); setModal('edit')
  }
  async function save(){
    if(!form.title||!form.eventDate||!form.startTime) return
    setSaving(true)
    if(modal==='edit'&&editEv) await fetch(`/api/events/${editEv.id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
    else await fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
    setSaving(false); setModal(null); setEditEv(null); load()
  }
  async function del(id:string){if(!confirm('Delete?')) return; await fetch(`/api/events/${id}`,{method:'DELETE'}); setModal(null); setEditEv(null); load()}
  const f=(k:string)=>(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>setForm(p=>({...p,[k]:e.target.value}))
  const upcoming=events.filter(e=>new Date(e.eventDate)>=today&&e.status==='Scheduled').slice(0,5)
  const weekStart=useMemo(()=>{ const d=new Date(cur); d.setDate(d.getDate()-d.getDay()); return d },[cur])
  const weekDays=Array.from({length:7},(_,i)=>{ const d=new Date(weekStart); d.setDate(d.getDate()+i); return d })
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div><h4 className="text-xl font-black text-slate-900 dark:text-white">Interview Calendar</h4><p className="text-sm text-slate-500 dark:text-slate-400">Schedule and track every interview — never miss a round</p></div>
        <button onClick={()=>openAdd()} className="btn btn-primary self-start"><Plus className="w-4 h-4"/>Schedule Interview</button>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 xl:col-span-9">
          <div className="card overflow-hidden">
            <div className="card-header gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <button onClick={()=>nav(-1)} className="btn-icon hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"><ChevronLeft className="w-4 h-4"/></button>
                <h5 className="text-base font-black text-slate-900 dark:text-white min-w-[160px] text-center">{MONTHS[mo]} {yr}</h5>
                <button onClick={()=>nav(1)} className="btn-icon hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"><ChevronRight className="w-4 h-4"/></button>
                <button onClick={()=>setCur(new Date(today.getFullYear(),today.getMonth(),1))} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 font-semibold">Today</button>
              </div>
              <div className="flex gap-1 bg-slate-100 dark:bg-slate-700/60 p-1 rounded-xl ml-auto">
                {(['month','week','day'] as const).map(v=>(
                  <button key={v} onClick={()=>setView(v)} className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${view===v?'text-white shadow-sm':'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`} style={view===v?{background:'var(--primary)'}:{}}>{v}</button>
                ))}
              </div>
            </div>

            {view==='month'&&(
              <>
                <div className="cal-grid border-b border-slate-100 dark:border-slate-700">
                  {DAYS_S.map(d=><div key={d} className="text-center py-2.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{d}</div>)}
                </div>
                <div className="cal-grid">
                  {calDays.map((cell,idx)=>{
                    const evs=getDayEvs(cell.date), tdy=isToday(cell.date)
                    return (
                      <div key={idx} className={cn('cal-day',!cell.cur&&'opacity-40')} onClick={()=>openAdd(cell.date)}>
                        <div className={cn('w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold mb-1',tdy?'text-white':'text-slate-700 dark:text-slate-300')} style={tdy?{background:'var(--primary)'}:{}}>{cell.date.getDate()}</div>
                        {evs.slice(0,3).map(ev=>(
                          <div key={ev.id} className="cal-event" style={{background:ev.color||'#4669FA',opacity:ev.status==='Cancelled'?.5:1}} onClick={e=>{e.stopPropagation();openEdit(ev)}}>
                            {ev.startTime} {ev.companyName}
                          </div>
                        ))}
                        {evs.length>3&&<div className="text-[10px] font-bold px-1 text-slate-400">+{evs.length-3} more</div>}
                      </div>
                    )
                  })}
                </div>
              </>
            )}

            {view==='week'&&(
              <div className="overflow-x-auto">
                <div className="grid grid-cols-8 border-b border-slate-100 dark:border-slate-700 min-w-[600px]">
                  <div className="py-3 text-xs text-slate-400 text-center border-r border-slate-100 dark:border-slate-700">Time</div>
                  {weekDays.map((d,i)=>(
                    <div key={i} className={cn('py-3 text-center border-r last:border-r-0 border-slate-100 dark:border-slate-700',isToday(d)&&'bg-blue-50 dark:bg-blue-900/10')}>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">{DAYS_S[i]}</p>
                      <div className={cn('w-7 h-7 flex items-center justify-center rounded-full mx-auto mt-1 text-sm font-black',isToday(d)?'text-white':'text-slate-700 dark:text-slate-200')} style={isToday(d)?{background:'var(--primary)'}:{}}>{d.getDate()}</div>
                    </div>
                  ))}
                </div>
                <div className="min-w-[600px]">
                  {HOURS.map(h=>(
                    <div key={h} className="grid grid-cols-8 border-b border-slate-50 dark:border-slate-700/30 min-h-[52px]">
                      <div className="text-xs text-slate-400 px-2 py-2 border-r border-slate-100 dark:border-slate-700 text-right pr-3 flex-shrink-0">{h===12?'12 PM':h<12?`${h} AM`:`${h-12} PM`}</div>
                      {weekDays.map((d,di)=>{
                        const slotEvs=getDayEvs(d).filter(e=>parseInt(e.startTime)===h)
                        return (
                          <div key={di} className={cn('border-r last:border-r-0 border-slate-100 dark:border-slate-700/50 p-1 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/20',isToday(d)&&'bg-blue-50/30 dark:bg-blue-900/5')} onClick={()=>openAdd(d)}>
                            {slotEvs.map(ev=>(
                              <div key={ev.id} className="text-[10px] font-bold text-white rounded px-1.5 py-0.5 mb-0.5 truncate cursor-pointer" style={{background:ev.color}} onClick={e=>{e.stopPropagation();openEdit(ev)}}>{ev.companyName}</div>
                            ))}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {view==='day'&&(
              <div>
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-700">
                  <button onClick={()=>{const d=new Date(cur);d.setDate(d.getDate()-1);setCur(d)}} className="btn-icon text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><ChevronLeft className="w-4 h-4"/></button>
                  <div className="text-center"><p className="text-base font-black text-slate-800 dark:text-white">{DAYS_S[cur.getDay()]}, {cur.getDate()} {MONTHS[cur.getMonth()]}</p>{isToday(cur)&&<span className="text-xs font-bold" style={{color:'var(--primary)'}}>Today</span>}</div>
                  <button onClick={()=>{const d=new Date(cur);d.setDate(d.getDate()+1);setCur(d)}} className="btn-icon text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><ChevronRight className="w-4 h-4"/></button>
                </div>
                <div className="p-4 space-y-2">
                  {HOURS.map(h=>{
                    const slotEvs=getDayEvs(cur).filter(e=>parseInt(e.startTime)===h)
                    return (
                      <div key={h} className="flex gap-3 min-h-[48px] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/20 rounded-lg px-2 py-1" onClick={()=>openAdd(cur)}>
                        <div className="text-xs text-slate-400 w-14 text-right pt-1 flex-shrink-0 font-semibold">{h===12?'12 PM':h<12?`${h} AM`:`${h-12} PM`}</div>
                        <div className="flex-1 border-t border-slate-100 dark:border-slate-700/50 pt-1">
                          {slotEvs.map(ev=>(
                            <div key={ev.id} className="flex items-center gap-2 p-2 rounded-xl text-white text-sm font-semibold mb-1 cursor-pointer" style={{background:ev.color}} onClick={e=>{e.stopPropagation();openEdit(ev)}}>
                              <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">{RI[ev.roundType]||<Calendar className="w-3 h-3"/>}</div>
                              <div className="min-w-0"><p className="text-xs font-black leading-none truncate">{ev.companyName}</p><p className="text-[10px] opacity-80">{ev.startTime}–{ev.endTime} · {ev.roundType}</p></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-12 xl:col-span-3 space-y-4">
          <div className="card">
            <div className="card-header"><p className="card-title">Upcoming</p></div>
            <div className="card-body py-3 space-y-2">
              {loading?<div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-slate-400"/></div>
              :upcoming.length===0?<div className="py-6 text-center"><Calendar className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2"/><p className="text-xs text-slate-400">No upcoming interviews</p><button onClick={()=>openAdd()} className="text-xs mt-2 font-bold" style={{color:'var(--primary)'}}>Schedule one →</button></div>
              :upcoming.map(ev=>{
                const d=new Date(ev.eventDate)
                const diff=Math.ceil((d.getTime()-today.getTime())/(1000*60*60*24))
                return (
                  <div key={ev.id} className="flex items-start gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/40" onClick={()=>openEdit(ev)}>
                    <div className="w-9 h-9 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-white" style={{background:ev.color}}>
                      <span className="text-[9px] font-bold leading-none">{MONTHS[d.getMonth()].slice(0,3).toUpperCase()}</span>
                      <span className="text-sm font-black leading-none">{d.getDate()}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black text-slate-800 dark:text-white leading-tight truncate">{ev.companyName}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{ev.roundType} · {ev.startTime}</p>
                      <p className="text-[10px] font-bold mt-0.5" style={{color:'var(--primary)'}}>{diff===0?'🔴 Today!':diff===1?'🟡 Tomorrow':`in ${diff} days`}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><p className="card-title">Round Types</p></div>
            <div className="card-body py-3 space-y-2">
              {Object.entries(RC).map(([type,color])=>(
                <div key={type} className="flex items-center gap-2.5"><div className="w-3 h-3 rounded-full flex-shrink-0" style={{background:color}}/><span className="text-xs text-slate-600 dark:text-slate-300">{type}</span></div>
              ))}
            </div>
          </div>
          <button onClick={()=>openAdd()} className="btn btn-primary w-full justify-center"><Plus className="w-4 h-4"/>Add Interview</button>
        </div>
      </div>

      {modal&&(
        <div className="modal-backdrop" onClick={e=>e.target===e.currentTarget&&(setModal(null),setEditEv(null))}>
          <div className="modal-content max-w-xl">
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{background:form.color}}><Calendar className="w-4 h-4"/></div>
                <div><h5 className="text-sm font-black text-slate-900 dark:text-white">{modal==='edit'?'✏️ Edit Interview':'📅 Schedule Interview'}</h5><p className="text-xs text-slate-400">Fill in the details below</p></div>
              </div>
              <div className="flex items-center gap-1">
                {modal==='edit'&&editEv&&<button onClick={()=>del(editEv.id)} className="btn-icon bg-red-50 dark:bg-red-900/30 text-red-500 hover:bg-red-100"><Trash2 className="w-3.5 h-3.5"/></button>}
                <button onClick={()=>{setModal(null);setEditEv(null)}} className="btn-icon text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><X className="w-4 h-4"/></button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 form-group mb-0"><label className="form-label">Interview Title *</label><input className="form-input text-sm" placeholder="e.g. Razorpay — Technical Round 1" value={form.title} onChange={f('title')} required/></div>
                <div className="form-group mb-0"><label className="form-label">Company Name *</label><input className="form-input text-sm" placeholder="e.g. Razorpay" value={form.companyName} onChange={f('companyName')}/></div>
                <div className="form-group mb-0"><label className="form-label">Round Type</label><select className="form-input text-sm" value={form.roundType} onChange={f('roundType')}>{ROUND_TYPES.map(r=><option key={r}>{r}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="form-group mb-0"><label className="form-label">Date *</label><input type="date" className="form-input text-sm" value={form.eventDate} onChange={f('eventDate')} required/></div>
                <div className="form-group mb-0"><label className="form-label">Start Time</label><input type="time" className="form-input text-sm" value={form.startTime} onChange={f('startTime')}/></div>
                <div className="form-group mb-0"><label className="form-label">End Time</label><input type="time" className="form-input text-sm" value={form.endTime} onChange={f('endTime')}/></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group mb-0"><label className="form-label flex items-center gap-1"><User className="w-3 h-3"/>Interviewer</label><input className="form-input text-sm" placeholder="e.g. Rahul Sharma" value={form.interviewer} onChange={f('interviewer')}/></div>
                <div className="form-group mb-0"><label className="form-label flex items-center gap-1"><Bell className="w-3 h-3"/>Reminder</label><select className="form-input text-sm" value={form.reminderMins} onChange={f('reminderMins')}>{[{v:0,l:'No reminder'},{v:15,l:'15 min'},{v:30,l:'30 min'},{v:60,l:'1 hour'},{v:1440,l:'1 day'}].map(r=><option key={r.v} value={r.v}>{r.l}</option>)}</select></div>
              </div>
              <div className="form-group mb-0"><label className="form-label flex items-center gap-1"><Link2 className="w-3 h-3"/>Meeting Link</label><input className="form-input text-sm" placeholder="https://meet.google.com/..." value={form.meetingLink} onChange={f('meetingLink')}/></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group mb-0"><label className="form-label">Status</label><select className="form-input text-sm" value={form.status} onChange={f('status')}>{['Scheduled','Completed','Cancelled','Rescheduled'].map(s=><option key={s}>{s}</option>)}</select></div>
                <div className="form-group mb-0"><label className="form-label">Event Colour</label>
                  <div className="flex gap-2 pt-1 flex-wrap">
                    {['#4669FA','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316'].map(c=>(
                      <button key={c} onClick={()=>setForm(p=>({...p,color:c}))} className="w-6 h-6 rounded-full flex-shrink-0 transition-transform hover:scale-110" style={{background:c,outline:form.color===c?`3px solid ${c}`:undefined,outlineOffset:'2px'}}/>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-group mb-0"><label className="form-label flex items-center gap-1"><FileText className="w-3 h-3"/>Notes / Preparation</label><textarea className="form-input text-sm resize-none" rows={3} placeholder="Topics to prepare, questions to ask, directions..." value={form.notes} onChange={f('notes')}/></div>
            </div>
            <div className="modal-footer">
              <button onClick={()=>{setModal(null);setEditEv(null)}} className="btn btn-outline-secondary">Cancel</button>
              <button onClick={save} disabled={saving||!form.title||!form.eventDate} className="btn btn-primary">
                {saving?<><Loader2 className="w-4 h-4 animate-spin"/>Saving...</>:<><Save className="w-4 h-4"/>{modal==='edit'?'Update':'Schedule'}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}