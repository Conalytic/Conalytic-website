import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "a.storyblok.com",    pathname: "/**" },
      { protocol: "https", hostname: "img2.storyblok.com", pathname: "/**" },
      { protocol: "https", hostname: "i.pravatar.cc",      pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com",pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      // WordPress URL compatibility redirects
      { source: "/about", destination: "/about-us", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/resources/blogs", destination: "/blogs", permanent: true },
      { source: "/resources/blogs/page/:page", destination: "/blogs", permanent: false },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/resources/integrations", destination: "/integrations", permanent: true },
      { source: "/resources/careers", destination: "/careers", permanent: true },
      // WordPress blog post slugs → /blogs/[slug]
      { source: "/how-to-build-a-thriving-remote-team-culture", destination: "/blogs/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-2", destination: "/blogs/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-3", destination: "/blogs/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-4", destination: "/blogs/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-5", destination: "/blogs/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-6", destination: "/blogs/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-7", destination: "/blogs/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-8", destination: "/blogs/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-9", destination: "/blogs/how-to-build-a-thriving-remote-team-culture", permanent: true },
      { source: "/how-to-build-a-thriving-remote-team-culture-10", destination: "/blogs/how-to-build-a-thriving-remote-team-culture", permanent: true },
    ];
  },
};

export default nextConfig;
