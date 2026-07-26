/**
 * Shared types for site chrome (nav, footer) and Open Graph helpers.
 */
import type { Metadata } from "next";

export interface SiteConfigLink {
  label: string;
  href: string;
  description?: string;
  target?: string;
  comingSoon?: boolean;
  children?: SiteConfigLink[];
}

export interface SiteBrandLogos {
  navbarLogoLight?: string;
  navbarLogoDark?: string;
  navbarLogoAlt: string;
  footerTaglineLight?: string;
  footerTaglineDark?: string;
  footerTaglineAlt: string;
  footerMarkIcon?: string;
}

export interface NavbarConfig {
  links: SiteConfigLink[];
  loginLabel: string;
  loginHref: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
}

export interface FooterConfig {
  email: string;
  columns: Array<{ title: string; links: SiteConfigLink[] }>;
  socialLinks: Array<{ label: string; href: string; target?: string }>;
  legalLinks: SiteConfigLink[];
  copyrightText: string;
}

/** Merge absolute image URL into Open Graph / Twitter metadata. */
export function mergeSocialPreviewImage(metadata: Metadata, imageUrl: string | null | undefined): Metadata {
  if (!imageUrl) return metadata;
  const images = [{ url: imageUrl }];
  return {
    ...metadata,
    openGraph: {
      ...(typeof metadata.openGraph === "object" && metadata.openGraph ? metadata.openGraph : {}),
      images,
    },
    twitter: {
      ...(typeof metadata.twitter === "object" && metadata.twitter ? metadata.twitter : {}),
      card: "summary_large_image",
      images: [imageUrl],
    },
  };
}
