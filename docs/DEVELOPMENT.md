# Conalytic Website – Development Documentation

> **Note:** Storyblok was **removed** from this app; marketing copy and blog posts live in the **repository** (`src/`, `src/content/`). Sections below that describe Storyblok are **historical** unless updated.
>
> **Tech Stack:** Next.js 16 · TypeScript · Tailwind CSS v4  
> **Status:** In Development  
> **Last Updated:** March 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack Decisions](#2-tech-stack-decisions)
3. [Project Structure](#3-project-structure)
4. [Getting Started](#4-getting-started)
5. [Storyblok CMS Setup](#5-storyblok-cms-setup)
6. [Pages & Content Mapping](#6-pages--content-mapping)
7. [Component Architecture](#7-component-architecture)
8. [SEO Strategy](#8-seo-strategy)
9. [URL Migration from WordPress](#9-url-migration-from-wordpress)
10. [Deployment Guide](#10-deployment-guide)
11. [Development Workflow](#11-development-workflow)
12. [Content Editing with Storyblok](#12-content-editing-with-storyblok)

---

## 1. Project Overview

### Background
The Conalytic website was originally built with **WordPress**. This project migrates it to a modern **Next.js + Storyblok** stack for:

- **Performance** – Static generation and edge delivery via Vercel
- **SEO preservation** – All existing URLs redirected, metadata carried over exactly
- **Developer experience** – TypeScript, component-based architecture, hot reload
- **Content flexibility** – Non-developers can edit content via Storyblok's Visual Editor
- **Scalability** – No PHP server needed, edge-deployed globally

### Site Map (Migrated Pages)
| WordPress URL | Next.js Route | Status |
|---|---|---|
| `/` | `/` | ✅ Done |
| `/features` | `/features` | ✅ Done |
| `/products/conversational-analytics` | `/products/conversational-analytics` | ✅ Done |
| `/products/report-builder` | `/products/report-builder` | ✅ Done |
| `/about-us` | `/about-us` | ✅ Done |
| `/contact` | `/contact` | ✅ Done |
| `/integrations` | `/integrations` | ✅ Done |
| `/blogs` | `/blogs` | ✅ Done |
| `/careers` | `/careers` | ✅ Done |

---

## 2. Tech Stack Decisions

### Why Next.js 16 (App Router)?
- **App Router** gives us React Server Components (RSC) for zero-JS static pages
- Built-in **image optimization**, **font optimization**, **metadata API**
- **Static Site Generation (SSG)** + **Incremental Static Regeneration (ISR)** means pages rebuild automatically when content changes in Storyblok
- First-class **TypeScript** support
- Native **sitemap.ts** and **robots.ts** API routes

### Why Storyblok?
- **Visual Editor** – Content editors can click and edit directly on the live preview
- **Component-based** – Maps 1:1 with our React component architecture
- **Content Delivery API** – Fast, CDN-backed content delivery
- **Draft/Published** – Built-in staging workflow for content approval
- **Webhooks** – Auto-rebuild on content publish via Vercel webhooks
- **Rich text** – Built-in rich text with React renderer

### Why Tailwind CSS v4?
- **CSS-first config** – No more `tailwind.config.js`, theme defined in CSS with `@theme`
- **Smaller bundle** – Only generates CSS for used classes
- **Custom properties** – Maps directly to CSS variables for dynamic theming
- **v4 alpha is production-ready** for this scale

---

## 3. Project Structure

```
conalytic/
├── docs/
│   └── DEVELOPMENT.md          ← This file
├── public/
│   ├── og-image.png            ← Open Graph image (1200×630)
│   └── favicon.ico
├── src/
│   ├── app/                    ← Next.js App Router pages
│   │   ├── layout.tsx          ← Root layout (Navbar + Footer)
│   │   ├── page.tsx            ← Home page (/)
│   │   ├── globals.css         ← Global styles + Tailwind v4 theme
│   │   ├── sitemap.ts          ← Auto-generates /sitemap.xml
│   │   ├── robots.ts           ← Auto-generates /robots.txt
│   │   ├── features/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   ├── conversational-analytics/page.tsx
│   │   │   └── report-builder/page.tsx
│   │   ├── about-us/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── integrations/page.tsx
│   │   ├── blogs/
│   │   │   ├── page.tsx        ← Blog listing
│   │   │   └── [slug]/page.tsx ← Individual blog posts (via Storyblok)
│   │   └── careers/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      ← Responsive navigation with dropdowns
│   │   │   └── Footer.tsx      ← Footer with newsletter signup
│   │   ├── ui/
│   │   │   ├── Button.tsx      ← Multi-variant button component
│   │   │   ├── Badge.tsx       ← Label/tag component
│   │   │   └── Card.tsx        ← Content card component
│   │   ├── sections/
│   │   │   └── CTA.tsx         ← Reusable CTA section
│   │   └── storyblok/
│   │       ├── StoryblokProvider.tsx  ← Storyblok visual editor bridge
│   │       └── blocks/               ← Storyblok block components (add here)
│   ├── lib/
│   │   ├── storyblok.ts        ← Storyblok API utility functions
│   │   └── utils.ts            ← cn() and other utilities
│   └── types/
│       └── storyblok.ts        ← TypeScript types for Storyblok content
├── .env.local.example          ← Environment variable template
├── next.config.ts              ← Next.js config (images, redirects)
└── package.json
```

---

## 4. Getting Started

### Prerequisites
- Node.js 20+ (`node --version`)
- npm 10+

### Installation

```bash
# 1. Clone/navigate to project
cd "conalytic"

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Fill in your Storyblok tokens (see Section 5)

# 4. Start development server
npm run dev
```

The site will be available at `http://localhost:3000`.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server locally |
| `npm run lint` | Run ESLint |

---

## 5. Storyblok CMS Setup

### Step 1: Create a Storyblok Account & Space

1. Go to [app.storyblok.com](https://app.storyblok.com) and sign up
2. Create a new **Space** (project) – name it "Conalytic"
3. Choose **Community plan** (free) to get started

### Step 2: Get API Tokens

1. In your Space, go to **Settings → Access Tokens**
2. You'll see two tokens:
   - **Preview Token** – For draft content in development
   - **Public Token** – For published content in production
3. Copy both tokens

### Step 3: Configure Environment Variables

Edit `.env.local`:
```bash
STORYBLOK_API_TOKEN=your_public_token_here
STORYBLOK_PREVIEW_TOKEN=your_preview_token_here
NEXT_PUBLIC_STORYBLOK_SPACE_ID=12345678
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 4: Create Content Types in Storyblok

In Storyblok, go to **Block Library** and create these content types:

#### Page (base type for all pages)
```
Fields:
- title: Text (required)
- description: Text (SEO description)
- body: Blocks (page sections)
```

#### Blog Post
```
Fields:
- title: Text (required)
- slug: Text (required, URL-safe)
- excerpt: Textarea
- content: Richtext
- category: Text
- published_at: Date
- featured_image: Asset
- read_time: Text
```

#### Job Listing
```
Fields:
- title: Text (required)
- location: Text
- type: Text (Full-time/Part-time/Contract)
- description: Richtext
- requirements: Richtext
```

### Step 5: Configure Storyblok Visual Editor

1. In Storyblok Space Settings → Visual Editor
2. Set **Default environment URL** to `http://localhost:3000`
3. Set **Preview URL** to `http://localhost:3000/api/storyblok/preview`

### Step 6: Set Up Webhooks for Auto-Rebuild (Production)

1. In Vercel: Project → Settings → Git → Deploy Hooks
2. Create a hook for the `main` branch, copy the URL
3. In Storyblok: Settings → Webhooks → Add new
4. Paste the Vercel deploy hook URL
5. Trigger on: `story_published`, `story_unpublished`

---

## 6. Pages & Content Mapping

### Home Page (`/`)
**Current content source:** Static in `src/app/page.tsx`  
**Storyblok migration:** Create a "Home" story with these blocks:
- `hero` block → Hero section
- `trusted-logos` block → Trusted by section
- `feature-grid` block → 4-feature grid
- `platform-cards` block → 3 platform comparison cards
- `testimonials` block → 6 testimonials
- `faq` block → FAQ accordion
- `cta` block → CTA section

### Blog Posts (`/blogs/[slug]`)
**Managed in Storyblok** under `blogs/` folder.  
Each post = one Story with slug matching the URL.

---

## 7. Component Architecture

### Design System

#### Colors
| Token | Value | Use |
|---|---|---|
| `brand-500` | `#6B5FF8` | Primary purple – buttons, links, icons |
| `brand-400` | `#a78bfa` | Light purple – accents, highlights |
| `navy-900` | `#0A0F1E` | Page background |
| `navy-800` | `#0E1526` | Section alternating background |
| `navy-700` | `#141C30` | Card background |

#### Typography
- **Font:** Inter (Google Fonts, variable font)
- **Headings:** `font-bold`, sizes from `text-3xl` to `text-7xl`
- **Body:** `text-white/60` for regular text, `text-white/50` for muted

#### Spacing
- **Section padding:** `py-24` (6rem top/bottom)
- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Card padding:** `p-6` or `p-8`

### Button Component
```tsx
<Button variant="primary" size="lg" href="/features">
  Get Started
</Button>
```
Variants: `primary` | `secondary` | `outline` | `ghost`  
Sizes: `sm` | `md` | `lg`

### Card Component
```tsx
<Card hover>
  Content here
</Card>
```

---

## 8. SEO Strategy

### Preserved from WordPress
All content was carefully migrated with the **exact same** titles, descriptions, and copy from the WordPress site to maintain SEO rankings.

### Metadata Implementation
Every page has a `metadata` export:
```tsx
export const metadata: Metadata = {
  title: "Exact WordPress title preserved",
  description: "Exact WordPress meta description preserved",
  openGraph: { ... },
  twitter: { ... },
};
```

### Structured Data (TODO)
Add JSON-LD structured data for:
- `Organization` schema on all pages
- `FAQPage` schema on Home page
- `JobPosting` schema on Careers page
- `BlogPosting` schema on Blog posts

### Core Web Vitals Optimization
- **LCP:** Hero images use `priority` prop
- **CLS:** All layout shifts prevented with fixed dimensions
- **FID/INP:** Minimal client-side JS (RSC by default)
- **Images:** Next.js `<Image>` component with automatic WebP/AVIF

### Sitemap
Auto-generated at `/sitemap.xml` via `src/app/sitemap.ts`.  
Updates every build automatically.

---

## 9. URL Migration from WordPress

WordPress used some different URL patterns. All handled in `next.config.ts`:

| Old WordPress URL | Redirects To | Type |
|---|---|---|
| `/about` | `/about-us` | 301 Permanent |
| `/blog` | `/blogs` | 301 Permanent |
| `/resources/blogs` | `/blogs` | 301 Permanent |
| `/contact-us` | `/contact` | 301 Permanent |
| `/resources/integrations` | `/integrations` | 301 Permanent |
| `/resources/careers` | `/careers` | 301 Permanent |

**Important:** All blog post slugs from WordPress must be preserved exactly as-is to maintain SEO.

---

## 10. Deployment Guide

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
cd "conalytic"
vercel

# Set environment variables in Vercel dashboard:
# STORYBLOK_API_TOKEN
# STORYBLOK_PREVIEW_TOKEN
# NEXT_PUBLIC_STORYBLOK_SPACE_ID
# NEXT_PUBLIC_SITE_URL=https://conalytic.com
```

### Custom Domain Setup
1. In Vercel: Project → Settings → Domains
2. Add `conalytic.com` and `www.conalytic.com`
3. Update DNS records as instructed by Vercel
4. SSL is automatic via Let's Encrypt

### Environment Variables in Vercel
1. Project → Settings → Environment Variables
2. Add each variable from `.env.local.example`
3. Set scope: `Production`, `Preview`, `Development` as appropriate

---

## 11. Development Workflow

### Adding a New Page

1. Create `src/app/[route]/page.tsx`
2. Add metadata export
3. Add route to `src/app/sitemap.ts`
4. Add redirect if there was a different WordPress URL in `next.config.ts`

### Adding a New Component

1. Create component in appropriate `src/components/` subfolder
2. Export from component file
3. Import in the page/section that needs it

### Adding a Blog Post

**Without Storyblok (dev mode):**  
Add to the `blogPosts` array in `src/app/blogs/page.tsx`

**With Storyblok configured:**  
1. Go to Storyblok → Content → Blogs folder
2. Create new Story
3. Fill in title, slug (must match WordPress slug), content
4. Publish – page auto-regenerates

---

## 12. Content Editing with Storyblok

### For Non-Developers: Editing Content

1. Log in to [app.storyblok.com](https://app.storyblok.com)
2. Navigate to **Content** in the sidebar
3. Click any Story (page) to edit
4. Use the **Visual Editor** to see live preview
5. Edit text fields on the right panel
6. Click **Save** to save as draft
7. Click **Publish** to make changes live

### Storyblok Block Mapping

Each page section in Next.js has a corresponding Storyblok block:

| Block Name | Component | Notes |
|---|---|---|
| `hero` | `HeroBlock` | Page hero with title, subtitle, CTAs |
| `feature-grid` | `FeatureGridBlock` | 2/3/4 column feature cards |
| `testimonials` | `TestimonialsBlock` | Customer testimonial cards |
| `faq` | `FAQBlock` | Accordion FAQ section |
| `cta` | `CTABlock` | Full-width CTA section |
| `pricing-table` | `PricingBlock` | Pricing plan comparison |
| `rich-text` | `RichTextBlock` | Blog post content |

---

## Changelog

| Date | Change | Author |
|---|---|---|
| Mar 2026 | Initial Next.js + Storyblok migration from WordPress | Dev |
| Mar 2026 | All 9 pages built with static content | Dev |
| Mar 2026 | SEO metadata, sitemap, robots.txt, redirects configured | Dev |
| Mar 2026 | Storyblok API utilities and provider set up | Dev |

---

*For questions, contact the development team or file an issue in the repository.*
