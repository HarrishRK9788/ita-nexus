'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from './button';
import { Badge } from './badge';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                ITA NEXUS
              </span>
              <Badge variant="cyan" className="text-[10px] px-1.5 py-0">
                PSG Tech
              </Badge>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider -mt-1 hidden sm:block">
              IT ASSOCIATION PLATFORM
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/#events" className="hover:text-white transition-colors">
            Events & Hackathons
          </Link>
          <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span>ITA Passport</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </Link>
          <Link href="/#pillars" className="hover:text-white transition-colors">
            Pillars
          </Link>
          <Link href="/#team" className="hover:text-white transition-colors">
            Leadership
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="glow" size="sm">
              Student Dashboard →
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-4 space-y-3">
          <Link
            href="/#events"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-slate-300 hover:text-white"
          >
            Events & Hackathons
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-slate-300 hover:text-white"
          >
            ITA Passport
          </Link>
          <Link
            href="/#pillars"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-slate-300 hover:text-white"
          >
            Pillars
          </Link>
          <Link
            href="/#team"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-slate-300 hover:text-white"
          >
            Leadership
          </Link>
          <div className="pt-2">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="glow" size="sm" className="w-full">
                Student Dashboard →
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
