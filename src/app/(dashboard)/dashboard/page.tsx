'use client'
import { useEffect, useState } from 'react'
import { Briefcase, Target, TrendingUp, Award, XCircle, Clock, Loader2 } from 'lucide-react'
import { StatCard } from '@/components/stat-card'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, LineChart, Line, CartesianGrid, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area,
} from 'recharts'
import { Stats } from '@/types'

const COLORS = ['#6366f1','#f59e0b','#10b981','#ef4444','#06b6d4','#8b5cf6','#f97316','#84cc16']

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-xl text-sm">
      <p className="font-bold text-slate-700 mb-1">{label}</p>
      {payload.map((p: any) => <p key={p.name} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>)}
    </div>
  )
}

function RoundCard({ label, data, color }: { label: string; data: { passed: number; failed: number; inProgress: number; pending: number }; color: string }) {
  const total = data.passed + data.failed + data.inProgress + data.pending
  const passRate = total > 0 ? Math.round((data.passed / total) * 100) : 0
  return (
    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
      <p className="text-xs font-bold text-slate-600 mb-2">{label}</p>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-2xl font-bold" style={{ color }}>{passRate}%</span>
        <span className="text-xs text-slate-400 pb-1">pass rate</span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-3">
        <div className="h-full rounded-full transition-all" style={{ width: `${passRate}%`, background: color }} />
      </div>
      <div className="grid grid-cols-2 gap-1 text-xs">
        <span className="text-emerald-600">✅ {data.passed} Passed</span>
        <span className="text-red-500">❌ {data.failed} Failed</span>
        <span className="text-amber-600">🔄 {data.inProgress} Active</span>
        <span className="text-slate-400">⏳ {data.pending} Pending</span>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(d => { setStats(d); setLoading(false) })
  }, [])

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      <p className="text-slate-500 text-sm">Loading your dashboard...</p>
    </div>
  )
  if (!stats) return <div className="text-center py-20 text-slate-500">Failed to load stats</div>

  const statusArr = Object.entries(stats.byStatus).map(([name, value]) => ({ name, value }))
  const sourceArr = Object.entries(stats.bySource).map(([name, value]) => ({ name, value }))
  const roleArr   = Object.entries(stats.byRole).map(([role, count]) => ({ role: role.replace(' Developer','').replace(' Engineer',''), count }))
  const roundBarData = [
    { round: 'Telephonic', passed: stats.rounds.telephonic.passed, failed: stats.rounds.telephonic.failed, inProgress: stats.rounds.telephonic.inProgress },
    { round: 'Tech Rd 1',  passed: stats.rounds.technical1.passed,  failed: stats.rounds.technical1.failed,  inProgress: stats.rounds.technical1.inProgress },
    { round: 'Tech Rd 2',  passed: stats.rounds.technical2.passed,  failed: stats.rounds.technical2.failed,  inProgress: stats.rounds.technical2.inProgress },
    { round: 'HR Round',   passed: stats.rounds.hr.passed,          failed: stats.rounds.hr.failed,          inProgress: stats.rounds.hr.inProgress },
  ]
  const radarData = [
    { subject: 'Applied', A: stats.byStatus['Applied'] || 0 },
    { subject: 'Shortlisted', A: stats.byStatus['Shortlisted'] || 0 },
    { subject: 'In Progress', A: stats.byStatus['In Progress'] || 0 },
    { subject: 'Offers', A: stats.byStatus['Offer'] || 0 },
    { subject: 'Rejected', A: stats.byStatus['Rejected'] || 0 },
    { subject: 'In Review', A: stats.byStatus['In Review'] || 0 },
  ]

  const totalApps = stats.totalApplications
  const offers = stats.byStatus['Offer'] || 0
  const shortlisted = stats.byStatus['Shortlisted'] || 0
  const rejected = stats.byStatus['Rejected'] || 0
  const inProgress = (stats.byStatus['In Progress'] || 0) + (stats.byStatus['Shortlisted'] || 0)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-title">📊 Dashboard</h1>
          <p className="page-subtitle">Your complete job hunt overview — {totalApps} applications tracked</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Last updated</p>
          <p className="text-sm font-semibold text-slate-600">{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Applied"   value={totalApps}   icon={Briefcase}   color="#6366f1" bgColor="rgba(99,102,241,0.1)"  subtitle="All time" />
        <StatCard title="Shortlisted"     value={shortlisted} icon={Target}      color="#f59e0b" bgColor="rgba(245,158,11,0.1)"  subtitle={totalApps ? `${Math.round((shortlisted/totalApps)*100)}% rate` : '—'} />
        <StatCard title="In Progress"     value={inProgress}  icon={TrendingUp}  color="#06b6d4" bgColor="rgba(6,182,212,0.1)"   subtitle="Active pipeline" />
        <StatCard title="Offers 🎉"       value={offers}      icon={Award}       color="#10b981" bgColor="rgba(16,185,129,0.1)"  subtitle={offers > 0 ? 'Congratulations!' : 'Keep going!'} />
        <StatCard title="Rejected"        value={rejected}    icon={XCircle}     color="#ef4444" bgColor="rgba(239,68,68,0.1)"   subtitle="Learning opportunities" />
        <StatCard title="Pending Reply"   value={stats.byStatus['Applied'] || 0} icon={Clock} color="#8b5cf6" bgColor="rgba(139,92,246,0.1)" subtitle="Follow up!" />
      </div>

      {/* Row 1: Status Pie + Weekly Area */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="chart-card">
          <h3 className="text-base font-bold text-slate-800 mb-1">Application Status</h3>
          <p className="text-xs text-slate-400 mb-4">Distribution across all {totalApps} applications</p>
          {statusArr.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-slate-400 text-sm">No data yet — add your first application!</div>
          ) : (
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="55%" height={200}>
                <PieChart>
                  <Pie data={statusArr} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                    {statusArr.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => [v, 'Applications']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {statusArr.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="text-xs text-slate-600 flex-1 truncate">{d.name}</span>
                    <span className="text-xs font-bold text-slate-800">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="chart-card">
          <h3 className="text-base font-bold text-slate-800 mb-1">Weekly Application Activity</h3>
          <p className="text-xs text-slate-400 mb-4">Applications submitted over the last 8 weeks</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={stats.byWeek}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" name="Applications" stroke="#6366f1" strokeWidth={2.5} fill="url(#areaGrad)" dot={{ r: 4, fill: '#6366f1' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Round Bar + Source Pie */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="chart-card">
          <h3 className="text-base font-bold text-slate-800 mb-1">Interview Round Performance</h3>
          <p className="text-xs text-slate-400 mb-4">Pass / Fail / In-Progress across all rounds</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={roundBarData} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" tick={{ fontSize: 10, fill: '#94a3b8' }} allowDecimals={false} />
              <YAxis type="category" dataKey="round" tick={{ fontSize: 11, fill: '#64748b' }} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="passed"     name="Passed ✅"       fill="#10b981" radius={[0,4,4,0]} />
              <Bar dataKey="failed"     name="Failed ❌"       fill="#ef4444" radius={[0,4,4,0]} />
              <Bar dataKey="inProgress" name="In Progress 🔄"  fill="#f59e0b" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="text-base font-bold text-slate-800 mb-1">Application Sources</h3>
          <p className="text-xs text-slate-400 mb-4">Which platforms are working for you</p>
          {sourceArr.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-slate-400 text-sm">No source data yet</div>
          ) : (
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={220}>
                <PieChart>
                  <Pie data={sourceArr} cx="50%" cy="50%" outerRadius={90} paddingAngle={3} dataKey="value"
                    label={({ percent }) => `${Math.round(percent * 100)}%`} labelLine={false}>
                    {sourceArr.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => [v, 'Apps']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2.5">
                {sourceArr.map((d, i) => (
                  <div key={d.name}>
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="text-xs text-slate-600">{d.name}</span>
                      </div>
                      <span className="text-xs font-bold">{d.value}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full">
                      <div className="h-full rounded-full" style={{ width: `${totalApps > 0 ? (d.value / totalApps) * 100 : 0}%`, background: COLORS[i % COLORS.length] }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Row 3: Role Bar + Radar + Round Cards */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="chart-card lg:col-span-2">
          <h3 className="text-base font-bold text-slate-800 mb-1">Applications by Role</h3>
          <p className="text-xs text-slate-400 mb-4">Which job titles you are targeting</p>
          {roleArr.length === 0 ? (
            <div className="h-40 flex items-center justify-center text-slate-400 text-sm">No role data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={roleArr}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="role" tick={{ fontSize: 9, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Applications" radius={[6,6,0,0]}>
                  {roleArr.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="chart-card">
          <h3 className="text-base font-bold text-slate-800 mb-1">Status Radar</h3>
          <p className="text-xs text-slate-400 mb-2">Hunt health overview</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
              <PolarRadiusAxis tick={{ fontSize: 9, fill: '#94a3b8' }} />
              <Radar name="Count" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Round detail cards */}
      <div>
        <h3 className="text-base font-bold text-slate-800 mb-3">Round-by-Round Breakdown</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <RoundCard label="📞 Telephonic Round"  data={stats.rounds.telephonic} color="#6366f1" />
          <RoundCard label="🖥️ Technical Round 1" data={stats.rounds.technical1} color="#f59e0b" />
          <RoundCard label="💻 Technical Round 2" data={stats.rounds.technical2} color="#10b981" />
          <RoundCard label="🤝 HR Round"          data={stats.rounds.hr}         color="#06b6d4" />
        </div>
      </div>
    </div>
  )
}
