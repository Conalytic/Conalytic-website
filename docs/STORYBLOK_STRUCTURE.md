# Storyblok Structure

This project now uses a Storyblok-first rendering flow for all major routes.

## 1) Slug Convention

Create each page as a Story in one of these formats:

- `home` or `pages/home`
- `about-us` or `pages/about-us`
- `features` or `pages/features`
- `contact` or `pages/contact`
- `careers` or `pages/careers`
- `integrations` or `pages/integrations`
- `blogs` or `pages/blogs`
- `brand` or `pages/brand`
- `terms` or `pages/terms`
- `privacy` or `pages/privacy`
- `cookies` or `pages/cookies`
- `products/conversational-analytics` or `pages/products/conversational-analytics`
- `products/report-builder` or `pages/products/report-builder`
- `products/applicant-tracking-system` or `pages/products/applicant-tracking-system`

If Storyblok content is missing, the legacy React page is rendered as fallback.

## Blog URL Structure

Blog posts are published at root-level URLs:

- `https://conalytic.com/<blog-slug>`

In Storyblok, create blog stories under `blogs/<blog-slug>` (or `blog/<blog-slug>`), and the app resolves them to root URLs automatically.

## 2) Root Page Component

For each page story, use component: `page`

Recommended fields:

- `title` (text)
- `description` (textarea)
- `seo_title` (text)
- `seo_description` (textarea)
- `use_storyblok_page` (boolean, default false)
- `body` (bloks, allow: `section`, `hero`, `rich_text`, `cards_grid`, `stats`, `cta`)

For the existing homepage UI (without changing design), you can also edit legacy content fields such as:

- `home_hero_title_line_1`
- `home_hero_title_line_2`
- `home_hero_subtitle`
- `home_hero_primary_cta_label`
- `home_hero_primary_cta_href`
- `home_hero_secondary_cta_label`
- `home_hero_secondary_cta_href`

These fields update copy inside the current code UI while preserving layout/styles.

## 3) Registered Blok Components

- `page`: root container that renders `body`
- `section`: layout wrapper with spacing/background/container options
- `hero`: top hero with optional kicker, heading, subtitle and CTA buttons
- `rich_text`: rich text renderer
- `cards_grid`: card collection layout
- `card_item`: individual content card
- `stats`: stats group
- `stat_item`: individual stat
- `cta`: call-to-action band

## 4) Global Site Config Story

Create one global story with slug:

- `globals/site-config` (preferred)
- fallback slugs: `settings/site-config`, `site-config`

Suggested fields:

- `navbar_links` (bloks `nav_link`)
- `navbar_login_label` (text)
- `navbar_login_link` (link)
- `navbar_primary_cta_label` (text)
- `navbar_primary_cta_link` (link)
- `footer_email` (text)
- `footer_columns` (bloks `footer_column`)
- `footer_social_links` (bloks `social_link`)
- `footer_legal_links` (bloks `nav_link`)
- `footer_copyright` (text)

Suggested helper bloks:

- `nav_link`: `label` (text), `link` (link), `description` (text), `children` (bloks `nav_link`)
- `footer_column`: `title` (text), `links` (bloks `nav_link`)
- `social_link`: `label` (text), `link` (link)

## One-Shot Component Sync

Use the ready schema + sync script:

1. Set environment variables:
   - `STORYBLOK_MANAGEMENT_TOKEN`
   - `STORYBLOK_SPACE_ID`
2. Run:
   - `npm run storyblok:sync-components`

Files:

- `storyblok/components.schema.json`
- `scripts/storyblok-upsert-components.mjs`

## One-Shot Story Seeding

Seed starter content (idempotent create/update + publish) for:

- `globals/site-config`
- `pages/home`
- `pages/features`
- `pages/blogs`
- `blogs/how-to-build-a-thriving-remote-team-culture-10`

Run:

- `npm run storyblok:seed`

File:

- `scripts/storyblok-seed-stories.mjs`
