# Conalytic Website – Development Documentation

**Tech stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS v4  
**Content:** In-repo React pages + static blog posts in `src/content/`  
**Last updated:** July 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Getting Started](#4-getting-started)
5. [Pages & Content](#5-pages--content)
6. [Component Architecture](#6-component-architecture)
7. [SEO](#7-seo)
8. [URL Migration](#8-url-migration)
9. [Deployment](#9-deployment)
10. [Development Workflow](#10-development-workflow)

---

## 1. Project Overview

The Conalytic marketing site is a **Next.js App Router** application. All copy, product pages, and blog posts live in the repository — there is no external CMS.

### Site map

| Route | Description |
|---|---|
| `/` | Home |
| `/features` | Platform features |
| `/products/conversational-analytics` | Conversational Analytics |
| `/products/kpis-tracker` | KPIs Tracker |
| `/products/report-builder` | Report Builder |
| `/about-us` | About |
| `/contact` | Contact |
| `/integrations` | Integrations |
| `/blogs` | Blog listing |
| `/{slug}` | Blog post (canonical) |
| `/blogs/[slug]` | Redirects to `/{slug}` |
| `/careers` | Careers + Resend application form |
| `/privacy-and-policy`, `/terms-of-service`, `/cookies` | Legal |

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, RSC) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Motion | Framer Motion |
| Blog | Markdown in `src/content/blog-bodies/` |
| Email | Resend (`/api/careers-application`, `/api/newsletter`) |
| Deployment | Vercel |

---

## 3. Project Structure

```
conalytic/
├── docs/
│   ├── DEVELOPMENT.md
│   └── WEBSITE.md
├── public/                 # Static assets (logos, OG image, blog covers)
├── src/
│   ├── app/                # Routes, layout, sitemap, robots, API routes
│   ├── components/
│   │   ├── blog/           # BlogPostMarkdown, BlogArticleCta
│   │   ├── home/           # HomeClient + sections
│   │   ├── layout/         # Navbar, Footer, CookieConsent, ThemeProvider
│   │   ├── pages/          # Large marketing page clients
│   │   ├── products/       # Product landing sections
│   │   ├── sections/       # Shared CTA, etc.
│   │   ├── seo/            # JSON-LD components
│   │   └── ui/             # Accordion, buttons, theme toggle
│   ├── content/
│   │   ├── blog-posts.ts   # Blog metadata + slug registry
│   │   └── blog-bodies/    # Markdown bodies per post
│   └── lib/                # SEO, products, FAQs, utilities
├── next.config.ts          # Redirects, image domains
└── package.json
```

---

## 4. Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
cd conalytic
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server locally |
| `npm run lint` | ESLint |

### Environment variables

```bash
NEXT_PUBLIC_SITE_URL=https://conalytic.com
NEXT_PUBLIC_SCHEDULE_CALL_URL=   # Contact “Schedule a call” link
RESEND_API_KEY=
RESEND_FROM=
CAREERS_APPLICATION_TO=
```

---

## 5. Pages & Content

### Home (`/`)

`src/app/page.tsx` renders `HomeClient` with optional `HomeContentPreset` overrides. Defaults are baked into the component.

### Product pages

Each product has a dedicated client component under `src/components/pages/` or `src/components/products/`, with copy from `src/lib/product-page-content.ts` and `src/lib/products.ts`.

### Blog posts

1. Add markdown in `src/content/blog-bodies/{slug}.ts`
2. Register the post in `src/content/blog-posts.ts` (title, slug, excerpt, cover image, category)
3. Canonical URL is `/{slug}` via `src/app/[slug]/page.tsx`

---

## 6. Component Architecture

### Design tokens

| Token | Value | Use |
|---|---|---|
| `brand-500` | `#6B5FF8` | Primary purple |
| Page background | `#F6F7FE` | Light sections |
| Dark background | `#0E0E14` | Dark mode sections |

### Layout chrome

- **Navbar** / **Footer** accept optional config objects; when `null`, built-in fallback links are used.
- **CookieConsent** stores preference in `localStorage` (`conalytic-cookie-consent-v1`).

---

## 7. SEO

- Per-page `metadata` exports
- JSON-LD via `src/lib/structured-data.ts` and `components/seo/`
- Auto-generated `/sitemap.xml` and `/robots.txt`
- Blog posts: `BlogPosting` schema on `/{slug}`
- Non-www canonicals configured in `next.config.ts`

---

## 8. URL Migration

WordPress legacy paths redirect in `next.config.ts`:

| Old URL | Redirects to |
|---|---|
| `/about` | `/about-us` |
| `/blog` | `/blogs` |
| `/contact-us` | `/contact` |
| `/resources/*` | Matching new routes |

---

## 9. Deployment

Deploy to Vercel on push to `main`. Set environment variables in the Vercel project settings.

**Production URL:** https://conalytic.com

---

## 10. Development Workflow

### New page

1. Create `src/app/[route]/page.tsx` with `metadata` export
2. Add route to `src/app/sitemap.ts` if needed
3. Add redirect in `next.config.ts` for legacy URLs

### New blog post

1. Write markdown body in `src/content/blog-bodies/`
2. Add entry to `src/content/blog-posts.ts`
3. Add cover image to `public/blog/` if needed

---

*For operational details see [`WEBSITE.md`](./WEBSITE.md).*
