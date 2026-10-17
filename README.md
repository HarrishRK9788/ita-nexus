# ITA Nexus

Official digital platform and association hub for the **Information Technology Association (ITA)** at PSG College of Technology.

---

## 👥 3-Developer Roles & File Ownership

| Developer | Responsibility | Owned Folders |
| :--- | :--- | :--- |
| **Dev 1 — Frontend** | Student UI & shared components | `app/(public)/`, `app/(student)/`, `components/ui/`, `components/student/` |
| **Dev 2 — Backend & Security** | Database, auth, RLS, data functions | `lib/supabase/`, `lib/data/`, `lib/types/`, `supabase/` |
| **Dev 3 — Committee & Integration** | Committee workflows, tests, CI, release | `app/(committee)/`, `components/committee/`, `tests/`, `.github/` |

### 🔒 Shared Contract Files
Changes to contract files require explicit PRs prefixed with `shared:` and consensus:
- `package.json` & `package-lock.json`
- `tailwind.config.*` / global styles
- `app/layout.tsx`
- `middleware.ts`
- `.env.example`
- `AGENTS.md`
- `lib/types/`

---

## 🛠️ Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack, TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Auth:** [Supabase](https://supabase.com/) (PostgreSQL + Row Level Security)
- **CI / CD:** GitHub Actions + Vercel

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your Supabase credentials:
```bash
cp .env.example .env.local
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Verification Commands

Every developer must run and pass all checks before committing or opening a PR:
```bash
# Typecheck
npm run typecheck

# Lint
npm run lint

# Tests
npm run test

# Production Build
npm run build
```

---

## 🤖 Antigravity AI Safety Guidelines
All agents must adhere to the rules specified in [`AGENTS.md`](./AGENTS.md). 
Never request an agent to modify files outside your assigned domain without following the **Cross-Ownership Change Protocol**.
