import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { DEFAULT_FOOTER_CONFIG, DEFAULT_NAVBAR_CONFIG } from "@/lib/site-chrome-config";

export function AsyncSiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <SiteChrome
      navbar={<Navbar config={DEFAULT_NAVBAR_CONFIG} brandLogos={null} />}
      footer={<Footer config={DEFAULT_FOOTER_CONFIG} brandLogos={null} />}
    >
      {children}
    </SiteChrome>
  );
}
