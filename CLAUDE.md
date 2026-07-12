# Claude Code Operational Guidelines

This document specifies how Claude Code should approach work on this project.

## Project Scope

This is **Phase 1** of the podcast validation system. Do not generalize into a broader market-validation platform. Build the podcast validation app well first.

### What to Build
- Landing pages with variant testing
- Listener signup form
- Guest lead capture
- Results dashboard with CSV export
- Meta Pixel integration
- Basic email support (Resend configured)

### What NOT to Build
- AI-powered qualitative analysis
- Meta campaign automation (provision/launch/close)
- MCP tools or interfaces
- Multi-tenant architecture
- Generalized experiment templates
- Drag-and-drop builders
- Complex design systems
- Authentication providers

These can come in Phase 2.

## Operational Constraints

### 1. Experiment Integrity

**Rule**: Do not add features that autonomously change the experiment without human review.

**What this means**:
- No code that automatically adjusts copy, audience, or budgets
- No code that learns and optimizes during a live test
- All variant differences must be limited to the intended message copy
- Other page elements must be identical

**How to apply**:
- When adding features, ask: "Could this code make a decision about the experiment without a human?"
- If yes, add explicit approval gates
- Log all experiment-affecting changes

### 2. Keep Phase 1 Narrow

**Rule**: Do not over-engineer for future phases.

**What this means**:
- Don't build abstractions for a broad platform when this is one experiment
- Don't add configuration systems for things that won't be configurable yet
- Don't create plugins, templates, or generalization until you have 3+ use cases

**How to apply**:
- If you find yourself saying "this could be reused for other experiments," stop
- Build for this podcast experiment specifically
- Store the experience for Phase 2 planning, but don't code it now

### 3. Test Before Declaring Done

**Rule**: Do not claim work is complete until tests pass and the build succeeds.

**What this means**:
- Always run `npm run build` before marking a PR ready
- Always test the core flow (variant rendering → signup → confirmation)
- Always verify that destructive changes (schema edits, API changes) are correct

**How to apply**:
- After each significant change, run the build locally
- If adding an API endpoint, test it in the browser or via curl
- If changing the database schema, verify migrations work

### 4. Privacy by Default

**Rule**: Assume all data is sensitive. Minimize collection and storage.

**What this means**:
- Don't store raw IP addresses
- Don't log email addresses unnecessarily
- Redact PII from logs
- Make deletion requests simple
- Be explicit about third-party data sharing (Meta, Resend)

**How to apply**:
- When adding tracking, ask: "Do we need this?"
- If a field is optional and rarely used, make it truly optional
- Document what data third parties receive in `/privacy`

### 5. No Secrets in Code

**Rule**: All sensitive values belong in environment variables.

**What this means**:
- Never hardcode API keys, passwords, or secrets
- Never expose `RESULTS_PASSWORD` or `SESSION_SECRET` to the browser
- Validate that `.env.local` is in `.gitignore`
- Use `.env.example` to document what's needed

**How to apply**:
- If you need a secret, add it to `.env.example` with a placeholder
- Read secrets server-side only (API routes, server components)
- Use `NEXT_PUBLIC_` prefix ONLY for values safe to expose

## Code Quality

- **Keep it simple**: Straightforward code beats clever code
- **Readable over clever**: Prefer clear variable names and explicit logic
- **Avoid premature optimization**: Optimize only when there's a measurable problem
- **No half-finished features**: Either complete a feature or don't add it
- **Default to no comments**: Only comment the WHY for non-obvious decisions

## Testing

Before marking work done, verify:

1. **Form flows**: Can you sign up? Does confirmation appear?
2. **Variant routing**: Do all three variants render the correct headline?
3. **Dashboard access**: Can you log in with the password? Do metrics appear?
4. **CSV export**: Can you download sign-up data?
5. **Build success**: Does `npm run build` complete with no errors?

## Decisions You Can Make Alone

- File/folder structure
- Component API design
- CSS class names
- Database index placement
- Error message wording
- Default CSS styles
- Refactoring that doesn't change behavior

## Decisions That Need Explicit Approval

- Changes to the form fields or variant copy
- Changes to what data we collect
- Changes to how data is processed (qualification logic, aggregations)
- New third-party integrations (email, analytics, ads)
- Hosting or database changes
- Anything that would affect an active experiment

## Incident Response

If something goes wrong:

1. Stop making changes
2. Log the error and what led to it
3. Fix the root cause (don't patch around it)
4. Test the fix locally
5. Commit with a clear message about what broke and why

## Questions?

If you're unsure whether something is in scope, ask the human. Better to ask than to build something that needs rework.
