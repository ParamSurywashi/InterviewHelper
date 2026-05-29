'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Briefcase, Building2, Calendar, User, LogOut, ChevronRight, X, Settings } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useSidebar, useSettings } from '@/components/providers'
import { cn } from '@/lib/utils'

const NAV = [
  { href:'/dashboard',    label:'Dashboard',     icon:LayoutDashboard, group:'MENU' },
  { href:'/applications', label:'Applications',  icon:Briefcase,       group:'MENU' },
  { href:'/companies',    label:'Wishlist',       icon:Building2,       group:'MENU' },
  { href:'/calendar',     label:'Interview Cal.', icon:Calendar,        group:'MENU' },
  { href:'/planner',      label:'Planner',        icon:LayoutDashboard, group:'TOOLS' },
  { href:'/profile',      label:'Profile',        icon:User,            group:'TOOLS' },
]

function NavContent({ collapsed, onNav }:{ collapsed:boolean; onNav?:()=>void }) {
  const path = usePathname()
  const { setSettingsOpen } = useSidebar()
  return (
    <>
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
        {['MENU','TOOLS'].map(g => (
          <div key={g}>
            {!collapsed && <p className="nav-label">{g}</p>}
            {NAV.filter(n=>n.group===g).map(({ href,label,icon:Icon }) => {
              const active = path===href||path.startsWith(href+'/')
              return (
                <Link key={href} href={href} onClick={onNav}
                  className={cn('nav-item',active&&'active')} title={collapsed?label:undefined}>
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && <span className="flex-1 text-sm">{label}</span>}
                  {!collapsed && active && <ChevronRight className="w-3 h-3 opacity-30" />}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
      {!collapsed && (
        <div className="px-3 pb-2">
          <div className="rounded-xl p-3 text-center" style={{ background:'linear-gradient(135deg,#1e1b4b,#2d1b69)' }}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <Image src="/logo.png" alt="IH" width={18} height={18} className="rounded-full" />
              <p className="text-xs font-black text-white">30-Day Goal</p>
            </div>
            <p className="text-[10px] text-purple-300">Plan · Apply · Prepare · Succeed</p>
          </div>
        </div>
      )}
      <div className={cn('px-3 pb-4 border-t border-slate-100 dark:border-slate-700 pt-3 space-y-1',collapsed&&'flex flex-col items-center')}>
        <button onClick={()=>setSettingsOpen(true)} className={cn('nav-item w-full',collapsed&&'justify-center px-0 w-9')} title={collapsed?'Settings':undefined}>
          <Settings className="w-4 h-4 flex-shrink-0" />{!collapsed&&<span className="text-sm">Customise</span>}
        </button>
        <button onClick={()=>signOut({callbackUrl:'/'})} className={cn('nav-item w-full text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500',collapsed&&'justify-center px-0 w-9')} title={collapsed?'Sign Out':undefined}>
          <LogOut className="w-4 h-4 flex-shrink-0" />{!collapsed&&<span className="text-sm">Sign Out</span>}
        </button>
      </div>
    </>
  )
}

export function Sidebar() {
  const { collapsed, mobileOpen, setCollapsed, setMobileOpen } = useSidebar()
  const { settings } = useSettings()
  const isRight = settings.sidebarPosition==='right'
  const sw = collapsed ? 72 : 248
  return (
    <>
      {/* Desktop */}
      <aside className="sidebar-wrapper hidden xl:flex flex-col" style={{ width:sw, [isRight?'right':'left']:0 }}
        onMouseEnter={()=>{ if(collapsed&&settings.sidebarType==='collapsible') setCollapsed(false) }}>
        <div className="sidebar-logo flex-shrink-0">
          <Image src="/logo.png" alt="IH" width={collapsed?40:36} height={collapsed?40:36} className="rounded-xl object-cover flex-shrink-0" priority />
          {!collapsed && <>
            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-sm font-black text-slate-800 dark:text-white leading-none truncate">InterviewHelper</p>
              <p className="text-[9px] text-purple-500 dark:text-purple-400 mt-0.5 font-bold tracking-wider">PLAN · APPLY · PREPARE · SUCCEED</p>
            </div>
            <button onClick={()=>setCollapsed(true)} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 flex-shrink-0">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
          </>}
        </div>
        <NavContent collapsed={collapsed} />
      </aside>
      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[9998] xl:hidden" onClick={()=>setMobileOpen(false)} />}
      {/* Mobile drawer */}
      <aside className="sidebar-wrapper flex xl:hidden flex-col" style={{ width:268, [isRight?'right':'left']:0, transform:mobileOpen?'translateX(0)':(isRight?'translateX(100%)':'translateX(-100%)') }}>
        <div className="sidebar-logo flex-shrink-0">
          <Image src="/logo.png" alt="IH" width={36} height={36} className="rounded-xl object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-slate-800 dark:text-white">InterviewHelper</p>
            <p className="text-[9px] text-purple-500 font-bold tracking-wider">PLAN · APPLY · PREPARE · SUCCEED</p>
          </div>
          <button onClick={()=>setMobileOpen(false)} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"><X className="w-4 h-4" /></button>
        </div>
        <NavContent collapsed={false} onNav={()=>setMobileOpen(false)} />
      </aside>
    </>
  )
}