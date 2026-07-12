# Podcast Validation System

A production-ready web application for validating demand for a prospective podcast about interesting and unfamiliar careers.

## What This Does

- **Tests three positioning messages** (Possibility, Honest Reality, Curiosity) to determine which resonates strongest
- **Collects listener interest** with qualified signup information
- **Captures optional guest leads** for potential podcast guests
- **Provides a results dashboard** with key metrics and CSV exports
- **Integrates with Meta Pixel** for paid campaign tracking

## Tech Stack

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Hosting**: Railway
- **Email**: Resend (configured, not yet implemented)
- **Authentication**: Simple password-based for dashboard

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Railway account (for deployment)

### Local Setup

1. **Clone and install**
   ```bash
   git clone <repo-url>
   cd podcast-validation
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your values:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/podcast_validation
   RESULTS_PASSWORD=your-secure-password
   SESSION_SECRET=your-session-secret
   NEXT_PUBLIC_META_PIXEL_ID=  # Optional: Meta Pixel ID
   ```

3. **Set up the database**
   ```bash
   npx prisma db push
   ```

4. **Start the dev server**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:3000

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma migrations to database
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio

## Routes

### Public Routes

- `/` - Landing page with variant routing
  - `/?variant=possibility` - Possibility variant (default)
  - `/?variant=reality` - Honest Reality variant
  - `/?variant=curiosity` - Curiosity variant
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### Admin Routes

- `/results` - Password-protected results dashboard
  - Password: set via `RESULTS_PASSWORD`

### API Routes

- `POST /api/forms/listener-signup` - Submit listener signup
- `POST /api/forms/guest-lead` - Submit guest lead
- `GET /api/health` - Health check
- `POST /api/admin/auth` - Authenticate to dashboard
- `GET /api/admin/dashboard` - Get dashboard metrics
- `GET /api/admin/export?type=signups|leads|summary` - Export data as CSV

## Database Schema

### PageVisit
Tracks every page load with session ID and UTM parameters.

### ListenerSignup
Stores listener signup information with consent timestamp.

### GuestLead
Stores optional guest lead nominations after signup.

## Meta Pixel Integration

To enable Meta Pixel tracking:

1. Add your Meta Pixel ID to `.env.local`:
   ```
   NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id
   ```

2. The app will automatically:
   - Fire `PageView` on page load
   - Fire `Lead` only after server-confirmed signup
   - Include variant as a custom parameter

## Deployment to Railway

### 1. Create Railway Project

```bash
npm install -g @railway/cli
railway login
railway init
```

### 2. Configure Environment

In the Railway dashboard, add these environment variables:
- `DATABASE_URL` - Your PostgreSQL connection string
- `RESULTS_PASSWORD` - Strong password for /results dashboard
- `SESSION_SECRET` - Random string for session management
- `NEXT_PUBLIC_META_PIXEL_ID` - (Optional) Meta Pixel ID

### 3. Configure Database

Railway will auto-detect the PostgreSQL database URL and set `DATABASE_URL`.

### 4. Run Migrations

After deploying, SSH into your Railway instance and run:

```bash
npx prisma db push
```

Or configure this as a Railway deploy hook in `railway.toml`.

### 5. Deploy

```bash
git push
```

The app will auto-deploy via Railway's git integration.

## Testing

### Form Submission

1. Go to http://localhost:3000
2. Fill out the listener signup form
3. Verify data appears in database

```bash
npx prisma studio
```

### Dashboard Access

1. Go to http://localhost:3000/results
2. Enter the password (from `RESULTS_PASSWORD`)
3. View metrics and export CSV

### Variant Testing

Visit with different variant parameters:
- http://localhost:3000/?variant=possibility
- http://localhost:3000/?variant=reality
- http://localhost:3000/?variant=curiosity

## Next Steps

After Phase 1:

- [ ] Implement Resend email confirmations
- [ ] Add 3-day follow-up email survey
- [ ] Implement AI-powered qualitative analysis
- [ ] Add guest application flow (/guest route)
- [ ] Integrate Meta campaign provisioning
- [ ] Add scheduled health checks and daily reports
- [ ] Set up comprehensive test suite

## Data Privacy

- No raw IP addresses are stored
- Email addresses are normalized and indexed
- Optional Meta Pixel tracking can be disabled
- `/privacy` and `/terms` provide full disclosure
- Users can request data deletion

## Support

For issues or questions, refer to:
- `CLAUDE.md` - Claude Code configuration and constraints
- `AGENTS.md` - Agent instructions and approved commands
- `.env.example` - Environment variable reference

## License

Private project.
