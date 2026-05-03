'use client'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts'
import { Briefcase, Target, TrendingUp, Award, CheckCircle2, XCircle, Clock, Phone, Monitor, Users } from 'lucide-react'
import { StatCard } from './stat-card'

const PIE_COLORS = ['#6366f1','#f59e0b','#10b981','#ef4444','#06b6d4','#8b5cf6','#f97316','#84cc16']

const statusData = [
  { name: 'Applied', value: 18 },
  { name: 'Shortlisted', value: 8 },
  { name: 'In Progress', value: 5 },
  { name: 'Offer', value: 2 },
  { name: 'Rejected', value: 7 },
]

const weeklyData = [
  { week: 'Week 1', applications: 5, interviews: 2 },
  { week: 'Week 2', applications: 8, interviews: 4 },
  { week: 'Week 3', applications: 6, interviews: 5 },
  { week: 'Week 4', applications: 10, interviews: 7 },
  { week: 'Week 5', applications: 9, interviews: 6 },
]

const sourceData = [
  { name: 'LinkedIn', value: 15 },
  { name: 'Naukri', value: 8 },
  { name: 'Referral', value: 5 },
  { name: 'AngelList', value: 5 },
  { name: 'Other', value: 7 },
]

const roundData = [
  { round: '📞 Telephonic', passed: 18, failed: 4, inProgress: 3 },
  { round: '🖥️ Tech Rd 1',  passed: 14, failed: 6, inProgress: 2 },
  { round: '💻 Tech Rd 2',  passed: 8,  failed: 5, inProgress: 3 },
  { round: '🤝 HR Round',   passed: 5,  failed: 1, inProgress: 2 },
]

const roleData = [
  { role: 'Senior React Dev', count: 12 },
  { role: 'Frontend Dev', count: 9 },
  { role: 'MERN Stack', count: 7 },
  { role: 'Software Eng', count: 5 },
  { role: 'Full Stack', count: 7 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-xl text-sm">
      <p className="font-bold text-slate-700 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  )
  return null
}

export function GuestDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">📊 Dashboard — Sample Data</h1>
        <p className="page-subtitle">40 applications tracked over 5 weeks • 3 Years 10 Months experience</p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Total Applied"   value={40}  icon={Briefcase}    color="#6366f1" bgColor="rgba(99,102,241,0.1)"  subtitle="Last 30 days" />
        <StatCard title="Shortlisted"     value={8}   icon={Target}       color="#f59e0b" bgColor="rgba(245,158,11,0.1)"  subtitle="20% rate" />
        <StatCard title="In Progress"     value={5}   icon={TrendingUp}   color="#06b6d4" bgColor="rgba(6,182,212,0.1)"   subtitle="Active rounds" />
        <StatCard title="Offers"          value={2}   icon={Award}        color="#10b981" bgColor="rgba(16,185,129,0.1)"  subtitle="5% rate 🎉" />
        <StatCard title="Rejected"        value={7}   icon={XCircle}      color="#ef4444" bgColor="rgba(239,68,68,0.1)"   subtitle="17.5% rate" />
        <StatCard title="Pending Reply"   value={18}  icon={Clock}        color="#8b5cf6" bgColor="rgba(139,92,246,0.1)"  subtitle="Follow up!" />
      </div>

      {/* Row 1: Status Pie + Weekly Line */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="chart-card">
          <h3 className="text-base font-bold text-slate-800 mb-1">Application Status Breakdown</h3>
          <p className="text-xs text-slate-400 mb-4">Distribution of all 40 applications</p>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {statusData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: any) => [v, 'Applications']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {statusData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-xs text-slate-600 flex-1">{d.name}</span>
                  <span className="text-xs font-bold text-slate-800">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3 className="text-base font-bold text-slate-800 mb-1">Weekly Applications vs Interviews</h3>
          <p className="text-xs text-slate-400 mb-4">Your activity trend over 5 weeks</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="applications" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: '#6366f1' }} name="Applications" />
              <Line type="monotone" dataKey="interviews"   stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: '#f59e0b' }} name="Interviews" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Round Progress Bar + Source Pie */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="chart-card">
          <h3 className="text-base font-bold text-slate-800 mb-1">Interview Round Performance</h3>
          <p className="text-xs text-slate-400 mb-4">Pass / Fail across all 4 rounds</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={roundData} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis type="category" dataKey="round" tick={{ fontSize: 11, fill: '#64748b' }} width={110} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="passed"    name="Passed ✅"      fill="#10b981" radius={[0,4,4,0]} />
              <Bar dataKey="failed"    name="Failed ❌"      fill="#ef4444" radius={[0,4,4,0]} />
              <Bar dataKey="inProgress" name="In Progress 🔄" fill="#f59e0b" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="text-base font-bold text-slate-800 mb-1">Applications by Source</h3>
          <p className="text-xs text-slate-400 mb-4">Where you are applying from</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={220}>
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${Math.round(percent * 100)}%`} labelLine={false}>
                  {sourceData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: any) => [v, 'Applications']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2.5">
              {sourceData.map((d, i) => (
                <div key={d.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                      <span className="text-xs text-slate-600">{d.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-800">{d.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${(d.value / 40) * 100}%`, background: PIE_COLORS[i] }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Role Bar + Round Summary Cards */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="chart-card lg:col-span-2">
          <h3 className="text-base font-bold text-slate-800 mb-1">Applications by Job Role</h3>
          <p className="text-xs text-slate-400 mb-4">Which roles you are targeting most</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={roleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="role" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Applications" radius={[6,6,0,0]}
                fill="url(#purpleGrad)" />
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-800">Round Summary</h3>
          {[
            { label: '📞 Telephonic', passed: 18, total: 25, color: '#6366f1', icon: Phone },
            { label: '🖥️ Technical 1', passed: 14, total: 22, color: '#f59e0b', icon: Monitor },
            { label: '💻 Technical 2', passed: 8, total: 16, color: '#10b981', icon: Monitor },
            { label: '🤝 HR Round', passed: 5, total: 8, color: '#06b6d4', icon: Users },
          ].map(r => (
            <div key={r.label} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-700">{r.label}</span>
                <span className="text-xs text-slate-500">{r.passed}/{r.total} passed</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${r.total > 0 ? (r.passed/r.total)*100 : 0}%`, background: r.color }} />
              </div>
              <p className="text-xs text-slate-400 mt-1">{r.total > 0 ? Math.round((r.passed/r.total)*100) : 0}% pass rate</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
