# Source layout

Standard Next.js 16 App Router layout for the Conalytic marketing site.

```
src/
├── app/                    # Routes, root layout, API, sitemap, robots
│   ├── (marketing)/        # Public pages (see app/(marketing)/README.md)
│   ├── api/                # contact, careers, newsletter
│   ├── layout.tsx          # Root HTML shell, fonts, global CSS
│   ├── globals.css
│   ├── sitemap.ts
│   └── not-found.tsx
├── components/
│   ├── home/               # Home page sections
│   ├── layout/             # Navbar, footer, chrome, theme
│   ├── pages/              # Route-level client pages
│   │   └── service-landing/  # Service landing UI blocks
│   ├── products/           # Product marketing sections
│   ├── blog/               # Blog layout & markdown
│   ├── sections/           # Shared bands (CTA, etc.)
│   ├── seo/                # JSON-LD
│   ├── ui/                 # Primitives
│   └── visual/             # Ambient backgrounds, demos
├── content/                # Static copy (blog, service landings, home)
└── lib/                    # Site config, SEO, paths, services catalog, utils
```

**Public assets** live in `/public` — see `public/README.md`. Code references brand and product paths via `src/lib/public-assets.ts` and integration logos via `src/lib/marketing-stack-logos.ts`.
