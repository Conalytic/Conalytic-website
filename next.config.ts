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

/** Baseline security headers on HTML and static marketing responses (checklist + hardening). */
const securityHeaders: { key: string; value: string }[] = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self'",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    const noIndexHeader = { key: "X-Robots-Tag", value: "noindex, nofollow" };
    const siteHeaders: { key: string; value: string }[] = [...securityHeaders, aiDiscoveryLinkHeader];

    return [
      { source: "/api/:path*", headers: [...securityHeaders, noIndexHeader] },
      {
        source: "/company/contact/thank-you",
        headers: [...securityHeaders, { key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
          ...securityHeaders,
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          ...securityHeaders,
        ],
      },
      {
        source: "/email/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, immutable" },
          ...securityHeaders,
        ],
      },
      {
        source: "/((?!sitemap\\.xml|robots\\.txt).*)",
        headers: siteHeaders,
      },
    ];
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
      { source: "/favicon.ico", destination: "/brand/favicon.png", permanent: false },
      { source: "/.well-known/llms.txt", destination: "/llms.txt", permanent: true },
      { source: "/logo.png", destination: "/brand/logo.png", permanent: true },
      { source: "/logo-white.png", destination: "/brand/logo-white.png", permanent: true },
      { source: "/logo-icon.png", destination: "/brand/logo-icon.png", permanent: true },
      { source: "/logo-tagline-light.png", destination: "/brand/logo-tagline-light.png", permanent: true },
      { source: "/logo-tagline-white.png", destination: "/brand/logo-tagline-white.png", permanent: true },
      { source: "/favicon.png", destination: "/brand/favicon.png", permanent: true },
      { source: "/og-image.png", destination: "/brand/og-image.png", permanent: true },
      {
        source: "/Conalytic3 White.png",
        destination: "/brand/logo-navbar-dark.png",
        permanent: true,
      },
      { source: "/ga4.svg", destination: "/integrations/ga4.svg", permanent: true },
      {
        source: "/google-search-console-icon.webp",
        destination: "/integrations/gsc-icon.webp",
        permanent: true,
      },
      {
        source: "/products/conversational-analytics-hero.png",
        destination: "/images/products/conversational-analytics-hero.png",
        permanent: true,
      },
      {
        source: "/products/kpis-tracker-hero.png",
        destination: "/images/products/kpis-tracker-hero.png",
        permanent: true,
      },
      {
        source: "/products/report-builder-hero.png",
        destination: "/images/products/report-builder-hero.png",
        permanent: true,
      },
      ...getLegacyMarketingRedirects(),
    ];
  },
};

export default nextConfig;
