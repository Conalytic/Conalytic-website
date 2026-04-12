/**
 * Home route (/): force-dynamic for fresh Storyblok copy. Maps home_page fields → HomeContentPreset,
 * emits WebPage + FAQPage JSON-LD, then renders HomeClient (full marketing page, client-heavy).
 */
import type { Metadata } from "next";
import { HomeClient, type HomeContentPreset } from "@/components/home/HomeClient";
import { HomeStructuredData } from "@/components/seo/HomeStructuredData";
import { DEFAULT_HOME_FAQ } from "@/lib/default-home-faq";
import { parseHomeMarqueeLogoBloks } from "@/lib/home-storyblok-media";
import { getPageMetadata } from "@/lib/storyblok-page";
import { storyblokImageSrc } from "@/lib/storyblok-asset";
import { getPageStory } from "@/lib/storyblok-server";
import { CHAT_APP_HOSTNAMES } from "@/lib/app-urls";
import { SITE_ORIGIN } from "@/lib/seo-config";

/* Always resolve Storyblok at request time so production uses Vercel env and CMS edits show up (avoids stale static shell from build-time null fetch). */
export const dynamic = "force-dynamic";

const fallbackMetadata: Metadata = {
  title: "Conalytic – AI-Powered Conversational Analytics Platform",
  description:
    "Casting Spells of Clarity on Your Data. From fragmented dashboards to unified intelligence. Ask questions in plain English and get instant insights from GA4, Google Ads, Meta, and Search Console.",
};

export async function generateMetadata(): Promise<Metadata> {
  const base = await getPageMetadata("/", fallbackMetadata);
  return {
    ...base,
    alternates: { canonical: `${SITE_ORIGIN}/` },
  };
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length ? value : undefined;
}

/** Hero / closing CTA “Get started” should scroll to on-page pricing when CMS points at product signup/home. */
function homePrimaryCtaHrefFromCms(href: string | undefined): string | undefined {
  const raw = href?.trim();
  if (!raw) return undefined;
  try {
    const u = new URL(raw);
    const host = u.hostname.replace(/^www\./i, "").toLowerCase();
    if (!CHAT_APP_HOSTNAMES.has(host)) return raw;
    const path = (u.pathname.replace(/\/$/, "") || "/").toLowerCase();
    if (path === "/" || path === "/signup") return "#pricing";
  } catch {
    /* relative URLs etc. */
  }
  return raw;
}

function parseJsonArray<T>(value: unknown): T[] | undefined {
  if (typeof value !== "string" || !value.trim()) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : undefined;
  } catch {
    return undefined;
  }
}

