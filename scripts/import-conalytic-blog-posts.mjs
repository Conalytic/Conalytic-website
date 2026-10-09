/**
 * Parse scripts/data/conalytic-10-blog-posts.md → blog body TS files + blog-posts-oct2026.ts
 * Run: node scripts/import-conalytic-blog-posts.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "scripts/data/conalytic-10-blog-posts.md");
const BODIES_DIR = path.join(ROOT, "src/content/blog-bodies");
const MANIFEST = path.join(ROOT, "src/content/blog-posts-oct2026.ts");
const BLOG_IMG_DIR = path.join(ROOT, "public/images/blog");

const HERO_SOURCE = path.join(ROOT, "public/images/services/seo-organic-growth");

/** Slug → source PNG under seo-organic-growth (copied to public/images/blog/{slug}.png) */
const HERO_FILES = {
  "ga4-analytics-advisor": "hero-slide-gsc-workspace.png",
  "best-ai-tools-google-analytics-4": "hero-slide-audit.png",
  "best-ai-client-reporting-tools": "story-analytics-reporting.png",
  "agencyanalytics-alternatives": "benefits-organic-analytics.png",
  "impressions-up-clicks-down-ai-overviews": "what-we-do/what-we-do-geo.png",
  "google-search-console-mcp": "hero-slide-search-growth.png",
  "marketing-kpi-dashboard-examples": "story-indexation-performance.png",
  "seo-report-template": "what-we-do/what-we-do-reporting.png",
  "looker-studio-alternatives": "hero-slide-cluster.png",
  "chatgpt-claude-google-analytics-4": "hero-slide-crawl.png",
};

const POST_META = {
  "ga4-analytics-advisor": {
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "9 min read",
    featured: true,
  },
  "best-ai-tools-google-analytics-4": {
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "11 min read",
    featured: true,
  },
  "best-ai-client-reporting-tools": {
    category: "Report Builder",
    cluster: "reports",
    readTime: "10 min read",
  },
  "agencyanalytics-alternatives": {
    category: "Report Builder",
    cluster: "reports",
    readTime: "10 min read",
  },
  "impressions-up-clicks-down-ai-overviews": {
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "9 min read",
  },
  "google-search-console-mcp": {
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "10 min read",
  },
  "marketing-kpi-dashboard-examples": {
    category: "KPIs Tracker",
    cluster: "kpis",
    readTime: "9 min read",
  },
  "seo-report-template": {
    category: "Report Builder",
    cluster: "reports",
    readTime: "9 min read",
  },
  "looker-studio-alternatives": {
    category: "Report Builder",
    cluster: "reports",
    readTime: "9 min read",
  },
  "chatgpt-claude-google-analytics-4": {
    category: "Conversational Analytics",
    cluster: "chat",
    readTime: "10 min read",
  },
};

function parseSeoTable(block) {
  const get = (label) => {
    const re = new RegExp(`\\*\\*${label}\\*\\*\\s*\\|\\s*([^|\\n]+)`, "i");
    const m = block.match(re);
    return m ? m[1].trim() : "";
  };
  const slugPath = get("URL slug");
  const slug = slugPath.replace(/^\/resources\/blogs\/?/, "").replace(/\/$/, "");
  const secondary = get("Secondary keywords");
  return {
    slug,
    title: get("Title tag"),
    description: get("Meta description"),
    primaryKeyword: get("Primary keyword"),
    keywords: secondary
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    productCta: get("Product CTA"),
  };
}

function extractBody(block) {
  const parts = block.split(/\n---\n/);
  if (parts.length < 2) return "";
  const afterTable = parts.slice(1).join("\n---\n").trim();
  const lines = afterTable.split("\n");
  let start = 0;
  if (lines[0]?.startsWith("# ")) start = 1;
  while (start < lines.length && lines[start].trim() === "") start++;
  return lines.slice(start).join("\n").trim();
}

