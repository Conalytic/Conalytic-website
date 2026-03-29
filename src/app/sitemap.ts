import { MetadataRoute } from "next";

const BASE_URL = "https://conalytic.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/features", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/products/conversational-analytics", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/products/report-builder", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/products/applicant-tracking-system", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/about-us", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
    { url: "/integrations", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/blogs", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/careers", priority: 0.6, changeFrequency: "weekly" as const },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/cookies", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/brand", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
