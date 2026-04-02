import type { Metadata } from "next";
import { StoryblokStory } from "@storyblok/react/rsc";
import { HomeClient, type HomeContentPreset } from "@/components/home/HomeClient";
import { getPageMetadata } from "@/lib/storyblok-page";
import { getPageStory } from "@/lib/storyblok";
import { initializeStoryblok } from "@/components/storyblok/storyblok-init";

initializeStoryblok();

const fallbackMetadata: Metadata = {
  title: "Conalytic – AI-Powered Conversational Analytics Platform",
  description:
    "Casting Spells of Clarity on Your Data. From fragmented dashboards to unified intelligence. Ask questions in plain English and get instant insights from GA4, Google Ads, Meta, and Search Console.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/", fallbackMetadata);
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length ? value : undefined;
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
  return {
    heroTitleLine1: str(content.home_hero_title_line_1),
    heroTitleLine2: str(content.home_hero_title_line_2),
    heroSubtitle: str(content.home_hero_subtitle),
    heroPrimaryCtaLabel: str(content.home_hero_primary_cta_label),
    heroPrimaryCtaHref: str(content.home_hero_primary_cta_href),
    heroSecondaryCtaLabel: str(content.home_hero_secondary_cta_label),
    heroSecondaryCtaHref: str(content.home_hero_secondary_cta_href),
    trustedByTitle: str(content.home_trusted_by_title),
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
      monthlyLabel: str(content.home_pricing_monthly_label),
      annualLabel: str(content.home_pricing_annual_label),
      saveLabel: str(content.home_pricing_save_label),
      footerNote: str(content.home_pricing_footer_note),
    },
    ctaTitle: str(content.home_cta_title),
    ctaSubtitle: str(content.home_cta_subtitle),
    ctaPrimaryLabel: str(content.home_cta_primary_label),
    ctaPrimaryHref: str(content.home_cta_primary_href),
    ctaSecondaryLabel: str(content.home_cta_secondary_label),
    ctaSecondaryHref: str(content.home_cta_secondary_href),
  };
}

export default async function HomePage() {
  const story = await getPageStory("/");

  if (!story) {
    return <HomeClient />;
  }

  const content = story.content as Record<string, unknown>;
  const useStoryblokPage = content.use_storyblok_page === true;

  if (useStoryblokPage) {
    return <StoryblokStory story={story as never} />;
  }

  return <HomeClient content={mapHomeContent(content)} />;
}
