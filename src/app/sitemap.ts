/**
 * sitemap.xml — intentionally empty while the site is noindex/nofollow (no URL discovery signal).
 */
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
