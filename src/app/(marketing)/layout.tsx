import { HashScrollRestorer } from "@/components/layout/HashScrollRestorer";
import { AsyncSiteChrome } from "@/components/layout/AsyncSiteChrome";
import { MarketingCookieConsent } from "@/components/layout/cookie-consent/MarketingCookieConsent";
import { CrawlableSiteLinks } from "@/components/seo/CrawlableSiteLinks";

/** Marketing site layout (nav, footer, consent-gated analytics). */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <MarketingCookieConsent>
      <HashScrollRestorer />
      <CrawlableSiteLinks />
      <AsyncSiteChrome>{children}</AsyncSiteChrome>
    </MarketingCookieConsent>
  );
}
