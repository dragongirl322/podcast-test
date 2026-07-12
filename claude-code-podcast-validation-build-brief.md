# Claude Code Build Brief — Podcast Validation App

## Purpose

Build a production-ready web application that allows me to validate demand for a prospective podcast about interesting and unfamiliar careers.

The app should test three positioning messages for the same podcast concept, collect qualified listener interest, capture optional guest leads, and provide a simple results dashboard.

This is **Phase 1**. Do not generalize the system into a broad market-validation platform yet. Build the podcast validation app well first. The architecture should be clean enough to extend later, but avoid premature abstraction.

## Product Thesis

The podcast explores a wide variety of jobs through candid conversations with the people who do them.

Each conversation should help listeners understand:
- How someone discovered the job
- How they got into it
- What the work actually involves
- What education or credentials are required
- What the job pays
- What people love about it
- What is difficult or frustrating
- Who tends to thrive in it
- Whether the guest would choose it again

The primary audience hypothesis is early-career professionals, but the test should also allow us to observe interest from career changers and generally curious listeners.

## Primary Experiment Question

Which positioning message creates the strongest qualified interest in the podcast?

### Variant A — Possibility

**Headline**

Your next career might be one you’ve never heard of.

**Description**

I’m exploring a podcast about the surprising, meaningful, and sometimes unconventional jobs people do—how they found them, what the work is really like, what they love, and what they wish they had known.

**Hypothesis**

Early-career people respond to the possibility of discovering a viable path they had never considered.

### Variant B — Honest Reality

**Headline**

What are interesting jobs really like?

**Description**

Job descriptions rarely tell you what work actually feels like. I’m exploring a podcast built around candid conversations with people in fascinating careers: how they got there, what they earn, what they love, what they hate, and whether they would choose the job again.

**Hypothesis**

People want honest, behind-the-scenes information about work rather than generic career advice.

### Variant C — Curiosity

**Headline**

The most interesting jobs you’ve never considered.

**Description**

Harbor pilots. Foley artists. Prosthetists. Air-traffic controllers. Conservators. Court reporters. There is an enormous world of work hiding in plain sight. I’m considering a podcast that lets people tell the real story of what they do.

**Hypothesis**

The concept can attract listeners through human curiosity, even when they are not actively seeking a different career.

## Technology

Use:
- Next.js
- TypeScript
- PostgreSQL
- Prisma
- Railway
- GitHub
- Resend for email
- Meta Pixel support
- Vitest or Jest for tests
- Playwright for basic end-to-end testing

Use a simple, maintainable project structure.

Do not add:
- A CMS
- A complex design system
- Authentication providers
- AI analysis
- Meta campaign automation
- MCP tools
- Multi-tenant architecture
- Generalized experiment templates
- A drag-and-drop builder

Those can come later.

## Deployment Target

The application will be deployed to Railway.

Requirements:
- Read the database connection from `DATABASE_URL`
- Bind the server to Railway's `PORT`
- Include a production build command
- Include a production start command
- Include a health endpoint at `/api/health`
- Include a `railway.toml`
- Include database migration instructions
- Include a deployment checklist in the README
- Include an `.env.example`
- Do not commit secrets

## Brand Foundation

### Colors

- Deep Navy: `#1E2A38`
- Warm Ivory: `#F7F4EE`
- Golden Ochre: `#D39B2A`
- Forest Green: `#496A4B`
- Slate Gray: `#5D6672`
- Light Gray: `#E5E7EB`

### Typography

- Headings: **Fraunces**
- Body and UI: **Inter**

### Design qualities

The interface should feel:
- Curious
- Human
- Intelligent
- Honest
- Hopeful
- Editorial rather than corporate

Avoid:
- Generic startup styling
- Gradients
- Glassmorphism
- Stock photography
- Career-center aesthetics
- Overly playful illustration
- AI imagery

Use:
- Strong typography
- Generous white space
- Accessible contrast
- Clear form labels
- Visible keyboard focus
- Mobile-first layouts

## Landing Page Requirements

Build one landing page whose hero content changes based on a URL parameter.

Supported URLs:
- `/?variant=possibility`
- `/?variant=reality`
- `/?variant=curiosity`

If the parameter is missing or invalid, default to `possibility`.

All three variants must use the same:
- Visual design
- Page structure
- CTA
- Form
- Example episodes
- Tracking
- Confirmation experience

Only the hero copy should differ.

## Common Landing Page Content

Under the variant-specific hero, include:

> A prospective podcast about the fascinating work people do, the unexpected paths that led them there, and the honest reality of doing the job.

### Example conversations

- What it is really like to be an air-traffic controller
- How someone becomes a museum conservator
- The hidden world of harbor pilots
- Designing and fitting artificial limbs
- A day in the life of a court reporter
- How a Foley artist creates the sounds we think are real

### What each conversation would explore

