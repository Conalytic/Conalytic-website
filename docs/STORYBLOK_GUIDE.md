# Storyblok — clean setup, new space, and Visual Editor

This guide is for **migrating to a new Storyblok space** (or fixing a messy one) and running the site with a **predictable content model**, **image fields**, and **live preview** in the Visual Editor.

**Security:** Put all tokens only in **`.env.local`** (and your host’s env UI). **Do not** paste API keys into chat, tickets, or Git.

---

## 1. Principles (keep the model boring)

| Idea | What we do |
|------|------------|
| **One source of truth for slugs** | Stories live under clear folders (see §3). The app resolves `pages/<route>` or legacy `<route>`. |
| **Code owns layout; CMS owns copy** | Most routes use React pages (`HomeClient`, etc.) and only pull **fields** from Storyblok. Full builder pages are optional (`use_storyblok_page`). |
| **Reusable bloks** | `hero`, `section`, `rich_text`, `cards_grid`, `card_item`, `stats`, `stat_item`, `cta` — not dozens of one-off field names. |
| **Images are assets** | Use Storyblok **Image** assets + **alt** text fields (see schema + `storyblok-asset.ts`). |

---

## 2. Environment variables (new space)

In **Storyblok → Settings → Access tokens**:

1. **Public** token → `STORYBLOK_API_TOKEN` (published content on the live site).
2. **Preview** token → `STORYBLOK_PREVIEW_TOKEN` (draft + Visual Editor).

In **`.env.local`** (copy from **`.env.local.example`**):

| Variable | Role |
|----------|------|
| `STORYBLOK_API_TOKEN` | Server: **published** CDN |
| `STORYBLOK_PREVIEW_TOKEN` | Server: **draft** CDN when in preview |
| `NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN` | **Same value as preview token** — required for the **Storyblok Bridge** in the browser (Visual Editor). If omitted, the code falls back to `STORYBLOK_PREVIEW_TOKEN` only in server init where `NEXT_PUBLIC_*` is not needed. |
| `NEXT_PUBLIC_STORYBLOK_SPACE_ID` | Space id (optional for some tooling) |
| `STORYBLOK_MANAGEMENT_TOKEN` | **Scripts only** — `npm run storyblok:sync-components`, `npm run storyblok:seed` |
| `STORYBLOK_SPACE_ID` | Numeric space id for those scripts |
| `STORYBLOK_SCRIPT_ALLOWED_HOSTS` | Optional: comma-separated hostnames allowed for **`site_script`** URLs (e.g. `www.googletagmanager.com,consent.cookiebot.com`) |

After switching spaces, update **all** of the above for the **new** space.

---

## 3. Folder structure in Storyblok (recommended)

Create **folders** and stories so slugs match what the app expects:

| Folder / story slug | Purpose |
|---------------------|---------|
| `globals/site-config` | Navbar, footer, `use_storyblok_layout`, **third-party scripts** (`site_scripts_*`) |
| `pages/content/home` | Home story (`home_page` component + optional fields) |
| `pages/content/features`, `pages/content/contact`, … | One story per core marketing (or legal) route |
| `pages/products/conversational-analytics` | Product pages |
| `blogs/` | Blog posts (`blogs/<post-slug>`) |

**Seed layout:** folders **`Website`** → **`Core pages`** → stories; **`Product pages`** under `pages/products/`. The app resolves **`pages/content/<segment>`** first, then flat **`pages/<segment>`**, then top-level **`home`** etc. — see `getPageStoryCandidates` in `src/lib/storyblok-core.ts`.

### Third-party scripts (CMP, GTM, analytics)

On the **`site_config`** story, three blok fields load **`site_script`** entries into the root layout:

| Field | Typical use | Default load strategy |
|-------|-------------|------------------------|
| **`site_scripts_head`** | Consent / early tags | After interactive (unless each blok overrides) |
| **`site_scripts_body_start`** | Same family, slightly later | After interactive |
| **`site_scripts_body_end`** | Analytics, chat | Lazy on load |

