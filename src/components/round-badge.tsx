import { ROUND_COLORS } from '@/lib/utils'
import { CheckCircle2, XCircle, Clock, Loader2, MinusCircle } from 'lucide-react'

const icons: Record<string, React.ReactNode> = {
  Passed:      <CheckCircle2 className="w-3 h-3" />,
  Failed:      <XCircle className="w-3 h-3" />,
  'In Progress': <Loader2 className="w-3 h-3 animate-spin" />,
  Pending:     <Clock className="w-3 h-3" />,
  Skipped:     <MinusCircle className="w-3 h-3" />,
}

export function RoundBadge({ status }: { status: string }) {
  return (
    <span className={`badge gap-1 ${ROUND_COLORS[status] || 'bg-gray-100 text-gray-500'}`}>
      {icons[status]}
      {status}
    </span>
  )
}
