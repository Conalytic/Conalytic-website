/** Cookies Policy: copy from Storyblok (`cookies_page`) with the same layout as before; optional full blok page via `use_storyblok_page`. */
import type { Metadata } from "next";
import {
  CookiesClient,
  type CookiesBrowserRow,
  type CookiesContentPreset,
  type CookiesTocItem,
  type CookiesTypeItem,
} from "@/components/pages/CookiesClient";
import { CmsPage } from "@/components/storyblok/CmsPage";
import { getPageMetadata } from "@/lib/storyblok-page";
import { getPageStory } from "@/lib/storyblok-server";

const fallbackMetadata: Metadata = {
  title: "Cookies Policy – Conalytic",
  description:
    "Conalytic uses cookies and similar technologies to enhance your experience and analyze how our services are used. Learn how we use cookies and how to manage your preferences.",
};

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length ? value.trim() : undefined;
}

function parseJson<T>(value: unknown): T | undefined {
  if (typeof value !== "string" || !value.trim()) {
    return undefined;
  }
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

function mapCookiesContent(content: Record<string, unknown>): Partial<CookiesContentPreset> {
  const toc = parseJson<CookiesTocItem[]>(content.cookies_toc_json);
  const cookieTypes = parseJson<CookiesTypeItem[]>(content.cookies_types_json);
  const whyList = parseJson<string[]>(content.cookies_why_list_json);
  const browserInstructions = parseJson<CookiesBrowserRow[]>(content.cookies_browser_help_json);

  return {
    kicker: str(content.cookies_kicker),
    pageTitle: str(content.cookies_page_title),
    lastUpdated: str(content.cookies_last_updated),
    intro: str(content.cookies_intro),
    ...(toc?.length ? { toc } : {}),
    whatHeading: str(content.cookies_what_heading),
    whatBody: str(content.cookies_what_body),
    typesSectionHeading: str(content.cookies_types_section_heading),
    ...(cookieTypes?.length ? { cookieTypes } : {}),
    whyHeading: str(content.cookies_why_heading),
    whyIntro: str(content.cookies_why_intro),
    ...(whyList?.length ? { whyList } : {}),
    managingHeading: str(content.cookies_managing_heading),
    managingIntro: str(content.cookies_managing_intro),
    ...(browserInstructions?.length ? { browserInstructions } : {}),
    updatesHeading: str(content.cookies_updates_heading),
    updatesBody: str(content.cookies_updates_body),
    contactHeading: str(content.cookies_contact_heading),
    contactLead: str(content.cookies_contact_lead),
    contactEmail: str(content.cookies_contact_email),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/cookies", fallbackMetadata);
}

export default async function CookiesPage() {
  const story = await getPageStory("/cookies");

  if (!story) {
    return <CookiesClient />;
  }

  const content = story.content as Record<string, unknown>;
  const useStoryblokPage = content.use_storyblok_page === true;

  if (useStoryblokPage) {
    return <CmsPage slug="/cookies" fallback={<CookiesClient />} />;
  }

  const mapped = mapCookiesContent(content);
  const hasAnyCmsField = Object.keys(mapped).some((k) => mapped[k as keyof typeof mapped] !== undefined);

  return <CookiesClient content={hasAnyCmsField ? mapped : undefined} />;
}
