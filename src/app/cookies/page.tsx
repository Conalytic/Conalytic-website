/** Cookies Policy. */
import type { Metadata } from "next";
import { CookiesClient } from "@/components/pages/CookiesClient";
import { SITE_ORIGIN } from "@/lib/seo-config";

const fallbackMetadata: Metadata = {
  title: "Cookies Policy – Conalytic",
  description:
    "Conalytic uses cookies and similar technologies to enhance your experience and analyze how our services are used. Learn how we use cookies and how to manage your preferences.",
};

export async function generateMetadata(): Promise<Metadata> {
  return { ...fallbackMetadata, alternates: { canonical: `${SITE_ORIGIN}/cookies` } };
}

export default function CookiesPage() {
  return <CookiesClient />;
}
