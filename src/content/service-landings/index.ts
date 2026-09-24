import type { ServiceLandingContent } from "@/lib/service-landing-types";
import { PARSED_SERVICE_LANDINGS } from "@/content/service-landings/landing-from-parsed";

const LANDINGS: Record<string, ServiceLandingContent> = {
  ...PARSED_SERVICE_LANDINGS,
};

/** Slugs that render ServiceLandingPage (full-page particle layer). */
export const SERVICE_LANDING_SLUGS = Object.keys(LANDINGS);

export function isServiceLandingSlug(slug: string): boolean {
  return slug in LANDINGS;
}

export function getServiceLandingContent(slug: string): ServiceLandingContent | undefined {
  return LANDINGS[slug];
}
