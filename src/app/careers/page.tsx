/** Careers route (resume upload API via `CareersClient`). */
import type { Metadata } from "next";
import { CareersClient } from "@/components/pages/CareersClient";
import { SITE_ORIGIN } from "@/lib/seo-config";

const fallbackMetadata: Metadata = {
  title: "Careers – Conalytic",
  description:
    "Join our mission to redefine analytics. At Conalytic, we're building the future of marketing intelligence. Explore open positions and join our team.",
};

export async function generateMetadata(): Promise<Metadata> {
  return { ...fallbackMetadata, alternates: { canonical: `${SITE_ORIGIN}/careers` } };
}

export default function CareersPage() {
  return <CareersClient />;
}
