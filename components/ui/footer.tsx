import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">ITA NEXUS</span>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Syscraft PS1
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Secure digital operating platform and institutional memory for the Information Technology Association (ITA) at PSG College of Technology.
            </p>
            <p className="text-xs text-slate-500">
              Department of Information Technology, PSG College of Technology, Peelamedu, Coimbatore - 641004.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Core Pillars</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-300">Discover</span> — Events & Resources</li>
              <li><span className="text-slate-300">Participate</span> — QR Attendance & Certs</li>
              <li><span className="text-slate-300">Operate</span> — Multi-Tier Committee RBAC</li>
              <li><span className="text-slate-300">Remember</span> — 4-Year ITA Passport</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Development Team</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><strong className="text-slate-200">Harrish R K</strong> (24I318)</li>
              <li><strong className="text-slate-200">Keshore P R</strong> (24I326)</li>
              <li><strong className="text-slate-200">David Melvin L</strong> (24I309)</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Information Technology Association (ITA), PSG Tech. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built with Next.js & Supabase</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
