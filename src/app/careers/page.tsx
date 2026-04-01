import type { Metadata } from "next";
import { CareersClient } from "@/components/pages/CareersClient";

export const metadata: Metadata = {
  title: "Careers – Conalytic",
  description:
    "Join our mission to redefine analytics. At Conalytic, we're building the future of marketing intelligence. Explore open positions and join our team.",
};

export default function CareersPage() {
  return <CareersClient />;
}
