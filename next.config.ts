/**
 * Next.js config: security/perf headers, image remote patterns, redirects.
 */
import type { NextConfig } from "next";
import { allowSearchIndexing } from "./src/lib/seo-config";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    const noIndexHeader = { key: "X-Robots-Tag", value: "noindex, nofollow" };
    const cspHeader = {
      key: "Content-Security-Policy",
      value: "frame-ancestors 'self'",
    };

    const siteHeaders: { key: string; value: string }[] = [cspHeader];
    if (!allowSearchIndexing()) {
      siteHeaders.unshift(noIndexHeader);
    }

    return [
      { source: "/api/:path*", headers: [noIndexHeader] },
      { source: "/contact/thank-you", headers: [noIndexHeader] },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
          cspHeader,
        ],
      },
      {
        source: "/robots.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }, cspHeader],
      },
      {
        source: "/email/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, immutable" },
          cspHeader,
        ],
      },
      {
        source: "/((?!sitemap\\.xml|robots\\.txt).*)",
        headers: siteHeaders,
      },
    ];
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
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.conalytic.com" }],
        destination: "https://conalytic.com/:path*",
        permanent: true,
      },
      { source: "/privacy", destination: "/privacy-and-policy", permanent: true },
      { source: "/terms", destination: "/terms-of-service", permanent: true },
      { source: "/favicon.ico", destination: "/favicon.png", permanent: false },
      // WordPress URL compatibility redirects
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/resources/blogs", destination: "/blogs", permanent: true },
      { source: "/resources/blogs/page/:page", destination: "/blogs", permanent: false },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact/book", destination: "/contact", permanent: true },
      { source: "/dev/email-preview", destination: "/contact", permanent: false },
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
