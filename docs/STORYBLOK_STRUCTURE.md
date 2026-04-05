# Storyblok structure — full site, blogs, images, preview

See **[STORYBLOK_GUIDE.md](./STORYBLOK_GUIDE.md)** for **new space setup**, **env vars**, **Visual Editor URL**, and **sync/seed** commands.

See **[WEBSITE.md](./WEBSITE.md)** for Next.js layout, SEO, and APIs.

This doc is the **single map** of how marketing content, blogs, images, and backgrounds line up between **Storyblok** and **conalytic.com**.

**Sections §9–§12** describe the **clean folder structure** in Storyblok, **how to manage all content and media**, and **what still lives in the repo** until you add more fields.

---

## 1) Whole-site content map

Use **folders in Storyblok** so `full_slug` stays predictable. The app tries **`pages/content/…`** first (core pages), then flat **`pages/…`**, then legacy top-level slugs (see `getPageStoryCandidates` in `src/lib/storyblok-core.ts`).

| Public URL | Preferred story `full_slug` | Storyblok root component | How the app uses it |
|------------|----------------------------|---------------------------|---------------------|
| `/` | `pages/content/home` | **`home_page`** | Copy fields → `HomeClient` (`app/page.tsx` → `mapHomeContent`). Optional `body` if `use_storyblok_page`. |
| `/features` | `pages/content/features` | **`features_page`** | `CmsPage` + React fallback |
| `/contact` | `pages/content/contact` | **`contact_page`** | Same |
| `/careers` | `pages/content/careers` | **`careers_page`** | Same |
| `/integrations` | `pages/content/integrations` | **`integrations_page`** | Same |
| `/blogs` | `pages/content/blogs` | **`blogs_page`** | Same |
| `/about-us` | `pages/content/about-us` | **`about_page`** | Same |
| `/brand` | `pages/content/brand` | **`page`** (or dedicated type later) | Same |
| `/cookies` | `pages/content/cookies` | **`cookies_page`** | Same layout as before; fields drive all policy copy. Optional `use_storyblok_page` for blok builder. |
| `/products/conversational-analytics` | `pages/products/conversational-analytics` | **`conversational_analytics_page`** | Same |
| `/products/report-builder` | `pages/products/report-builder` | **`report_builder_page`** | Same |
| `/products/applicant-tracking-system` | `pages/products/applicant-tracking-system` | **`ats_page`** | Same |
| **`/{post-slug}`** (blog) | **`blogs/{post-slug}`** or `blog/{post-slug}` | **`blog_post`** | `app/[slug]/page.tsx` — not under `/blogs/…` in the public URL |
| *(global)* | **`globals/site-config`** | **`site_config`** | Navbar, footer, scripts, `use_storyblok_layout`, **cookie banner**, **brand images** (`site_navbar_logo_*`, `site_footer_tagline_*`, `site_footer_mark_icon`, `site_brand_logo_alt`) |

**Not in Storyblok as pages:** **Privacy** and **Terms** live on **https://chat.conalytic.com** (see `legal-external-urls.ts`); `/privacy` and `/terms` redirect there.

If a story is missing, the route still works using the **built-in React page** (fallback).

---

## 2) Two ways to edit a page

| Mode | Flag | What editors do |
|------|------|------------------|
| **Field-driven (default)** | `use_storyblok_page` = **off** | Edit named fields (hero lines, FAQ JSON, etc.). Layout and sections stay in React. |
| **Full visual page** | `use_storyblok_page` = **on** | Compose **`body`** with **`section`**, **`hero`**, **`rich_text`**, **`cards_grid`**, **`stats`**, **`cta`**. Renders via `StoryblokStory` (`CmsPage`). |

**Home** (`/`) always uses the product home layout (`HomeClient`); Storyblok drives **copy** via `home_page` fields, not a blank canvas, unless you later change that in code.

---

## 3) Images, backgrounds, and social previews

| Where | Storyblok fields | Renders in |
|-------|------------------|------------|
| **Section background** | `section` → **`background`** (tone), **`background_image`**, **`background_image_alt`** | `SectionBlock.tsx` (overlay keeps text readable) |
| **Hero illustration** | `hero` → **`image`**, **`image_alt`** | `HeroBlock.tsx` |
| **Card thumbnail** | `card_item` → **`image`**, **`image_alt`** | `CardItemBlock.tsx` |
| **Blog hero + sharing** | **`blog_post`** → **`cover_image`** (article hero), **`seo_og_image`** (optional; if empty, **cover** is used for OG/Twitter) | `app/[slug]/page.tsx` + metadata |
| **Any marketing page** | Root `*_page` / **`page`** → **`seo_og_image`** | Next **`openGraph.images`** + **Twitter** `summary_large_image` via `getMetadataFromStory` / `mergeSocialPreviewFromStoryContent` |

