/**
 * Serves /robots.txt with full Content-Signal comments and Google SERP crawl rules.
 */
import { buildRobotsTxt } from "@/lib/robots-txt";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
  const body = await buildRobotsTxt();
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
