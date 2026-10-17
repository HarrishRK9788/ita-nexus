'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar, Footer, Button, Card, CardTitle, CardDescription, Badge, Input } from '@/components/ui';
import { useRole } from '@/components/ui/role-context';
import { MOCK_EVENTS, getPermissionsForRole } from '@/lib/data';
import { ItaEvent, EventStatus } from '@/lib/types';

export default function CommitteePortalPage() {
  const { currentUser } = useRole();
  const permissions = getPermissionsForRole(currentUser.role);

  // Local state for interactive demo actions
  const [events, setEvents] = useState<ItaEvent[]>(MOCK_EVENTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCategory, setNewEventCategory] = useState<'workshop' | 'hackathon' | 'symposium'>('workshop');
  const [newEventVenue, setNewEventVenue] = useState('IT Dept Seminar Hall');
  const [activeTab, setActiveTab] = useState<'events' | 'finance' | 'scanner'>('events');
  const [scannedCode, setScannedCode] = useState('');
  const [scanResult, setScanResult] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // 1. ACCESS CONTROL GUARD: STUDENTS CANNOT ACCESS COMMITTEE OPERATIONS
  // ---------------------------------------------------------------------------
  if (!permissions.isCommittee) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="max-w-xl w-full border-rose-500/40 bg-gradient-to-b from-rose-950/20 to-slate-900 shadow-2xl p-6 text-center space-y-5">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center text-3xl">
              🛡️
            </div>
            <div>
              <Badge variant="warning" className="mb-2">
                RBAC Protection Enforced
              </Badge>
              <h2 className="text-2xl font-bold text-white">Restricted to ITA Committee Members</h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                You are currently viewing as <strong className="text-white">{currentUser.name} (Normal Student)</strong>.
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Normal students have read & participate permissions (browsing events, 1-click registration, viewing their 4-Year ITA Passport). Creating, editing, approving, and deleting events is restricted to ITA members.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/dashboard">
                <Button variant="glow" size="sm">
                  ← Return to Student Portal
                </Button>
              </Link>
              <div className="text-xs text-slate-500">
                (Tip: Use the <strong>Active Role dropdown</strong> in the top navbar to switch to Secretary, Faculty, or Exec Member!)
              </div>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // 2. COMMITTEE EVENT ACTIONS
  // ---------------------------------------------------------------------------
  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle) return;

    const newEvt: ItaEvent = {
      id: `evt-${Date.now()}`,
      title: newEventTitle,
      slug: newEventTitle.toLowerCase().replace(/\s+/g, '-'),
      tagline: 'Organized by ITA Committee',
      description: 'Newly drafted departmental event awaiting multi-tier committee review and approval.',
      category: newEventCategory,
      venue: newEventVenue,
      start_time: '2026-11-20T10:00:00Z',
      end_time: '2026-11-20T16:00:00Z',
      registration_deadline: '2026-11-19T18:00:00Z',
      max_capacity: 120,
      current_registrations_count: 0,
      eligible_years: [1, 2, 3, 4],
      status: 'draft',
      created_by: currentUser.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setEvents([newEvt, ...events]);
    setNewEventTitle('');
    setShowCreateModal(false);
  };

  const handleApprove = (id: string) => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, status: 'published' as EventStatus } : ev));
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(ev => ev.id !== id));
  };

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scannedCode) return;
    setScanResult(`✓ Ticket ${scannedCode.toUpperCase()} verified! Attendance recorded for student in ITA Passport.`);
    setScannedCode('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-white">ITA Operations Control Center</span>
                <Badge variant={permissions.canApproveEvent ? 'warning' : 'purple'}>
                  {permissions.canApproveEvent ? 'Executive Authority' : 'Operational Access'}
                </Badge>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Active Member: <strong className="text-white">{currentUser.name}</strong> • Role:{' '}
                <span className="capitalize font-mono text-cyan-400">{currentUser.role.replace('_', ' ')}</span>
              </p>
              <div className="text-[11px] text-slate-400 mt-1 flex flex-wrap gap-2">
                <span>Allowed:</span>
                {permissions.canDraftEvent && <span className="text-emerald-400">✓ Create Events</span>}
                {permissions.canApproveEvent && <span className="text-emerald-400">✓ Publish/Approve</span>}
                {permissions.canDeleteEvent && <span className="text-emerald-400">✓ Delete Events</span>}
                {permissions.canAccessFinance && <span className="text-emerald-400">✓ Finance/Budgets</span>}
                {permissions.canScanAttendance && <span className="text-emerald-400">✓ QR Check-in</span>}
              </div>
            </div>

            {permissions.canDraftEvent && (
              <Button
                variant="glow"
                size="sm"
                onClick={() => setShowCreateModal(true)}
                className="shrink-0"
              >
                + Create New Event
              </Button>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 gap-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab('events')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'events'
                  ? 'border-indigo-500 text-white font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              📅 Events & Workflows ({events.length})
            </button>

            {permissions.canAccessFinance && (
              <button
                onClick={() => setActiveTab('finance')}
                className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'finance'
                    ? 'border-emerald-500 text-white font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>💰 Finance & Budgets</span>
                <Badge variant="success" className="text-[9px] py-0">Treasurer Flow</Badge>
              </button>
            )}

            {permissions.canScanAttendance && (
              <button
                onClick={() => setActiveTab('scanner')}
                className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'scanner'
                    ? 'border-cyan-500 text-white font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                🎟️ QR Attendance Scanner
              </button>
            )}
          </div>

          {/* =============================================================== */}
          {/* TAB 1: EVENTS LIST & ROLE ACTIONS */}
          {/* =============================================================== */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((ev) => (
                  <Card key={ev.id} className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="purple" className="capitalize">
                          {ev.category}
                        </Badge>
                        <Badge variant={ev.status === 'published' ? 'success' : 'warning'} className="uppercase">
                          {ev.status}
                        </Badge>
                      </div>

                      <CardTitle className="text-xl">{ev.title}</CardTitle>
                      <p className="text-xs text-cyan-400 mt-0.5">{ev.tagline}</p>
                      <CardDescription className="text-xs text-slate-300 mt-2">
                        {ev.description}
                      </CardDescription>

                      <div className="text-xs text-slate-400 mt-4 space-y-1 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                        <div><strong>Venue:</strong> {ev.venue}</div>
                        <div><strong>Capacity:</strong> {ev.current_registrations_count} / {ev.max_capacity} Enrolled</div>
                        <div><strong>Created By:</strong> Committee Operations</div>
                      </div>
                    </div>

                    {/* Committee Actions Bar */}
                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                      <div className="text-[11px] text-slate-500">
                        {ev.status === 'published' ? 'Visible to all students' : 'Requires Approval'}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Approve Button: Secretary & Faculty Mentor Only */}
                        {ev.status !== 'published' && permissions.canApproveEvent && (
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-xs"
                            onClick={() => handleApprove(ev.id)}
                          >
                            ✓ Approve & Publish
                          </Button>
                        )}

                        {/* Review Button: Joint Secretary */}
                        {ev.status === 'draft' && currentUser.role === 'joint_secretary' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="text-xs"
                            onClick={() => alert('Event reviewed by Joint Secretary! Forwarded to Secretary for signoff.')}
                          >
                            Forward to Secretary
                          </Button>
                        )}

                        {/* Delete Button: Secretary & Faculty Only */}
                        {permissions.canDeleteEvent && (
                          <Button
                            variant="destructive"
                            size="sm"
                            className="text-xs"
                            onClick={() => handleDelete(ev.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 2: TREASURER & FINANCE ISOLATION */}
          {/* =============================================================== */}
          {activeTab === 'finance' && permissions.canAccessFinance && (
            <div className="space-y-6">
              <Card className="p-6">
                <CardTitle className="text-xl mb-1">Treasurer Budget Control & Expense Verification</CardTitle>
                <CardDescription className="text-xs text-slate-400 mb-6">
                  Separation of powers: Financial records are accessible only to the Treasurer, Secretary, and Faculty Mentor.
                </CardDescription>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 uppercase">Allocated Budget</div>
                    <div className="text-2xl font-black text-white mt-1">₹ 75,000</div>
                    <div className="text-[10px] text-slate-500 mt-1">Syscraft Hackathon + Workshop</div>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 uppercase">Utilized Expenses</div>
                    <div className="text-2xl font-black text-cyan-400 mt-1">₹ 28,450</div>
                    <div className="text-[10px] text-slate-500 mt-1">Verified with Receipts</div>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 uppercase">Remaining Funds</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">₹ 46,550</div>
                    <div className="text-[10px] text-slate-500 mt-1">Available balance</div>
                  </div>
                </div>

                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Recent Expense Claims
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-950/70 text-xs">
                    <div>
                      <div className="font-semibold text-white">Hall Sound & Lighting Equipment</div>
                      <div className="text-slate-400 text-[11px]">Claimed by Exec Member • Syscraft Hackathon</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-white">₹ 14,200</span>
                      <Badge variant="success">✓ Verified & Disbursed</Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-slate-800 bg-slate-950/70 text-xs">
                    <div>
                      <div className="font-semibold text-white">Student Badges & Printing Material</div>
                      <div className="text-slate-400 text-[11px]">Claimed by Exec Member • AI Bootcamp</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-white">₹ 4,250</span>
                      {currentUser.role === 'treasurer' ? (
                        <Button variant="default" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-xs py-1 px-2">
                          Verify & Disburse
                        </Button>
                      ) : (
                        <Badge variant="warning">Pending Treasurer</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 3: QR ATTENDANCE SCANNER */}
          {/* =============================================================== */}
          {activeTab === 'scanner' && permissions.canScanAttendance && (
            <div className="max-w-xl mx-auto space-y-6">
              <Card className="p-6">
                <CardTitle className="text-xl mb-1">Venue Attendance Check-in</CardTitle>
                <CardDescription className="text-xs text-slate-400 mb-6">
                  Executive Members verify student registrations on-site to automatically update their 4-Year ITA Passport.
                </CardDescription>

                <form onSubmit={handleScan} className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Scan or Enter Student Ticket Code (e.g. NEXUS-A49F21):
                    </label>
                    <Input
                      placeholder="NEXUS-..."
                      value={scannedCode}
                      onChange={(e) => setScannedCode(e.target.value)}
                      className="font-mono text-center tracking-widest text-base"
                    />
                  </div>

                  <Button variant="glow" size="md" className="w-full">
                    Verify & Mark Attendance
                  </Button>
                </form>

                {scanResult && (
                  <div className="mt-4 p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs text-center">
                    {scanResult}
                  </div>
                )}
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* CREATE EVENT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <Card className="max-w-md w-full border-indigo-500/50 bg-slate-900 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-xl">Create Event Draft</CardTitle>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Event Title</label>
                <Input
                  required
                  placeholder="e.g. CyberSecurity Defense CTF"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Category</label>
                <select
                  value={newEventCategory}
                  onChange={(e) => setNewEventCategory(e.target.value as 'workshop' | 'hackathon' | 'symposium')}
                  className="w-full h-11 rounded-xl border border-slate-800 bg-slate-900 px-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="workshop">Workshop</option>
                  <option value="hackathon">Hackathon</option>
                  <option value="symposium">Symposium</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Venue</label>
                <Input
                  required
                  placeholder="e.g. IT Department Lab 4"
                  value={newEventVenue}
                  onChange={(e) => setNewEventVenue(e.target.value)}
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="glow" size="sm">
                  Save as Draft
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}
