'use client'
import { SessionProvider } from 'next-auth/react'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface AppSettings {
  theme:'light'|'dark'|'semi-dark'; color:string
  sidebarPosition:'left'|'right'; sidebarType:string; sidebarColor:string
  navbarType:string; contentWidth:string; skin:string; rtl:boolean
}
const DEFAULT:AppSettings = { theme:'light', color:'indigo', sidebarPosition:'left', sidebarType:'collapsible', sidebarColor:'white', navbarType:'sticky', contentWidth:'full', skin:'default', rtl:false }

interface SettingsCtx { settings:AppSettings; update:(s:Partial<AppSettings>)=>void; reset:()=>void }
const SC = createContext<SettingsCtx>({ settings:DEFAULT, update:()=>{}, reset:()=>{} })
export const useSettings = () => useContext(SC)

interface SidebarCtx { collapsed:boolean; mobileOpen:boolean; settingsOpen:boolean; setCollapsed:(v:boolean)=>void; setMobileOpen:(v:boolean)=>void; setSettingsOpen:(v:boolean)=>void }
const SBC = createContext<SidebarCtx>({ collapsed:false, mobileOpen:false, settingsOpen:false, setCollapsed:()=>{}, setMobileOpen:()=>{}, setSettingsOpen:()=>{} })
export const useSidebar = () => useContext(SBC)

function apply(s:AppSettings) {
  const h = document.documentElement
  h.classList.toggle('dark', s.theme==='dark')
  h.classList.toggle('semi-dark', s.theme==='semi-dark')
  h.setAttribute('data-color', s.color==='indigo'?'':s.color)
  h.setAttribute('data-sidebar', s.sidebarColor==='white'?'':s.sidebarColor)
  h.setAttribute('data-skin', s.skin==='bordered'?'bordered':'')
  h.setAttribute('dir', s.rtl?'rtl':'ltr')
}

export function Providers({ children }:{ children:React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT)
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(()=>{ try { const s=localStorage.getItem('ih-settings'); const p=s?{...DEFAULT,...JSON.parse(s)}:DEFAULT; setSettings(p); apply(p) } catch{ apply(DEFAULT) }; setMounted(true) },[])
  const update = useCallback((partial:Partial<AppSettings>)=>{ setSettings(prev=>{ const next={...prev,...partial}; apply(next); localStorage.setItem('ih-settings',JSON.stringify(next)); return next }) },[])
  const reset = useCallback(()=>{ apply(DEFAULT); localStorage.removeItem('ih-settings'); setSettings(DEFAULT) },[])
  if (!mounted) return null
  return (
    <SessionProvider>
      <SC.Provider value={{ settings, update, reset }}>
        <SBC.Provider value={{ collapsed, mobileOpen, settingsOpen, setCollapsed, setMobileOpen, setSettingsOpen }}>
          {children}
        </SBC.Provider>
      </SC.Provider>
    </SessionProvider>
  )
}