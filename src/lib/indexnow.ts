import { getSitemapEntries } from "@/lib/sitemap-entries";

/** IndexNow key — served at `https://conalytic.com/{INDEXNOW_KEY}.txt` */
export const INDEXNOW_KEY = "a7f3c9e2b8415d6082937461bc0ef58";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export async function submitUrlsToIndexNow(urls: string[]): Promise<{ ok: boolean; status: number }> {
  if (!urls.length) return { ok: true, status: 204 };

  const host = new URL(urls[0]!).hostname;
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  return { ok: response.ok, status: response.status };
}

export async function submitAllSitemapUrlsToIndexNow(): Promise<{ ok: boolean; status: number; count: number }> {
  const urls = getSitemapEntries().map((entry) => entry.url);
  const result = await submitUrlsToIndexNow(urls);
  return { ...result, count: urls.length };
}
