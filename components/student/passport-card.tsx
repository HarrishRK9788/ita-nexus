import React from 'react';
import { ItaPassport } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@/components/ui';

interface PassportCardProps {
  passport: ItaPassport;
  studentName: string;
  rollNumber: string;
  year: number;
}

export function PassportCard({ passport, studentName, rollNumber, year }: PassportCardProps) {
  return (
    <Card className="border-indigo-500/40 bg-gradient-to-b from-indigo-950/40 to-slate-900/80 shadow-2xl relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <CardHeader className="border-b border-slate-800/80 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl">{studentName}</CardTitle>
                <Badge variant="cyan" className="font-mono text-xs">
                  {rollNumber}
                </Badge>
              </div>
              <CardDescription>
                Year {year} • Department of Information Technology • PSG College of Technology
              </CardDescription>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="success" className="px-3 py-1 text-xs">
              ✓ Verified 4-Year Identity
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Metric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-2xl font-black text-white">{passport.total_events_attended}</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Events Attended</div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-2xl font-black text-cyan-400">{passport.total_certificates_earned}</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Certificates Earned</div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-2xl font-black text-purple-400">{passport.volunteering_hours} hrs</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Volunteering</div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-2xl font-black text-emerald-400">{passport.skills_acquired.length}</div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">Verified Skills</div>
          </div>
        </div>

        {/* Skills Tags */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Skills Verified by ITA Activities
          </h4>
          <div className="flex flex-wrap gap-2">
            {passport.skills_acquired.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs bg-slate-900/60">
                ⚡ {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* 4-Year Progression Timeline */}
        <div className="pt-4 border-t border-slate-800/80">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
            <span>Continuous 4-Year Journey</span>
            <span className="text-[10px] text-slate-500">Continuous ITA Ecosystem</span>
          </h4>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((yearNum) => {
              const yearData = passport.timeline.find((t) => t.year === yearNum);
              const isCurrent = yearNum === year;
              const isPast = yearNum < year;

              return (
                <div
                  key={yearNum}
                  className={`p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'border-indigo-500/50 bg-indigo-950/20'
                      : isPast
                      ? 'border-slate-800 bg-slate-950/40 opacity-90'
                      : 'border-slate-800/40 bg-slate-950/20 opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">Year {yearNum}</span>
                      {isCurrent && <Badge variant="cyan">Current Academic Year</Badge>}
                      {isPast && <Badge variant="success">Completed</Badge>}
                      {!isCurrent && !isPast && <span className="text-xs text-slate-500">Upcoming</span>}
                    </div>
                    <span className="text-xs text-slate-400">
                      {yearData ? `${yearData.items.length} Activities Recorded` : 'No records yet'}
                    </span>
                  </div>

                  {yearData && yearData.items.length > 0 ? (
                    <div className="space-y-2 mt-3">
                      {yearData.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-xs bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/60"
                        >
                          <div className="flex items-center gap-2">
                            <span>{item.type === 'certificate' ? '📜' : '🎯'}</span>
                            <span className="text-slate-200 font-medium">{item.title}</span>
                          </div>
                          <span className="text-slate-400 font-mono text-[10px]">{item.date}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic mt-1">
                      {isCurrent ? 'Register for upcoming events to log participation.' : 'Milestones unlock in future semesters.'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
