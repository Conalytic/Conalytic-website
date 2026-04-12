/** Blog listing `/blogs`. */
import type { Metadata } from "next";
import { BlogsClient } from "@/components/pages/BlogsClient";
import { SITE_ORIGIN } from "@/lib/seo-config";

const fallbackMetadata: Metadata = {
  title: "Blog – Conalytic",
  description:
    "Insights, tips, and stories to supercharge your analytics. Explore the latest trends in marketing analytics, productivity hacks, and updates from Conalytic.",
};

export async function generateMetadata(): Promise<Metadata> {
  return { ...fallbackMetadata, alternates: { canonical: `${SITE_ORIGIN}/blogs` } };
}

export default function BlogsPage() {
  return <BlogsClient />;
}
