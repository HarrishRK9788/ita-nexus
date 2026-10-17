'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, Button, Input, Badge } from '@/components/ui';
import { useRole } from '@/components/ui/role-context';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect');

  const { login } = useRole();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (emailToLogin: string) => {
    setLoading(true);
    setError(null);

    const result = login(emailToLogin);

    if (result.success && result.redirectUrl) {
      const destination = redirectTarget || result.redirectUrl;
      router.push(destination);
    } else {
      const errMsg = ('error' in result && typeof result.error === 'string') ? result.error : 'Failed to authenticate';
      setError(errMsg);
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your college email ID.');
      return;
    }
    handleLogin(email);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[200px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform text-lg">
              ⚡
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              ITA NEXUS
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            PSG College of Technology
          </h1>
          <p className="text-xs text-slate-400">
            Department of Information Technology • Association Portal
          </p>
        </div>

        {/* Main Login Card */}
        <Card className="border-indigo-500/30 bg-slate-900/80 backdrop-blur-xl shadow-2xl p-6">
          <CardHeader className="p-0 pb-5">
            <div className="flex items-center justify-between">
              <Badge variant="cyan" className="text-[10px]">Domain Restricted</Badge>
              <span className="text-[10px] text-slate-500 font-mono">@psgtech.ac.in</span>
            </div>
            <CardTitle className="text-lg mt-2">Sign in with College Email</CardTitle>
            <CardDescription className="text-xs text-slate-300">
              Your roll number automatically determines admission year, department, and role permissions.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-300 block mb-1.5">
                College Email Address:
              </label>
              <Input
                type="email"
                required
                placeholder="24i318@psgtech.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-mono text-sm"
              />
            </div>

            {/* Email breakdown hint */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                <span>💡</span> Roll Number Syntax:
              </div>
              <p className="leading-relaxed font-mono">
                <span className="text-cyan-400 font-bold">24</span> (2024 Year) +{' '}
                <span className="text-indigo-400 font-bold">i</span> (IT Dept) +{' '}
                <span className="text-purple-400 font-bold">318</span> (Roll No)
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl border border-rose-500/40 bg-rose-950/30 text-rose-300 text-xs leading-relaxed animate-fade-in">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="glow"
              size="md"
              isLoading={loading}
              className="w-full text-sm font-semibold"
            >
              Sign In to Nexus →
            </Button>
          </form>

          {/* Quick Demo Personas */}
          <div className="mt-8 pt-5 border-t border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                1-Click Role Login Demo:
              </span>
              <span className="text-[10px] text-slate-500">Instant test</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left">
              {/* Normal Student */}
              <button
                type="button"
                onClick={() => handleLogin('24i318@psgtech.ac.in')}
                className="p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-slate-900 transition-all text-left cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">🎓 Harrish R K</span>
                  <Badge variant="cyan" className="text-[9px] py-0">Student</Badge>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">24i318 (Year 2)</div>
                <div className="text-[9px] text-cyan-400 mt-1">→ Student Portal</div>
              </button>

              {/* Executive Member */}
              <button
                type="button"
                onClick={() => handleLogin('24i326@psgtech.ac.in')}
                className="p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-indigo-500/50 hover:bg-slate-900 transition-all text-left cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">📋 Keshore P R</span>
                  <Badge variant="default" className="text-[9px] py-0">Exec</Badge>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">24i326 (Year 2)</div>
                <div className="text-[9px] text-indigo-400 mt-1">→ Committee Portal</div>
              </button>

              {/* Secretary */}
              <button
                type="button"
                onClick={() => handleLogin('24i309@psgtech.ac.in')}
                className="p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-amber-500/50 hover:bg-slate-900 transition-all text-left cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">🏛️ David Melvin</span>
                  <Badge variant="warning" className="text-[9px] py-0">Secretary</Badge>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">24i309 (Year 3)</div>
                <div className="text-[9px] text-amber-400 mt-1">→ High Access</div>
              </button>

              {/* Treasurer */}
              <button
                type="button"
                onClick={() => handleLogin('23i112@psgtech.ac.in')}
                className="p-2.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-emerald-500/50 hover:bg-slate-900 transition-all text-left cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">💰 Arun K</span>
                  <Badge variant="success" className="text-[9px] py-0">Treasurer</Badge>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">23i112 (Year 3)</div>
                <div className="text-[9px] text-emerald-400 mt-1">→ Finance Portal</div>
              </button>
            </div>
          </div>

          <CardFooter className="p-0 pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              ← Back to Public Website
            </Link>
            <span className="text-slate-500 text-[11px]">Syscraft PS1</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-mono text-xs">Loading PSG Tech Gateway...</div>}>
      <LoginForm />
    </Suspense>
  );
}

