# Conalytic marketing website — documentation

This document describes the **Conalytic** public site. **Storyblok was removed**; treat CMS-specific sections as historical. Blog posts are static in **`src/content/blog-posts.ts`** (canonical URLs `/{slug}`). Layout helpers live in **`src/lib/site-layout.ts`** (nav/footer parsers are unused unless you wire JSON/config later).

---

## 1. Tech stack

| Layer | Choice |
|--------|--------|
| Framework | **Next.js 15** (App Router), **React 19** |
| Styling | **Tailwind CSS 4** |
| Motion | **Framer Motion** (marketing animations) |
| Content | **In-repo** (React pages + `src/content/` for blog) |
| Email (careers) | **Resend** API (`/api/careers-application`) |
| Fonts | **Inter** (Google Font, `next/font`) |

Production URL: **https://conalytic.com** (`metadataBase` in `src/app/layout.tsx`).

---

## 2. Repository layout (`src/`)

| Path | Role |
|------|------|
| `app/` | Routes, `layout.tsx`, `sitemap.ts`, `robots.ts`, API routes |
| `app/api/careers-application/` | POST: resume upload → email to admin |
| `app/api/newsletter/` | POST: `{ email }` → Resend contact (segment/audience) or notify email |
| `components/home/` | Home page (`HomeClient.tsx`) and section modules |
| `components/layout/` | `Navbar`, `Footer`, `ThemeProvider`, `CookieConsent` |
| `components/pages/` | Large marketing clients (features, contact, careers, …) |
| `components/products/` | Product landings (e.g. conversational analytics) |
| `components/sections/` | Shared `CTA`, `StatsBar` |
| `components/seo/` | JSON-LD (`JsonLd`, `SiteStructuredData`, `HomeStructuredData`) |
| `components/blog/` | `BlogPostMarkdown` (article body) |
| `content/blog-posts.ts` | Static blog metadata + markdown bodies |
| `components/ui/` | Accordion, buttons, theme toggle, etc. |
| `lib/site-layout.ts` | Nav/footer/cookie/script **types & parsers** (optional JSON-driven chrome later) |
| `lib/site-scripts.ts` | HTTPS + optional hostname allowlist for script URLs |
| `components/layout/SiteScripts.tsx` | Injects `next/script` entries from layout buckets |
| `lib/structured-data.ts` | Schema.org builders (Organization, WebSite, FAQPage, BlogPosting, WebPage) |
| `lib/marketing-stack-logos.ts` | Logo URLs for integration partner strip |
| `lib/default-home-faq.ts` | Default FAQ copy (shared by UI + FAQ JSON-LD) |
| `lib/utils.ts` | `cn()`, `isExternalNavigationHref()` |
| `lib/legal-external-urls.ts` | Privacy & terms URLs on **chat.conalytic.com** (shared links + redirects) |
| `public/` | Static assets (logos, OG image, integration art) |

---

## 3. Environment variables

Copy **`.env.local.example`** → **`.env.local`**. Common keys:

| Variable | Purpose |
|----------|---------|
| `SITE_SCRIPT_ALLOWED_HOSTS` | Optional comma-separated hostnames for third-party script URLs |
| `NEXT_PUBLIC_SITE_URL` | Site origin for absolute URLs where needed |
| `NEXT_PUBLIC_SCHEDULE_CALL_URL` | Contact form “Schedule a call” redirect (e.g. Google Calendar booking page) |
| `RESEND_API_KEY` | Careers resume emails |
| `RESEND_FROM` | Verified sender (e.g. `onboarding@resend.dev` locally; `*@conalytic.com` after domain verify) |
| `CAREERS_APPLICATION_TO` | Inbox for applications (default **admin@conalytic.com**) |
| `RESEND_NEWSLETTER_SEGMENT_ID` | Resend **Segment** id for newsletter subscribers (recommended) |
| `RESEND_NEWSLETTER_AUDIENCE_ID` | Legacy Resend **Audience** id (optional; use segment when possible) |
| `NEWSLETTER_NOTIFY_TO` | If no segment/audience id: inbox that receives “new signup” emails (default **admin@conalytic.com**) |

Never commit **`.env.local`** or API keys into source.

---

## 4. Content model

- **Pages** are React route components; copy defaults live in each `*Client` component.
- **Blog**: `src/content/blog-posts.ts` + `app/[slug]/page.tsx` (canonical **`/{slug}`**); listing at **`/blogs`**.
- **Layout**: `app/layout.tsx` uses code defaults for cookie banner and passes `config={null}` to nav/footer (fallback links in components).

---

## 5. Home page (product decisions from sessions)

