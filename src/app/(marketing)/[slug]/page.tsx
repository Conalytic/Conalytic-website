/**
 * Public blog article at `/{slug}` — static markdown content; canonical + BlogPosting JSON-LD.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleLayout } from "@/components/blog/BlogArticleLayout";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllBlogSlugs, STATIC_BLOG_POSTS } from "@/content/blog-posts";
import { extractMarkdownH2Headings } from "@/lib/blog-headings";
import { getPublishedBlogPost, getPublishedPageOverlay } from "@/lib/cms/get-page-content";
import { buildPageMetadataFromCms } from "@/lib/cms/seo";
import { blogPostingSchema } from "@/lib/structured-data";
import { SITE_ORIGIN } from "@/lib/seo-config";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) {
    return {};
  }
  const overlay = await getPublishedPageOverlay(`/${slug}`);
  return buildPageMetadataFromCms(
    `/${slug}`,
    {
      title: `${post.title} | Conalytic Blog`,
      description: post.description || post.excerpt,
      keywords: [post.category, "Conalytic blog", "marketing analytics"],
    },
    overlay?.seo,
  );
}

export default async function PublicBlogPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedBlogPost(slug);
  if (!post) {
    notFound();
  }

  const canonicalUrl = `${SITE_ORIGIN}/${post.slug}`;
  const headings = extractMarkdownH2Headings(post.bodyMarkdown);
  const related = STATIC_BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <BreadcrumbStructuredData
        id={`ld-blog-breadcrumbs-${post.slug}`}
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blogs" },
          { name: post.title, path: `/${post.slug}` },
        ]}
      />
      <JsonLd
        id={`ld-blog-${post.slug}`}
        data={blogPostingSchema({
          url: canonicalUrl,
          headline: post.title,
          description: post.description || post.excerpt,
          datePublished: post.datePublished,
          articleSection: post.category,
          keywords: [post.category, "marketing analytics", "Conalytic"],
          imageUrl: `${SITE_ORIGIN}/og-image.png`,
        })}
      />
      <BlogArticleLayout post={post} headings={headings} related={related} />
    </>
  );
}
