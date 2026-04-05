/**
 * Contact route: Storyblok metadata + optional full CMS page; default UI is `ContactClient`.
 */
import type { Metadata } from "next";
import { ContactClient, type ContactContentPreset } from "@/components/pages/ContactClient";
import { CmsPage } from "@/components/storyblok/CmsPage";
import { getPageMetadata } from "@/lib/storyblok-page";
import { getPageStory } from "@/lib/storyblok-server";

const fallbackMetadata: Metadata = {
  title: "Contact Us – Conalytic",
  description:
    "Have questions, feedback, or just want to say hi? Let's connect! Reach out to Conalytic via email, phone, or our contact form.",
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/contact", fallbackMetadata);
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length ? value : undefined;
}

function mapContactContent(content: Record<string, unknown>): ContactContentPreset {
  return {
    heroBadge: str(content.contact_hero_badge),
    heroTitleLine1: str(content.contact_hero_title_line_1),
    heroTitleLine2: str(content.contact_hero_title_line_2),
    heroSubtitle: str(content.contact_hero_subtitle),
    formTitle: str(content.contact_form_title),
    ctaTitle: str(content.contact_cta_title),
    ctaSubtitle: str(content.contact_cta_subtitle),
  };
}

export default async function ContactPage() {
  const story = await getPageStory("/contact");

  if (!story) {
    return <ContactClient />;
  }

  const content = story.content as Record<string, unknown>;
  const useStoryblokPage = content.use_storyblok_page === true;

  if (useStoryblokPage) {
    return <CmsPage slug="/contact" fallback={<ContactClient />} />;
  }

  return <ContactClient content={mapContactContent(content)} />;
}
