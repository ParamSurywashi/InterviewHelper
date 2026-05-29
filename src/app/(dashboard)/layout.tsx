import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/sidebar'
import { TopBar } from '@/components/topbar'
import { MobileFooter } from '@/components/mobile-footer'
import { SettingsPanel } from '@/components/settings-panel'
export default async function DashboardLayout({ children }:{ children:React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  return (
    <div className="flex min-h-screen bg-[#EEF1F9] dark:bg-slate-900">
      <Sidebar/>
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar user={session.user}/>
        <main className="content-wrapper xl:ml-[248px]">
          <div className="page-wrapper pb-24 xl:pb-8">{children}</div>
        </main>
        <MobileFooter/>
      </div>
      <SettingsPanel/>
    </div>
  )
}