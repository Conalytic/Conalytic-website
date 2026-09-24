import { SERVICE_CATALOG } from "@/lib/services-catalog";
import type { SiteConfigLink } from "@/lib/site-layout";
import { servicePath } from "@/lib/services-catalog";

/** Services dropdown for header nav (after Products). */
export function buildServicesNavGroup(): SiteConfigLink {
  return {
    label: "Services",
    href: "#",
    children: SERVICE_CATALOG.map((service) => ({
      label: service.title,
      href: servicePath(service.slug),
      description: service.navDescription,
    })),
  };
}
