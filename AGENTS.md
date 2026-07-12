# Agent Instructions

This document specifies constraints and guidance for AI agents and coding assistants working on this project.

## Quick Context

This is a production-ready podcast validation system (Phase 1). It tests three positioning messages to determine which creates the strongest listener interest. Do not generalize into a broader platform yet.

**Stack**: Next.js 15 + TypeScript + PostgreSQL + Prisma + Tailwind + Railway

## Core Constraints

### ✅ What to Build
- Landing page with variant routing (Possibility/Reality/Curiosity)
- Listener signup form with validation
- Guest lead optional capture after signup
- Password-protected results dashboard
- Metrics display and CSV export
- Meta Pixel tracking (optional)
- Privacy and terms pages

### ❌ What NOT to Build
- AI analysis (qualitative classification)
- Meta campaign automation (provision/launch/close)
- MCP servers or tool interfaces
- Multi-tenant or generalized platform
- Experiment templates or builders
- Complex design systems
- Third-party authentication

These belong in Phase 2 after the experiment design is proven.

## Operational Rules

### 1. Experiment Safety

**No autonomous optimization**: Code must not automatically change copy, audience, budgets, or targeting during an active test.

**How to apply this**:
- Dashboard shows data; humans decide what to do
- No code that "learns" and auto-adjusts
- All variant differences stay limited to headline + description
- Other elements must be identical across variants

### 2. Phase 1 Scope

**No premature generalization**: Build for this podcast validation, not a generic platform.

**How to apply this**:
- If you'd write it the same way for 5 different experiments, it's still Phase 2
- Avoid configuration systems for things that won't be configured yet
- One-off code is fine if it's clear and works
- Document assumptions so Phase 2 can extend (not rewrite)

### 3. Test Before Done

**All work must pass**:
- `npm run lint` ✓
- `npm run build` ✓
- Manual happy-path test ✓

**Do not declare work complete without these checks.**

### 4. Privacy First

**Minimize data, maximize transparency**.

