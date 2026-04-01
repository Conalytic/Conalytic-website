import type { Metadata } from "next";
import { ATSClient } from "@/components/pages/ATSClient";

export const metadata: Metadata = {
  title: "Applicant Tracking System – Conalytic",
  description:
    "Streamline your recruitment process with Conalytic's AI-powered Applicant Tracking System. Track candidates, automate workflows, and hire smarter with data-driven insights.",
};

export default function ATSPage() {
  return <ATSClient />;
}