Helpers: **`src/lib/storyblok-asset.ts`** (`storyblokImageSrc`, `storyblokImageAlt`, **`storyblokOgImageSrc`**).  
`next.config.ts` allows **`a.storyblok.com`** / **`img2.storyblok.com`** for `next/image`.

**Share image spec:** about **1200×630**, reasonable file size (under ~1 MB) for fast previews.

---

## 4) Blog posts (`blog_post`)

- **Story location:** `blogs/<slug>` (or `blog/<slug>`).  
- **Public URL:** `https://conalytic.com/<slug>` (root, not `/blogs/<slug>`; `/blogs/<slug>` redirects to the root URL).  
- **Fields:** `title`, `category`, `read_time`, `excerpt`, **`cover_image`**, **`seo_og_image`** (optional), **`body_rich_text`**, `seo_title`, `seo_description`.  
- **Listing page:** `pages/content/blogs` story (`blogs_page`) for `/blogs` hero + optional `body` blocks.

---

## 5) Global site config (`site_config`)

Slug: **`globals/site-config`** (fallbacks: `settings/site-config`, `site-config`).

| Area | Fields / bloks |
|------|----------------|
| Layout | `use_storyblok_layout`, navbar/footer bloks (`nav_link`, `footer_column`, `social_link`, …) |
| Brand images | **`site_navbar_logo_light`**, **`site_navbar_logo_dark`**, **`site_footer_tagline_light`**, **`site_footer_tagline_dark`**, **`site_footer_mark_icon`**, **`site_brand_logo_alt`** — applied sitewide when set (even if layout stays on code defaults). |
| Cookie banner | **`cookie_banner_heading`**, **`cookie_banner_message`**, **`cookie_banner_policy_link_label`**, **`cookie_banner_essential_label`**, **`cookie_banner_accept_all_label`** (site-wide first-visit banner; link still goes to `/cookies`) |
| Scripts | **`site_scripts_head`**, **`site_scripts_body_start`**, **`site_scripts_body_end`** → **`site_script`** (`script_url`, `load_strategy`, `async`, `defer`, **`require_marketing_consent`**) |

---

## 6) Registered blok components (builder)

- **`page`** (+ typed `*_page` roots): metadata + optional **`body`**
- **`section`**: padding, **background** style, width, **background image**, nested bloks
- **`hero`**, **`rich_text`**, **`cards_grid`** / **`card_item`**, **`stats`** / **`stat_item`**, **`cta`**
- **`site_script`**, **`nav_link`**, **`footer_column`**, **`social_link`** (config)

Full schema: **`storyblok/components.schema.json`**. After edits, run **`npm run storyblok:sync-components`**.

---

## 7) Website preview (Visual Editor) — checklist

1. **Storyblok → Settings → Visual Editor:** default URL = your site (e.g. `https://localhost:3000/` or Vercel preview).  
2. **Per story:** **Real path** matches the route (e.g. home → `/`, blog post → `/{slug}`).  
3. **Env:** `NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN` (and server preview token) so **draft** loads; bridge uses the public token.  
4. **This repo:** `middleware` sets **`sb_visual_editor`** when opening from Storyblok so drafts are consistent.

Details: **STORYBLOK_GUIDE.md §4**.

---

## 8) Sync components & seed stories

```bash
export STORYBLOK_MANAGEMENT_TOKEN="..."
export STORYBLOK_SPACE_ID="..."
npm run storyblok:sync-components
npm run storyblok:seed
```

- **Sync:** `storyblok/components.schema.json` → Management API (`scripts/storyblok-upsert-components.mjs`).  
- **Seed:** starter stories (`scripts/storyblok-seed-stories.mjs`) — adjust slugs/content there as needed.

---

## 9) Clean folder structure in Storyblok (recommended)

Create **folders** first, then stories inside them. Keep **`full_slug`** aligned with this tree so editors and developers see the same mental model.

```text
globals/
  site-config                 ← single story: navbar, footer, cookie banner, scripts

pages/                        ← folder label in CMS: “Website”
  content/                    ← “Core pages” — marketing + blog index + legal (matches public routes)
    home
    features
    contact
    careers
    integrations
    blogs
    about-us
    brand
    cookies
  products/                   ← “Product pages”
    conversational-analytics
    report-builder
    applicant-tracking-system

blogs/                        ← “Blog articles”
  <post-slug>                 ← each blog_post; public URL is /{post-slug}
```

**Rules**

| Rule | Why |
|------|-----|
| Prefer **`pages/content/<route>`** for core pages; **`pages/products/…`** for product URLs | Keeps the CMS tree shallow and grouped; `getPageStoryCandidates` still accepts flat **`pages/<route>`** and top-level slugs for older spaces. |
| Blog posts only under **`blogs/`** or **`blog/`** | App resolves `blogs/<slug>` → `https://conalytic.com/<slug>`. |
| One story per **public URL** (except globals) | Avoid duplicate slugs fighting the same route. |
| **`globals/site-config`** is the only “global” marketing config | Scripts, layout toggle, cookie banner strings live here—not scattered stories. |

