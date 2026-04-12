/**
 * Root layout: typography (Roboto body, Roboto Slab headings, Inter UI chrome), metadata, providers.
 */
import type { Metadata } from "next";
import { Inter, Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { HashScrollRestorer } from "@/components/layout/HashScrollRestorer";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SiteStructuredData } from "@/components/seo/SiteStructuredData";
import { CookieConsent } from "@/components/layout/CookieConsent";
import {
  parseCookieBannerCopy,
  parseSiteScriptBuckets,
  splitSiteScriptBucketsByConsent,
} from "@/lib/site-layout";
import { SiteScripts } from "@/components/layout/SiteScripts";
import {
  ConsentGatedSiteScripts,
  MarketingScriptsGateProvider,
} from "@/components/layout/MarketingScriptConsentGate";
import { MotionConfigProvider } from "@/components/layout/MotionConfigProvider";
import { SITE_ORIGIN, allowSearchIndexing } from "@/lib/seo-config";

const seoIndexable = allowSearchIndexing();

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-slab",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  title: {
    default: "Conalytic – AI-Powered Conversational Analytics Platform",
    template: "%s | Conalytic",
  },
  description:
    "Conalytic is conversational analytics for marketers: connect GA4, Google Ads, Meta & Search Console, ask questions in plain English, get answers without SQL. Free signup with tokens.",
  keywords: [
    "conversational analytics",
    "AI marketing analytics",
    "natural language analytics",
    "GA4",
    "Google Analytics 4",
    "Google Ads analytics",
    "Meta Ads analytics",
    "Search Console insights",
    "marketing intelligence platform",
    "no-code analytics",
    "BigQuery marketing",
    "B2B SaaS analytics",
    "India marketing analytics",
    "Pune SaaS",
    "automated reporting",
    "AI report builder",
  ],
  authors: [{ name: "Conalytic", url: SITE_ORIGIN }],
  creator: "Conalytic",
  publisher: "Conalytic",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_ORIGIN,
    siteName: "Conalytic",
    title: "Conalytic – Conversational Analytics for Marketing Teams",
    description:
      "Query GA4, Google Ads, Meta & Search Console in plain English. Free signup, token-based usage, optional top-ups.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Conalytic – conversational analytics platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conalytic – AI-Powered Marketing Analytics",
    description:
      "Ask your marketing data questions in plain English. GA4, Google Ads, Meta, Search Console — no SQL.",
    creator: "@conalytic",
    images: ["/og-image.png"],
  },
  robots: seoIndexable
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
      : {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scriptBuckets = parseSiteScriptBuckets(undefined);
  const { always: scriptsAlways, gated: scriptsGated } = splitSiteScriptBucketsByConsent(scriptBuckets);
  const cookieBannerCopy = parseCookieBannerCopy(undefined);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} ${robotoSlab.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased transition-colors duration-300" suppressHydrationWarning>
        <MarketingScriptsGateProvider>
          <SiteScripts entries={scriptsAlways.before_interactive} />
          <ConsentGatedSiteScripts entries={scriptsGated.before_interactive} />
          <SiteStructuredData />
          <ThemeProvider>
            <MotionConfigProvider>
              <SiteScripts entries={scriptsAlways.after_interactive} />
              <ConsentGatedSiteScripts entries={scriptsGated.after_interactive} />
              {/* Explicit column so main flex-1 works (ThemeProvider may not forward layout to body) */}
              <div className="flex min-h-full flex-1 flex-col">
                <HashScrollRestorer />
                <Navbar config={null} brandLogos={null} />
                <main className="min-h-0 w-full flex-1">{children}</main>
                <Footer config={null} brandLogos={null} />
              </div>
              <SiteScripts entries={scriptsAlways.lazy_onload} />
              <ConsentGatedSiteScripts entries={scriptsGated.lazy_onload} />
              <CookieConsent copy={cookieBannerCopy} />
            </MotionConfigProvider>
          </ThemeProvider>
        </MarketingScriptsGateProvider>
      </body>
    </html>
  );
}
