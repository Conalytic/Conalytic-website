import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { StoryblokProvider } from "@/components/storyblok/StoryblokProvider";
import { getSiteConfigStory, parseFooterConfig, parseNavbarConfig } from "@/lib/storyblok";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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

  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          <StoryblokProvider>
            <Navbar config={navbarConfig} />
            <main className="flex-1">{children}</main>
            <Footer config={footerConfig} />
          </StoryblokProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
