# Static assets (`public/`)

Files here are served from the site root (`/filename`).

| Folder | Purpose |
|--------|---------|
| `brand/` | Logos, favicon, default Open Graph image |
| `images/services/{slug}/` | Service landing page art |
| `images/products/` | Product landing hero images |
| `integrations/` | Partner / platform logos (GA4, GSC, Ads, etc.) |
| `email/` | Transactional email + BIMI assets (fixed URLs for DNS) |

**Root-only files (do not move):**

- `llms.txt` — AI discovery
- `sitemap.xml` — generated sitemap (also built via `src/app/sitemap.ts`)
- `*.txt` domain verification tokens — must stay at the exact path your DNS/hosting provider expects

Code should reference paths via `@/lib/public-assets` and `@/lib/marketing-stack-logos`, not scattered string literals.