---

## 10) Whole content management (what editors own)

| Content type | Where in Storyblok | Notes |
|--------------|-------------------|--------|
| Page titles & SEO | Each root `*_page` / `page` / `blog_post`: **`seo_title`**, **`seo_description`**, **`seo_og_image`** | OG image optional; blogs fall back to **cover**. |
| Marketing copy (fixed layouts) | **Named fields** on `home_page`, `features_page`, `contact_page`, … | Home: `home_*` fields + JSON (`home_faq_items_json`, `home_testimonials_json`). |
| Legal / policy copy | **`cookies_page`** fields + JSON textareas | Same UI as before; all strings editable. |
| Site-wide chrome | **`site_config`**: nav, footer, **cookie banner**, **site_script** bloks | Turn **`use_storyblok_layout`** on to apply nav/footer from CMS. |
| Long-form / landing builder | **`use_storyblok_page`** + **`body`** (`section`, `hero`, `rich_text`, …) | Optional; replaces default React body for that route when enabled. |
| Blog body | **`blog_post.body_rich_text`** | Rich text in Storyblok. |
| Structured lists (FAQ, testimonials, TOC, …) | **JSON in textarea** fields (validated at render; invalid JSON → code defaults) | Same pattern as home FAQ; document expected shape in field **description** in Storyblok. |

**Operational habit:** after changing **component schema** in the repo, run **`npm run storyblok:sync-components`** before editors use new fields.

---

## 11) Whole media management

| Media role | Managed in Storyblok? | Where |
|------------|----------------------|--------|
| **Blog cover & share image** | Yes | **`blog_post.cover_image`**, optional **`seo_og_image`**. |
| **Builder pages** (`use_storyblok_page`) | Yes | **`hero.image`**, **`section.background_image`**, **`card_item.image`** (+ alt fields). |
| **Page link previews** | Yes | **`seo_og_image`** on root page components. |
| **Integration partner logos (home)** | **Yes (optional)** | **`home_page`** → **`home_marquee_logos`** bloks (**`home_marquee_logo`**: `integration_key`, optional `logo` asset, `label`). Empty = built-in **`marketing-stack-logos.ts`** paths. |
| **Hero background + small brand mark on home** | **Yes (optional)** | **`home_hero_background_image`**, **`home_brand_icon`** (+ alts) on **`home_page`**. |
| **Navbar / footer logos sitewide** | **Yes (optional)** | **`site_config`** brand asset fields (see §5). |
| **Brand kit / static marketing art** | Mixed | Often **`/public`** or Storyblok assets depending on page; builder pages prefer Storyblok **Assets**. |
| **Favicon / default OG** | Code | **`layout.tsx`** metadata + **`public/og-image.png`** (not per-story unless you override per route). |

**Recommended media workflow**

1. Upload images in **Storyblok → Assets** (folders optional: e.g. `blog/`, `marketing/`).  
2. Fill **alt** text in the schema field (`image_alt`, `background_image_alt`, asset metadata where used).  
3. Prefer **WebP** or optimized **PNG/JPEG**; large hero backgrounds under ~500 KB when possible.  
4. **Share cards:** ~**1200×630** for **`seo_og_image`** / blog covers used socially.  
5. **`next/image`** is allowed for **`a.storyblok.com`** / **`img2.storyblok.com`** (`next.config.ts`).

---

## 12) What is *not* fully in Storyblok today (honest scope)

These remain **code or `/public`** when you leave Storyblok assets empty, or until further fields exist:

- **Default integration asset paths** — `marketing-stack-logos.ts` (fallback when **`home_marquee_logos`** has no uploaded `logo` for a row).  
- **Some home demo content** — e.g. hardcoded Q&A chart demo copy inside **`HomeClient`** (product demo, not CMS).  
- **Default site-wide OG/Twitter** in root **`metadata`** — global fallback; per-page OG still from CMS when set.  
- **Privacy / Terms** — external **chat.conalytic.com** URLs, not Storyblok stories on this app.  
- **Newsletter API behaviour** — Env + Resend; only labels/copy around it could be moved to `site_config` if you want.

**Testimonial photos** in the home JSON still use **URLs inside `home_testimonials_json`** (can point to Storyblok CDN links). Optional: migrate to dedicated asset bloks later.

---

## Related

- **[STORYBLOK_GUIDE.md](./STORYBLOK_GUIDE.md)** — env, Visual Editor, sync, image field table.  
- **`storyblok/components.schema.json`** — source of truth for field names and descriptions shown in the editor.
