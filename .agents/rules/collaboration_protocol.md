# 3-Developer Collaborative Integration Protocol for Google Antigravity

This rule is automatically enforced by Google Antigravity for all developers working on **ITA Nexus**:
- **Harrish R K** (`24I318`, `@HarrishRK9788`)
- **Keshore P R** (`24I326`)
- **David Melvin L** (`24I309`)

---

## 🚨 MANDATORY AGENT CONSTRAINTS

### 1. Cross-Module Integration is Additive, NEVER Destructive
- You are **encouraged** to access, import, call, and connect features built by another developer to achieve end-to-end functionality.
- You must **NEVER DELETE OR REWRITE** an existing component, service, or module created by another developer.
- If you need additional props, endpoints, or data fields from another developer's code:
  - **Surgically extend** existing functions by adding optional parameters or return values.
  - **Wrap or enhance** existing components without altering their core layout or breaking existing usages.
  - Do not replace their implementation with your own version.

### 2. Zero Regression Guarantee
- When you modify another developer's code to connect your feature, **the original feature must continue working flawlessly**.
- Before declaring any task complete, you must run and pass the full verification suite:
  ```bash
  npm run lint
  npm run typecheck
  npm test
  npm run build
  ```
- If any check fails or breaks another developer's types, you must fix it immediately without deleting their code.

### 3. Preserving Public Interfaces & Shared Contracts
- Public function signatures in `lib/data/` and types in `lib/types/` are shared contracts.
- Do not remove or alter existing types or function parameters. Always prefer additive changes (e.g., adding optional fields `newField?: string`).
- Never delete or edit an existing SQL migration in `supabase/migrations/`. Always create a new migration.

### 4. Git & Branching Hygiene
- Never commit directly to `main`.
- Always verify your changes with `git diff --stat` before committing.
- Never run destructive git commands (`git push --force`, `git reset --hard`, `git clean -fd`).
- Never touch `.env` files or commit credentials.
