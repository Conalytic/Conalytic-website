/**
 * Snapshots CMS JSON baselines for every registry entry.
 * Run: npx tsx scripts/export-content-to-cms.ts
 */
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { CMS_REGISTRY } from "../src/lib/cms/page-registry";
import { DEFAULT_FOOTER_CONFIG, DEFAULT_NAVBAR_CONFIG } from "../src/lib/cms/defaults/site-chrome";

const CMS_ROOT = path.join(process.cwd(), "content", "cms");

async function writeJson(relativePath: string, data: unknown) {
  const full = path.join(CMS_ROOT, relativePath);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`Wrote content/cms/${relativePath}`);
}

async function main() {
  for (const entry of CMS_REGISTRY) {
    if (entry.id === "chrome-header") {
      await writeJson(entry.contentFile, DEFAULT_NAVBAR_CONFIG);
      continue;
    }
    if (entry.id === "chrome-footer") {
      await writeJson(entry.contentFile, {
        ...DEFAULT_FOOTER_CONFIG,
        newsletterTitle: "Stay in the loop",
        newsletterSubtitle: "Product updates and analytics tips — no spam.",
      });
      continue;
    }
    if (entry.type === "blog") {
      await writeJson(entry.contentFile, { seo: {} });
      continue;
    }
    await writeJson(entry.contentFile, { seo: {}, sections: {} });
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
