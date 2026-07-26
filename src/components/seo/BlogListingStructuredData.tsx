import { JsonLd } from "@/components/seo/JsonLd";
import { STATIC_BLOG_POSTS } from "@/content/blog-posts";
import { blogListingSchema } from "@/lib/structured-data";

export function BlogListingStructuredData() {
  return (
    <JsonLd
      id="ld-blog-listing"
      data={blogListingSchema(
        STATIC_BLOG_POSTS.map((post) => ({
          slug: post.slug,
          title: post.title,
          datePublished: post.datePublished,
        })),
      )}
    />
  );
}
