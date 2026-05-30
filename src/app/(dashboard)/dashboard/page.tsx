"use client";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Target,
  TrendingUp,
  Award,
  XCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { StatCard } from "@/components/stat-card";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { Stats } from "@/types";
const C = [
  "#4669FA",
  "#FA8B0C",
  "#50C793",
  "#EE4B2B",
  "#0CE7FA",
  "#8b5cf6",
  "#f97316",
  "#84cc16",
];
const CT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 shadow-xl text-sm">
      <p className="font-bold text-slate-700 dark:text-white mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};
function RCard({
  label,
  data,
  color,
}: {
  label: string;
  data: any;
  color: string;
}) {
  const total = data.passed + data.failed + data.inProgress + data.pending;
  const rate = total > 0 ? Math.round((data.passed / total) * 100) : 0;
  return (
    <div className="card p-4">
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
        {label}
      </p>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-2xl font-black" style={{ color }}>
          {rate}%
        </span>
        <span className="text-xs text-slate-400 pb-0.5">pass rate</span>
      </div>
      <div className="progress mb-2">
        <div
          className="progress-bar"
          style={{ width: `${rate}%`, background: color }}
        />
      </div>
      <div className="grid grid-cols-2 gap-1 text-xs">
        <span className="text-emerald-500">✅ {data.passed} Passed</span>
        <span className="text-red-500">❌ {data.failed} Failed</span>
        <span className="text-amber-500">🔄 {data.inProgress} Active</span>
        <span className="text-slate-400">⏳ {data.pending} Pending</span>
      </div>
    </div>
  );
}
export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => {
        setStats(d);
        setLoading(false);
      });
  }, []);
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2
          className="w-10 h-10 animate-spin"
          style={{ color: "var(--primary)" }}
        />
        <p className="text-slate-500 text-sm">Loading dashboard...</p>
      </div>
    );
  if (!stats)
    return (
      <div className="text-center py-20 text-slate-500">
        Failed to load stats
      </div>
    );
  const statusArr = Object.entries(stats.byStatus).map(([name, value]) => ({
    name,
    value,
  }));
  const sourceArr = Object.entries(stats.bySource).map(([name, value]) => ({
    name,
    value,
  }));
  const roleArr = Object.entries(stats.byRole).map(([role, count]) => ({
    role: role.replace(" Developer", "").replace(" Engineer", ""),
    count,
  }));
  const roundBar = [
    {
      round: "Telephonic",
      passed: stats.rounds.telephonic.passed,
      failed: stats.rounds.telephonic.failed,
      inProgress: stats.rounds.telephonic.inProgress,
    },
    {
      round: "Tech 1",
      passed: stats.rounds.technical1.passed,
      failed: stats.rounds.technical1.failed,
      inProgress: stats.rounds.technical1.inProgress,
    },
    {
      round: "Tech 2",
      passed: stats.rounds.technical2.passed,
      failed: stats.rounds.technical2.failed,
      inProgress: stats.rounds.technical2.inProgress,
    },
    {
      round: "HR Round",
      passed: stats.rounds.hr.passed,
      failed: stats.rounds.hr.failed,
      inProgress: stats.rounds.hr.inProgress,
    },
  ];
  const radar = [
    { s: "Applied", A: stats.byStatus["Applied"] || 0 },
    { s: "Shortlisted", A: stats.byStatus["Shortlisted"] || 0 },
    { s: "In Progress", A: stats.byStatus["In Progress"] || 0 },
    { s: "Offers", A: stats.byStatus["Offer"] || 0 },
    { s: "Rejected", A: stats.byStatus["Rejected"] || 0 },
    { s: "In Review", A: stats.byStatus["In Review"] || 0 },
  ];
  const T = stats.totalApplications,
    offers = stats.byStatus["Offer"] || 0,
    short = stats.byStatus["Shortlisted"] || 0,
    rej = stats.byStatus["Rejected"] || 0,
    inp =
      (stats.byStatus["In Progress"] || 0) +
      (stats.byStatus["Shortlisted"] || 0);
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h4 className="text-xl font-black text-slate-900 dark:text-white">
            Dashboard
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {T} applications tracked • Stay focused on your 30-day goal!
          </p>
        </div>
        <div className="text-xs text-slate-400 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 shadow-sm">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {[
          {
            title: "Total Applied",
            value: T,
            icon: Briefcase,
            color: "#4669FA",
            bgColor: "rgba(70,105,250,0.1)",
            subtitle: "All time",
          },
          {
            title: "Shortlisted",
            value: short,
            icon: Target,
            color: "#FA8B0C",
            bgColor: "rgba(250,139,12,0.1)",
            subtitle: T ? `${Math.round((short / T) * 100)}% rate` : "",
          },
          {
            title: "In Progress",
            value: inp,
            icon: TrendingUp,
            color: "#0CE7FA",
            bgColor: "rgba(12,231,250,0.1)",
            subtitle: "Active pipeline",
          },
          {
            title: "Offers 🎉",
            value: offers,
            icon: Award,
            color: "#50C793",
            bgColor: "rgba(80,199,147,0.1)",
            subtitle: offers > 0 ? "Congratulations!" : "Keep going!",
          },
          {
            title: "Rejected",
            value: rej,
            icon: XCircle,
            color: "#EE4B2B",
            bgColor: "rgba(238,75,43,0.1)",
            subtitle: "Learning opportunities",
          },
          {
            title: "Pending Reply",
            value: stats.byStatus["Applied"] || 0,
            icon: Clock,
            color: "#8b5cf6",
            bgColor: "rgba(139,92,246,0.1)",
            subtitle: "Follow up!",
          },
        ].map((s, i) => (
          <div key={i} className="col-span-6 md:col-span-4 xl:col-span-2">
            <StatCard {...s} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-5">
          <div className="card h-full">
            <div className="card-header">
              <div>
                <p className="card-title">Application Status</p>
                <p className="card-subtitle">{T} total applications</p>
              </div>
            </div>
            <div className="card-body">
              {statusArr.length === 0 ? (
                <div className="h-44 flex items-center justify-center text-slate-400 text-sm">
                  No data yet — add your first application!
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <ResponsiveContainer width="55%" height={200}>
                    <PieChart>
                      <Pie
                        data={statusArr}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {statusArr.map((_, i) => (
                          <Cell key={i} fill={C[i % C.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: any) => [v, "Apps"]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-2">
                    {statusArr.map((d, i) => (
                      <div key={d.name} className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: C[i % C.length] }}
                        />
                        <span className="text-xs text-slate-600 dark:text-slate-400 flex-1 truncate">
                          {d.name}
                        </span>
                        <span className="text-xs font-bold dark:text-white">
                          {d.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="card h-full">
            <div className="card-header">
              <div>
                <p className="card-title">Weekly Applications</p>
                <p className="card-subtitle">Last 8 weeks of activity</p>
              </div>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={stats.byWeek}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#4669FA"
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="95%"
                        stopColor="#4669FA"
                        stopOpacity={0.01}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CT />} />
                  <Area
                    type="monotone"
                    dataKey="count"
                    name="Applications"
                    stroke="#4669FA"
                    strokeWidth={2.5}
                    fill="url(#g1)"
                    dot={{ r: 4, fill: "#4669FA" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-7">
          <div className="card h-full">
            <div className="card-header">
              <div>
                <p className="card-title">Round Performance</p>
                <p className="card-subtitle">Pass / Fail across all 4 rounds</p>
              </div>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={roundBar}
                  layout="vertical"
                  margin={{ left: 10 }}
                >
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="round"
                    tick={{ fontSize: 11, fill: "#64748b" }}
                    width={80}
                  />
                  <Tooltip content={<CT />} />
                  <Legend
                    iconType="square"
                    iconSize={10}
                    wrapperStyle={{ fontSize: 12 }}
                  />
                  <Bar
                    dataKey="passed"
                    name="Passed ✅"
                    fill="#50C793"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar
                    dataKey="failed"
                    name="Failed ❌"
                    fill="#EE4B2B"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar
                    dataKey="inProgress"
                    name="In Progress 🔄"
                    fill="#FA8B0C"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <div className="card h-full">
            <div className="card-header">
              <div>
                <p className="card-title">Application Sources</p>
                <p className="card-subtitle">Which portals are working</p>
              </div>
            </div>
            <div className="card-body">
              {sourceArr.length === 0 ? (
                <div className="h-44 flex items-center justify-center text-slate-400 text-sm">
                  No data yet
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <ResponsiveContainer width="50%" height={200}>
                    <PieChart>
                      <Pie
                        data={sourceArr}
                        cx="50%"
                        cy="50%"
                        outerRadius={88}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ percent }) => `${Math.round(percent * 100)}%`}
                        labelLine={false}
                      >
                        {sourceArr.map((_, i) => (
                          <Cell key={i} fill={C[i % C.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: any) => [v, "Apps"]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-2.5">
                    {sourceArr.map((d, i) => (
                      <div key={d.name}>
                        <div className="flex justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ background: C[i % C.length] }}
                            />
                            <span className="text-xs text-slate-600 dark:text-slate-400">
                              {d.name}
                            </span>
                          </div>
                          <span className="text-xs font-bold dark:text-white">
                            {d.value}
                          </span>
                        </div>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${T > 0 ? (d.value / T) * 100 : 0}%`,
                              background: C[i % C.length],
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          <div className="card h-full">
            <div className="card-header">
              <div>
                <p className="card-title">Applications by Role</p>
                <p className="card-subtitle">
                  Which job titles you are targeting
                </p>
              </div>
            </div>
            <div className="card-body">
              {roleArr.length === 0 ? (
                <div className="h-40 flex items-center justify-center text-slate-400 text-sm">
                  No data yet
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={roleArr}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="role"
                      tick={{ fontSize: 9, fill: "#94a3b8" }}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: "#94a3b8" }}
                      allowDecimals={false}
                    />
                    <Tooltip content={<CT />} />
                    <Bar
                      dataKey="count"
                      name="Applications"
                      radius={[6, 6, 0, 0]}
                    >
                      {roleArr.map((_, i) => (
                        <Cell key={i} fill={C[i % C.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="card h-full">
            <div className="card-header">
              <p className="card-title">Hunt Radar</p>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radar}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis
                    dataKey="s"
                    tick={{ fontSize: 10, fill: "#64748b" }}
                  />
                  <PolarRadiusAxis tick={{ fontSize: 9, fill: "#94a3b8" }} />
                  <Radar
                    dataKey="A"
                    stroke="#4669FA"
                    fill="#4669FA"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h5 className="text-base font-bold text-slate-800 dark:text-white mb-3">
          Round-by-Round Breakdown
        </h5>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <RCard
            label="📞 Telephonic"
            data={stats.rounds.telephonic}
            color="#4669FA"
          />
          <RCard
            label="🖥️ Technical 1"
            data={stats.rounds.technical1}
            color="#FA8B0C"
          />
          <RCard
            label="💻 Technical 2"
            data={stats.rounds.technical2}
            color="#50C793"
          />
          <RCard label="🤝 HR Round" data={stats.rounds.hr} color="#0CE7FA" />
        </div>
      </div>
    </div>
  );
}
