'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Briefcase, Building2, Calendar, User, LogOut, ChevronRight } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const navItems = [
  { href: '/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/applications', label: 'Applications', icon: Briefcase },
  { href: '/companies',    label: 'Wishlist',     icon: Building2 },
  { href: '/planner',      label: 'Planner',      icon: Calendar },
  { href: '/profile',      label: 'Profile',      icon: User },
]

export function Sidebar() {
  const path = usePathname()

  return (
    <aside className="sidebar flex flex-col h-full border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden">
            <Image
              src="/IH-logo.png"
              alt="Interview Helper"
              width={42}
              height={42}
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm leading-none">
              InterviewHelper
            </p>
            <p className="text-xs text-slate-400 mt-0.5">Job Hunt CRM</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
          Navigation
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = path === href || path.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn("nav-link group", active && "active")}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-sm">{label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* Goal badge */}
      <div className="px-3 py-3">
        <div
          className="p-3 rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(245,158,11,0.1))",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <p className="text-xs font-bold text-indigo-700">🎯 30-Day Goal</p>
          <p className="text-xs text-slate-500 mt-1">
            Land your dream offer in 30 days!
          </p>
        </div>
      </div>

      {/* Logout */}
      <div className="px-3 pb-5 border-t border-slate-100 pt-3">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="nav-link w-full text-red-400 hover:bg-red-50 hover:text-red-500"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
