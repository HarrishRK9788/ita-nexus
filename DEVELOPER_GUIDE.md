# ITA Nexus — 3-Developer Collaboration & Antigravity Guide

Welcome to the **ITA Nexus** repository! This guide ensures **Harrish, Keshore, and David** (and their respective Google Antigravity agents) work in complete synchronization without clashing or deleting each other's code.

---

## 🤖 How Google Antigravity Operates on This Repository

Whenever any of us opens this repository in **Google Antigravity IDE**, Antigravity automatically detects and enforces the rules in:
- [`.agents/rules/collaboration_protocol.md`](./.agents/rules/collaboration_protocol.md)
- [`AGENTS.md`](./AGENTS.md)
- [`GEMINI.md`](./GEMINI.md)

### The Golden Rule of Integration:
> **"You can access and edit each other's code to connect features and fix integration bugs, but you must NEVER delete or rewrite another developer's module from scratch."**

- **Allowed:** Importing another developer's component, passing new props, calling stubs in `lib/data/`, adding optional parameters, adjusting CSS layouts to fit together.
- **Forbidden:** Deleting someone else's file, replacing their entire implementation with a different approach, or breaking existing function signatures.

---

## 💬 How to Prompt Your Antigravity Agent

Whenever you give a task to Antigravity, use this simple pattern:

```text
Task: Implement [your feature].
Integration: Connect with [existing component/data function] built by [teammate].
Constraint: Do NOT delete or rewrite their existing code; extend it additively. 
Verify: Ensure both their feature and my feature work, and run all checks (lint, typecheck, test, build).
```

---

## 🔄 Daily Workflow for Developers

### 1. Start of Day / Before Every Task
Always synchronize with the latest code from `main`:
```bash
git checkout main
git pull origin main
git checkout -b feature/<your-name>-<task>
```

### 2. During Development
- Write code in your designated domain or integrate with shared interfaces.
- If you need backend data before the database is ready, call the stubs in [`lib/data/nexus.ts`](./lib/data/nexus.ts).
- If you are building UI, use the shared components in [`components/ui/`](./components/ui/).

### 3. Verification (Before Committing)
Run the 4 standard checks:
```bash
npm run lint       # Code style
npm run typecheck  # TypeScript types
npm test           # Smoke & unit tests
npm run build      # Next.js production build
```
**All 4 checks must pass before opening a Pull Request.**

### 4. Commit & Pull Request
```bash
git status
git diff --stat    # Review every touched file to ensure no unexpected deletions
git add <files>
git commit -m "feat(module): description of changes"
git push origin feature/<your-name>-<task>
```
Open a Pull Request on GitHub. GitHub Actions will automatically verify your code with CI, and teammates will be tagged for review via [`.github/CODEOWNERS`](./.github/CODEOWNERS).
