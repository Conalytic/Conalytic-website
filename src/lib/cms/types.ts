import type { FooterConfig, NavbarConfig } from "@/lib/site-layout";

/** Registry entry — maps site routes to `content/cms/` JSON files. */
export type CmsRegistryType = "page" | "chrome" | "blog" | "robots";

export type CmsRegistryEntry = {
  id: string;
  label: string;
  type: CmsRegistryType;
  path: string;
  /** Relative path under content/cms/ */
  contentFile: string;
  creatable: false;
  hasSeo: boolean;
};

export type CmsSeoFields = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  twitterCard?: "summary" | "summary_large_image";
  indexable?: boolean;
  /** Comma-separated Schema.org types rendered on this page. */
  schemaType?: string;
  /** Optional JSON-LD override for structured data. */
  schemaJson?: string;
};

/** Section order for pages that support CMS-driven placement (e.g. home). */
export type CmsPageLayout = {
  sectionOrder?: string[];
};

/** Generic page overlay — merges into route defaults. */
export type CmsPageOverlay = {
  seo?: CmsSeoFields;
  sections?: Record<string, unknown>;
  layout?: CmsPageLayout;
};

export type CmsBlogOverlay = {
  seo?: CmsSeoFields;
  title?: string;
  category?: string;
  readTime?: string;
  dateLabel?: string;
  datePublished?: string;
  excerpt?: string;
  description?: string;
  featured?: boolean;
  bodyMarkdown?: string;
};

export type CmsHeaderOverlay = Partial<NavbarConfig>;
export type CmsFooterOverlay = Partial<FooterConfig> & {
  newsletterTitle?: string;
  newsletterSubtitle?: string;
};

export type CmsRobotsOverlay = {
  body?: string;
};

export type CmsDraftPayload =
  | { kind: "page"; data: CmsPageOverlay }
  | { kind: "blog"; data: CmsBlogOverlay }
  | { kind: "chrome-header"; data: CmsHeaderOverlay }
  | { kind: "chrome-footer"; data: CmsFooterOverlay }
  | { kind: "robots"; data: CmsRobotsOverlay };
