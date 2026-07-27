/**
 * Root layout: Nunito Sans typography site-wide, metadata, providers.
 */
import type { Metadata, Viewport } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SiteStructuredData } from "@/components/seo/SiteStructuredData";
import { MotionConfigProvider } from "@/components/layout/MotionConfigProvider";
import { SITE_ORIGIN, allowSearchIndexing } from "@/lib/seo-config";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

const seoIndexable = allowSearchIndexing();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunitoSans.variable} ${nunitoSans.className} h-full font-sans`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col overflow-x-clip bg-[var(--bg)] font-sans text-[var(--fg)] antialiased" suppressHydrationWarning>
        <SiteStructuredData />
        <ThemeProvider>
          <MotionConfigProvider>
            {children}
          </MotionConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
