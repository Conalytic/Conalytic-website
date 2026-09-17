/**
 * Next.js config: security/perf headers, image remote patterns, redirects.
 */
import type { NextConfig } from "next";
import { getLegacyMarketingRedirects } from "./src/lib/legacy-redirects";

const SITE_ORIGIN = "https://conalytic.com";

/** Helps AI crawlers discover llms.txt and sitemap (Cloudflare Link header audit). */
const aiDiscoveryLinkHeader = {
  key: "Link",
  value: [
    `<${SITE_ORIGIN}/llms.txt>; rel="describedby"; type="text/plain"`,
    `<${SITE_ORIGIN}/sitemap.xml>; rel="sitemap"; type="application/xml"`,
  ].join(", "),
};

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

    const siteHeaders: { key: string; value: string }[] = [cspHeader, aiDiscoveryLinkHeader];

    return [
      { source: "/api/:path*", headers: [noIndexHeader] },
      {
        source: "/company/contact/thank-you",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
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
      { source: "/favicon.ico", destination: "/favicon.png", permanent: false },
      { source: "/.well-known/llms.txt", destination: "/llms.txt", permanent: true },
      ...getLegacyMarketingRedirects(),
    ];
  },
};

export default nextConfig;
