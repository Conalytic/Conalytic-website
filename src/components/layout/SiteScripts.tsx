/**
 * Renders optional third-party script entries via `next/script` (root layout only).
 */
import Script from "next/script";
import type { SiteScriptEntry, SiteScriptLoadStrategy } from "@/lib/site-layout";
import { isAllowedThirdPartyScriptUrl } from "@/lib/site-scripts";

function toNextStrategy(s: SiteScriptLoadStrategy): "beforeInteractive" | "afterInteractive" | "lazyOnload" {
  if (s === "before_interactive") {
    return "beforeInteractive";
  }
  if (s === "lazy_onload") {
    return "lazyOnload";
  }
  return "afterInteractive";
}

export function SiteScripts({ entries }: { entries: SiteScriptEntry[] }) {
  return (
    <>
      {entries.map((e) => {
        if (!isAllowedThirdPartyScriptUrl(e.src)) {
          return null;
        }
        const strategy = toNextStrategy(e.strategy);
        return (
          <Script
            key={e._uid}
            id={`site-script-${e._uid}`}
            src={e.src.trim()}
            strategy={strategy}
            async={e.async !== false}
            defer={e.defer === true}
          />
        );
      })}
    </>
  );
}
