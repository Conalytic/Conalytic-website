import { readFileSync, writeFileSync } from "fs";
import { getBlogPostsNewestFirst } from "../src/content/blog-posts";
import { blogPostPath, SITE_PATHS } from "../src/lib/site-paths";
import { SITE_ORIGIN } from "../src/lib/seo-config";

const LLMS_PATH = "public/llms.txt";
const START = "## Blog guides";
const END = "## Pricing model";

function buildBlogGuidesSection(): string {
  const lines = [
    START,
    "",
    `- Blog index: ${SITE_ORIGIN}${SITE_PATHS.resources.blogs}`,
    ...getBlogPostsNewestFirst().map(
      (post) => `- ${SITE_ORIGIN}${blogPostPath(post.slug)}`,
    ),
    "",
  ];
  return lines.join("\n");
}

export function syncLlmsBlogLinks(): void {
  const file = readFileSync(LLMS_PATH, "utf8");
  const startIdx = file.indexOf(START);
  const endIdx = file.indexOf(END);
  if (startIdx < 0 || endIdx < 0 || endIdx <= startIdx) {
    throw new Error(`Could not find ${START} / ${END} markers in ${LLMS_PATH}`);
  }
  const next =
    file.slice(0, startIdx) + buildBlogGuidesSection() + END + file.slice(endIdx + END.length);
  writeFileSync(LLMS_PATH, next, "utf8");
}

syncLlmsBlogLinks();
console.log("Synced blog links in public/llms.txt");