- **Integration partners** marquee: GA4, Google Search Console, Google Ads, Meta, LinkedIn, Microsoft Clarity, Bing Webmaster (see `marketing-stack-logos.ts` and `HomeClient` trusted-by section).
- **Mobile spacing**: Tighter vertical rhythm after **“The turning point”** (`Transformation` + following sections) on small screens.
- **Footer CTA block** (`CTA.tsx`): Line chart + **Key finding** demo (aligned with hero-style visualization), not text-only.
- **Pricing**: Monthly-only presentation; enterprise CTA routes to **`/contact`**; trial wording removed where specified.
- **FAQ / contact**: Link copy toward **`/contact`**; FAQ JSON-LD uses `default-home-faq.ts`.

---

## 5b. Newsletter

- **Footer** includes a **Newsletter** signup (email + Subscribe) that posts to **`POST /api/newsletter`**.
- With **`RESEND_NEWSLETTER_SEGMENT_ID`** (or legacy **`RESEND_NEWSLETTER_AUDIENCE_ID`**), subscribers are added as **Resend contacts** in that list for broadcasts.
- With **neither** id set, the API sends a **notification email** to **`NEWSLETTER_NOTIFY_TO`** (default **admin@conalytic.com**) so you can capture addresses manually until a segment exists.
- Duplicate signups return success with a friendly “already on the list” message when Resend reports a duplicate.

---

## 6. Navigation and CTAs

- **Navbar** primary CTA default: **Book A Demo** → **`/contact`** (internal). External URLs open in a new tab when applicable.
- **Products** dropdown: **Report Builder** and **Applicant Tracking System** show **Coming soon** (code).
- **Footer**: Product column includes both products + **Coming soon** chips; default contact email **admin@conalytic.com**.

---

## 7. Contact page

- Form heading and submit: **Schedule a call**; submits then **`window.location.assign(NEXT_PUBLIC_SCHEDULE_CALL_URL)`** (Google Calendar booking).
- Copy references **admin@conalytic.com** for confirmations context.
- **Book a Demo** quick card removed; **Get started** card remains.

---

## 8. Careers page

- **Apply now** buttons removed per role; **Quick Application** uses **Submit** → **`POST /api/careers-application`** with **FormData** (`role`, `resume`). Server sends email via **Resend** with attachment.
- **Submit** also deep-links **`/contact?topic=careers&role=…`** was replaced by API flow for file upload; the form no longer only links to contact for submit.

---

## 9. SEO and crawlers

- **JSON-LD** (small scripts, not duplicate hidden text):  
  - Layout: **Organization**, **WebSite**  
  - Home: **WebPage**, **FAQPage** (matches visible FAQ)  
  - Blog posts: **BlogPosting** + canonical in metadata  
- **`sitemap.ts`**: Static routes + blog URLs from `src/content/blog-posts.ts` when indexing is enabled.  
- **`robots.ts`**: Allow `/`, disallow `/api/`, `_next` via rules; sitemap URL.  
- **`next.config.ts`**: `poweredByHeader: false`, `compress: true`, redirects (e.g. `/privacy` / `/terms` → chat app, `/contact-us` → `/contact`, blog slug compatibility).  
- Home and marketing routes are **static** by default unless a route opts into dynamic behavior.

---

## 10. Legal and brand

- **Privacy** and **Terms** on the marketing site point to the chat app: **https://chat.conalytic.com/privacy-and-policy** and **https://chat.conalytic.com/terms-of-service** (footer, newsletter, cookies page links). **`/privacy`** and **`/terms`** still **308 redirect** there for old bookmarks and CMS links (`next.config.ts`). Constants: **`src/lib/legal-external-urls.ts`**.
- **Cookies** remains on this site at **`/cookies`**. A **`CookieConsent`** banner (first visit) stores **`essential`** vs **`all`** in **localStorage** (`src/lib/cookie-consent.ts`). The marketing site does not load third‑party marketing tags by default; **`all`** is reserved for optional analytics if you add them later.
- **Brand** page: kit download + **mailto** / contact with `topic=brand` where applicable.

---

## 11. Commands

```bash
npm install --legacy-peer-deps
npm run dev          # development
npm run build && npm start   # production locally
```

---

## 12. Reference to other chats

Prior Cursor sessions (parent agent transcripts live under your Cursor project folder: `agent-transcripts/*.jsonl`) covered concrete UI tasks: integration partner strip replacement, mobile spacing after the transformation section, CTA visualization, navbar/footer routing, pricing and trial copy, Storyblok seeds, **coming soon** for Report Builder / ATS, contact scheduling, careers **Resend** wiring, and SEO JSON-LD. This file is the **consolidated** operational doc; each `.jsonl` file is the raw history for one session. When you need to point a teammate at a specific session, use a short title and the filename **without** `.jsonl` as the id (Cursor’s usual citation form).

---

## 13. Maintenance notes

- Rotate **Resend** keys if ever exposed.  
- After verifying **conalytic.com** in Resend, set **`RESEND_FROM`** to an address on that domain in production.  
- Keep **FAQ** JSON-LD in sync with visible FAQ by updating **`default-home-faq.ts`** and the home page structured data wiring.
