const S:Record<string,string> = {
  Applied:'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300',
  'In Review':'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300',
  Shortlisted:'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300',
  'In Progress':'bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-300',
  Rejected:'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300',
  Withdrawn:'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
  Offer:'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  'On Hold':'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300',
}
export function StatusBadge({ status }:{ status:string }) {
  return <span className={`badge text-[11px] ${S[status]||'bg-slate-100 text-slate-500'}`}>{status}</span>
}