'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { WaterRipple } from './water-ripple'
import { BarChart2, Target, Calendar, Shield, Zap, ArrowRight, CheckCircle2, Star, ChevronDown, ChevronUp, Users, Settings, Menu, X, Layers, Building2 } from 'lucide-react'
const FEATURES=[
  {icon:BarChart2,title:'Live Analytics',desc:'10+ charts — pie, area, bar, radar. Track every metric of your job hunt in real time.'},
  {icon:Target,title:'Application Tracker',desc:'Full CRUD with 4 interview rounds, position type, experience requirements, CTC tracking.'},
  {icon:Calendar,title:'Interview Calendar',desc:'Google-like calendar. Schedule interviews, set reminders, track all upcoming rounds.'},
  {icon:Building2,title:'Company Wishlist',desc:'Prioritised list of dream companies with tech stack, WFH policy and careers page links.'},
  {icon:Layers,title:'Weekly Planner',desc:'Auto-generate 7-day plans with daily apply targets and LinkedIn actions.'},
  {icon:Settings,title:'Full Customisation',desc:'8 colour themes, dark/light/semi-dark, left/right sidebar, boxed layout, RTL support.'},
]
const STEPS=[
  {n:'01',title:'Add Applications',desc:'Log every job you apply to with company, role, source, position type and CTC expectations.'},
  {n:'02',title:'Track Rounds',desc:'Record each interview round — Telephonic, Technical 1 & 2, HR — with Passed/Failed status.'},
  {n:'03',title:'Schedule & Win',desc:'Use the Interview Calendar to plan ahead and land your offer in 30 days!'},
]
const TESTIMONIALS=[
  {name:'Priya Sharma',role:'Senior React Dev @ Razorpay',avatar:'PS',stars:5,text:'InterviewHelper kept me sane during my 6-week job hunt. Got 3 offers and negotiated a 40% hike!'},
  {name:'Arjun Mehta',role:'MERN Stack Dev @ Swiggy',avatar:'AM',stars:5,text:'The interview calendar is a game-changer. Never missed a round, always prepared!'},
  {name:'Sneha Patel',role:'Frontend Dev @ BrowserStack',avatar:'SP',stars:5,text:'Analytics showed LinkedIn referrals had 5x better conversion. Changed my strategy completely.'},
]
const FAQS=[
  {q:'Is InterviewHelper free?',a:'Yes! Core features are completely free — unlimited applications, calendar, and analytics.'},
  {q:'What tech is this built on?',a:'Next.js 14, Prisma + PostgreSQL (Neon), NextAuth.js, Recharts, Tailwind CSS.'},
  {q:'Can I track multiple job roles?',a:'Absolutely. Track Frontend, React, MERN, Software Engineer and any custom role simultaneously.'},
  {q:'Does it work on mobile?',a:'Yes! Fully responsive with a mobile bottom navigation bar and slide-out sidebar drawer.'},
  {q:'What interview rounds can I track?',a:'Telephonic, Technical 1, Technical 2, and HR — all with Pending/In Progress/Passed/Failed status.'},
  {q:'Can I set interview reminders?',a:'Yes, the Interview Calendar lets you set reminders (15, 30, 60 min) before each scheduled interview.'},
]
const STATS=[{v:'500+',l:'Companies'},{v:'4',l:'Interview Rounds'},{v:'30 Days',l:'Avg Offer Time'},{v:'8',l:'Color Themes'}]
export function LandingClient() {
  const [faqOpen,setFaqOpen]=useState<number|null>(null)
  const [menuOpen,setMenuOpen]=useState(false)
  const [scrolled,setScrolled]=useState(false)
  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>20); window.addEventListener('scroll',fn); return()=>window.removeEventListener('scroll',fn) },[])
  return (
    <div className="min-h-screen overflow-x-hidden" style={{background:'#04070f'}}>
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled?'bg-slate-950/95 backdrop-blur-xl shadow-2xl':'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image src="/logo.png" alt="InterviewHelper" width={42} height={42} className="rounded-2xl object-cover ring-2 ring-white/10 group-hover:ring-purple-500/50 transition-all"/>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-950"/>
            </div>
            <div>
              <p className="text-white font-black text-base leading-none">InterviewHelper</p>
              <p className="text-[9px] text-purple-400 font-bold tracking-widest mt-0.5">PLAN · APPLY · PREPARE · SUCCEED</p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {['Features','How It Works','Testimonials','FAQ'].map(l=><a key={l} href={`#${l.toLowerCase().replace(/ /g,'-')}`} className="text-sm text-slate-400 hover:text-white transition-colors">{l}</a>)}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/guest" className="hidden sm:block text-sm text-slate-400 hover:text-white transition-colors px-3 py-2">Demo</Link>
            <Link href="/login" className="hidden sm:block text-sm px-4 py-2 rounded-lg border border-white/20 text-slate-300 hover:border-white/40 hover:text-white transition-all">Log In</Link>
            <Link href="/signup" className="text-sm font-bold px-5 py-2.5 rounded-xl text-white" style={{background:'linear-gradient(135deg,var(--primary),#4f46e5)'}}>Get Started</Link>
            <button onClick={()=>setMenuOpen(p=>!p)} className="md:hidden text-white p-2">{menuOpen?<X className="w-5 h-5"/>:<Menu className="w-5 h-5"/>}</button>
          </div>
        </div>
        {menuOpen&&(
          <div className="md:hidden bg-slate-900/98 border-t border-white/10 px-6 py-4 space-y-3 backdrop-blur-xl">
            {['Features','How It Works','Testimonials','FAQ'].map(l=><a key={l} href={`#${l.toLowerCase().replace(/ /g,'-')}`} onClick={()=>setMenuOpen(false)} className="block text-sm text-slate-300 hover:text-white py-2">{l}</a>)}
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="flex-1 text-center text-sm py-2.5 rounded-lg border border-white/20 text-slate-300">Log In</Link>
              <Link href="/signup" className="flex-1 text-center text-sm font-bold py-2.5 rounded-lg text-white" style={{background:'var(--primary)'}}>Sign Up Free</Link>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 20% 50%,rgba(70,105,250,0.15) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(139,92,246,0.12) 0%,transparent 50%)'}}/>
        <WaterRipple color={[70,105,250]} intensity={300}/>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full animate-float pointer-events-none" style={{background:'radial-gradient(circle,rgba(70,105,250,0.07) 0%,transparent 70%)'}}/>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28">
          <div className="flex justify-center mb-8 animate-fade-up">
            <div className="relative animate-pulse-ring rounded-full p-1" style={{background:'rgba(70,105,250,0.15)'}}>
              <Image src="/logo.png" alt="InterviewHelper" width={100} height={100} className="rounded-full ring-4 ring-white/10" priority/>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-white/10 animate-fade-up" style={{background:'rgba(70,105,250,0.12)'}}>
            <Star className="w-3.5 h-3.5 text-yellow-400"/>
            <span className="text-xs text-slate-300 font-semibold">Built for 3+ Year Experienced Engineers</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-5 leading-[1.05] tracking-tight animate-fade-up" style={{animationDelay:'100ms'}}>
            Your Job Hunt<br/>
            <span style={{background:'linear-gradient(135deg,var(--primary) 0%,#a78bfa 50%,#f59e0b 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Command Center</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{animationDelay:'200ms'}}>
            Track applications, schedule interviews, analyse progress with <strong className="text-white">10+ live charts</strong>, and land your <strong className="text-white">Frontend / MERN / React</strong> role in 30 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up" style={{animationDelay:'300ms'}}>
            <Link href="/signup" className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-lg shadow-2xl transition-all hover:scale-105" style={{background:'linear-gradient(135deg,var(--primary) 0%,#4f46e5 100%)'}}>
              Start Tracking Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
            </Link>
            <Link href="/guest" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-slate-300 border border-white/15 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all text-lg">View Live Demo</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-slate-500 animate-fade-up" style={{animationDelay:'400ms'}}>
            {['Free forever','No credit card','Unlimited applications','Mobile ready'].map(t=><div key={t} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/>{t}</div>)}
          </div>
          <div className="mt-20 flex flex-col items-center gap-2 text-slate-700 animate-float"><span className="text-xs">Scroll to explore</span><ChevronDown className="w-4 h-4"/></div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 border-y border-white/5" style={{background:'rgba(255,255,255,0.02)'}}>
        <div className="max-w-4xl mx-auto px-6"><div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({v,l})=><div key={l} className="text-center"><p className="text-4xl font-black text-white mb-1" style={{textShadow:'0 0 40px rgba(70,105,250,0.5)'}}>{v}</p><p className="text-sm text-slate-500">{l}</p></div>)}
        </div></div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16"><p className="text-sm font-bold uppercase tracking-widest mb-3" style={{color:'var(--primary)'}}>Simple Process</p><h2 className="text-4xl font-black text-white mb-4">Get Hired in 3 Steps</h2><p className="text-slate-400 max-w-lg mx-auto">A structured approach to 3x your interview success rate</p></div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s,i)=>(
              <div key={i} className="p-8 rounded-2xl border border-white/8 text-center" style={{background:'rgba(255,255,255,0.03)'}}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-black" style={{background:'linear-gradient(135deg,rgba(70,105,250,0.2),rgba(70,105,250,0.05))',color:'var(--primary)',border:'1px solid var(--primary-border)'}}>{s.n}</div>
                <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6" style={{background:'rgba(255,255,255,0.015)'}}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16"><p className="text-sm font-bold uppercase tracking-widest mb-3" style={{color:'var(--primary)'}}>Features</p><h2 className="text-4xl font-black text-white mb-4">Everything You Need to Get Hired</h2><p className="text-slate-400 max-w-xl mx-auto">One CRM to manage your entire job hunt journey</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f,i)=>(
              <div key={i} className="group p-6 rounded-2xl border border-white/8 hover:border-white/20 transition-all" style={{background:'rgba(255,255,255,0.03)'}}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{background:'linear-gradient(135deg,rgba(70,105,250,0.25),rgba(70,105,250,0.08))',border:'1px solid var(--primary-border)'}}><f.icon className="w-5 h-5" style={{color:'var(--primary)'}}/></div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16"><p className="text-sm font-bold uppercase tracking-widest mb-3" style={{color:'var(--primary)'}}>Success Stories</p><h2 className="text-4xl font-black text-white mb-4">Engineers Love InterviewHelper</h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t,i)=>(
              <div key={i} className="p-6 rounded-2xl border border-white/8" style={{background:'rgba(255,255,255,0.03)'}}>
                <div className="flex gap-1 mb-4">{Array.from({length:t.stars}).map((_,s)=><Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400"/>)}</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{background:'linear-gradient(135deg,var(--primary),#4f46e5)'}}>{t.avatar}</div>
                  <div><p className="text-white text-sm font-bold">{t.name}</p><p className="text-slate-500 text-xs">{t.role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6" style={{background:'rgba(255,255,255,0.015)'}}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16"><p className="text-sm font-bold uppercase tracking-widest mb-3" style={{color:'var(--primary)'}}>FAQ</p><h2 className="text-4xl font-black text-white mb-4">Common Questions</h2></div>
          <div className="space-y-3">
            {FAQS.map((f,i)=>(
              <div key={i} className="rounded-xl border border-white/8 overflow-hidden" style={{background:'rgba(255,255,255,0.03)'}}>
                <button className="w-full flex items-center justify-between px-6 py-4 text-left" onClick={()=>setFaqOpen(faqOpen===i?null:i)}>
                  <span className="text-white font-semibold text-sm pr-4">{f.q}</span>
                  {faqOpen===i?<ChevronUp className="w-4 h-4 flex-shrink-0" style={{color:'var(--primary)'}}/>:<ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0"/>}
                </button>
                {faqOpen===i&&<div className="px-6 pb-4 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-3xl border border-white/10 relative overflow-hidden" style={{background:'linear-gradient(135deg,rgba(70,105,250,0.15) 0%,rgba(139,92,246,0.1) 100%)'}}>
            <div className="flex justify-center mb-6"><Image src="/logo.png" alt="IH" width={72} height={72} className="rounded-2xl ring-4 ring-white/10"/></div>
            <h2 className="text-4xl font-black text-white mb-4">Ready to land your next role?</h2>
            <p className="text-slate-400 mb-10 text-lg">Join engineers using InterviewHelper to stay organised and get offers 2x faster.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl font-bold text-white text-lg hover:scale-105 transition-transform" style={{background:'linear-gradient(135deg,var(--primary),#4f46e5)'}}>Create Free Account <ArrowRight className="w-5 h-5"/></Link>
              <Link href="/guest" className="inline-flex items-center justify-center px-10 py-4 rounded-2xl font-semibold text-slate-300 border border-white/20 hover:border-white/40 transition-colors text-lg">View Demo First</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 py-10 px-6">
        <div className="max-w-6xl mx-auto"><div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="IH" width={36} height={36} className="rounded-xl object-cover"/>
            <div><p className="text-white font-black leading-none">InterviewHelper</p><p className="text-[9px] text-purple-400 font-bold tracking-widest">PLAN · APPLY · PREPARE · SUCCEED</p></div>
          </Link>
          <div className="flex gap-8 flex-wrap justify-center">
            {['Features','Calendar','Demo','Login','Sign Up'].map(l=><Link key={l} href={l==='Demo'?'/guest':l==='Sign Up'?'/signup':l==='Login'?'/login':'#features'} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{l}</Link>)}
          </div>
          <p className="text-sm text-slate-600">© 2026 InterviewHelper 🚀</p>
        </div></div>
      </footer>
    </div>
  )
}
