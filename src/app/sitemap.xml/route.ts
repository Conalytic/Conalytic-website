import { buildSitemapXml } from "@/lib/sitemap-xml";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  return new Response(buildSitemapXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate, s-maxage=3600",
    },
  });
}
