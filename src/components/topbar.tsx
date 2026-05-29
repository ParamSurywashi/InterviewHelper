'use client'
import Image from 'next/image'
import { Bell, Menu, Sun, Moon, Settings } from 'lucide-react'
import { useSidebar, useSettings } from '@/components/providers'
interface Props { user:{ name:string; email:string } }
export function TopBar({ user }:Props) {
  const { collapsed, setCollapsed, setMobileOpen, setSettingsOpen } = useSidebar()
  const { settings, update } = useSettings()
  const isDark = settings.theme==='dark'
  const isRight = settings.sidebarPosition==='right'
  const sw = collapsed ? 72 : 248
  const initials = user.name.split(' ').map((n:string)=>n[0]).join('').toUpperCase().slice(0,2)
  return (
    <header className="app-header" style={{ left:isRight?0:sw, right:isRight?sw:0, width:'auto' }}>
      <div className="flex items-center gap-3 w-full">
        <button onClick={()=>setMobileOpen(true)} className="xl:hidden btn-icon text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"><Menu className="w-5 h-5" /></button>
        <button onClick={()=>setCollapsed(!collapsed)} className="hidden xl:flex btn-icon text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"><Menu className="w-5 h-5" /></button>
        <div className="hidden md:flex items-center gap-2.5 ml-1">
          <Image src="/logo.png" alt="IH" width={26} height={26} className="rounded-lg object-cover" />
          <div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-none font-bold uppercase tracking-wider">InterviewHelper</p>
            <p className="text-xs font-black text-slate-700 dark:text-slate-200 leading-none mt-0.5">CRM Dashboard</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <button onClick={()=>update({theme:isDark?'light':'dark'})} className="btn-icon text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
            {isDark?<Sun className="w-4 h-4"/>:<Moon className="w-4 h-4"/>}
          </button>
          <button className="btn-icon relative text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700">
            <Bell className="w-4 h-4"/>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full border-2 border-white dark:border-slate-800" style={{background:'var(--primary)'}}/>
          </button>
          <button onClick={()=>setSettingsOpen(true)} className="btn-icon text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"><Settings className="w-4 h-4"/></button>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-600 mx-1"/>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black" style={{background:'linear-gradient(135deg,var(--primary),#4f46e5)'}}>{initials}</div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none">{user.name}</p>
              <p className="text-xs text-slate-400 mt-0.5 max-w-[140px] truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}