/**
 * Storyblok types, link resolution, and nav/footer parsers — safe to import from any component (no `next/headers`).
 */
import type { Metadata } from "next";
import { storyblokImageSrc, storyblokOgImageSrc } from "@/lib/storyblok-asset";

export interface StoryblokOptions {
  version?: "draft" | "published";
  slug?: string;
  starts_with?: string;
  per_page?: number;
  page?: number;
}

/** Copy for the first-visit banner; all fields have code defaults if omitted in `site_config`. */
export interface CookieBannerCopy {
  heading: string;
  message: string;
  policyLinkLabel: string;
  essentialButtonLabel: string;
  acceptAllButtonLabel: string;
}

const COOKIE_BANNER_DEFAULTS: CookieBannerCopy = {
  heading: "Cookies & privacy.",
  message:
    "We use essential cookies so the site works, and a short technical cookie if you open this site from the Storyblok editor. We don't run third-party marketing cookies on this marketing site today.",
  policyLinkLabel: "Cookies Policy",
  essentialButtonLabel: "Essential only",
  acceptAllButtonLabel: "Accept all",
};

export function parseCookieBannerCopy(content: Record<string, unknown> | undefined): CookieBannerCopy {
  if (!content) {
    return { ...COOKIE_BANNER_DEFAULTS };
  }
  return {
    heading: valueAsString(content.cookie_banner_heading, COOKIE_BANNER_DEFAULTS.heading),
    message: valueAsString(content.cookie_banner_message, COOKIE_BANNER_DEFAULTS.message),
    policyLinkLabel: valueAsString(content.cookie_banner_policy_link_label, COOKIE_BANNER_DEFAULTS.policyLinkLabel),
    essentialButtonLabel: valueAsString(
      content.cookie_banner_essential_label,
      COOKIE_BANNER_DEFAULTS.essentialButtonLabel
    ),
    acceptAllButtonLabel: valueAsString(
      content.cookie_banner_accept_all_label,
      COOKIE_BANNER_DEFAULTS.acceptAllButtonLabel
    ),
  };
}

export interface StoryblokStory {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  full_slug: string;
  content: Record<string, unknown>;
  created_at: string;
  published_at: string;
  first_published_at: string;
}

export interface StoryblokLinkObject {
  url?: string;
  cached_url?: string;
  story?: {
    full_slug?: string;
  };
  linktype?: string;
  target?: string;
  anchor?: string;
}

export interface StoryblokResolvedLink {
  href: string;
  target?: string;
}

export interface SiteConfigLink {
  label: string;
  href: string;
  description?: string;
  target?: string;
  /** When true, show a “Coming soon” tag in nav/footer (optional in Storyblok: `coming_soon`). */
  comingSoon?: boolean;
  children?: SiteConfigLink[];
}

/** Optional brand images from `site_config` (used even when `use_storyblok_layout` is off). */
export interface SiteBrandLogos {
  navbarLogoLight?: string;
  navbarLogoDark?: string;
  navbarLogoAlt: string;
  footerTaglineLight?: string;
  footerTaglineDark?: string;
  footerTaglineAlt: string;
  footerMarkIcon?: string;
}

