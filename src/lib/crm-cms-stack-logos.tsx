/** Monochrome CRM + CMS marks for service landing trust marquee (currentColor). */

export type CrmCmsLogoKey =
  | "hubspot"
  | "salesforce"
  | "dynamics365"
  | "zoho"
  | "pipedrive"
  | "wordpress"
  | "webflow"
  | "shopify"
  | "contentful"
  | "sanity"
  | "strapi"
  | "drupal";

export const CRM_CMS_LOGO_LABELS: Record<CrmCmsLogoKey, string> = {
  hubspot: "HubSpot",
  salesforce: "Salesforce",
  dynamics365: "Microsoft Dynamics 365",
  zoho: "Zoho CRM",
  pipedrive: "Pipedrive",
  wordpress: "WordPress",
  webflow: "Webflow",
  shopify: "Shopify",
  contentful: "Contentful",
  sanity: "Sanity",
  strapi: "Strapi",
  drupal: "Drupal",
};

/** CRMs first, then CMS platforms — infinite marquee order. */
export const CRM_CMS_MARQUEE_ORDER: CrmCmsLogoKey[] = [
  "hubspot",
  "salesforce",
  "dynamics365",
  "zoho",
  "pipedrive",
  "wordpress",
  "webflow",
  "shopify",
  "contentful",
  "sanity",
  "strapi",
  "drupal",
];

export function CrmCmsLogo({ id, className }: { id: CrmCmsLogoKey; className?: string }) {
  const props = { className, "aria-hidden": true as const };
  switch (id) {
    case "hubspot":
      return (
        <svg viewBox="0 0 120 32" fill="currentColor" {...props}>
          <path d="M24.5 8.2a4.6 4.6 0 1 0-7.9-3.2l-5.2 5.2a7.8 7.8 0 1 0 3.5 6.4l5.2-5.2a4.6 4.6 0 0 0 4.4-3.2ZM18.6 22a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8Zm14.2-9.8a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8Z" />
          <text x="38" y="22" fontSize="15" fontWeight="700" fontFamily="system-ui,sans-serif">
            HubSpot
          </text>
        </svg>
      );
    case "salesforce":
      return (
        <svg viewBox="0 0 140 32" fill="currentColor" {...props}>
          <ellipse cx="14" cy="18" rx="8" ry="5" opacity="0.85" />
          <ellipse cx="22" cy="14" rx="7" ry="4.5" opacity="0.7" />
          <ellipse cx="8" cy="13" rx="6" ry="4" opacity="0.65" />
          <text x="34" y="22" fontSize="14" fontWeight="700" fontFamily="system-ui,sans-serif">
            Salesforce
          </text>
        </svg>
      );
    case "dynamics365":
      return (
        <svg viewBox="0 0 200 32" fill="currentColor" {...props}>
          <rect x="2" y="6" width="20" height="20" rx="2" opacity="0.9" />
          <text x="28" y="21" fontSize="13" fontWeight="600" fontFamily="system-ui,sans-serif">
            Microsoft Dynamics 365
          </text>
        </svg>
      );
    case "zoho":
      return (
        <svg viewBox="0 0 100 32" fill="currentColor" {...props}>
          <circle cx="14" cy="16" r="10" opacity="0.15" />
          <text x="4" y="21" fontSize="16" fontWeight="800" fontFamily="system-ui,sans-serif">
            Z
          </text>
          <text x="28" y="22" fontSize="15" fontWeight="700" fontFamily="system-ui,sans-serif">
            Zoho
          </text>
        </svg>
      );
    case "pipedrive":
      return (
        <svg viewBox="0 0 120 32" fill="currentColor" {...props}>
          <path d="M8 24V8h4l8 10V8h4v16h-4l-8-10v10H8Z" />
          <text x="32" y="22" fontSize="14" fontWeight="700" fontFamily="system-ui,sans-serif">
            Pipedrive
          </text>
        </svg>
      );
    case "wordpress":
      return (
        <svg viewBox="0 0 130 32" fill="currentColor" {...props}>
          <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M16 8c-2 3.5-3 6.5-3 8.5 0 2.2 1.2 4 3 4.8M16 8c2 3.5 3 6.5 3 8.5M10 12h12" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <text x="34" y="22" fontSize="14" fontWeight="700" fontFamily="system-ui,sans-serif">
            WordPress
          </text>
        </svg>
      );
    case "webflow":
      return (
        <svg viewBox="0 0 110 32" fill="currentColor" {...props}>
          <path d="M6 8 14 24h4l3-8 3 8h4L32 8h-4l-5 14-5-14H6Z" />
          <text x="38" y="22" fontSize="14" fontWeight="700" fontFamily="system-ui,sans-serif">
            Webflow
          </text>
        </svg>
      );
    case "shopify":
      return (
        <svg viewBox="0 0 110 32" fill="currentColor" {...props}>
          <path d="M14 6 8 8v16l6 2 6-2V8l-6-2Zm0 3.2 3.5 1.2v11.2L14 22.8 10.5 21.6V10.4L14 9.2Z" />
          <text x="30" y="22" fontSize="14" fontWeight="700" fontFamily="system-ui,sans-serif">
            Shopify
          </text>
        </svg>
      );
    case "contentful":
      return (
        <svg viewBox="0 0 120 32" fill="currentColor" {...props}>
          <circle cx="12" cy="16" r="3" />
          <circle cx="20" cy="10" r="3" />
          <circle cx="20" cy="22" r="3" />
          <text x="30" y="22" fontSize="14" fontWeight="700" fontFamily="system-ui,sans-serif">
            Contentful
          </text>
        </svg>
      );
    case "sanity":
      return (
        <svg viewBox="0 0 100 32" fill="currentColor" {...props}>
          <path d="M8 8h6v16H8V8Zm8 0h6l4 8-4 8h-6l4-8-4-8Z" />
          <text x="34" y="22" fontSize="14" fontWeight="700" fontFamily="system-ui,sans-serif">
            Sanity
          </text>
        </svg>
      );
    case "strapi":
      return (
        <svg viewBox="0 0 100 32" fill="currentColor" {...props}>
          <path d="M10 8h12v4H14v4h6v4h6V8H10Z" />
          <text x="36" y="22" fontSize="14" fontWeight="700" fontFamily="system-ui,sans-serif">
            Strapi
          </text>
        </svg>
      );
    case "drupal":
      return (
        <svg viewBox="0 0 100 32" fill="currentColor" {...props}>
          <path d="M16 6c-5 4-8 9-8 14a8 8 0 1 0 16 0c0-5-3-10-8-14Z" opacity="0.85" />
          <text x="34" y="22" fontSize="14" fontWeight="700" fontFamily="system-ui,sans-serif">
            Drupal
          </text>
        </svg>
      );
    default:
      return null;
  }
}
