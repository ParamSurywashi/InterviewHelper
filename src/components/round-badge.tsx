import { CheckCircle2, XCircle, Clock, Loader2, MinusCircle } from 'lucide-react'
const S: Record<string, string> = {
  Passed: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300',
  Failed: 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300',
  'In Progress': 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300',
  Pending: 'bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500',
  Skipped: 'bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500',
}
const I: Record<string, React.ReactNode> = {
  Passed: <CheckCircle2 className="w-3 h-3" />, Failed: <XCircle className="w-3 h-3" />,
  'In Progress': <Loader2 className="w-3 h-3 animate-spin" />,
  Pending: <Clock className="w-3 h-3" />, Skipped: <MinusCircle className="w-3 h-3" />
}
export function RoundBadge({ status }: { status: string }) {
  return <span className={`badge text-[10px] ${S[status] || 'bg-slate-100 text-slate-400'}`}>{I[status]}{status}</span>
}