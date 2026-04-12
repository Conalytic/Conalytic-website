/** Product: Applicant Tracking System marketing route. */
import type { Metadata } from "next";
import { ATSClient } from "@/components/pages/ATSClient";
import { SITE_ORIGIN } from "@/lib/seo-config";

const fallbackMetadata: Metadata = {
  title: "Applicant Tracking System – Conalytic",
  description:
    "Streamline your recruitment process with Conalytic's AI-powered Applicant Tracking System. Track candidates, automate workflows, and hire smarter with data-driven insights.",
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...fallbackMetadata,
    alternates: { canonical: `${SITE_ORIGIN}/products/applicant-tracking-system` },
  };
}

export default function ATSPage() {
  return <ATSClient />;
}
