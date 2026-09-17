import { getBlogPostsNewestFirst, POSTS_PER_PAGE } from "@/content/blog-posts";

export function getBlogListTotalPages(): number {
  const rest = getBlogPostsNewestFirst().slice(1);
  return Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE));
}

export function parseBlogListPage(raw: string | undefined, totalPages: number): number {
  const n = Number(raw ?? "1");
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(Math.floor(n), totalPages);
}
