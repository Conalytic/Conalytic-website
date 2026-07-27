import { HashScrollRestorer } from "@/components/layout/HashScrollRestorer";
import { AsyncSiteChrome } from "@/components/layout/AsyncSiteChrome";

/** Marketing pages only — admin routes are siblings and skip this layout. */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HashScrollRestorer />
      <AsyncSiteChrome>{children}</AsyncSiteChrome>
    </>
  );
}
