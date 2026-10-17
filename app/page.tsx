import React from 'react';
import Link from 'next/link';
import { Navbar, Footer, Button, Card, CardHeader, CardTitle, CardDescription, Badge } from '@/components/ui';
import { getEvents } from '@/lib/data';

export const metadata = {
  title: 'ITA Nexus — Secure Digital Operating Platform | PSG College of Technology',
  description: 'Official digital platform & institutional memory for the Information Technology Association (ITA) at PSG College of Technology.'
};

export default async function HomePage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* ================================================================= */}
        {/* HERO SECTION */}
        {/* ================================================================= */}
        <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
          {/* Ambient Glow Effects */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Syscraft Header Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md mb-8 animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-xs font-semibold text-cyan-300 tracking-wide uppercase">
                Syscraft Innovation Challenge • Problem Statement 1
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
              Secure Digital Operating Platform &{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Institutional Memory
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              <strong className="text-slate-200">One Platform. Every ITA Experience.</strong> Connecting 640+ IT students, multi-tier committee operations, and verified four-year student journeys into one continuous digital ecosystem.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button variant="glow" size="lg" className="w-full sm:w-auto text-base">
                  Sign In with College Email →
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                  Student Portal & Passport
                </Button>
              </Link>
            </div>

            {/* Metrics Ribbon */}
            <div className="mt-16 pt-12 border-t border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-white">640+</div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">IT Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  4-Year
                </div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Verified Journey</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-white">6-Tier</div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Role Security (RBAC)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-emerald-400">100%</div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Institutional Memory</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* UPCOMING EVENTS & HACKATHONS */}
        {/* ================================================================= */}
        <section id="events" className="py-20 border-t border-slate-800/80 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <Badge variant="cyan" className="mb-2">
                  DISCOVER & PARTICIPATE
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Department Events & Hackathons
                </h2>
                <p className="text-slate-400 mt-2 max-w-xl text-sm">
                  Official events, technical symposiums, and hands-on bootcamps organized by the Information Technology Association.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                  ⚡ Smart Online Registration Active
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event) => (
                <Card key={event.id} className="flex flex-col justify-between overflow-hidden group">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="purple" className="capitalize">
                        {event.category}
                      </Badge>
                      <Badge variant="success">
                        {event.current_registrations_count} / {event.max_capacity} Enrolled
                      </Badge>
                    </div>

                    <CardTitle className="text-2xl group-hover:text-indigo-300 transition-colors">
                      {event.title}
                    </CardTitle>

                    <p className="text-xs font-semibold text-cyan-400 mt-1">
                      {event.tagline}
                    </p>

                    <CardDescription className="mt-3 text-sm line-clamp-3">
                      {event.description}
                    </CardDescription>

                    <div className="mt-6 space-y-2 text-xs text-slate-300 bg-slate-950/50 p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-400 font-bold">📍 Venue:</span>
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-400 font-bold">📅 Date:</span>
                        <span>{new Date(event.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-400 font-bold">🎓 Eligibility:</span>
                        <span>Years {event.eligible_years.join(', ')} (IT Department)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Closes: {new Date(event.registration_deadline).toLocaleDateString()}
                    </span>
                    <Link href={`/dashboard?event=${event.id}`}>
                      <Button variant="default" size="sm">
                        Register with 1-Click →
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* CORE PILLARS (SYSCRAFT ARCHITECTURE) */}
        {/* ================================================================= */}
        <section id="pillars" className="py-20 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="cyan" className="mb-2">THE 6 SYSCRAFT PILLARS</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                How ITA Nexus Transforms Department Life
              </h2>
              <p className="text-slate-400 mt-2 text-sm">
                Moving beyond fragmented WhatsApp groups, lost Google Forms, and painful committee handovers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Discover */}
              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg mb-2">
                    🔍
                  </div>
                  <CardTitle>1. DISCOVER</CardTitle>
                  <CardDescription>
                    Centralized hub for all departmental events, workshops, hackathons, and announcements. No missed deadlines.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Participate */}
              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg mb-2">
                    🎫
                  </div>
                  <CardTitle>2. PARTICIPATE</CardTitle>
                  <CardDescription>
                    One-click registration with duplicate prevention, instant QR check-in, feedback collection, and digital certificates.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Operate */}
              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg mb-2">
                    ⚙️
                  </div>
                  <CardTitle>3. OPERATE</CardTitle>
                  <CardDescription>
                    Structured role hierarchy (Exec → JS → Secretary → Faculty) with segregated Treasurer finance flows and audit logging.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Remember */}
              <Card className="border-indigo-500/30 bg-indigo-950/20">
                <CardHeader>
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-2">
                    🛡️
                  </div>
                  <div className="flex items-center gap-2">
                    <CardTitle>4. REMEMBER</CardTitle>
                    <Badge variant="success">Core Innovation</Badge>
                  </div>
                  <CardDescription>
                    <strong>ITA Passport</strong> builds a verified 4-year journey. <strong>Memory Vault</strong> & <strong>Event Playbooks</strong> preserve institutional knowledge.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Improve */}
              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-2">
                    📈
                  </div>
                  <CardTitle>5. IMPROVE</CardTitle>
                  <CardDescription>
                    Data analytics on student engagement, automated participation tracking, and role-aware safe AI assistance.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Learn */}
              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg mb-2">
                    💡
                  </div>
                  <CardTitle>6. LEARN</CardTitle>
                  <CardDescription>
                    Role-based guided tours and contextual onboarding so 1st year students and new committee leads learn the platform instantly.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* LEADERSHIP & DEV TEAM */}
        {/* ================================================================= */}
        <section id="team" className="py-20 border-t border-slate-800/80 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="cyan" className="mb-2">SYSCRAFT TEAM</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Built for PSG Tech Information Technology Department
            </h2>
            <p className="text-slate-400 mt-2 text-sm max-w-xl mx-auto">
              Engineered with modern Next.js 16, TypeScript, Tailwind CSS, and Supabase under the Syscraft Innovation Challenge.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
              <Card className="p-6">
                <div className="text-indigo-400 font-mono text-xs">24I318</div>
                <h4 className="font-bold text-white text-base mt-1">Harrish R K</h4>
                <p className="text-xs text-slate-400 mt-1">Architecture & Frontend Lead</p>
                <Badge variant="cyan" className="mt-3 text-[10px]">Dev 1 (Frontend)</Badge>
              </Card>

              <Card className="p-6">
                <div className="text-indigo-400 font-mono text-xs">24I326</div>
                <h4 className="font-bold text-white text-base mt-1">Keshore P R</h4>
                <p className="text-xs text-slate-400 mt-1">Backend & Security Lead</p>
                <Badge variant="purple" className="mt-3 text-[10px]">Dev 2 (Backend)</Badge>
              </Card>

              <Card className="p-6">
                <div className="text-indigo-400 font-mono text-xs">24I309</div>
                <h4 className="font-bold text-white text-base mt-1">David Melvin L</h4>
                <p className="text-xs text-slate-400 mt-1">Committee & Testing Lead</p>
                <Badge variant="info" className="mt-3 text-[10px]">Dev 3 (Committee)</Badge>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
