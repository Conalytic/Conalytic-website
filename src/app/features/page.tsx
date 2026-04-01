import type { Metadata } from "next";
import { FeaturesClient } from "@/components/pages/FeaturesClient";

export const metadata: Metadata = {
  title: "Features – Conalytic",
  description:
    "Features that make analytics fun, easy, and super productive. From connecting data to real-time conversations and report building, Conalytic has everything your team needs.",
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
