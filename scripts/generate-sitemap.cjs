const { execSync } = require("child_process");

execSync("npx --yes tsx scripts/write-sitemap.ts", {
  stdio: "inherit",
  env: process.env,
});
execSync("npx --yes tsx scripts/write-llms-blog-links.ts", {
  stdio: "inherit",
  env: process.env,
});
