# Conalytic Website

Official website for [Conalytic](https://conalytic.com) — AI-powered conversational analytics platform.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, RSC) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Content | React pages + `src/content/` (e.g. static blog posts) |
| Deployment | [Vercel](https://vercel.com) |

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Optional: copy env template if you add one (Resend, schedule URL, etc.)
# cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/features` | Platform features |
| `/products/conversational-analytics` | Conversational Analytics product |
| `/products/report-builder` | Report Builder product |
| `/products/applicant-tracking-system` | ATS product |
| `/about-us` | About Conalytic |
| `/contact` | Contact us |
| `/integrations` | Integrations listing |
| `/blogs` | Blog listing |
| `/{slug}` | Individual blog posts (canonical URLs) |
| `/blogs/[slug]` | Redirects to `/{slug}` |
| `/careers` | Open positions |
| `/privacy` | 308 → [Privacy Policy](https://chat.conalytic.com/privacy-and-policy) (chat app) |
| `/terms` | 308 → [Terms of Service](https://chat.conalytic.com/terms-of-service) (chat app) |
| `/cookies` | Cookies Policy |
| `/brand` | Brand assets & guidelines |

## Development Docs

See [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) for architecture notes (some sections may still mention the old CMS; content now lives in the repo).

## Environment Variables

Typical local/production variables (see API route handlers for careers/newsletter):

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SCHEDULE_CALL_URL=
RESEND_API_KEY=
RESEND_FROM=
CAREERS_APPLICATION_TO=
```

Optional script allowlist for injected third-party scripts: `SITE_SCRIPT_ALLOWED_HOSTS` (comma-separated hostnames; see `src/lib/site-scripts.ts`).

## Deployment

The site auto-deploys to Vercel on every push to `main`.

**Live URL:** https://conalytic-website.vercel.app

---

© 2025 Conalytic. All rights reserved.
