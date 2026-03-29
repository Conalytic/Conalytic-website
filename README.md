# Conalytic Website

Official website for [Conalytic](https://conalytic.com) — AI-powered conversational analytics platform.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, RSC) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| CMS | [Storyblok](https://storyblok.com) |
| Deployment | [Vercel](https://vercel.com) |

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Copy env vars
cp .env.local.example .env.local
# Fill in your Storyblok tokens

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
| `/blogs/[slug]` | Individual blog posts |
| `/careers` | Open positions |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/cookies` | Cookies Policy |
| `/brand` | Brand assets & guidelines |

## Development Docs

See [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) for full documentation including:
- Architecture decisions
- Storyblok CMS setup guide
- Component library reference
- SEO strategy
- Deployment guide
- Content editing workflow

## Environment Variables

```bash
STORYBLOK_API_TOKEN=           # Public delivery token
STORYBLOK_PREVIEW_TOKEN=       # Preview token (for draft content)
NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN=
NEXT_PUBLIC_STORYBLOK_SPACE_ID=
NEXT_PUBLIC_SITE_URL=
```

## Deployment

The site auto-deploys to Vercel on every push to `main`.

**Live URL:** https://conalytic-website.vercel.app

---

© 2025 Conalytic. All rights reserved.
