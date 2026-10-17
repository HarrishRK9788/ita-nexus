'use client';

import React, { useState } from 'react';
import { ItaEvent, EventRegistration } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge } from '@/components/ui';
import { registerForEvent } from '@/lib/data';

interface EventRegisterCardProps {
  event: ItaEvent;
  studentId: string;
}

export function EventRegisterCard({ event, studentId }: EventRegisterCardProps) {
  const [registration, setRegistration] = useState<EventRegistration | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await registerForEvent(event.id, studentId);
      if (res.success && res.registration) {
        setRegistration(res.registration);
      } else {
        setError(res.error || 'Failed to complete registration');
      }
    } catch {
      setError('An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-slate-800 bg-slate-900/60 flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="purple" className="capitalize">{event.category}</Badge>
          {registration ? (
            <Badge variant="success">✓ Registered</Badge>
          ) : (
            <Badge variant="info">Open for Registration</Badge>
          )}
        </div>
        <CardTitle className="text-xl">{event.title}</CardTitle>
        <CardDescription className="text-xs text-cyan-400 font-medium">{event.tagline}</CardDescription>
        <p className="text-xs text-slate-300 mt-2 line-clamp-2">{event.description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-xs text-slate-400 space-y-1 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div><strong className="text-slate-300">Venue:</strong> {event.venue}</div>
          <div><strong className="text-slate-300">Date:</strong> {new Date(event.start_time).toLocaleDateString()}</div>
          <div><strong className="text-slate-300">Capacity:</strong> {event.current_registrations_count} / {event.max_capacity} Enrolled</div>
        </div>

        {registration && (
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-center space-y-2 animate-fade-in">
            <div className="text-xs font-semibold text-emerald-400">🎉 Registration Confirmed!</div>
            <div className="text-xs text-slate-300">Your Fast-Pass QR Ticket Code:</div>
            <div className="font-mono text-base font-bold text-white tracking-widest bg-slate-950 py-1.5 px-3 rounded-lg border border-emerald-500/40 inline-block">
              {registration.ticket_code}
            </div>
            <p className="text-[10px] text-slate-400">Present this ticket code at the venue scanner for instant QR attendance.</p>
          </div>
        )}

        {error && (
          <div className="p-2.5 rounded-lg border border-rose-500/30 bg-rose-950/30 text-rose-300 text-xs text-center">
            {error}
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t border-slate-800/80 pt-4 flex items-center justify-between">
        <span className="text-[11px] text-slate-500">Duplicate Prevention Active</span>
        {registration ? (
          <Button variant="secondary" size="sm" disabled>
            Already Enrolled
          </Button>
        ) : (
          <Button variant="glow" size="sm" isLoading={loading} onClick={handleRegister}>
            Register 1-Click
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
