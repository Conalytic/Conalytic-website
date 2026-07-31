import { Analytics } from "@vercel/analytics/next";
import {
  GoogleTagManagerBody,
  GoogleTagManagerHead,
} from "@/components/analytics/GoogleTagManager";
import { HashScrollRestorer } from "@/components/layout/HashScrollRestorer";
import { AsyncSiteChrome } from "@/components/layout/AsyncSiteChrome";

/** Marketing pages only — admin routes are siblings and skip this layout. */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleTagManagerHead />
      <GoogleTagManagerBody />
      <HashScrollRestorer />
      <AsyncSiteChrome>{children}</AsyncSiteChrome>
      <Analytics />
    </>
  );
}
