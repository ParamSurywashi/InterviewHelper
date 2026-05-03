'use client'
import { Bell, Search } from 'lucide-react'
import { useState } from 'react'

interface Props { user: { name: string; email: string } }

export function TopBar({ user }: Props) {
  const [search, setSearch] = useState('')
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between gap-4 flex-shrink-0">
      <div>
        <p className="text-sm font-semibold text-slate-700">{greeting}, {user.name.split(' ')[0]}! 👋</p>
        <p className="text-xs text-slate-400">Keep going — your offer is just around the corner</p>
      </div>

      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search applications..."
            className="input-field pl-9 py-2 text-sm" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
          <Bell className="w-4 h-4 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-700 leading-none">{user.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
