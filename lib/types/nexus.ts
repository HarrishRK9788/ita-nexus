/**
 * ITA NEXUS — Core Type Definitions
 * Based on Syscraft PS1: ITA Digital Platform Specification
 * 
 * Shared Contract File:
 * - Changes must be additive and backward-compatible.
 * - Follows the Additive Integration Policy across all 3 developers.
 */

// -----------------------------------------------------------------------------
// 1. ROLES & PERMISSIONS (RBAC)
// -----------------------------------------------------------------------------

export type UserRole =
  | 'student'
  | 'executive_member'
  | 'joint_secretary'
  | 'secretary'
  | 'treasurer'
  | 'faculty_mentor';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  roll_number?: string;
  department: 'IT';
  year_of_study: 1 | 2 | 3 | 4;
  role: UserRole;
  avatar_url?: string;
  skills?: string[];
  created_at: string;
  updated_at: string;
}

// -----------------------------------------------------------------------------
// 2. OPERATIONS: EVENTS & APPROVAL WORKFLOW
// -----------------------------------------------------------------------------

export type EventStatus =
  | 'draft'               // Created by Executive Member
  | 'under_review'        // Submitted to Joint Secretary
  | 'pending_approval'    // Reviewed by JS, awaiting Secretary
  | 'faculty_review'      // Optional: Awaiting Faculty Mentor signoff
  | 'approved'            // Approved and scheduled
  | 'published'           // Publicly visible to students for registration
  | 'ongoing'             // Active event
  | 'completed'           // Event concluded
  | 'archived';

export type EventCategory =
  | 'symposium'
  | 'hackathon'
  | 'workshop'
  | 'seminar'
  | 'competition'
  | 'mentorship';

export interface ItaEvent {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: EventCategory;
  banner_url?: string;
  venue: string;
  start_time: string;
  end_time: string;
  registration_deadline: string;
  max_capacity?: number;
  current_registrations_count: number;
  eligible_years: (1 | 2 | 3 | 4)[];
  status: EventStatus;
  created_by: string;      // UserProfile.id
  created_at: string;
  updated_at: string;
}

export interface EventApprovalRecord {
  id: string;
  event_id: string;
  step: 'joint_secretary' | 'secretary' | 'faculty_mentor';
  action: 'submit' | 'review' | 'approve' | 'reject' | 'request_changes';
  action_by: string;       // UserProfile.id
  remarks?: string;
  timestamp: string;
}

// -----------------------------------------------------------------------------
// 3. STUDENT JOURNEY & PARTICIPATION
// -----------------------------------------------------------------------------

export type RegistrationStatus = 'registered' | 'waitlisted' | 'cancelled';

export interface EventRegistration {
  id: string;
  event_id: string;
  student_id: string;      // UserProfile.id
  status: RegistrationStatus;
  ticket_code: string;     // Unique alphanumeric / QR payload
  registered_at: string;
}

export interface AttendanceRecord {
  id: string;
  event_id: string;
  student_id: string;
  scanned_by: string;      // Committee member who scanned QR
  attended_at: string;
  verified: boolean;
}

export interface DigitalCertificate {
  id: string;
  event_id: string;
  student_id: string;
  certificate_number: string;
  issue_date: string;
  download_url: string;
  metadata?: {
    event_title: string;
    student_name: string;
    role: 'participant' | 'winner' | 'runner_up' | 'volunteer' | 'organizer';
  };
}

/**
 * ITA Passport: The 4-Year Verified Student Journey
 */
export interface ItaPassport {
  student_id: string;
  total_events_attended: number;
  total_certificates_earned: number;
  volunteering_hours: number;
  skills_acquired: string[];
  timeline: {
    year: 1 | 2 | 3 | 4;
    items: {
      id: string;
      title: string;
      category: EventCategory;
      type: 'event' | 'certificate' | 'volunteering';
      date: string;
    }[];
  }[];
}

// -----------------------------------------------------------------------------
// 4. MEMORY & CONTINUITY (INSTITUTIONAL MEMORY)
// -----------------------------------------------------------------------------

export interface MemoryVaultEntry {
  id: string;
  event_id?: string;
  title: string;
  summary: string;
  lessons_learned: string[];
  key_metrics: {
    total_participants: number;
    budget_utilized: number;
    rating: number;
  };
  attachments?: string[];
  created_by: string;
  created_at: string;
}

export interface EventPlaybook {
  id: string;
  title: string;
  category: EventCategory;
  checklist: {
    phase: 'pre_event' | 'during_event' | 'post_event';
    task: string;
    recommended_deadline_days_before: number;
  }[];
  resource_links: string[];
  last_updated_by: string;
  updated_at: string;
}

export interface CommitteeHandover {
  id: string;
  academic_year: string;   // e.g. "2025-2026"
  outgoing_role: UserRole;
  outgoing_member_id: string;
  incoming_member_id?: string;
  handover_notes: string;
  status: 'pending' | 'completed';
  completed_at?: string;
}

// -----------------------------------------------------------------------------
// 5. FINANCE (TREASURER SEPARATION OF CONCERNS)
// -----------------------------------------------------------------------------

export type ExpenseStatus = 'draft' | 'submitted' | 'verified_by_treasurer' | 'approved' | 'rejected' | 'disbursed';

export interface ExpenseRecord {
  id: string;
  event_id: string;
  title: string;
  amount: number;
  requested_by: string;
  receipt_url?: string;
  status: ExpenseStatus;
  treasurer_notes?: string;
  approved_at?: string;
  created_at: string;
}

// -----------------------------------------------------------------------------
// 6. GOVERNANCE & COMMUNICATION
// -----------------------------------------------------------------------------

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'normal' | 'important' | 'urgent';
  target_audience: 'all' | 'students' | 'committee';
  author_id: string;
  published_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  link_url?: string;
  read: boolean;
  created_at: string;
}
