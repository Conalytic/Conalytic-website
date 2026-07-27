/** Parse comma-separated keyword input for CMS SEO fields. */
export function parseKeywordsInput(input: string): string[] {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 30);
}

/** Format keyword array for comma-separated editing. */
export function formatKeywordsInput(keywords?: string[]): string {
  return keywords?.join(", ") ?? "";
}
