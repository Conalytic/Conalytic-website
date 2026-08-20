import { submitAllSitemapUrlsToIndexNow } from "../src/lib/indexnow";

async function main() {
  const result = await submitAllSitemapUrlsToIndexNow();
  if (result.ok) {
    console.log(`IndexNow: submitted ${result.count} URLs (HTTP ${result.status})`);
    return;
  }
  console.warn(`IndexNow: submission returned HTTP ${result.status} for ${result.count} URLs`);
  process.exitCode = 0;
}

main().catch((error) => {
  console.error("IndexNow submission failed:", error);
  process.exitCode = 0;
});
