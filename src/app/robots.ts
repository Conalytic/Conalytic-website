/**
 * robots.txt — allow public crawl; block /api/; point crawlers to sitemap.xml.
 */
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://conalytic.com/sitemap.xml",
  };
}
