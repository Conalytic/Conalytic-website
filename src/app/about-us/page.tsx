/** About Us route. */
import type { Metadata } from "next";
import { AboutClient } from "@/components/pages/AboutClient";
import { SITE_ORIGIN } from "@/lib/seo-config";

const fallbackMetadata: Metadata = {
  title: "About Us – Conalytic",
  description:
    "At Conalytic, we're passionate about building tools that empower teams to analyze, create, and succeed together. Learn about our story and mission.",
};

export async function generateMetadata(): Promise<Metadata> {
  return { ...fallbackMetadata, alternates: { canonical: `${SITE_ORIGIN}/about-us` } };
}

export default function AboutPage() {
  return <AboutClient />;
}
