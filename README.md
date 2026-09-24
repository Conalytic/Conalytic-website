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
| `/platform/features` | Platform features |
| `/platform/pricing` | Pricing |
| `/products/conversational-analytics` | Conversational Analytics |
| `/products/kpis-tracker` | KPIs Tracker |
| `/products/report-builder` | Report Builder |
| `/services` | Services index |
| `/services/[slug]` | Service landing (e.g. SEO, paid media, GEO) |
| `/company/about-us` | About |
| `/company/contact` | Contact |
| `/company/brand` | Brand guidelines |
| `/resources/blogs` | Blog index |
| `/resources/blogs/[slug]` | Blog post |
| `/resources/integrations` | Integrations |
| `/resources/careers` | Careers |
| `/legal/privacy-and-policy` | Privacy |
| `/legal/terms-of-service` | Terms |
| `/legal/cookies` | Cookies |

Folder layout: see [`src/README.md`](src/README.md) and [`src/app/(marketing)/README.md`](src/app/(marketing)/README.md).

## Development Docs

See [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) for architecture and content workflow.

## Environment Variables

Typical local/production variables (see API route handlers for careers/newsletter):

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SCHEDULE_CALL_URL=
RESEND_API_KEY=
RESEND_FROM=
CAREERS_APPLICATION_TO=
```

## Deployment

The site auto-deploys to Vercel on every push to `main`.

**Live URL:** https://conalytic-website.vercel.app

---

© 2025 Conalytic. All rights reserved.
