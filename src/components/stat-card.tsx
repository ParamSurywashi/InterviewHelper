import { LucideIcon } from 'lucide-react'
interface Props { title: string; value: string | number; subtitle?: string; icon: LucideIcon; color: string; bgColor: string; trend?: string; trendUp?: boolean }
export function StatCard({ title, value, subtitle, icon: Icon, color, bgColor, trend, trendUp }: Props) {
  return (
    <div className="stat-widget">
      <div className="stat-icon-box" style={{ background: bgColor }}><Icon className="w-6 h-6" style={{ color }} /></div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 truncate">{title}</p>
        <p className="text-2xl font-bold text-slate-800 dark:text-white leading-none">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{subtitle}</p>}
        {trend && <p className={`text-xs font-semibold mt-1.5 ${trendUp ? 'text-emerald-500' : 'text-red-500'}`}>{trendUp ? '↑' : '↓'} {trend}</p>}
      </div>
    </div>
  )
}