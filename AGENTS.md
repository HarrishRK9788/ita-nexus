<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Antigravity Rules for ITA Nexus (3-Developer Safe Collaboration)

Google Antigravity agents can edit many files and run terminal commands, so they need strict boundaries. Check your Antigravity settings for the terminal and review policies and choose the most cautious option that still lets you work, so you review edits and approve commands before they run.

## Ownership Boundaries
- **Dev 1 — Frontend:** `app/(public)/`, `app/(student)/`, `components/ui/`, `components/student/`
- **Dev 2 — Backend & Security:** `lib/supabase/`, `lib/data/`, `lib/types/`, `supabase/`
- **Dev 3 — Committee & Integration:** `app/(committee)/`, `components/committee/`, `tests/`, `.github/`
- **Shared Contract Files (Consensus Required):** `package.json`, `package-lock.json`, `tailwind.config.*`, `app/layout.tsx`, `middleware.ts`, `.env.example`, `AGENTS.md`, `lib/types/`

## Mandatory Rules Every Agent Must Follow:
1. **Scope Restriction:** Only modify files inside the folders owned by the developer who initiated the task. If a change is needed elsewhere, STOP and report it instead of editing.
2. **No Unprompted Deletions:** Never delete a file or exported function unless the prompt explicitly names it. Prefer deprecating over deleting.
3. **Shared Contract Protection:** Never edit shared contract files unless the task is explicitly marked as a `shared:` task with team consensus.
4. **Immutable Migrations:** Never edit or delete an existing database migration. Always add a new timestamped migration file.
5. **No Dangerous Terminal / Git Operations:** Never run `git push --force`, `git reset --hard`, `git clean`, `rm -rf`, or change git branches without asking.
6. **No Secret Leaks:** Never touch `.env*` files or print secrets. The Supabase service-role key is strictly server-only and must never appear in client code.
7. **Interface Preservation:** Preserve existing function signatures and types. If an interface must change, list every caller and update them all in the same task.
8. **Automated Verification:** After any modification, run lint, typecheck, build, and tests, and report the results honestly.

## Prompt Template for Tasks:
```text
Task: [one specific change]. 
You may change only: [list of files/folders]. 
Do not change: [contract files and other owners' folders]. 
Preserve these interfaces: [function names/types]. 
Done when: [checks pass + specific behaviour works]. 
Do not delete anything not listed here. At the end, list every file you changed and why.
```

Never tell an agent to "build the whole app" or "fix everything". After each agent run, review the diff yourself before committing.