function mapHomeContent(content: Record<string, unknown>): HomeContentPreset {
  const marquee = parseHomeMarqueeLogoBloks(content.home_marquee_logos);
  const hasCustomUrls = Object.keys(marquee.logoUrls).length > 0;
  const hasCustomLabels = Object.keys(marquee.partnerLabels).length > 0;
  const hasMarqueeBloks =
    Array.isArray(content.home_marquee_logos) &&
    content.home_marquee_logos.some(
      (b) => b && typeof b === "object" && (b as { component?: string }).component === "home_marquee_logo"
    );

  return {
    heroTitleLine1: str(content.home_hero_title_line_1),
    heroTitleLine2: str(content.home_hero_title_line_2),
    heroSubtitle: str(content.home_hero_subtitle),
    heroPrimaryCtaLabel: str(content.home_hero_primary_cta_label),
    heroPrimaryCtaHref: homePrimaryCtaHrefFromCms(str(content.home_hero_primary_cta_href)),
    heroSecondaryCtaLabel: str(content.home_hero_secondary_cta_label),
    heroSecondaryCtaHref: str(content.home_hero_secondary_cta_href),
    trustedByTitle: (() => {
      const t = str(content.home_trusted_by_title);
      if (!t || t === "Helping to grow the next generation of companies") {
        return "Integration Partners";
      }
      return t;
    })(),
    servicesTitleLine1: str(content.home_services_title_line_1),
    servicesTitleLine2: str(content.home_services_title_line_2),
    integrationsTitleLine1: str(content.home_integrations_title_line_1),
    integrationsTitleLine2: str(content.home_integrations_title_line_2),
    integrationsSubtitle: str(content.home_integrations_subtitle),
    integrationsCtaLabel: str(content.home_integrations_cta_label),
    testimonialsTitleLine1: str(content.home_testimonials_title_line_1),
    testimonialsTitleLine2: str(content.home_testimonials_title_line_2),
    testimonialsSubtitle: str(content.home_testimonials_subtitle),
    testimonials: parseJsonArray(content.home_testimonials_json),
    faqTitle: str(content.home_faq_title),
    faqSubtitle: str(content.home_faq_subtitle),
    faqContactPrefix: str(content.home_faq_contact_prefix),
    faqContactLabel: str(content.home_faq_contact_label),
    faqItems: parseJsonArray(content.home_faq_items_json),
    transformation: {
      eyebrow: str(content.home_transformation_eyebrow),
      titleLine1: str(content.home_transformation_title_line_1),
      titleLine2: str(content.home_transformation_title_line_2),
    },
    howItWorks: {
      eyebrow: str(content.home_how_it_works_eyebrow),
      title: str(content.home_how_it_works_title),
      subtitle: str(content.home_how_it_works_subtitle),
    },
    pricing: {
      eyebrow: str(content.home_pricing_eyebrow),
      title: str(content.home_pricing_title),
    },
    ctaTitle: str(content.home_cta_title),
    ctaSubtitle: str(content.home_cta_subtitle),
    ctaPrimaryLabel: str(content.home_cta_primary_label),
    ctaPrimaryHref: homePrimaryCtaHrefFromCms(str(content.home_cta_primary_href)),
    ctaSecondaryLabel: str(content.home_cta_secondary_label),
    ctaSecondaryHref: str(content.home_cta_secondary_href),
    heroBackgroundImageUrl: storyblokImageSrc(content.home_hero_background_image) ?? undefined,
    heroBackgroundImageAlt: str(content.home_hero_background_alt),
    brandIconUrl: storyblokImageSrc(content.home_brand_icon) ?? undefined,
    brandIconAlt: str(content.home_brand_icon_alt),
    integrationMarqueeOrder: hasMarqueeBloks ? marquee.orderedKeys : undefined,
    integrationLogoUrls: hasCustomUrls ? marquee.logoUrls : undefined,
    integrationPartnerLabels: hasCustomLabels ? marquee.partnerLabels : undefined,
  };
}

function homeJsonLdFaq(content: Record<string, unknown> | undefined): { question: string; answer: string }[] {
  const parsed = parseJsonArray<{ question: string; answer: string }>(content?.home_faq_items_json);
  if (parsed?.length) return parsed;
  return [...DEFAULT_HOME_FAQ];
}

function homeJsonLdTitleDescription(preset: HomeContentPreset | undefined): { title: string; description: string } {
  const line1 = preset?.heroTitleLine1 ?? "Unlocking Growth With";
  const line2 = preset?.heroTitleLine2 ?? "Next-Gen Analytics";
  const title = `${line1} ${line2}`.replace(/\s+/g, " ").trim();
  const description =
    preset?.heroSubtitle ??
    "Ask questions in plain English and get instant insights from GA4, Google Ads, Meta and Search Console — no SQL required.";
  return { title, description };
}

export default async function HomePage() {
  const story = await getPageStory("/");
  const content = story ? (story.content as Record<string, unknown>) : undefined;
  const preset = content ? mapHomeContent(content) : undefined;
  const faqForLd = homeJsonLdFaq(content);
  const { title: homeLdTitle, description: homeLdDescription } = homeJsonLdTitleDescription(preset);

  return (
    <>
      <HomeStructuredData faqItems={faqForLd} pageTitle={homeLdTitle} pageDescription={homeLdDescription} />
      <HomeClient content={preset} />
    </>
  );
}
