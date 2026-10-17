## Description
<!-- Provide a brief description of the changes in this PR -->

## PR Category
- [ ] Feature (within my owned folders)
- [ ] Bug fix
- [ ] `cross:` Change across another developer's domain (Owner tagged as reviewer)
- [ ] `shared:` Shared contract change (Requires consensus from all 3 developers)

## Owned Folder Verification
- [ ] Dev 1 (Frontend): `app/(public)/`, `app/(student)/`, `components/ui/`, `components/student/`
- [ ] Dev 2 (Backend & Security): `lib/supabase/`, `lib/data/`, `lib/types/`, `supabase/`
- [ ] Dev 3 (Committee & Integration): `app/(committee)/`, `components/committee/`, `tests/`, `.github/`

## Pre-Merge Checklist
- [ ] Only files in my owned folders changed, or this is an approved `cross:` / `shared:` PR
- [ ] No unexpected deleted files or lines in `git diff --stat`
- [ ] No secrets or `.env*` files committed
- [ ] Lint, typecheck, build, and tests pass (`npm run lint && npm run typecheck && npm run build && npm test`)
- [ ] Tested manually as student and as committee where relevant
- [ ] All callers updated for any changed interface / function signature
