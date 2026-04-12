/**
 * robots.txt — allows crawling only when launch flag + `ALLOW_SEARCH_INDEXING=1` (see `seo-config.ts`); otherwise disallow all.
 */
import { MetadataRoute } from "next";
import { allowSearchIndexing, SITE_ORIGIN } from "@/lib/seo-config";

export default function robots(): MetadataRoute.Robots {
  if (!allowSearchIndexing()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: new URL(SITE_ORIGIN).host,
  };
}
