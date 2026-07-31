import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getFooterConfig, getHeaderConfig } from "@/lib/cms/get-site-chrome";

export async function AsyncSiteChrome({ children }: { children: React.ReactNode }) {
  const headerConfig = await getHeaderConfig();
  const footerConfig = await getFooterConfig();

  return (
    <SiteChrome
      navbar={<Navbar config={headerConfig} brandLogos={null} />}
      footer={<Footer config={footerConfig} brandLogos={null} />}
    >
      {children}
    </SiteChrome>
  );
}
