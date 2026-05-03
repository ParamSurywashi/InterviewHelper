# 🚀 InterviewHelper CRM

A full-featured Job Hunting CRM built with Next.js 14, Prisma, and NextAuth.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env

# 3. Push database schema
npm run db:push

# 4. (Optional) Seed sample data
npm run db:seed

# 5. Start development server
npm run dev
```

Open http://localhost:3000

## Features
- 🔐 Authentication (Register / Login / Guest View)
- 📊 Dashboard with live charts (Pie, Bar, Line charts)
- 🎯 Job Applications Tracker (full CRUD, round tracking)
- 🏢 Company Wishlist
- 📅 Weekly Planner
- 👤 User Profile

## Tech Stack
- **Frontend + Backend**: Next.js 14 (App Router)
- **Database**: SQLite via Prisma
- **Auth**: NextAuth.js v4
- **Charts**: Recharts
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
