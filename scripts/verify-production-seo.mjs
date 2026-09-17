#!/usr/bin/env node
/**
 * Production indexability smoke test — run after deploy:
 *   node scripts/verify-production-seo.mjs
 *   node scripts/verify-production-seo.mjs https://conalytic.com
 */
const BASE = (process.argv[2] || "https://conalytic.com").replace(/\/$/, "");

async function fetchText(url) {
  const res = await fetch(url, { redirect: "follow" });
  const body = await res.text();
  return { status: res.status, headers: res.headers, body, url: res.url };
}

function fail(msg) {
  console.error("FAIL:", msg);
  process.exitCode = 1;
}

function ok(msg) {
  console.log("OK:", msg);
}

(async () => {
  const robots = await fetchText(`${BASE}/robots.txt`);
  if (robots.status !== 200) fail(`robots.txt HTTP ${robots.status}`);
  else ok("robots.txt 200");
  if (/Disallow:\s*\/\s*$/m.test(robots.body)) fail("robots.txt blocks entire site");
  if (!robots.body.includes("Sitemap:")) fail("robots.txt missing Sitemap");
  else ok("robots.txt allows crawl + sitemap");

  const sm = await fetchText(`${BASE}/sitemap.xml`);
  if (sm.status !== 200) fail(`sitemap.xml HTTP ${sm.status}`);
  const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  ok(`sitemap lists ${locs.length} URLs`);

  const keyUrl = `${BASE}/a7f3c9e2b8415d6082937461bc0ef58.txt`;
  const key = await fetchText(keyUrl);
  if (key.status !== 200 || key.body.trim().length < 8) fail("IndexNow key file missing");
  else ok("IndexNow key file reachable");

  const pageIssues = [];
  for (const url of locs) {
    const { status, body, url: finalUrl } = await fetchText(url);
    const noindex =
      /content="[^"]*noindex/i.test(body) ||
      /x-robots-tag:[^\\n]*noindex/i.test(String(body));
    const canonical = [...body.matchAll(/rel="canonical"\s+href="([^"]+)"/gi)][0]?.[1];
    const hasH1 = /<h1[\s>]/i.test(body);
    if (status !== 200) pageIssues.push({ url, issue: `HTTP ${status}` });
    else if (noindex) pageIssues.push({ url, issue: "noindex" });
    else if (!canonical) pageIssues.push({ url, issue: "missing canonical" });
    else if (!hasH1) pageIssues.push({ url, issue: "missing h1" });
    else if (finalUrl !== url && !finalUrl.replace(/\/$/, "").endsWith(url.replace(BASE, "").replace(/\/$/, "")))
      pageIssues.push({ url, issue: `unexpected final URL ${finalUrl}` });
  }

  if (pageIssues.length) {
    fail(`${pageIssues.length} sitemap URL(s) have indexability issues`);
    console.error(JSON.stringify(pageIssues, null, 2));
  } else {
    ok(`all ${locs.length} sitemap URLs: 200, index, canonical, h1`);
  }

  const home = await fetchText(`${BASE}/`);
  const crawlNav = home.body.includes('data-crawl-nav="true"');
  if (!crawlNav) fail("homepage missing crawlable site links nav");
  else ok("crawlable internal link hub present");

  if (process.exitCode) {
    console.error("\nFix issues above before expecting Google to index.");
    process.exit(process.exitCode);
  }
  console.log("\nProduction SEO checks passed. Request indexing in GSC for / and top landing pages.");
})();
