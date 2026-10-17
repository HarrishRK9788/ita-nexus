'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, Button, Badge } from '@/components/ui';

export function GuidedTour() {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to ITA Nexus',
      badge: 'Step 1 of 3: Overview',
      desc: 'The official digital platform and institutional memory for the Information Technology Association. All your departmental activities, hackathons, and certifications live here.',
      icon: '👋'
    },
    {
      title: 'Your 4-Year ITA Passport',
      badge: 'Step 2 of 3: Student Journey',
      desc: 'Instead of losing records across Google Drive and spreadsheets, ITA Passport logs your verified participation from 1st year to 4th year automatically.',
      icon: '🛂'
    },
    {
      title: 'Smart One-Click Registration',
      badge: 'Step 3 of 3: Participation',
      desc: 'Register for upcoming events with duplicate prevention. Upon registration, you receive an instant QR code pass for check-in at the venue.',
      icon: '⚡'
    }
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setStep(0);
            setIsOpen(true);
          }}
          className="shadow-xl border border-slate-700 text-xs"
        >
          💡 Replay Guided Tour
        </Button>
      </div>
    );
  }

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <Card className="max-w-md w-full border-indigo-500/50 bg-slate-900 shadow-2xl relative">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="cyan">{current.badge}</Badge>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              ✕ Skip
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl">
              {current.icon}
            </div>
            <CardTitle className="text-xl">{current.title}</CardTitle>
          </div>
          <CardDescription className="pt-2 text-slate-300 text-sm leading-relaxed">
            {current.desc}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex items-center justify-between border-t border-slate-800/80 pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            Skip Tour
          </Button>

          <div className="flex items-center gap-2">
            {step > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button
                variant="glow"
                size="sm"
                onClick={() => setStep(step + 1)}
              >
                Next Step →
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                Got It! 🚀
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
