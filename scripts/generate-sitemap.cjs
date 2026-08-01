const { execSync } = require("child_process");

execSync("npx --yes tsx scripts/write-sitemap.ts", {
  stdio: "inherit",
  env: process.env,
});
