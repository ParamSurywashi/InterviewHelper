'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Briefcase, Building2, Calendar, User } from 'lucide-react'
import { cn } from '@/lib/utils'
const items = [
  { href:'/dashboard', icon:LayoutDashboard, label:'Home' },
  { href:'/applications', icon:Briefcase, label:'Jobs' },
  { href:'/calendar', icon:Calendar, label:'Calendar' },
  { href:'/companies', icon:Building2, label:'Wishlist' },
  { href:'/profile', icon:User, label:'Profile' },
]
export function MobileFooter() {
  const path = usePathname()
  return (
    <nav className="mobile-footer">
      {items.map(({ href, icon:Icon, label }) => (
        <Link key={href} href={href} className={cn('mobile-footer-item', (path===href||path.startsWith(href+'/'))&&'active')}>
          <Icon className="w-5 h-5" /><span>{label}</span>
        </Link>
      ))}
    </nav>
  )
}