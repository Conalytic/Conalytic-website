import type { BlogCluster, BlogDemoVariant } from "@/lib/blog-demo-variants";

export interface StaticBlogPost {
  slug: string;
  title: string;
  category: string;
  cluster: BlogCluster;
  readTime: string;
  dateLabel: string;
  datePublished: string;
  excerpt: string;
  description: string;
  primaryKeyword: string;
  keywords: string[];
  demoVariant?: BlogDemoVariant;
  featured?: boolean;
  /** Cover image for article hero, cards, and Article schema */
  heroImage?: string;
  heroImageAlt?: string;
  bodyMarkdown: string;
}
