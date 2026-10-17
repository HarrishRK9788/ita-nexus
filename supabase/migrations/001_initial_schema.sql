-- ==============================================================================
-- MIGRATION 001: INITIAL SCHEMA & RBAC FOR ITA NEXUS
-- Based on Syscraft PS1: ITA Digital Platform Specification
-- ==============================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. USER ROLES ENUM
create type public.user_role as enum (
  'student',
  'executive_member',
  'joint_secretary',
  'secretary',
  'treasurer',
  'faculty_mentor'
);

-- 3. PROFILES / USERS TABLE
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique check (email like '%@psgtech.ac.in'),
  name text not null,
  roll_number text unique,
  department text not null default 'IT',
  year_of_study int not null check (year_of_study between 1 and 4),
  role public.user_role not null default 'student',
  avatar_url text,
  skills text[] default array[]::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. EVENTS TABLE
create type public.event_status as enum (
  'draft',
  'under_review',
  'pending_approval',
  'faculty_review',
  'approved',
  'published',
  'ongoing',
  'completed',
  'archived'
);

create type public.event_category as enum (
  'symposium',
  'hackathon',
  'workshop',
  'seminar',
  'competition',
  'mentorship'
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  tagline text,
  description text not null,
  category public.event_category not null default 'workshop',
  banner_url text,
  venue text not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  registration_deadline timestamptz not null,
  max_capacity int,
  eligible_years int[] not null default array[1,2,3,4],
  status public.event_status not null default 'draft',
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5. EVENT APPROVAL AUDIT LOGS
create table public.event_approvals (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  step text not null check (step in ('joint_secretary', 'secretary', 'faculty_mentor')),
  action text not null check (action in ('submit', 'review', 'approve', 'reject', 'request_changes')),
  action_by uuid not null references public.profiles(id),
  remarks text,
  created_at timestamptz not null default now()
);

-- 6. REGISTRATIONS (Duplicate Prevention Enforced)
create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'registered' check (status in ('registered', 'waitlisted', 'cancelled')),
  ticket_code text not null unique,
  created_at timestamptz not null default now(),
  constraint unique_student_per_event unique (event_id, student_id)
);

-- 7. ATTENDANCE (QR Verification)
create table public.attendance (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  scanned_by uuid not null references public.profiles(id),
  verified boolean not null default true,
  attended_at timestamptz not null default now(),
  constraint unique_attendance_per_event unique (event_id, student_id)
);

-- 8. DIGITAL CERTIFICATES
create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  certificate_number text not null unique,
  issue_date timestamptz not null default now(),
  download_url text not null,
  role text not null default 'participant',
  created_at timestamptz not null default now()
);

-- 9. FINANCE (Treasurer Separation of Concerns)
create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete set null,
  title text not null,
  amount numeric(10,2) not null check (amount > 0),
  requested_by uuid not null references public.profiles(id),
  receipt_url text,
  status text not null default 'draft' check (status in ('draft', 'submitted', 'verified_by_treasurer', 'approved', 'rejected', 'disbursed')),
  treasurer_notes text,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

-- 10. ANNOUNCEMENTS
create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  priority text not null default 'normal' check (priority in ('normal', 'important', 'urgent')),
  target_audience text not null default 'all' check (target_audience in ('all', 'students', 'committee')),
  author_id uuid not null references public.profiles(id),
  published_at timestamptz not null default now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.event_approvals enable row level security;
alter table public.registrations enable row level security;
alter table public.attendance enable row level security;
alter table public.certificates enable row level security;
alter table public.expenses enable row level security;
alter table public.announcements enable row level security;

-- Profiles: Anyone can view profiles; only self can update own profile
create policy "Public profiles are viewable by authenticated users"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id);

-- Events: Published events visible to everyone; drafts visible to committee
create policy "Published events viewable by all authenticated users"
  on public.events for select
  to authenticated
  using (
    status in ('published', 'ongoing', 'completed', 'archived')
    or (
      exists (
        select 1 from public.profiles
        where id = auth.uid() and role in ('executive_member', 'joint_secretary', 'secretary', 'treasurer', 'faculty_mentor')
      )
    )
  );

-- Registrations: Students can view and manage their own registrations
create policy "Students can view their own registrations"
  on public.registrations for select
  to authenticated
  using (student_id = auth.uid());

create policy "Students can register themselves"
  on public.registrations for insert
  to authenticated
  with check (student_id = auth.uid());

-- Expenses: Restricted strictly to Treasurer and Committee roles
create policy "Only committee can view expenses"
  on public.expenses for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('treasurer', 'secretary', 'faculty_mentor')
    )
  );

-- Announcements: Viewable by target audience
create policy "Announcements viewable by target audience"
  on public.announcements for select
  to authenticated
  using (
    target_audience = 'all'
    or (
      target_audience = 'committee' and exists (
        select 1 from public.profiles
        where id = auth.uid() and role in ('executive_member', 'joint_secretary', 'secretary', 'treasurer', 'faculty_mentor')
      )
    )
  );
