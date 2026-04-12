/** Contact route. */
import type { Metadata } from "next";
import { ContactClient } from "@/components/pages/ContactClient";
import { SITE_ORIGIN } from "@/lib/seo-config";

const fallbackMetadata: Metadata = {
  title: "Contact Us – Conalytic",
  description:
    "Have questions, feedback, or just want to say hi? Let's connect! Reach out to Conalytic via email, phone, or our contact form.",
};

export async function generateMetadata(): Promise<Metadata> {
  return { ...fallbackMetadata, alternates: { canonical: `${SITE_ORIGIN}/contact` } };
}

export default function ContactPage() {
  return <ContactClient />;
}
