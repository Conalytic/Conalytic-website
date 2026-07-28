import { z } from "zod";

export const cmsSeoSchema = z.object({
  title: z.string().max(120).optional(),
  description: z.string().max(320).optional(),
  keywords: z.array(z.string()).max(30).optional(),
  canonical: z.string().max(500).optional(),
  ogTitle: z.string().max(120).optional(),
  ogDescription: z.string().max(320).optional(),
  ogImage: z.string().max(500).optional(),
  ogImageAlt: z.string().max(200).optional(),
  twitterCard: z.enum(["summary", "summary_large_image"]).optional(),
  indexable: z.boolean().optional(),
  schemaType: z.string().max(200).optional(),
  schemaJson: z.string().max(50_000).optional(),
});

type LinkInput = {
  label: string;
  href: string;
  description?: string;
  target?: string;
  comingSoon?: boolean;
  children?: LinkInput[];
};

export const siteConfigLinkSchema: z.ZodType<LinkInput> = z.lazy(() =>
  z.object({
    label: z.string().min(1).max(80),
    href: z.string().min(1).max(500),
    description: z.string().max(200).optional(),
    target: z.string().optional(),
    comingSoon: z.boolean().optional(),
    children: z.array(siteConfigLinkSchema).optional(),
  }),
);

export const cmsHeaderSchema = z.object({
  links: z.array(siteConfigLinkSchema).optional(),
  loginLabel: z.string().max(40).optional(),
  loginHref: z.string().max(500).optional(),
  primaryCtaLabel: z.string().max(60).optional(),
  primaryCtaHref: z.string().max(500).optional(),
});

export const cmsFooterSchema = z.object({
  email: z.string().email().optional(),
  columns: z
    .array(
      z.object({
        title: z.string().max(40),
        links: z.array(siteConfigLinkSchema),
      }),
    )
    .optional(),
  legalLinks: z.array(siteConfigLinkSchema).optional(),
  copyrightText: z.string().max(200).optional(),
  newsletterTitle: z.string().max(120).optional(),
  newsletterSubtitle: z.string().max(300).optional(),
});

export const cmsPageLayoutSchema = z.object({
  sectionOrder: z.array(z.string().max(40)).max(30).optional(),
});

export const cmsPageSchema = z.object({
  seo: cmsSeoSchema.optional(),
  sections: z.record(z.string(), z.unknown()).optional(),
  layout: cmsPageLayoutSchema.optional(),
});

export const cmsRobotsSchema = z.object({
  body: z.string().max(100_000).optional(),
});

export const cmsBlogSchema = z.object({
  seo: cmsSeoSchema.optional(),
  title: z.string().max(200).optional(),
  category: z.string().max(80).optional(),
  readTime: z.string().max(40).optional(),
  dateLabel: z.string().max(40).optional(),
  datePublished: z.string().max(40).optional(),
  excerpt: z.string().max(500).optional(),
  description: z.string().max(500).optional(),
  featured: z.boolean().optional(),
  bodyMarkdown: z.string().max(200_000).optional(),
});

export function schemaForRegistryType(
  type: "page" | "chrome" | "blog" | "robots",
  chromeKind?: "header" | "footer",
) {
  if (type === "robots") return cmsRobotsSchema;
  if (type === "blog") return cmsBlogSchema;
  if (type === "chrome") return chromeKind === "footer" ? cmsFooterSchema : cmsHeaderSchema;
  return cmsPageSchema;
}
