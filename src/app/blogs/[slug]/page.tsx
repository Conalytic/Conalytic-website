/**
 * Legacy `/blogs/{slug}` URLs redirect to canonical `/{slug}` for SEO and bookmarks.
 */
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function LegacyBlogSlugRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/${slug}`);
}