- How did you discover the job?
- What does a normal day actually involve?
- What education, training, or credentials are required?
- What does the work pay?
- What do you love about it?
- What is difficult, frustrating, or misunderstood?
- Who thrives in the job, and who probably would not?
- Would you choose it again?

### Research disclosure

Display this clearly near the form:

> This podcast is currently an idea, not an existing show. I’m researching whether people would find it useful and entertaining before producing it. Joining the list means I may contact you with an update, a short research survey, or an invitation to hear an early episode.

### CTA

> Help shape the podcast

## Listener Signup Form

Required fields:
- Email address
- Career stage
- What job would you like the podcast to explore?
- Consent checkbox

Optional fields:
- Age range
- Why does this idea interest you?

Career stage options:
- High school student
- College or training program
- Early career: 0–5 years
- Developing career: 6–10 years
- Mid-career
- Considering a career change
- Generally curious about work
- Other

Age range options:
- Under 18
- 18–20
- 21–24
- 25–29
- 30–39
- 40–49
- 50–59
- 60+

Consent text:

> I agree to receive occasional updates about this prospective podcast. I can unsubscribe at any time.

Form behavior:
- Validate on the server
- Normalize email addresses
- Prevent duplicate registrations
- Do not reveal whether a particular email already exists
- Add a hidden honeypot field
- Add submission timing checks
- Add reasonable rate limiting
- Do not store raw IP addresses
- Show accessible inline errors
- Preserve user input when validation fails

## Confirmation Experience

After successful submission, show:

> Thank you—you’re helping decide whether this podcast should exist.

Then show an optional second step.

### Guest lead question

> Do you—or someone you know—have a job more people should understand?

Options:
- I do
- I know someone
- Not right now

If the user selects the first or second option, collect:
- Job title
- Short explanation of what makes the job interesting
- Name, optional
- Email, optional
- LinkedIn profile, optional
- Relationship to the person
- Permission to contact them

Store this separately from the listener signup.

Do not count guest-lead completion as the primary experiment conversion.

## Tracking and Attribution

For each unique visit, capture:
- Anonymous session ID
- Variant
- UTM source
- UTM medium
- UTM campaign
- UTM content
- Referrer
- Timestamp
- Device category where practical

For each listener signup, capture:
- Email
- Career stage
- Age range
- Suggested job
- Interest explanation
- Variant
- UTM values
- Consent timestamp
- Created timestamp

For each guest lead, capture:
- Listener signup ID, if applicable
- Self or referral
- Job title
- Description
- Name
- Email
- LinkedIn URL
- Relationship
- Permission to contact
- Created timestamp

A page refresh should not create unlimited visit records.

Count a visitor once per variant within a sensible session period.

## UTM URLs

```text
https://yourdomain.com/?variant=possibility&utm_source=meta&utm_medium=paid_social&utm_campaign=career_podcast_validation&utm_content=possibility
```

```text
https://yourdomain.com/?variant=reality&utm_source=meta&utm_medium=paid_social&utm_campaign=career_podcast_validation&utm_content=reality
```

```text
https://yourdomain.com/?variant=curiosity&utm_source=meta&utm_medium=paid_social&utm_campaign=career_podcast_validation&utm_content=curiosity
```

## Meta Pixel

Support an optional Meta Pixel ID through:

```text
NEXT_PUBLIC_META_PIXEL_ID
```

When configured:
- Fire `PageView` after page load
- Fire `Lead` only after a successful server-confirmed signup
- Include the variant as a custom parameter
- Do not fire `Lead` when the button is merely clicked
- Do not fire another `Lead` on refresh
- Do not load the Meta Pixel when the environment variable is absent

Add a simple cookie/tracking notice.

The application database remains the source of truth for conversion analysis.

## Email

Use Resend.

Environment variables:

```text
RESEND_API_KEY
EMAIL_FROM
```

After successful signup, send a confirmation email.

The confirmation email should:
- Confirm that the person joined the research list
- Restate that the podcast is still an idea
- Thank them for helping shape it
- Explain that they may receive a short follow-up survey
- Include an unsubscribe link

Use idempotency protection so the confirmation email cannot be sent twice accidentally.

Do not build the three-day follow-up survey workflow yet unless it is trivial after the core app is complete.

## Database Models

Create at least these Prisma models.

### PageVisit

- id
- sessionId
- variant
- utmSource
- utmMedium
- utmCampaign
- utmContent
- referrer
- deviceCategory
- createdAt

### ListenerSignup

- id
- email
- careerStage
- ageRange
- suggestedJob
- interestExplanation
- variant
- utmSource
- utmMedium
- utmCampaign
- utmContent
- consentAt
- createdAt

### GuestLead

- id
- listenerSignupId
- nominationType
- jobTitle
- description
- name
- email
- linkedInUrl
- relationship
- permissionToContact
- createdAt