Each **`site_script`** blok: **`script_url`** (full `https://…` to a `.js` file), optional **`load_strategy`**, **`async`** / **`defer`**, and optional **`require_marketing_consent`** (when on, the script loads only after **Accept all** on the cookie banner—use for analytics; leave off for CMP / essential loaders). Rendering uses `next/script` (`SiteScripts.tsx`) plus **`MarketingScriptConsentGate.tsx`** for gated entries. URL checks live in **`src/lib/site-scripts.ts`**; optional host allowlist via **`STORYBLOK_SCRIPT_ALLOWED_HOSTS`**.

---

## 4. Visual Editor (preview on your site)

### In Storyblok

1. **Settings → Visual Editor**  
   - **Location (default preview URL):** your deployed preview or local URL, e.g. `https://localhost:3000/` or `https://your-preview.vercel.app/`.  
   - For **home**, set the story’s **Real path** to `/` if needed.

2. Storyblok loads your site in an iframe with bridge query params (`_storyblok`, etc.).

### In this repo

- **`src/middleware.ts`** sets a short-lived cookie when those params are present so **draft** content loads reliably.
- **`src/lib/storyblok-server.ts`** loads **draft** when:
  - `NODE_ENV === "development"`, or  
  - `Referer` contains `storyblok.com`, or  
  - cookie `sb_visual_editor` is set.

**Published** traffic uses the **public** token and cached fetches; **sitemaps** always use **`version: "published"`**.

### HTTPS on localhost

Storyblok’s docs recommend:

```bash
npx next dev --experimental-https
```

Trust the local certificate once in the browser, then set the Visual Editor URL to `https://localhost:3000/`.

---

## 5. Sync components + seed (new space)

From `conalytic/`:

```bash
export STORYBLOK_MANAGEMENT_TOKEN="..."
export STORYBLOK_SPACE_ID="..."
npm run storyblok:sync-components
npm run storyblok:seed
```

- **Sync** pushes **`storyblok/components.schema.json`** → Storyblok component definitions (including **image** fields on `hero`, `card_item`, `section`).
- **Seed** creates starter stories (adjust slugs/names in `scripts/storyblok-seed-stories.mjs` if you want fewer stories).

---

## 6. Image fields (schema + frontend)

| Component | Field | UI |
|-----------|--------|-----|
| `hero` | `image` (asset, images only), `image_alt` | Illustration beside text on large screens |
| `card_item` | `image`, `image_alt` | Thumbnail above card title |
| `section` | `background_image`, `background_image_alt` | Full-bleed background + overlay |
| `page`, `home_page`, `blogs_page`, product `*_page`, … | **`seo_og_image`** | Open Graph / X link preview (`mergeSocialPreviewFromStoryContent` in **`storyblok-core.ts`**) |
| `blog_post` | **`cover_image`** (hero), **`seo_og_image`** (optional override for sharing) | Article hero in **`app/[slug]/page.tsx`**; JSON-LD `image` when present |

Helpers: **`src/lib/storyblok-asset.ts`** (`storyblokImageSrc`, `storyblokImageAlt`, **`storyblokOgImageSrc`**).

`next.config.ts` already allows **`a.storyblok.com`** / **`img2.storyblok.com`** for `next/image`.

---

## 7. Generic `page` component default

In the schema, **`page.use_storyblok_page`** defaults to **`false`** so new generic pages don’t accidentally render an empty builder shell; editors turn it on only when using the blok tree.

---

## 8. Related docs

- **[STORYBLOK_STRUCTURE.md](./STORYBLOK_STRUCTURE.md)** — URL/slug/component map, blogs, images, preview checklist, **§9–§12** (folder tree, full content & media governance, CMS vs code gaps).
- **[WEBSITE.md](./WEBSITE.md)** — app architecture and env overview.

---

## 9. Checklist — wrong space → right space

1. Create **new space** (or empty the old one if you prefer not to start fresh).  
2. Generate **public**, **preview**, and **management** tokens.  
3. Update **`.env.local`** and **production** env on Vercel/host.  
4. Run **`storyblok:sync-components`** then **`storyblok:seed`** (or create stories manually following §3).  
5. Configure **Visual Editor** URL + **Real path** for `/`.  
6. Open a story → **Visual Editor** → confirm draft content and click-to-edit (Bridge + `storyblokEditable` on blok components).  
7. **Publish** when ready; production uses published content + public token.

If you tell us your **deployment URL** for previews (e.g. `*.vercel.app`), we can document exact Visual Editor entries line-by-line in this file.