function transformMarkdown(body, slug, title) {
  let md = body;
  md = md.replace(/^# .+\n+/m, "");
  md = md.replace(/https:\/\/conalytic\.com/g, "");
  md = md.replace(/^## FAQs\s*$/im, "## Frequently asked questions");
  md = md.replace(/\*\*Quick answer:\*\*/g, "**Quick answer:**");

  md = md.replace(/\n---\s*$/g, "").trim();
  return md;
}

function excerptFromBody(md) {
  const plain = md
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    .replace(/\*\*Quick answer:\*\*\s*/i, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= 220) return plain;
  const cut = plain.slice(0, 217);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : 217)}…`;
}

function splitPosts(raw) {
  const chunks = raw.split(/\n# Blog \d+ —/);
  return chunks.slice(1).map((chunk, i) => {
    const headerLine = raw.match(new RegExp(`# Blog ${i + 1} —([^\\n]+)`))?.[1]?.trim() ?? "";
    return { headerLine, block: chunk };
  });
}

function escapeTemplate(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function main() {
  const raw = fs.readFileSync(SOURCE, "utf8");
  const posts = splitPosts(raw);
  const manifestEntries = [];
  const imports = [];

  fs.mkdirSync(BLOG_IMG_DIR, { recursive: true });

  posts.forEach((chunk, index) => {
    const seo = parseSeoTable(chunk.block);
    if (!seo.slug) {
      console.warn("Skip chunk", index + 1, "no slug");
      return;
    }
    const meta = POST_META[seo.slug];
    if (!meta) {
      throw new Error(`Missing POST_META for slug: ${seo.slug}`);
    }

    const bodyRaw = extractBody(chunk.block);
    const body = transformMarkdown(bodyRaw, seo.slug, seo.title);
    const exportName = seo.slug.replace(/-/g, "_") + "Body";
    const bodyPath = path.join(BODIES_DIR, `${seo.slug}.ts`);

    fs.writeFileSync(
      bodyPath,
      `/** Blog body: ${seo.title} */\nexport const ${exportName} = \`\n${escapeTemplate(body)}\n\`;\n`,
      "utf8",
    );

    const heroFile = HERO_FILES[seo.slug];
    if (heroFile) {
      const src = path.join(HERO_SOURCE, heroFile);
      const dest = path.join(BLOG_IMG_DIR, `${seo.slug}.png`);
      fs.copyFileSync(src, dest);
    }

    imports.push(`import { ${exportName} } from "@/content/blog-bodies/${seo.slug}";`);

    const day = 9 - index;
    const datePublished = `2026-10-${String(Math.max(1, day)).padStart(2, "0")}T10:00:00.000Z`;
    const dateLabel = new Date(datePublished).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    manifestEntries.push({
      slug: seo.slug,
      exportName,
      title: seo.title,
      ...meta,
      dateLabel,
      datePublished,
      excerpt: excerptFromBody(body),
      description: seo.description,
      primaryKeyword: seo.primaryKeyword,
      keywords: seo.keywords,
      heroImage: `/images/blog/${seo.slug}.png`,
      heroImageAlt: `${seo.title} — Conalytic`,
    });
  });

  const objects = manifestEntries
    .map(
      (p) => `  {
    slug: "${p.slug}",
    title: ${JSON.stringify(p.title)},
    category: ${JSON.stringify(p.category)},
    cluster: "${p.cluster}",
    readTime: ${JSON.stringify(p.readTime)},
    dateLabel: ${JSON.stringify(p.dateLabel)},
    datePublished: "${p.datePublished}",
    excerpt: ${JSON.stringify(p.excerpt)},
    description: ${JSON.stringify(p.description)},
    primaryKeyword: ${JSON.stringify(p.primaryKeyword)},
    keywords: ${JSON.stringify(p.keywords)},
    heroImage: ${JSON.stringify(p.heroImage)},
    heroImageAlt: ${JSON.stringify(p.heroImageAlt)},
    ${p.featured ? "featured: true,\n    " : ""}bodyMarkdown: ${p.exportName},
  }`,
    )
    .join(",\n");

  const file = `/**
 * Oct 2026 blog posts — generated by scripts/import-conalytic-blog-posts.mjs
 * Re-run the script after editing scripts/data/conalytic-10-blog-posts.md
 */
${imports.join("\n")}
import type { StaticBlogPost } from "@/lib/blog-types";

export const BLOG_POSTS_OCT_2026: StaticBlogPost[] = [
${objects}
];
`;

  fs.writeFileSync(MANIFEST, file, "utf8");
  console.log(`Wrote ${manifestEntries.length} posts → ${MANIFEST}`);
}

main();