export function parseSiteBrandLogos(content: Record<string, unknown> | undefined): SiteBrandLogos | null {
  if (!content) {
    return null;
  }
  const navL = storyblokImageSrc(content.site_navbar_logo_light);
  const navD = storyblokImageSrc(content.site_navbar_logo_dark);
  const ftL = storyblokImageSrc(content.site_footer_tagline_light);
  const ftD = storyblokImageSrc(content.site_footer_tagline_dark);
  const mark = storyblokImageSrc(content.site_footer_mark_icon);
  if (!navL && !navD && !ftL && !ftD && !mark) {
    return null;
  }
  const alt = valueAsString(content.site_brand_logo_alt, "Conalytic");
  return {
    navbarLogoLight: navL ?? undefined,
    navbarLogoDark: navD ?? undefined,
    navbarLogoAlt: alt,
    footerTaglineLight: ftL ?? undefined,
    footerTaglineDark: ftD ?? undefined,
    footerTaglineAlt: alt,
    footerMarkIcon: mark ?? undefined,
  };
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

/**
 * Story slugs the app tries for a route (first match wins).
 * Canonical CMS layout: `pages/content/<segment>` (core marketing + legal listing pages).
 * Still accepts flat `pages/<segment>` and top-level `<segment>` for older spaces.
 */
export function getPageStoryCandidates(routeSlug: string): string[] {
  const normalized = routeSlug.replace(/^\/+|\/+$/g, "");
  const slug = normalized || "home";

  return Array.from(new Set([`pages/content/${slug}`, `pages/${slug}`, slug]));
}

function valueAsString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function valueAsArray<T = Record<string, unknown>>(value: unknown): T[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value as T[];
}

export function resolveStoryblokLink(rawLink: unknown, fallback = "#"): StoryblokResolvedLink {
  if (typeof rawLink === "string") {
    return { href: rawLink || fallback };
  }

  if (!rawLink || typeof rawLink !== "object") {
    return { href: fallback };
  }

  const link = rawLink as StoryblokLinkObject;
  let href = link.url || link.cached_url || link.story?.full_slug || fallback;

  if (href && !href.startsWith("http") && !href.startsWith("/") && !href.startsWith("#")) {
    href = `/${href}`;
  }

  if (link.anchor) {
    href = `${href}#${link.anchor}`;
  }

  return {
    href,
    target: link.target,
  };
}

function parseNavLinks(value: unknown): SiteConfigLink[] {
  return valueAsArray<Record<string, unknown>>(value).map((item) => {
    const resolved = resolveStoryblokLink(item.link ?? item.href ?? "#", valueAsString(item.href, "#"));

    return {
      label: valueAsString(item.label, valueAsString(item.name, "Untitled")),
      href: resolved.href,
      target: resolved.target,
      description: valueAsString(item.description),
      comingSoon: item.coming_soon === true || item.comingSoon === true,
      children: parseNavLinks(item.children),
    };
  });
}

export function parseNavbarConfig(content: Record<string, unknown> | undefined): NavbarConfig | null {
  if (!content) {
    return null;
  }

  const links = parseNavLinks(content.navbar_links);

  if (!links.length) {
    return null;
  }

  const login = resolveStoryblokLink(content.navbar_login_link, "https://app.conalytic.com/login");
  const primary = resolveStoryblokLink(content.navbar_primary_cta_link, "/contact");

  return {
    links,
    loginLabel: valueAsString(content.navbar_login_label, "Login"),
    loginHref: login.href,
    primaryCtaLabel: valueAsString(content.navbar_primary_cta_label, "Book A Demo"),
    primaryCtaHref: primary.href,
  };
}

export function parseFooterConfig(content: Record<string, unknown> | undefined): FooterConfig | null {
  if (!content) {
    return null;
  }

  const columns = valueAsArray<Record<string, unknown>>(content.footer_columns)
    .map((column) => ({
      title: valueAsString(column.title, "Links"),
      links: parseNavLinks(column.links),
    }))
    .filter((column) => column.links.length > 0);

  const socialLinks = valueAsArray<Record<string, unknown>>(content.footer_social_links)
    .map((item) => {
      const resolved = resolveStoryblokLink(item.link ?? item.href ?? "#", valueAsString(item.href, "#"));
      return {
        label: valueAsString(item.label, "Social"),
        href: resolved.href,
        target: resolved.target,
      };
    })
    .filter((item) => item.href !== "#");

  const legalLinks = parseNavLinks(content.footer_legal_links);

  if (!columns.length && !socialLinks.length && !legalLinks.length) {
    return null;
  }

  return {
    email: valueAsString(content.footer_email, "admin@conalytic.com"),
    columns,
    socialLinks,
    legalLinks,
    copyrightText: valueAsString(content.footer_copyright, "© 2025 Conalytic. All rights reserved."),
  };
}

/** Adds Open Graph / Twitter images when **`seo_og_image`** (or blog **`cover_image`**) is set in Storyblok. */
export function mergeSocialPreviewFromStoryContent(content: Record<string, unknown>, metadata: Metadata): Metadata {
  const url = storyblokOgImageSrc(content);
  if (!url) {
    return metadata;
  }
  const images = [{ url }];
  return {
    ...metadata,
    openGraph: {
      ...(typeof metadata.openGraph === "object" && metadata.openGraph ? metadata.openGraph : {}),
      images,
    },
    twitter: {
      ...(typeof metadata.twitter === "object" && metadata.twitter ? metadata.twitter : {}),
      card: "summary_large_image",
      images: [url],
    },
  };
}

export function getMetadataFromStory(story: StoryblokStory | null, fallback: Metadata): Metadata {
  if (!story) {
    return fallback;
  }

  const content = story.content as Record<string, unknown>;
  const title = valueAsString(content.seo_title, valueAsString(content.title, story.name));
  const description = valueAsString(content.seo_description, valueAsString(content.description, ""));

  if (!title && !description) {
    return mergeSocialPreviewFromStoryContent(content, fallback);
  }

  const merged = {
    ...fallback,
    title: title || fallback.title,
    description: description || fallback.description,
  };
  return mergeSocialPreviewFromStoryContent(content, merged);
}

/** Maps to `next/script` `strategy` after underscore → camelCase in `SiteScripts`. */
export type SiteScriptLoadStrategy = "before_interactive" | "after_interactive" | "lazy_onload";

export interface SiteScriptEntry {
  _uid: string;
  src: string;
  strategy: SiteScriptLoadStrategy;
  async: boolean;
  defer: boolean;
  /** When true, script is injected only after the user chooses "Accept all" in the cookie banner. */
  requireMarketingConsent: boolean;
}

export interface SiteScriptBuckets {
  before_interactive: SiteScriptEntry[];
  after_interactive: SiteScriptEntry[];
  lazy_onload: SiteScriptEntry[];
}

function mapLoadStrategy(value: unknown, fallback: SiteScriptLoadStrategy): SiteScriptLoadStrategy {
  const s = String(value ?? "").trim();
  if (s === "before_interactive" || s === "after_interactive" || s === "lazy_onload") {
    return s;
  }
  return fallback;
}

function parseSiteScriptBloks(
  raw: unknown,
  sectionDefault: SiteScriptLoadStrategy
): SiteScriptEntry[] {
  return valueAsArray<Record<string, unknown>>(raw)
    .filter((b) => b.component === "site_script")
    .map((b, index) => {
      const src = valueAsString(b.script_url).trim();
      return {
        _uid: String(b._uid ?? `site_script_${index}`),
        src,
        strategy: mapLoadStrategy(b.load_strategy, sectionDefault),
        async: b.async !== false,
        defer: b.defer === true,
        requireMarketingConsent: b.require_marketing_consent === true,
      };
    })
    .filter((e) => e.src.length > 0);
}

/**
 * Reads `site_scripts_*` bloks from `site_config` and groups by load strategy for layout injection order.
 */
export function parseSiteScriptBuckets(content: Record<string, unknown> | undefined): SiteScriptBuckets {
  const buckets: SiteScriptBuckets = {
    before_interactive: [],
    after_interactive: [],
    lazy_onload: [],
  };

  if (!content) {
    return buckets;
  }

  const head = parseSiteScriptBloks(content.site_scripts_head, "after_interactive");
  const bodyStart = parseSiteScriptBloks(content.site_scripts_body_start, "after_interactive");
  const bodyEnd = parseSiteScriptBloks(content.site_scripts_body_end, "lazy_onload");

  for (const e of head) {
    buckets[e.strategy].push(e);
  }
  for (const e of bodyStart) {
    buckets[e.strategy].push(e);
  }
  for (const e of bodyEnd) {
    buckets[e.strategy].push(e);
  }

  /* De-dupe if same _uid appeared in multiple sections (keep first occurrence order). */
  const dedupe = (arr: SiteScriptEntry[]) => {
    const seen = new Set<string>();
    return arr.filter((e) => {
      if (seen.has(e._uid)) {
        return false;
      }
      seen.add(e._uid);
      return true;
    });
  };

  return {
    before_interactive: dedupe(buckets.before_interactive),
    after_interactive: dedupe(buckets.after_interactive),
    lazy_onload: dedupe(buckets.lazy_onload),
  };
}

function partitionEntries(entries: SiteScriptEntry[]): { always: SiteScriptEntry[]; gated: SiteScriptEntry[] } {
  const always: SiteScriptEntry[] = [];
  const gated: SiteScriptEntry[] = [];
  for (const e of entries) {
    if (e.requireMarketingConsent) {
      gated.push(e);
    } else {
      always.push(e);
    }
  }
  return { always, gated };
}

/**
 * Splits parsed script buckets so essential scripts load immediately and consent-gated scripts can render client-side after "Accept all".
 */
export function splitSiteScriptBucketsByConsent(buckets: SiteScriptBuckets): {
  always: SiteScriptBuckets;
  gated: SiteScriptBuckets;
} {
  const a = partitionEntries(buckets.before_interactive);
  const c = partitionEntries(buckets.after_interactive);
  const d = partitionEntries(buckets.lazy_onload);
  return {
    always: {
      before_interactive: a.always,
      after_interactive: c.always,
      lazy_onload: d.always,
    },
    gated: {
      before_interactive: a.gated,
      after_interactive: c.gated,
      lazy_onload: d.gated,
    },
  };
}
