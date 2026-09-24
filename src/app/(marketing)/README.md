# Marketing routes (App Router)

All public marketing pages live under this route group. The `(marketing)` folder name does **not** appear in URLs.

## Layout

- `layout.tsx` — GTM, site chrome (nav + footer), hash scroll helper.

## Pages

| Path | File |
|------|------|
| `/` | `page.tsx` |
| `/platform/features` | `platform/features/page.tsx` |
| `/platform/pricing` | `platform/pricing/page.tsx` |
| `/products/conversational-analytics` | `products/conversational-analytics/page.tsx` |
| `/products/kpis-tracker` | `products/kpis-tracker/page.tsx` |
| `/products/report-builder` | `products/report-builder/page.tsx` |
| `/products/applicant-tracking-system` | `products/applicant-tracking-system/page.tsx` |
| `/services` | `services/page.tsx` |
| `/services/[slug]` | `services/[slug]/page.tsx` |
| `/resources/blogs` | `resources/blogs/page.tsx` |
| `/resources/blogs/[slug]` | `resources/blogs/[slug]/page.tsx` |
| `/resources/integrations` | `resources/integrations/page.tsx` |
| `/resources/careers` | `resources/careers/page.tsx` |
| `/company/about-us` | `company/about-us/page.tsx` |
| `/company/contact` | `company/contact/page.tsx` |
| `/company/contact/thank-you` | `company/contact/thank-you/page.tsx` |
| `/company/brand` | `company/brand/page.tsx` |
| `/legal/privacy-and-policy` | `legal/privacy-and-policy/page.tsx` |
| `/legal/terms-of-service` | `legal/terms-of-service/page.tsx` |
| `/legal/cookies` | `legal/cookies/page.tsx` |

## Conventions

- **Server components** in `page.tsx`: metadata, JSON-LD, CMS overlay load.
- **Client UI** in `src/components/pages/`, `src/components/home/`, or `src/components/pages/service-landing/`.
- **Copy & SEO defaults** in each `page.tsx` and in `src/content/` (blog, service landings, home).
