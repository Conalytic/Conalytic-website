import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://conalytic.com"),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0A0F1E] text-white antialiased">
        <Navbar />
        <main className="flex-1 pt-[88px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
