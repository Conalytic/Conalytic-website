/**
 * Next.js config: security/perf headers, image remote patterns, redirects.
 */
import type { NextConfig } from "next";
import { allowSearchIndexing } from "./src/lib/seo-config";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async headers() {
    const headers: { key: string; value: string }[] = [
      { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
    ];
    if (!allowSearchIndexing()) {
      headers.unshift({ key: "X-Robots-Tag", value: "noindex, nofollow" });
    }
    return [{ source: "/:path*", headers }];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      // Canonical host: non-www (self-referencing canonicals use https://conalytic.com)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.conalytic.com" }],
        destination: "https://conalytic.com/:path*",
        permanent: true,
      },
      { source: "/privacy", destination: "/privacy-and-policy", permanent: true },
      { source: "/terms", destination: "/terms-of-service", permanent: true },
      // WordPress URL compatibility redirects
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/resources/blogs", destination: "/blogs", permanent: true },
      { source: "/resources/blogs/page/:page", destination: "/blogs", permanent: false },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/resources/integrations", destination: "/integrations", permanent: true },
      { source: "/resources/careers", destination: "/careers", permanent: true },
      // Retired blog slugs → blog index
      { source: "/how-to-build-a-thriving-remote-team-culture", destination: "/blogs", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-2", destination: "/blogs", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-3", destination: "/blogs", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-4", destination: "/blogs", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-5", destination: "/blogs", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-6", destination: "/blogs", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-7", destination: "/blogs", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-8", destination: "/blogs", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-9", destination: "/blogs", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-10", destination: "/blogs", permanent: true },
      { source: "/ai-powered-analytics-future-of-marketing", destination: "/blogs", permanent: true },
      { source: "/maximizing-roas-with-conversational-ai", destination: "/blogs", permanent: true },
      { source: "/automated-client-reporting-agencies", destination: "/blogs", permanent: true },
      { source: "/ga4-insights-without-sql", destination: "/blogs", permanent: true },
      { source: "/bigquery-unified-marketing-data", destination: "/blogs", permanent: true },
    ];
  },
};

export default nextConfig;
