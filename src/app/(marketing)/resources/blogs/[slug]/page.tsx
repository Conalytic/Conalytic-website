/**
 * Public blog article at `/resources/blogs/[slug]` — static markdown; canonical + BlogPosting JSON-LD.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleLayout } from "@/components/blog/BlogArticleLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { BreadcrumbStructuredData } from "@/components/seo/BreadcrumbStructuredData";
import { getAllBlogSlugs, getBlogPostBySlug, getRelatedBlogPosts } from "@/content/blog-posts";
import { buildBlogArticleMetadata } from "@/lib/blog-metadata";
import { extractBlogFaqsForSchema } from "@/lib/blog-schema";
import { extractMarkdownH2Headings } from "@/lib/blog-headings";
import { BRAND_ASSETS } from "@/lib/public-assets";
import { SITE_ORIGIN } from "@/lib/seo-config";
import { blogPostPath, SITE_PATHS } from "@/lib/site-paths";
import { blogPostingSchema, faqPageSchema } from "@/lib/structured-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return {};
  }
  const path = blogPostPath(slug);
  return buildBlogArticleMetadata(path, {
    title: post.title,
    description: post.description,
    excerpt: post.excerpt,
    category: post.category,
    datePublished: post.datePublished,
    keywords: post.keywords,
    primaryKeyword: post.primaryKeyword,
  });
}

export default async function PublicBlogPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const path = blogPostPath(slug);
  const canonicalUrl = `${SITE_ORIGIN}${path}`;
  const headings = extractMarkdownH2Headings(post.bodyMarkdown);
  const related = getRelatedBlogPosts(post.slug, 2);
  const faqs = extractBlogFaqsForSchema(post.bodyMarkdown);

  return (
    <>
      <BreadcrumbStructuredData
        id={`ld-blog-breadcrumbs-${post.slug}`}
        items={[
          { name: "Home", path: SITE_PATHS.home },
          { name: "Blog", path: SITE_PATHS.resources.blogs },
          { name: post.title, path },
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
          keywords: post.keywords?.length
            ? post.keywords
            : [post.primaryKeyword, post.category, "marketing analytics", "Conalytic"],
          imageUrl: `${SITE_ORIGIN}${BRAND_ASSETS.ogImage}`,
        })}
      />
      {faqs.length > 0 ? <JsonLd id={`ld-blog-faq-${post.slug}`} data={faqPageSchema(faqs)} /> : null}
      <BlogArticleLayout post={post} headings={headings} related={related} />
    </>
  );
}
