/** CMS field paths the AI must use — matches React content presets (flat keys under sections). */

const PAGE_LINK_FIELDS = `
Button & internal link fields (flat keys under sections — update label AND href together):
- heroPrimaryCtaLabel, heroPrimaryCtaHref — primary hero button
- heroSecondaryCtaLabel, heroSecondaryCtaHref — secondary hero button (when page has two)
- heroButtonLabel, heroButtonHref — single hero button (careers anchor CTA)
- ctaPrimaryLabel, ctaPrimaryHref — bottom CTA section primary button
- ctaSecondaryLabel, ctaSecondaryHref — bottom CTA section secondary button
- integrationsCtaHref — "View all integrations" link on home (label: integrationsCtaLabel)
- faqContactHref — FAQ "Talk to our team" link on home (label: faqContactLabel)

Internal linking rules:
- Use paths from the site registry (e.g. /features, /products/kpis-tracker, /contact).
- Same-page anchors: /#pricing, /#faq, #open-positions on careers.
- External signup/login: full URLs to chat.conalytic.com when appropriate.
- Blog posts: add markdown links in bodyMarkdown, e.g. [Features](/features).
- Do NOT invent new routes — only use existing registry paths or hash anchors on known pages.`;

const HOME_SECTION_FIELDS = `
Home page — all copy lives under sections as flat keys (NOT nested hero.*):
- heroTitleLine1, heroTitleLine2 — hero headline (line 1 plain, line 2 brand gradient)
- heroSubtitle — hero paragraph under the headline
${PAGE_LINK_FIELDS}
- trustedByTitle, servicesTitleLine1, servicesTitleLine2
- integrationsTitleLine1, integrationsTitleLine2, integrationsSubtitle, integrationsCtaLabel
- testimonialsTitleLine1, testimonialsTitleLine2, testimonialsSubtitle, testimonials (array)
- faqTitle, faqSubtitle, faqContactPrefix, faqContactLabel, faqItems (array of { question, answer })
- ctaTitle, ctaSubtitle
Section order: layout.sectionOrder — keys: hero, trustedBy, transformation, howItWorks, products, stats, integrations, testimonials, pricing, faq, cta`;

const PAGE_HERO_FIELDS = `
Page hero — flat keys under sections (NOT nested objects):
- heroTitleLine1, heroTitleLine2, heroSubtitle
${PAGE_LINK_FIELDS}`;

const BLOG_FIELDS = `
Blog post overlay:
- title, excerpt, description, category, readTime, dateLabel, bodyMarkdown
- bodyMarkdown supports markdown internal links: [anchor text](/path)
- seo.title, seo.description, seo.keywords (comma-separated array), seo.canonical, seo.ogTitle, seo.ogDescription for meta tags`;

const REGISTRY_FIELD_HINTS: Record<string, string> = {
  home: HOME_SECTION_FIELDS,
  features: PAGE_HERO_FIELDS,
  integrations: PAGE_HERO_FIELDS,
  about: PAGE_HERO_FIELDS,
  contact: `${PAGE_HERO_FIELDS}\n- formTitle`,
  careers: `${PAGE_HERO_FIELDS}\n- heroButtonLabel, heroButtonHref (scroll to #open-positions or another internal path)`,
  blogs: PAGE_HERO_FIELDS,
  "product-chat": `${PAGE_HERO_FIELDS}\n- heroSecondarySubtitle`,
  "product-reports": `${PAGE_HERO_FIELDS}\n- heroSecondarySubtitle`,
  "product-kpis": PAGE_HERO_FIELDS,
  "product-ats": PAGE_HERO_FIELDS,
};

export function getFieldHintsForRegistry(registryId: string): string {
  if (registryId.startsWith("blog-")) return BLOG_FIELDS;
  return REGISTRY_FIELD_HINTS[registryId] ?? PAGE_HERO_FIELDS;
}
