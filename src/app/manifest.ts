import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Conalytic — Marketing Analytics",
    short_name: "Conalytic",
    description:
      "Marketing analytics with Conversational Analytics, KPIs Tracker, and Report Builder for GA4, Google Ads, and Search Console.",
    start_url: "/",
    display: "standalone",
    background_color: "#f0f1f5",
    theme_color: "#334155",
    lang: "en-US",
    icons: [
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo-icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
