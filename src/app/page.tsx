import Link from 'next/link'
import Image from 'next/image'
import { Briefcase, BarChart2, Target, Calendar, Shield, Zap, ArrowRight, Star } from 'lucide-react'

const features = [
  { icon: BarChart2, title: 'Live Dashboard', desc: 'Real-time charts showing your application status, round performance, and weekly progress.' },
  { icon: Target, title: 'Application Tracker', desc: 'Track every job application with company, role, source, CTC, and round-by-round status.' },
  { icon: Briefcase, title: 'Company Wishlist', desc: 'Maintain your dream company list with priority levels and tech stack info.' },
  { icon: Calendar, title: 'Weekly Planner', desc: 'Plan your weekly job hunt targets — applications, prep, LinkedIn actions.' },
  { icon: Shield, title: 'Secure & Private', desc: 'Your data is stored securely. Only you can see your job hunt data.' },
  { icon: Zap, title: 'Round Tracking', desc: 'Track Telephonic → Technical 1 → Technical 2 → HR rounds with pass/fail status.' },
]

const stats = [
  { value: '500+', label: 'Companies Tracked' },
  { value: '30 Day', label: 'Avg Offer Timeline' },
  { value: '4 Rounds', label: 'Full Round Tracking' },
  { value: '10+ Charts', label: 'Dashboard Insights' },
]

export default function LandingPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
      }}
    >
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
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
          <span className="text-white font-bold text-xl tracking-tight">
            InterviewHelper
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/guest"
            className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2"
          >
            Guest View
          </Link>
          <Link
            href="/login"
            className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2 border border-white/20 rounded-lg"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold px-5 py-2 rounded-lg text-white"
            style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-white/10"
          style={{ background: "rgba(99,102,241,0.15)" }}
        >
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-slate-300">
            Built for 3+ Year Experienced Engineers
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Your Job Hunt <br />
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Command Center
          </span>
        </h1>

        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Track applications, monitor interview rounds, analyse your progress
          with beautiful charts, and land your dream{" "}
          <strong className="text-white">Frontend / MERN / React</strong> role
          in 30 days.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-lg shadow-2xl transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
          >
            Start Tracking Free <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/guest"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-slate-300 border border-white/20 hover:border-indigo-500 hover:text-white transition-all text-lg"
          >
            View Demo
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center p-5 rounded-2xl border border-white/10"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <div className="text-3xl font-bold text-white mb-1">
                {s.value}
              </div>
              <div className="text-sm text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Everything You Need to Get Hired
        </h2>
        <p className="text-slate-400 text-center mb-12">
          One CRM to rule your entire job hunt journey
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(99,102,241,0.1))",
                }}
              >
                <f.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto px-6 pb-24 text-center">
        <div
          className="p-10 rounded-3xl border border-white/10"
          style={{ background: "rgba(99,102,241,0.1)" }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to land your next role?
          </h2>
          <p className="text-slate-400 mb-8">
            Join candidates who use InterviewHelper to stay organised and get
            offers faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              }}
            >
              Create Free Account
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold text-slate-300 border border-white/20 hover:border-indigo-400 transition-colors"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      <footer className="text-center pb-8 text-slate-600 text-sm">
        Built for Software Engineers hunting their next big role 🚀
      </footer>
    </div>
  );
}
