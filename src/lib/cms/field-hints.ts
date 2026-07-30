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
HOME PAGE — sections.* flat keys AND nested section objects:

Hero (section key: hero):
- heroTitleLine1, heroTitleLine2 — headline (line 2 = green gradient)
- heroSubtitle
${PAGE_LINK_FIELDS}

Trusted by / logo marquee (trustedBy):
- trustedByTitle

Products grid (products):
- servicesTitleLine1, servicesTitleLine2

Integrations hub (integrations):
- integrationsTitleLine1, integrationsTitleLine2, integrationsSubtitle, integrationsCtaLabel, integrationsCtaHref

Transformation block (transformation) — nested object sections.transformation:
- eyebrow, titleLine1, titleLine2

How it works (howItWorks) — nested object sections.howItWorks:
- eyebrow, title, subtitle

Testimonials (testimonials):
- testimonialsTitleLine1, testimonialsTitleLine2, testimonialsSubtitle
- testimonials — array of { quote, name, title, photo, rating }

Pricing header (pricing) — nested object sections.pricing:
- eyebrow, title

FAQ (faq):
- faqTitle, faqSubtitle, faqContactPrefix, faqContactLabel, faqContactHref
- faqItems — array of { question, answer } (edit one item by returning full array with changes)

Bottom CTA (cta):
- ctaTitle, ctaSubtitle, ctaPrimaryLabel, ctaPrimaryHref, ctaSecondaryLabel, ctaSecondaryHref

Section order: layout.sectionOrder — keys: hero, trustedBy, transformation, howItWorks, products, stats, integrations, testimonials, pricing, faq, cta

IMPORTANT: Match the user's prompt to the correct section. Do NOT change heroTitleLine1/heroTitleLine2 unless they ask about the hero/headline.`;

const PAGE_HERO_FIELDS = `
Page hero — flat keys under sections (NOT nested objects):
- heroTitleLine1, heroTitleLine2, heroSubtitle
${PAGE_LINK_FIELDS}`;

const FEATURES_FIELDS = `
${PAGE_HERO_FIELDS}
- heroBadge — pill above headline
- includedTitle, includedSubtitle — "One platform" capability grid section
- ctaTitle, ctaSubtitle, ctaPrimaryLabel, ctaPrimaryHref, ctaSecondaryLabel, ctaSecondaryHref`;

const BLOG_FIELDS = `
Blog post overlay:
- title, excerpt, description, category, readTime, dateLabel, bodyMarkdown
- bodyMarkdown supports markdown internal links: [anchor text](/path)
- seo.title, seo.description, seo.keywords (comma-separated array), seo.canonical, seo.ogTitle, seo.ogDescription for meta tags`;

const REGISTRY_FIELD_HINTS: Record<string, string> = {
  home: HOME_SECTION_FIELDS,
  features: FEATURES_FIELDS,
  integrations: `${PAGE_HERO_FIELDS}\n- grid section titles if present in overlay`,
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
