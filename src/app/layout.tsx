/**
 * Root layout: Nunito Sans typography site-wide, metadata, providers.
 */
import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { HashScrollRestorer } from "@/components/layout/HashScrollRestorer";
import { Footer } from "@/components/layout/Footer";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SiteStructuredData } from "@/components/seo/SiteStructuredData";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { COOKIE_BANNER_DEFAULTS } from "@/lib/cookie-consent";
import { MotionConfigProvider } from "@/components/layout/MotionConfigProvider";
import { SITE_ORIGIN, allowSearchIndexing } from "@/lib/seo-config";

const seoIndexable = allowSearchIndexing();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f0f0f",
};

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  title: {
    default: "Conalytic – Marketing Analytics: Chat, KPIs & Reports",
    template: "%s",
  },
  description:
    "Conalytic is a marketing analytics platform with Conversational Analytics, KPIs Tracker, and Report Builder. Connect GA4, Search Console, Google Ads, GTM, and Meta Ads. Ask questions in plain English, track KPI goals, and generate HTML report decks.",
  keywords: [
    "conversational analytics",
    "KPI tracker marketing",
    "marketing report builder",
    "AI marketing analytics",
    "natural language analytics",
    "GA4",
    "Google Analytics 4",
    "Google Ads analytics",
    "Google Tag Manager",
    "Meta Ads analytics",
    "Search Console insights",
    "marketing intelligence platform",
    "no-code analytics",
    "B2B SaaS analytics",
    "India marketing analytics",
    "Pune SaaS",
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
    title: "Conalytic – Chat, KPIs & Reports for Marketing Teams",
    description:
      "Three tools in one platform: chat with GA4, Ads, GTM & Meta data; track KPI goals; build HTML report decks. Free to start.",
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
    title: "Conalytic – Marketing Analytics: Chat, KPIs & Reports",
    description:
      "Chat with marketing data, track KPI goals, and generate HTML report decks. GA4, Search Console, Google Ads, GTM, and Meta integrations.",
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
  return (
    <html
      lang="en"
      className={`dark ${nunitoSans.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-clip font-sans antialiased" suppressHydrationWarning>
        <SiteStructuredData />
        <MotionConfigProvider>
            <HashScrollRestorer />
            <SiteChrome
              navbar={<Navbar config={null} brandLogos={null} />}
              footer={<Footer config={null} brandLogos={null} />}
              cookieConsent={<CookieConsent copy={COOKIE_BANNER_DEFAULTS} />}
            >
              {children}
            </SiteChrome>
        </MotionConfigProvider>
      </body>
    </html>
  );
}
