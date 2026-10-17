import React from 'react';
import Link from 'next/link';
import { Navbar, Footer, Badge } from '@/components/ui';
import { PassportCard, GuidedTour, EventRegisterCard } from '@/components/student';
import { getEvents, getStudentPassport, MOCK_USERS } from '@/lib/data';

export const metadata = {
  title: 'Student Dashboard & ITA Passport | ITA Nexus',
  description: 'View your 4-year verified ITA participation record, upcoming events, and digital certificates.'
};

export default async function StudentDashboardPage() {
  const currentStudent = MOCK_USERS[0]; // Harrish R K (24I318)
  const passport = await getStudentPassport(currentStudent.id);
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">Student Control Center</span>
                <Badge variant="cyan">Active Session</Badge>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Connected as <strong className="text-slate-200">{currentStudent.name}</strong> ({currentStudent.roll_number}) • Year {currentStudent.year_of_study} IT
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
              >
                ← Back to Public Portal
              </Link>
            </div>
          </div>

          {/* 1. ITA PASSPORT (THE 4-YEAR JOURNEY) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Your Official ITA Passport</h2>
                <p className="text-xs text-slate-400">
                  Verified four-year participation record preserving your milestones, skills, and certifications.
                </p>
              </div>
            </div>

            {passport && (
              <PassportCard
                passport={passport}
                studentName={currentStudent.name}
                rollNumber={currentStudent.roll_number || '24I318'}
                year={currentStudent.year_of_study}
              />
            )}
          </section>

          {/* 2. UPCOMING EVENTS & SMART REGISTRATION */}
          <section className="space-y-4 pt-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Available Events & Workshops</h2>
              <p className="text-xs text-slate-400">
                Register with duplicate prevention. Receive your unique fast-pass ticket code instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <EventRegisterCard
                  key={event.id}
                  event={event}
                  studentId={currentStudent.id}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Guided Tour for First-time Onboarding */}
      <GuidedTour />

      <Footer />
    </div>
  );
}
