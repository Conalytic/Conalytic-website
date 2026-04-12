/**
 * Next.js config: security/perf headers, image remote patterns, redirects.
 */
import type { NextConfig } from "next";
import path from "path";
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
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/privacy", destination: "https://chat.conalytic.com/privacy-and-policy", permanent: true },
      { source: "/terms", destination: "https://chat.conalytic.com/terms-of-service", permanent: true },
      // WordPress URL compatibility redirects
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/resources/blogs", destination: "/blogs", permanent: true },
      { source: "/resources/blogs/page/:page", destination: "/blogs", permanent: false },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/resources/integrations", destination: "/integrations", permanent: true },
      { source: "/resources/careers", destination: "/careers", permanent: true },
      // WordPress duplicate blog slugs → canonical /{slug}
      { source: "/how-to-build-a-thriving-remote-team-culture-2", destination: "/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-3", destination: "/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-4", destination: "/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-5", destination: "/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-6", destination: "/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-7", destination: "/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-8", destination: "/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-9", destination: "/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-10", destination: "/how-to-build-a-thriving-remote-team-culture", permanent: true },
    ];
  },
};

export default nextConfig;
