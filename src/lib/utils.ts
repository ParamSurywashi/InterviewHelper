import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const STATUS_COLORS: Record<string, string> = {
  Applied: 'bg-blue-100 text-blue-700',
  'In Review': 'bg-purple-100 text-purple-700',
  Shortlisted: 'bg-yellow-100 text-yellow-700',
  'In Progress': 'bg-cyan-100 text-cyan-700',
  Rejected: 'bg-red-100 text-red-700',
  Withdrawn: 'bg-gray-100 text-gray-600',
  Offer: 'bg-green-100 text-green-700',
  'On Hold': 'bg-orange-100 text-orange-700',
}

export const ROUND_COLORS: Record<string, string> = {
  Pending: 'bg-gray-100 text-gray-500',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  Passed: 'bg-green-100 text-green-700',
  Failed: 'bg-red-100 text-red-700',
  Skipped: 'bg-gray-100 text-gray-400',
}

export const JOB_ROLES = [
  'Frontend Developer', 'React Developer', 'Senior React Developer',
  'MERN Stack Developer', 'Software Engineer', 'Senior Software Engineer',
  'Full Stack Developer', 'UI Developer', 'JavaScript Developer',
  'Next.js Developer', 'TypeScript Developer',
]

export const SOURCES = [
  'LinkedIn', 'Naukri', 'Indeed', 'Referral', 'Company Website',
  'AngelList', 'Instahyre', 'Internshala', 'Other',
]

export const STATUSES = [
  'Applied', 'In Review', 'Shortlisted', 'In Progress', 'Rejected', 'Withdrawn', 'Offer', 'On Hold',
]

export const ROUND_STATUSES = ['Pending', 'In Progress', 'Passed', 'Failed', 'Skipped']

export const PRIORITY_COLORS: Record<string, string> = {
  High: 'bg-red-100 text-red-700 border-red-200',
  Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Low: 'bg-green-100 text-green-700 border-green-200',
}

export function formatDate(d?: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
