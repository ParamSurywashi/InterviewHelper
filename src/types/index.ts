export interface Application {
  id: string
  companyName: string
  jobRole: string
  location?: string
  wfhMode?: string
  appliedOn: string
  source?: string
  appStatus: string
  telephonicRound: string
  technicalRound1: string
  technicalRound2: string
  hrRound: string
  currentStage?: string
  ctcExpected?: string
  ctcOffered?: string
  offerDate?: string
  followUpOn?: string
  notes?: string
  createdAt: string
}

export interface Company {
  id: string
  companyName: string
  location?: string
  wfhPolicy?: string
  techStack?: string
  careersPage?: string
  linkedinPage?: string
  priority: string
  applied: string
  notes?: string
}

export interface WeeklyPlan {
  id: string
  weekNumber: number
  day: string
  applyTarget: number
  companiesToTarget?: string
  followUpNeeded?: string
  prepTopic?: string
  linkedinActions?: string
  status: string
  notes?: string
}

export interface Stats {
  totalApplications: number
  byStatus: Record<string, number>
  bySource: Record<string, number>
  byWeek: { week: string; count: number }[]
  byRole: Record<string, number>
  rounds: {
    telephonic: { passed: number; failed: number; inProgress: number; pending: number }
    technical1: { passed: number; failed: number; inProgress: number; pending: number }
    technical2: { passed: number; failed: number; inProgress: number; pending: number }
    hr: { passed: number; failed: number; inProgress: number; pending: number }
  }
}
