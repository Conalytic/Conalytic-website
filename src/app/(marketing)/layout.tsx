import { Analytics } from "@vercel/analytics/next";
import {
  GoogleTagManagerBody,
  GoogleTagManagerHead,
} from "@/components/analytics/GoogleTagManager";
import { HashScrollRestorer } from "@/components/layout/HashScrollRestorer";
import { AsyncSiteChrome } from "@/components/layout/AsyncSiteChrome";
import { CrawlableSiteLinks } from "@/components/seo/CrawlableSiteLinks";

/** Marketing site layout (nav, footer, GTM). */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleTagManagerHead />
      <GoogleTagManagerBody />
      <HashScrollRestorer />
      <CrawlableSiteLinks />
      <AsyncSiteChrome>{children}</AsyncSiteChrome>
      <Analytics />
    </>
  );
}
