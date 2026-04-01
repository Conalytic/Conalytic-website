import type { Metadata } from "next";
import { AboutClient } from "@/components/pages/AboutClient";

export const metadata: Metadata = {
  title: "About Us – Conalytic",
  description:
    "At Conalytic, we're passionate about building tools that empower teams to analyze, create, and succeed together. Learn about our story, mission, and team.",
};

export default function AboutPage() {
  return <AboutClient />;
}