**Rules**:
- No raw IP addresses stored
- Emails normalized; duplicates soft-fail (don't reveal existence)
- Third-party data sharing explicitly documented
- Deletion requests must be simple
- `/privacy` and `/terms` must reflect actual practices

### 5. No Secrets in Code

**Environment variables only**.

**Rules**:
- `.env.example` documents all required vars
- `.gitignore` includes `.env.local` and `.env`
- Only use `NEXT_PUBLIC_` for client-safe values
- Server-side secrets (API keys, passwords) must not reach the browser

## Architecture Overview

```
src/
├── app/
│   ├── page.tsx                    # Landing (variant routing)
│   ├── results/page.tsx            # Dashboard (password protected)
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── api/
│       ├── forms/listener-signup   # POST signup
│       ├── forms/guest-lead        # POST guest lead
│       ├── admin/auth              # POST authenticate
│       ├── admin/dashboard         # GET metrics
│       ├── admin/export            # GET CSV
│       └── health                  # GET health check
├── components/
│   ├── LandingPage.tsx             # Variant layout
│   ├── ListenerForm.tsx            # Signup form
│   ├── GuestLeadPrompt.tsx         # Optional post-signup
│   ├── GuestLeadForm.tsx           # Lead form
│   ├── ResultsDashboard.tsx        # Metrics & export
│   └── PageContent.tsx             # Search params wrapper
├── lib/
│   ├── db.ts                       # Prisma client
│   ├── validation.ts               # Zod schemas
│   ├── tracking.ts                 # PageVisit, session, UTM
│   ├── auth.ts                     # Password verification
│   └── (utility functions)
└── styles/globals.css              # Tailwind + brand colors
```

## Critical Files for Safety

These files govern experiment integrity. Review carefully before changes:

- `prisma/schema.prisma` - Data model (schema changes require care)
- `src/lib/validation.ts` - Form validation (field changes impact experiment)
- `src/app/api/forms/listener-signup/route.ts` - Signup logic (duplicate detection, variant capture)
- `src/app/results/page.tsx` - Dashboard (do not add autonomous optimizations here)
- `.env.example` - Documents what data flows where

## Approved Commands

**Always safe**:
```bash
npm run dev           # Local development
npm run build         # Production build validation
npm run lint          # Code quality
npx prisma studio    # Browse database
npm run db:push      # Apply migrations
```

**Use with care**:
```bash
npx prisma db reset  # Destroys data; use only in dev
git push --force     # Overwrites history; use only if absolutely necessary
```

## Common Tasks

### Adding a Form Field

1. Add to Zod schema in `lib/validation.ts`
2. Update component (ListenerForm, GuestLeadForm, etc.)
3. Update database query (if storing in DB)
4. Update `.env.example` to document any new env vars
5. Run `npx prisma db push` if schema changed
6. Test form submission and data retrieval
7. Verify CSV export includes the new field if needed

### Adding an API Endpoint

1. Create route in `src/app/api/...`
2. Validate all inputs server-side (use Zod)
3. Return JSON with clear error messages
4. Log important operations (without email or secrets)
5. Test via `curl` or browser fetch
6. Document in README

### Changing the Database

1. Edit `prisma/schema.prisma`
2. Run `npx prisma db push`
3. Run `npx prisma generate` to regenerate client
4. Test that queries still work
5. Update relevant API routes and components
6. No data is migrated automatically; plan accordingly

### Deploying to Railway

1. Ensure `.env.example` is complete
2. Commit all changes
3. Push to main branch (Railway auto-deploys)
4. Verify deployment in Railway dashboard
5. Check `/api/health` returns `{ "status": "healthy" }`
6. Manually test a form submission in production

## Testing Checklist

Before marking any work complete:

- [ ] `npm run build` succeeds
- [ ] `npm run lint` passes
- [ ] Manual test: Can you sign up? Does confirmation appear?
- [ ] Manual test: All three variants show correct headline
- [ ] Manual test: Dashboard login and metric display works
- [ ] Manual test: CSV export downloads correctly
- [ ] No secrets logged or exposed to client
- [ ] Database queries are efficient (no N+1 issues)
- [ ] Error handling is graceful (no raw database errors to user)

## Known Limitations (Phase 1)

- Email confirmations are not yet implemented (Resend configured but not wired)
- Follow-up survey email is not yet implemented
- No AI-powered analysis of responses
- No scheduled jobs (health checks, daily reports)
- No guest application route (/guest)
- No user data deletion API (process is manual)
- Dashboard does not show real-time updates (refresh to see new data)

## Decisions to Escalate

Ask before proceeding if:

1. Changing what data is collected
2. Changing form fields or options
3. Adding new third-party integrations
4. Changing the variant copy
5. Modifying how "qualified" signups are defined
6. Deploying breaking changes
7. Any work that could affect an active live test

## Emergency Procedures

**If the live experiment breaks**:

1. Immediately stop accepting new signups (scale down or pause ads)
2. Preserve all data (do not delete anything)
3. Identify the root cause
4. Fix the code and test locally
5. Deploy a rollback or fix
6. Verify `/api/health` and form submission work again
7. Resume only when confident

**If data integrity is compromised**:

1. Stop writes to affected tables
2. Escalate to the human
3. Do not attempt to "fix" data without explicit approval
4. Document what happened and when

## Success Criteria

The system is production-ready when:

- ✓ All three variants render correctly with distinct headlines
- ✓ Signup form works with validation and duplicate detection
- ✓ Guest lead capture works separately from signup
- ✓ Results dashboard shows all required metrics
- ✓ CSV export works for signups and leads
- ✓ Privacy and terms pages explain data practices
- ✓ Meta Pixel fires PageView (always) and Lead (only after confirmed signup)
- ✓ No secrets in code or logs
- ✓ Production build succeeds
- ✓ All tests pass
- ✓ Deployment to Railway succeeds
- ✓ `/api/health` returns healthy status

Do not claim completion until all criteria are met.

---

**Questions?** Refer to CLAUDE.md for philosophical guidance or README.md for technical setup.
