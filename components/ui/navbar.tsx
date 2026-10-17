'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from './button';
import { Badge } from './badge';
import { RoleSwitcher } from './role-switcher';
import { useRole } from './role-context';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, permissions, logout, isAuthenticated } = useRole();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                ITA NEXUS
              </span>
              <Badge variant="cyan" className="text-[10px] px-1.5 py-0 hidden sm:inline-flex">
                PSG Tech
              </Badge>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider -mt-1 hidden md:block">
              IT ASSOCIATION PLATFORM
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-300">
          <Link href="/#events" className="hover:text-white transition-colors">
            Events & Hackathons
          </Link>

          {/* Student link */}
          <Link href={isAuthenticated ? "/dashboard" : "/login"} className="hover:text-white transition-colors flex items-center gap-1.5">
            <span>ITA Passport</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </Link>

          {/* Committee Portal link: ONLY VISIBLE IF LOGGED IN AS COMMITTEE MEMBER */}
          {isAuthenticated && permissions.isCommittee && (
            <Link
              href="/committee"
              className="hover:text-amber-300 text-amber-400 font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>⚙️ Committee Control</span>
              <Badge variant="warning" className="text-[9px] py-0 px-1">ITA Ops</Badge>
            </Link>
          )}

          <Link href="/#pillars" className="hover:text-white transition-colors">
            Pillars
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Role switcher for quick evaluation */}
          <RoleSwitcher />

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {permissions.isCommittee ? (
                <Link href="/committee" className="hidden sm:inline-flex">
                  <Button variant="default" size="sm" className="bg-amber-600 hover:bg-amber-700 text-xs">
                    Committee Portal →
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard" className="hidden sm:inline-flex">
                  <Button variant="glow" size="sm" className="text-xs">
                    Student Portal →
                  </Button>
                </Link>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-xs text-slate-400 hover:text-white hidden sm:inline-flex"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="glow" size="sm" className="text-xs">
                College Login →
              </Button>
            </Link>
          )}

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
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
      </div>

      {/* Mobile Nav dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-4 space-y-3">
          {isAuthenticated && currentUser ? (
            <div className="text-xs text-slate-400 pb-2 border-b border-slate-800 flex items-center justify-between">
              <div>
                Signed in: <strong className="text-slate-200">{currentUser.name}</strong> ({currentUser.role.replace('_', ' ')})
              </div>
              <button onClick={logout} className="text-rose-400 hover:underline">Logout</button>
            </div>
          ) : (
            <div className="text-xs text-slate-400 pb-2 border-b border-slate-800">
              Not signed in.
            </div>
          )}

          <Link
            href="/#events"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm text-slate-300 hover:text-white"
          >
            Events & Hackathons
          </Link>
          <Link
            href={isAuthenticated ? "/dashboard" : "/login"}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-sm text-slate-300 hover:text-white"
          >
            Student ITA Passport
          </Link>

          {/* Committee link on mobile: ONLY IF COMMITTEE MEMBER */}
          {isAuthenticated && permissions.isCommittee && (
            <Link
              href="/committee"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300"
            >
              ⚙️ Committee Control Center
            </Link>
          )}

          <div className="pt-2">
            {isAuthenticated ? (
              permissions.isCommittee ? (
                <Link href="/committee" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" size="sm" className="w-full bg-amber-600 hover:bg-amber-700">
                    Open Committee Control Center →
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="glow" size="sm" className="w-full">
                    Student Dashboard →
                  </Button>
                </Link>
              )
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="glow" size="sm" className="w-full">
                  Sign In with College Email →
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
