export type PageLinkFields = {
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
  heroButtonLabel?: string;
  heroButtonHref?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  integrationsCtaHref?: string;
  faqContactHref?: string;
};

export type CtaPair = { label: string; href: string };

export function resolveCtaPair(
  content: PageLinkFields | undefined,
  labelKey: keyof PageLinkFields,
  hrefKey: keyof PageLinkFields,
  defaults: CtaPair,
): CtaPair {
  const label = content?.[labelKey];
  const href = content?.[hrefKey];
  return {
    label: typeof label === "string" && label.trim() ? label : defaults.label,
    href: typeof href === "string" && href.trim() ? href : defaults.href,
  };
}

export function resolveBottomCtas(
  content: PageLinkFields | undefined,
  defaults: { primary: CtaPair; secondary: CtaPair },
) {
  return {
    primaryCta: resolveCtaPair(content, "ctaPrimaryLabel", "ctaPrimaryHref", defaults.primary),
    secondaryCta: resolveCtaPair(content, "ctaSecondaryLabel", "ctaSecondaryHref", defaults.secondary),
  };
}
