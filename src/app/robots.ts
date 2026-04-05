/**
 * robots.txt — sitewide no-crawl (pairs with root layout noindex,nofollow + X-Robots-Tag).
 */
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  };
}
