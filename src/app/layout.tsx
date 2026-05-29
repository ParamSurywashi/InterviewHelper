import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
const inter = Inter({ subsets:['latin'], variable:'--font-inter' })
export const metadata: Metadata = {
  title:{ default:'InterviewHelper — Job Hunt CRM', template:'%s | InterviewHelper' },
  description:'Plan · Apply · Prepare · Succeed — Your complete job hunting CRM.',
  icons:{ icon:'/logo.png', apple:'/logo.png', shortcut:'/logo.png' },
}
export default function RootLayout({ children }:{ children:React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><link rel="icon" type="image/png" href="/logo.png" /></head>
      <body className={`${inter.variable} font-inter antialiased bg-[#EEF1F9] dark:bg-slate-900`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}