/** Detect which page section the user is referring to — avoids misrouting copy edits to the hero. */

const SECTION_PATTERNS: Record<string, RegExp> = {
  faq: /\bfaq(s)?\b|\bfrequently asked\b/i,
  pricing: /\bpricing\b|\bprice\b|\bplans?\b/i,
  cta: /\b(bottom\s+)?cta\b|\bcall to action\b|\bfooter (banner|cta)\b/i,
  testimonials: /\btestimonial(s)?\b|\bcustomer (quotes?|stories)\b/i,
  integrations: /\bintegrations?\b|\bmarketing stack\b|\bworks with your stack\b/i,
  products: /\bproducts?\b|\bthree products\b|\bservices section\b|\bplatform section\b/i,
  transformation: /\btransformation\b|\bturning point\b|\bbefore\s*\/\s*after\b/i,
  howItWorks: /\bhow it works\b|\bhow-it-works\b/i,
  trustedBy: /\btrusted by\b|\bmarquee\b|\blogo strip\b/i,
  stats: /\bstats?\b|\bmetrics section\b/i,
  hero: /\bhero\b|\bheadline\b|\bheading\b|\bh1\b|\babove the fold\b/i,
  seo: /\bseo\b|\bmeta (title|description)\b|\bcanonical\b|\bschema\b/i,
};

export function detectPromptSections(prompt: string): string[] {
  const matched: string[] = [];
  for (const [section, re] of Object.entries(SECTION_PATTERNS)) {
    if (re.test(prompt)) matched.push(section);
  }
  return matched;
}

export function promptLikelyTargetsHero(prompt: string): boolean {
  const sections = detectPromptSections(prompt);
  if (sections.includes("hero")) return true;
  const nonHero = sections.filter((s) => s !== "hero" && s !== "seo");
  if (nonHero.length > 0) return false;
  // Generic "change title" without section context — do not assume hero.
  if (/\b(title|heading)\b/i.test(prompt) && sections.length === 0) return false;
  return sections.length === 0 && /\b(headline|heading|h1)\b/i.test(prompt);
}
