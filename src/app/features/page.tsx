/** Features marketing route. */
import type { Metadata } from "next";
import { FeaturesClient } from "@/components/pages/FeaturesClient";
import { SITE_ORIGIN } from "@/lib/seo-config";

const fallbackMetadata: Metadata = {
  title: "Features – Conalytic",
  description:
    "Features that make analytics fun, easy, and super productive. From connecting data to real-time conversations and report building, Conalytic has everything your team needs.",
};

export async function generateMetadata(): Promise<Metadata> {
  return { ...fallbackMetadata, alternates: { canonical: `${SITE_ORIGIN}/features` } };
}

export default function FeaturesPage() {
  return <FeaturesClient />;
}
