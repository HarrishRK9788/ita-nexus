import {
  UserProfile,
  ItaEvent,
  EventRegistration,
  ItaPassport,
  EventApprovalRecord
} from '@/lib/types';

// -----------------------------------------------------------------------------
// SEED MOCK DATA (SYSCRAFT & ITA COLLEGE ENVIRONMENT)
// -----------------------------------------------------------------------------

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'usr-student-1',
    email: '24i318@psgtech.ac.in',
    name: 'Harrish R K',
    roll_number: '24I318',
    department: 'IT',
    year_of_study: 2,
    role: 'student',
    skills: ['React', 'Next.js', 'PostgreSQL'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'usr-exec-1',
    email: '24i326@psgtech.ac.in',
    name: 'Keshore P R',
    roll_number: '24I326',
    department: 'IT',
    year_of_study: 2,
    role: 'executive_member',
    skills: ['Event Ops', 'TypeScript'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'usr-sec-1',
    email: '24i309@psgtech.ac.in',
    name: 'David Melvin L',
    roll_number: '24I309',
    department: 'IT',
    year_of_study: 3,
    role: 'secretary',
    skills: ['Governance', 'Security'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const MOCK_EVENTS: ItaEvent[] = [
  {
    id: 'evt-syscraft-2026',
    title: 'Syscraft: ITA Innovation Challenge',
    slug: 'syscraft-2026',
    tagline: "Think Beyond. Design What's Next.",
    description: 'The flagship IT Department hackathon solving real campus and departmental challenges with role-aware platforms.',
    category: 'hackathon',
    venue: 'IT Dept Computer Lab 3 & F-Block Seminar Hall',
    start_time: '2026-11-05T09:00:00Z',
    end_time: '2026-11-06T17:00:00Z',
    registration_deadline: '2026-11-03T23:59:59Z',
    max_capacity: 150,
    current_registrations_count: 84,
    eligible_years: [1, 2, 3, 4],
    status: 'published',
    created_by: 'usr-exec-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'evt-ai-bootcamp',
    title: 'Modern Full-Stack & GenAI Workshop',
    slug: 'fullstack-genai-workshop',
    tagline: 'Master Next.js App Router, Supabase, and LLM orchestration.',
    description: 'Hands-on weekend bootcamp building scalable micro-SaaS and AI-powered workflows for engineering students.',
    category: 'workshop',
    venue: 'IT Department Auditorium',
    start_time: '2026-11-15T10:00:00Z',
    end_time: '2026-11-15T16:00:00Z',
    registration_deadline: '2026-11-14T18:00:00Z',
    max_capacity: 100,
    current_registrations_count: 65,
    eligible_years: [1, 2, 3, 4],
    status: 'published',
    created_by: 'usr-exec-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const MOCK_PASSPORTS: Record<string, ItaPassport> = {
  'usr-student-1': {
    student_id: 'usr-student-1',
    total_events_attended: 4,
    total_certificates_earned: 3,
    volunteering_hours: 18,
    skills_acquired: ['Next.js', 'PostgreSQL', 'Cloud Infrastructure', 'Event Coordination'],
    timeline: [
      {
        year: 1,
        items: [
          {
            id: 'pass-1',
            title: 'ITA Freshers Orientation & Induction',
            category: 'seminar',
            type: 'event',
            date: '2024-09-10'
          },
          {
            id: 'pass-2',
            title: 'Intro to Web Development Certificate',
            category: 'workshop',
            type: 'certificate',
            date: '2024-11-20'
          }
        ]
      },
      {
        year: 2,
        items: [
          {
            id: 'pass-3',
            title: 'Syscraft Innovation Challenge Participant',
            category: 'hackathon',
            type: 'event',
            date: '2025-10-15'
          }
        ]
      }
    ]
  }
};

// -----------------------------------------------------------------------------
// DATA INTERFACES & STUBS (PRESERVED SIGNATURES)
// -----------------------------------------------------------------------------

export async function getEvents(): Promise<ItaEvent[]> {
  // Stubs return mock data. Dev 2 replaces with Supabase query without altering signature.
  return Promise.resolve(MOCK_EVENTS);
}

export async function getEventById(id: string): Promise<ItaEvent | null> {
  const event = MOCK_EVENTS.find(e => e.id === id || e.slug === id) || null;
  return Promise.resolve(event);
}

export async function registerForEvent(
  eventId: string,
  studentId: string
): Promise<{ success: boolean; registration?: EventRegistration; error?: string }> {
  const existing = MOCK_EVENTS.find(e => e.id === eventId);
  if (!existing) {
    return { success: false, error: 'Event not found' };
  }

  const registration: EventRegistration = {
    id: `reg-${Date.now()}`,
    event_id: eventId,
    student_id: studentId,
    status: 'registered',
    ticket_code: `NEXUS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    registered_at: new Date().toISOString()
  };

  return Promise.resolve({ success: true, registration });
}

export async function getStudentPassport(studentId: string): Promise<ItaPassport | null> {
  const passport = MOCK_PASSPORTS[studentId] || {
    student_id: studentId,
    total_events_attended: 0,
    total_certificates_earned: 0,
    volunteering_hours: 0,
    skills_acquired: [],
    timeline: []
  };
  return Promise.resolve(passport);
}

export async function createEventDraft(
  input: Omit<ItaEvent, 'id' | 'current_registrations_count' | 'created_at' | 'updated_at'>
): Promise<ItaEvent> {
  const newEvent: ItaEvent = {
    ...input,
    id: `evt-${Date.now()}`,
    current_registrations_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  return Promise.resolve(newEvent);
}

export async function submitEventApproval(
  record: Omit<EventApprovalRecord, 'id' | 'timestamp'>
): Promise<EventApprovalRecord> {
  const approval: EventApprovalRecord = {
    ...record,
    id: `appr-${Date.now()}`,
    timestamp: new Date().toISOString()
  };
  return Promise.resolve(approval);
}
