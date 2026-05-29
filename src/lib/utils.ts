import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...i: ClassValue[]) { return twMerge(clsx(i)) }
export const JOB_ROLES = ['Frontend Developer','React Developer','Senior React Developer','MERN Stack Developer','Software Engineer','Senior Software Engineer','Full Stack Developer','UI Developer','JavaScript Developer','Next.js Developer','TypeScript Developer']
export const SOURCES = ['LinkedIn','Naukri','Indeed','Referral','Company Website','AngelList','Instahyre','Internshala','Other']
export const STATUSES = ['Applied','In Review','Shortlisted','In Progress','Rejected','Withdrawn','Offer','On Hold']
export const ROUND_STATUSES = ['Pending','In Progress','Passed','Failed','Skipped']
export function formatDate(d?: string|Date|null) {
  if (!d) return null
  return new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})
}