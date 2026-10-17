## Description
<!-- Provide a brief description of the changes in this PR and how it integrates with the rest of the platform -->

## PR Type
- [ ] New Feature
- [ ] Cross-Integration / Bug Fix (enhancing another module to connect features)
- [ ] Shared Contract Update (`lib/types/`, configs, layouts)

## Integration & Continuity Checklist
- [ ] Additive & Non-Destructive: No existing module or another developer's code was deleted or rewritten from scratch.
- [ ] Backward Compatibility: Existing features and interfaces modified remain working as expected.
- [ ] Quality Checks Pass: `npm run lint && npm run typecheck && npm test && npm run build` all pass with 0 errors.
- [ ] Security: No secrets, credentials, or `.env` files committed.
- [ ] Multi-Role Testing: Verified the change does not violate role boundaries (Student vs. Committee).
