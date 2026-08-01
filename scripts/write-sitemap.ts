import { writeFileSync } from "fs";
import { buildSitemapXml } from "../src/lib/sitemap-xml";

writeFileSync("public/sitemap.xml", buildSitemapXml(), "utf8");
console.log("Generated public/sitemap.xml");
