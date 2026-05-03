-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "experience" TEXT DEFAULT '3 Years 10 Months',
    "targetRole" TEXT DEFAULT 'Frontend Developer',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobRole" TEXT NOT NULL,
    "location" TEXT,
    "wfhMode" TEXT DEFAULT 'Hybrid',
    "appliedOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT DEFAULT 'LinkedIn',
    "appStatus" TEXT NOT NULL DEFAULT 'Applied',
    "telephonicRound" TEXT NOT NULL DEFAULT 'Pending',
    "technicalRound1" TEXT NOT NULL DEFAULT 'Pending',
    "technicalRound2" TEXT NOT NULL DEFAULT 'Pending',
    "hrRound" TEXT NOT NULL DEFAULT 'Pending',
    "currentStage" TEXT,
    "ctcExpected" TEXT,
    "ctcOffered" TEXT,
    "offerDate" DATETIME,
    "followUpOn" DATETIME,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "location" TEXT,
    "wfhPolicy" TEXT DEFAULT 'Hybrid',
    "techStack" TEXT,
    "careersPage" TEXT,
    "linkedinPage" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'Medium',
    "applied" TEXT NOT NULL DEFAULT 'No',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeeklyPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "applyTarget" INTEGER NOT NULL DEFAULT 3,
    "companiesToTarget" TEXT,
    "followUpNeeded" TEXT,
    "prepTopic" TEXT,
    "linkedinActions" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Planned',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WeeklyPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
