import type { Metadata } from "next";
import { BlogsClient } from "@/components/pages/BlogsClient";

export const metadata: Metadata = {
  title: "Blog – Conalytic",
  description:
    "Insights, tips, and stories to supercharge your analytics. Explore the latest trends in marketing analytics, productivity hacks, and updates from Conalytic.",
};

export default function BlogsPage() {
  return <BlogsClient />;
}
