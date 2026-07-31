import { CMS_REGISTRY } from "@/lib/cms/page-registry";
import { CHAT_APP_LOGIN_URL, CHAT_APP_SIGNUP_URL } from "@/lib/app-urls";

/** Valid internal paths + common external CTAs for the AI assistant. */
export function getSiteRoutesHint(): string {
  const pages = CMS_REGISTRY.filter((e) => e.type !== "chrome")
    .map((e) => `- ${e.path} (${e.label})`)
    .join("\n");

  return `Valid link targets for page-level buttons and internal linking:
${pages}
- /pricing (pricing plans, tokens, top-ups)
- /#pricing (home pricing section — same plans on homepage)
- /#faq (home FAQ section)
- /#open-positions (careers anchor)

Common external CTAs (use full URL when needed):
- ${CHAT_APP_SIGNUP_URL} (signup)
- ${CHAT_APP_LOGIN_URL} (login)

Use site-relative paths (e.g. /features, /contact) for internal links. Hash anchors (e.g. /#pricing) work on the home page.`;
}
