'use client'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts'
import { Briefcase, Target, TrendingUp, Award, XCircle, Clock } from 'lucide-react'
import { StatCard } from './stat-card'
const C=['#4669FA','#FA8B0C','#50C793','#EE4B2B','#0CE7FA','#8b5cf6','#f97316','#84cc16']
const CT=({active,payload,label}:any)=>{
  if(!active||!payload?.length) return null
  return <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 shadow-xl text-sm"><p className="font-bold text-slate-700 dark:text-white mb-1">{label}</p>{payload.map((p:any)=><p key={p.name} style={{color:p.color}}>{p.name}: <strong>{p.value}</strong></p>)}</div>
}
const statusData=[{name:'Applied',value:18},{name:'Shortlisted',value:8},{name:'In Progress',value:5},{name:'Offer',value:2},{name:'Rejected',value:7}]
const weeklyData=[{week:'Wk1',applications:5},{week:'Wk2',applications:8},{week:'Wk3',applications:6},{week:'Wk4',applications:10},{week:'Wk5',applications:9},{week:'Wk6',applications:7},{week:'Wk7',applications:12},{week:'Wk8',applications:11}]
const sourceData=[{name:'LinkedIn',value:15},{name:'Naukri',value:8},{name:'Referral',value:5},{name:'AngelList',value:5},{name:'Other',value:7}]
const roundData=[{round:'📞 Telephonic',passed:18,failed:4,inProgress:3},{round:'🖥️ Tech Rd 1',passed:14,failed:6,inProgress:2},{round:'💻 Tech Rd 2',passed:8,failed:5,inProgress:3},{round:'🤝 HR Round',passed:5,failed:1,inProgress:2}]
const roleData=[{role:'Sr React Dev',count:12},{role:'Frontend Dev',count:9},{role:'MERN Stack',count:7},{role:'Software Eng',count:5},{role:'Full Stack',count:7}]
export function GuestDashboard() {
  return (
    <div className="space-y-5">
      <div><h4 className="text-xl font-black text-slate-900 dark:text-white">Dashboard — Sample Data</h4><p className="text-sm text-slate-500 dark:text-slate-400">40 applications tracked over 8 weeks • 3 Yrs 10 Mon experience</p></div>
      <div className="grid grid-cols-12 gap-4">
        {[
          {title:'Total Applied',value:40,icon:Briefcase,color:'#4669FA',bgColor:'rgba(70,105,250,0.1)',subtitle:'Last 30 days'},
          {title:'Shortlisted',  value:8, icon:Target,   color:'#FA8B0C',bgColor:'rgba(250,139,12,0.1)',subtitle:'20% rate'},
          {title:'In Progress',  value:5, icon:TrendingUp,color:'#0CE7FA',bgColor:'rgba(12,231,250,0.1)',subtitle:'Active rounds'},
          {title:'Offers 🎉',   value:2, icon:Award,    color:'#50C793',bgColor:'rgba(80,199,147,0.1)',subtitle:'5% rate'},
          {title:'Rejected',    value:7, icon:XCircle,  color:'#EE4B2B',bgColor:'rgba(238,75,43,0.1)',subtitle:'17.5% rate'},
          {title:'Pending Reply',value:18,icon:Clock,   color:'#8b5cf6',bgColor:'rgba(139,92,246,0.1)',subtitle:'Follow up!'},
        ].map((s,i)=><div key={i} className="col-span-6 md:col-span-4 xl:col-span-2"><StatCard {...s}/></div>)}
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-5">
          <div className="card h-full"><div className="card-header"><div><p className="card-title">Application Status</p><p className="card-subtitle">40 total applications</p></div></div>
            <div className="card-body"><div className="flex items-center gap-4">
              <ResponsiveContainer width="55%" height={200}><PieChart><Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">{statusData.map((_,i)=><Cell key={i} fill={C[i%C.length]}/>)}</Pie><Tooltip formatter={(v:any)=>[v,'Apps']}/></PieChart></ResponsiveContainer>
              <div className="flex-1 space-y-2">{statusData.map((d,i)=><div key={d.name} className="flex items-center gap-2"><div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:C[i%C.length]}}/><span className="text-xs text-slate-600 dark:text-slate-400 flex-1">{d.name}</span><span className="text-xs font-bold dark:text-white">{d.value}</span></div>)}</div>
            </div></div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="card h-full"><div className="card-header"><div><p className="card-title">Weekly Applications</p><p className="card-subtitle">8-week activity trend</p></div></div>
            <div className="card-body"><ResponsiveContainer width="100%" height={200}><LineChart data={weeklyData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/><XAxis dataKey="week" tick={{fontSize:10,fill:'#94a3b8'}}/><YAxis tick={{fontSize:10,fill:'#94a3b8'}}/><Tooltip content={<CT/>}/><Line type="monotone" dataKey="applications" name="Applications" stroke="#4669FA" strokeWidth={2.5} dot={{r:4,fill:'#4669FA'}}/></LineChart></ResponsiveContainer></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-7">
          <div className="card h-full"><div className="card-header"><div><p className="card-title">Interview Round Performance</p><p className="card-subtitle">Pass / Fail across all 4 rounds</p></div></div>
            <div className="card-body"><ResponsiveContainer width="100%" height={220}><BarChart data={roundData} layout="vertical" margin={{left:10}}><XAxis type="number" tick={{fontSize:10,fill:'#94a3b8'}} allowDecimals={false}/><YAxis type="category" dataKey="round" tick={{fontSize:11,fill:'#64748b'}} width={110}/><Tooltip content={<CT/>}/><Legend iconType="square" iconSize={10} wrapperStyle={{fontSize:12}}/><Bar dataKey="passed" name="Passed ✅" fill="#50C793" radius={[0,4,4,0]}/><Bar dataKey="failed" name="Failed ❌" fill="#EE4B2B" radius={[0,4,4,0]}/><Bar dataKey="inProgress" name="In Progress 🔄" fill="#FA8B0C" radius={[0,4,4,0]}/></BarChart></ResponsiveContainer></div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <div className="card h-full"><div className="card-header"><div><p className="card-title">Application Sources</p><p className="card-subtitle">Which portals work best</p></div></div>
            <div className="card-body"><div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={200}><PieChart><Pie data={sourceData} cx="50%" cy="50%" outerRadius={88} paddingAngle={3} dataKey="value" label={({percent})=>`${Math.round(percent*100)}%`} labelLine={false}>{sourceData.map((_,i)=><Cell key={i} fill={C[i%C.length]}/>)}</Pie><Tooltip formatter={(v:any)=>[v,'Apps']}/></PieChart></ResponsiveContainer>
              <div className="flex-1 space-y-2.5">{sourceData.map((d,i)=><div key={d.name}><div className="flex justify-between mb-1"><div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{background:C[i%C.length]}}/><span className="text-xs text-slate-600 dark:text-slate-400">{d.name}</span></div><span className="text-xs font-bold dark:text-white">{d.value}</span></div><div className="progress"><div className="progress-bar" style={{width:`${(d.value/40)*100}%`,background:C[i%C.length]}}/></div></div>)}</div>
            </div></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          <div className="card h-full"><div className="card-header"><div><p className="card-title">Applications by Role</p><p className="card-subtitle">Target job titles distribution</p></div></div>
            <div className="card-body"><ResponsiveContainer width="100%" height={200}><BarChart data={roleData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/><XAxis dataKey="role" tick={{fontSize:10,fill:'#94a3b8'}}/><YAxis tick={{fontSize:10,fill:'#94a3b8'}}/><Tooltip content={<CT/>}/><Bar dataKey="count" name="Applications" radius={[6,6,0,0]}>{roleData.map((_,i)=><Cell key={i} fill={C[i%C.length]}/>)}</Bar></BarChart></ResponsiveContainer></div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="card h-full"><div className="card-header"><p className="card-title">Round Summary</p></div>
            <div className="card-body space-y-4">
              {[{label:'📞 Telephonic',passed:18,total:25,color:'#4669FA'},{label:'🖥️ Technical 1',passed:14,total:22,color:'#FA8B0C'},{label:'💻 Technical 2',passed:8,total:16,color:'#50C793'},{label:'🤝 HR Round',passed:5,total:8,color:'#0CE7FA'}].map(r=>(
                <div key={r.label}><div className="flex justify-between mb-1.5"><span className="text-xs font-bold text-slate-700 dark:text-slate-300">{r.label}</span><span className="text-xs text-slate-500">{r.passed}/{r.total}</span></div><div className="progress"><div className="progress-bar" style={{width:`${r.total>0?(r.passed/r.total)*100:0}%`,background:r.color}}/></div><p className="text-xs text-slate-400 mt-1">{r.total>0?Math.round((r.passed/r.total)*100):0}% pass rate</p></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}