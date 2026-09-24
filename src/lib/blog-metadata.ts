import type { Metadata } from "next";
import { buildBlogPostMetadata } from "@/lib/page-seo";

export function buildBlogArticleMetadata(
  path: string,
  post: {
    title: string;
    description: string;
    excerpt: string;
    category: string;
    datePublished: string;
    keywords?: string[];
    primaryKeyword?: string;
  },
): Metadata {
  const description = post.description || post.excerpt;
  const keywords = [post.primaryKeyword, ...(post.keywords ?? []), post.category, "Conalytic blog"].filter(
    (k): k is string => Boolean(k),
  );

  return buildBlogPostMetadata({
    path,
    title: post.title,
    description,
    excerpt: post.excerpt,
    category: post.category,
    datePublished: post.datePublished,
    keywords,
    primaryKeyword: post.primaryKeyword,
  });
}
