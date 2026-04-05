/**
 * Root layout: typography (Roboto body, Roboto Slab headings, Inter UI chrome), metadata, providers.
 */
import type { Metadata } from "next";
import { Inter, Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { StoryblokProvider } from "@/components/storyblok/StoryblokProvider";
import { SiteStructuredData } from "@/components/seo/SiteStructuredData";
import { CookieConsent } from "@/components/layout/CookieConsent";
import {
  parseCookieBannerCopy,
  parseFooterConfig,
  parseNavbarConfig,
  parseSiteBrandLogos,
  parseSiteScriptBuckets,
  splitSiteScriptBucketsByConsent,
} from "@/lib/storyblok";
import { SiteScripts } from "@/components/layout/SiteScripts";
import {
  ConsentGatedSiteScripts,
  MarketingScriptsGateProvider,
} from "@/components/layout/MarketingScriptConsentGate";
import { getSiteConfigStory } from "@/lib/storyblok-server";

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
  metadataBase: new URL("https://conalytic.com"),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  title: {
    default: "Conalytic – AI-Powered Conversational Analytics Platform",
    template: "%s | Conalytic",
  },
  description:
    "Transform your marketing analytics with AI-powered conversations. Ask questions in plain English and get instant insights from GA4, Google Ads, Meta, and Search Console. No SQL required.",
  keywords: [
    "conversational analytics",
    "AI analytics",
    "marketing analytics",
    "GA4 analytics",
    "Google Ads insights",
    "Meta Ads analytics",
    "report builder",
    "automated reporting",
    "BigQuery",
    "marketing intelligence",
  ],
  authors: [{ name: "Conalytic" }],
  creator: "Conalytic",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://conalytic.com",
    siteName: "Conalytic",
    title: "Conalytic – AI-Powered Conversational Analytics Platform",
    description:
      "Ask questions in plain English and get instant insights from your marketing data. No SQL required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Conalytic – Conversational Analytics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conalytic – AI-Powered Analytics",
    description: "Conversational analytics for marketing teams. GA4, Google Ads, Meta, and more.",
    creator: "@conalytic",
    images: ["/og-image.png"],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfigStory = await getSiteConfigStory();
  const siteConfig = (siteConfigStory?.content || {}) as Record<string, unknown>;
  const useStoryblokLayout = siteConfig.use_storyblok_layout === true;
  const navbarConfig = useStoryblokLayout ? parseNavbarConfig(siteConfig) : null;
  const footerConfig = useStoryblokLayout ? parseFooterConfig(siteConfig) : null;
  const scriptBuckets = parseSiteScriptBuckets(siteConfig);
  const { always: scriptsAlways, gated: scriptsGated } = splitSiteScriptBucketsByConsent(scriptBuckets);
  const cookieBannerCopy = parseCookieBannerCopy(siteConfig);
  const brandLogos = parseSiteBrandLogos(siteConfig);

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
            <StoryblokProvider>
              <SiteScripts entries={scriptsAlways.after_interactive} />
              <ConsentGatedSiteScripts entries={scriptsGated.after_interactive} />
              {/* Explicit column so main flex-1 works (ThemeProvider may not forward layout to body) */}
              <div className="flex min-h-full flex-1 flex-col">
                <Navbar config={navbarConfig} brandLogos={brandLogos} />
                <main className="min-h-0 w-full flex-1">{children}</main>
                <Footer config={footerConfig} brandLogos={brandLogos} />
              </div>
              <SiteScripts entries={scriptsAlways.lazy_onload} />
              <ConsentGatedSiteScripts entries={scriptsGated.lazy_onload} />
              <CookieConsent copy={cookieBannerCopy} />
            </StoryblokProvider>
          </ThemeProvider>
        </MarketingScriptsGateProvider>
      </body>
    </html>
  );
}
