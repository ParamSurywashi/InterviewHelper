export interface Application {
  id:string; companyName:string; jobRole:string; positionType?:string; expectedExperience?:string
  location?:string; wfhMode?:string; appliedOn:string; source?:string; appStatus:string
  telephonicRound:string; technicalRound1:string; technicalRound2:string; hrRound:string
  currentStage?:string; ctcExpected?:string; ctcOffered?:string; noticePeriod?:string
  offerDate?:string; followUpOn?:string; interviewNotes?:string; notes?:string; createdAt:string
}
export interface Company {
  id:string; companyName:string; location?:string; wfhPolicy?:string
  techStack?:string; careersPage?:string; linkedinPage?:string; priority:string; applied:string; notes?:string
}
export interface WeeklyPlan {
  id:string; weekNumber:number; day:string; applyTarget:number
  companiesToTarget?:string; followUpNeeded?:string; prepTopic?:string; linkedinActions?:string; status:string; notes?:string
}
export interface InterviewEvent {
  id:string; applicationId?:string; title:string; companyName:string; roundType:string
  eventDate:string; startTime:string; endTime:string; notes?:string; color:string
  meetingLink?:string; interviewer?:string; reminderMins:number; status:string; createdAt:string
}
export interface Stats {
  totalApplications:number; byStatus:Record<string,number>; bySource:Record<string,number>
  byWeek:{week:string;count:number}[]; byRole:Record<string,number>
  rounds:{
    telephonic:{passed:number;failed:number;inProgress:number;pending:number}
    technical1:{passed:number;failed:number;inProgress:number;pending:number}
    technical2:{passed:number;failed:number;inProgress:number;pending:number}
    hr:{passed:number;failed:number;inProgress:number;pending:number}
  }
}