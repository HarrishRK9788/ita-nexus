# ITA NEXUS

> **Secure Digital Operating Platform & Institutional Memory for ITA**  
> *"One Platform. Every ITA Experience."*  
> **Challenge:** Syscraft — ITA Innovation Challenge (Problem Statement PS1: ITA Digital Platform)  
> **Institution:** PSG College of Technology — Department of Information Technology

---

## 👥 Development Team
- **Harrish R K** (`24I318`) — `@HarrishRK9788`
- **Keshore P R** (`24I326`)
- **David Melvin L** (`24I309`)

---

## 🚀 Core Pillars & Platform Architecture

| Pillar | Scope | Core Capabilities |
| :--- | :--- | :--- |
| **DISCOVER** | Public & Student | Events, Workshops, Competitions, Opportunities, Announcements |
| **PARTICIPATE** | Student Experience | Smart Registration, QR Attendance Verification, Feedback, Digital Certificates |
| **OPERATE** | Committee Operations | Role Dashboards, Approval Workflows, Tasks, Finance & Budgets, Analytics |
| **REMEMBER** | Institutional Continuity | **ITA Passport** (4-year verified journey), **Memory Vault**, **Event Playbooks**, Committee Handover |
| **IMPROVE** | System Intelligence | Automation, Attendance Insights, Safe & Role-aware AI Assistant |
| **LEARN** | Onboarding | Interactive Role-Based Guided Tour, Contextual Help |

---

## 🛡️ Role-Based Access Control (RBAC Hierarchy)
1. **Faculty / Staff Mentor** — Institutional oversight & high-tier event approvals.
2. **Secretary** — Executive governance, event authorization, control center.
3. **Joint Secretary** — Operational review of event drafts and tasks.
4. **Executive Members** — Drafting events, executing logistics, QR check-in scanning.
5. **Treasurer** — Isolated financial workflows (expense requests, receipts, budget validation).
6. **Students (640+ IT students)** — Event participation, ITA Passport, certificate repository.

---

## 🤝 Collaborative Engineering & Additive Integration Rules

All 3 developers use Google Antigravity to build and integrate features concurrently:
1. **Cross-Module Editing for Integration:** Developers and agents **CAN** access, import, and enhance another developer's code to integrate workflows, pass props, and ensure end-to-end functionality.
2. **Strictly Non-Destructive:** **NEVER** delete or rewrite an existing module from scratch. All changes to another developer's code must be additive, surgical, and backward-compatible.
3. **Mutual Continuity:** When modifying another module to connect your feature, ensure both the existing feature and the new feature work seamlessly together.
4. **Automated Verification:** Before committing, every developer must ensure all checks pass:
   ```bash
   npm run lint && npm run typecheck && npm test && npm run build
   ```

---

## 📂 Ownership Directory Matrix

| Developer Role | Primary Ownership | Contract / Cross-Integration Scope |
| :--- | :--- | :--- |
| **Dev 1 — Frontend** | `app/(public)/`, `app/(student)/`, `components/ui/`, `components/student/` | Consumes `lib/data/`, integrates with shared layout |
| **Dev 2 — Backend & Security** | `lib/supabase/`, `lib/data/`, `lib/types/`, `supabase/` | Provides schema, RLS, auth, and query implementations |
| **Dev 3 — Committee & Integration** | `app/(committee)/`, `components/committee/`, `tests/`, `.github/` | Committee workflow, CI/CD, integration testing |

---

## 🗓️ Implementation Roadmap

### Phase 1 — Core MVP
- Auth & Role Setup (`@psgtech.ac.in` domain restriction)
- Event Approval Lifecycle: `Draft -> JS Review -> Secretary Approval -> Publish`
- Smart Event Registration with duplicate prevention
- QR Attendance Scanning
- **ITA Passport**: 4-year continuous journey visualization
- Role-based Guided Tour

### Phase 2 — Ops & Institutional Continuity
- Isolated Finance & Expense validation flow for Treasurer
- Digital Certificate Generation
- **Memory Vault** (event retrospectives & lessons learned)
- **Event Playbooks** (reusable templates)
- Automated Committee Handover without source-code alteration

### Phase 3 — Intel & Enhancements
- Role-aware AI Assistant
- Personalized event recommendations
- Advanced departmental analytics

---

## 🧪 Verification & Development Commands

```bash
# Start local dev server
npm run dev

# Run Typecheck
npm run typecheck

# Run Linter
npm run lint

# Run Unit / Smoke Tests
npm test

# Run Production Build
npm run build
```
