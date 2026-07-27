/** Detect prompts that should only produce an analysis — never modify the draft. */
export function isReadOnlyAgentPrompt(prompt: string): boolean {
  const p = prompt.toLowerCase().trim();
  if (!p) return false;

  const applyIntent =
    /\b(apply|fix|update|implement|change|add|rewrite|optimize|optimise|improve|set|write|fill in|fill out|create|generate|draft|make the)\b/.test(
      p,
    );
  if (applyIntent) return false;

  return (
    /\bseo\s+audit\b/.test(p) ||
    /\b(audit|review|analy[sz]e|analysis|assess|evaluate|inspect|gap analysis)\b/.test(p) ||
    /\bwhat(?:'s| is| are)?\s+(?:missing|lacking|wrong|not optimal|broken|off)\b/.test(p) ||
    (/\b(?:lacks?|missing|not optimal|issues? with|problems? with)\b/.test(p) &&
      /\b(seo|meta|schema|keyword|title|description|canonical|og)\b/.test(p)) ||
    /\b(seo|meta|schema)\b.*\b(audit|review|check|report|analysis)\b/.test(p) ||
    /\bcan you (?:do|run|give|provide|show)\b.*\b(audit|review|analysis|report)\b/.test(p) ||
    /\btell me\b.*\b(about|what)\b.*\b(seo|schema|meta)\b/.test(p) ||
    /\bwhat\b.*\b(schemas?|seo parameters?|meta tags?)\b/.test(p) ||
    /\bwhich\b.*\b(seo|meta)\b.*\b(missing|lacking|need)\b/.test(p)
  );
}
