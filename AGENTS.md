<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Antigravity Rules for ITA Nexus (3-Developer Collaborative Engineering)

**Project:** ITA Nexus (Syscraft — PS1: ITA Digital Platform)  
**Team:** 
- Harrish R K (`24I318`, `@HarrishRK9788`)
- Keshore P R (`24I326`)
- David Melvin L (`24I309`)

---

## 🤝 Collaborative Integration & Cross-Editing Rules

All three developers use Google Antigravity to build, integrate, and polish features together. The following rules govern cross-developer edits:

### 1. Cross-Code Integration is Allowed and Encouraged
A developer (and their Antigravity agent) **MAY** access, call, and edit another developer's code when needed to:
- Connect UI components to backend endpoints or data stubs.
- Pass required props or event handlers.
- Fix integration bugs, type mismatches, or layout conflicts.
- Ensure the entire website works end-to-end as one cohesive platform.

### 2. STRICT RULE: No Destructive Rewrites or Module Deletions
- **NEVER** delete or rewrite from scratch a feature, file, or module built by another developer.
- **NEVER** discard another developer's logic to replace it with an entirely different approach.
- Modifications to another developer's code must be **additive, surgical, and backward-compatible**:
  - Keep the original structure and comments intact.
  - Extend props, functions, or database queries rather than replacing them.
  - If a function needs new behavior, add optional parameters or overload safely.

### 3. Mutual Continuity & Zero Regression
- When editing another developer's code to make your feature work, **verify that their original feature continues to function properly**.
- Always run the verification suite before committing:
  ```bash
  npm run lint && npm run typecheck && npm test && npm run build
  ```

### 4. Database Migrations are Append-Only
- Never edit or delete an existing migration in `supabase/migrations/`.
- If schema adjustments are required for integration, add a new timestamped migration file.

### 5. Shared Contracts (Consensus Required)
- Modifications to `package.json`, `app/layout.tsx`, `middleware.ts`, `lib/types/`, or `.env.example` must be minimal and must not break existing dependencies or paths.

### 6. No Secrets & Safe Operations
- Never expose or commit `.env` files or the Supabase Service Role key.
- Never execute destructive git commands (`git push --force`, `git reset --hard`, `git clean -fd`).

---

## 📋 Antigravity Agent Prompting Pattern
When delegating work to Antigravity, use this mindset:
> *"I am implementing/integrating [feature]. I need to consume/adjust [other dev's component/module]. Enhance it with the required changes without deleting or rewriting its existing logic. Ensure both features work together and all tests pass."*