Use appropriate indexes and uniqueness constraints.

## Results Dashboard

Create a password-protected route:

```text
/results
```

Use:

```text
RESULTS_PASSWORD
```

A simple password session is acceptable for Phase 1.

Display:
- Total unique visits
- Total signups
- Qualified signups
- Overall signup conversion
- Overall qualified conversion
- Visits by variant
- Signups by variant
- Qualified signups by variant
- Conversion rate by variant
- Qualified conversion rate by variant
- Career stage breakdown
- Age range breakdown
- Suggested jobs ranked by frequency
- Guest leads by occupation
- Recent open-ended responses

Include CSV export for:
- Listener signups
- Guest leads
- Aggregated variant results

Do not display email addresses by default. Require a deliberate reveal action.

## Qualified Signup Definition

A qualified signup contains:
- Valid email
- Career stage
- A meaningful suggested job

Implement the logic in deterministic code.

## Privacy and Legal

Create:
- `/privacy`
- `/terms`

The privacy page should explain:
- What data is collected
- Why it is collected
- How it is stored
- Which services receive data
- How deletion may be requested
- That Meta may receive tracking data when enabled
- That the podcast is currently a research concept

Use placeholder contact information clearly marked for replacement.

## Accessibility

Meet practical WCAG 2.1 AA expectations.

Include:
- Semantic HTML
- Proper labels
- Keyboard navigation
- Visible focus states
- Accessible errors
- Adequate color contrast
- Logical heading order
- Reduced motion support
- Screen-reader-friendly confirmation states

## Security

- Keep all secrets in environment variables
- Never expose database or API secrets to the client
- Do not store raw IP addresses
- Add rate limiting
- Add CSRF protection where appropriate
- Sanitize user input
- Validate all server inputs
- Protect `/results`
- Redact secrets from logs
- Do not log full email addresses unnecessarily

## Environment Variables

Create `.env.example` with:

```text
DATABASE_URL=
RESULTS_PASSWORD=
NEXT_PUBLIC_META_PIXEL_ID=
RESEND_API_KEY=
EMAIL_FROM=
SESSION_SECRET=
```

## Repository Files

Include:
- `README.md`
- `AGENTS.md`
- `CLAUDE.md`
- `.env.example`
- `railway.toml`
- Prisma schema and migrations
- Test instructions
- Deployment instructions

### AGENTS.md and CLAUDE.md

Both files should tell coding agents:
- Keep Phase 1 narrowly scoped
- Do not generalize into a full market-validation platform
- Do not add autonomous ad optimization
- Do not add unnecessary infrastructure
- Run tests before declaring work complete
- Preserve experiment integrity
- Keep variant differences limited to the intended copy

## Testing

Add tests for:

### Unit and integration

- Variant resolution
- Invalid variant fallback
- Form validation
- Email normalization
- Duplicate signup handling
- Qualified signup calculation
- UTM persistence
- Guest lead separation
- Session-based visit deduplication
- Protected dashboard access

### End-to-end

- Each variant renders the correct headline
- Signup succeeds
- Invalid form shows accessible errors
- Successful signup shows confirmation
- Guest lead can be submitted separately
- Refresh does not create a duplicate signup
- Meta `Lead` does not fire before server success
- Meta `Lead` does not fire twice
- CSV export works
- Production build succeeds

## Development Process

Work in small, reviewable steps.

Recommended sequence:

1. Initialize the project
2. Add design tokens and typography
3. Implement the landing page variants
4. Add Prisma and PostgreSQL
5. Add visit tracking
6. Add signup form
7. Add confirmation state
8. Add guest lead capture
9. Add results dashboard
10. Add CSV export
11. Add Meta Pixel support
12. Add Resend confirmation email
13. Add privacy and terms
14. Add tests
15. Add Railway deployment files
16. Run full QA
17. Produce deployment checklist

After each major step:
- Run lint
- Run type checking
- Run tests
- Fix failures before continuing

## Definition of Done

The app is complete when:
- All three variants render correctly
- The design matches the supplied colors and fonts
- Listener signup works
- Qualified signup logic works
- Guest lead capture works separately
- UTM attribution works
- Visit tracking works
- Meta Pixel behavior is correct
- Confirmation email works
- Results dashboard works
- CSV exports work
- Privacy and terms pages exist
- Accessibility basics are implemented
- Tests pass
- Production build passes
- Railway deployment instructions are complete
- The application is deployed successfully or is deployment-ready
- No unnecessary Phase 2 features were added

## Final Deliverables

When finished, provide:

1. A concise summary of what was built
2. Repository structure
3. Local setup instructions
4. Railway deployment instructions
5. Required environment variables
6. Database migration commands
7. Test results
8. Known limitations
9. Recommended next steps after the first experiment
10. A list of any decisions you made that were not explicitly specified

Do not claim completion until the application builds successfully and the automated tests pass.
