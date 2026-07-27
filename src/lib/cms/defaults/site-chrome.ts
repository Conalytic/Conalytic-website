import type { FooterConfig, NavbarConfig } from "@/lib/site-layout";
import { CHAT_APP_LOGIN_URL, MARKETING_CONTACT_PATH } from "@/lib/app-urls";
import { SITE_ROUTES } from "@/lib/site-links";
import { TERMS_OF_SERVICE_PATH, PRIVACY_POLICY_PATH } from "@/lib/legal-urls";

export const DEFAULT_NAVBAR_CONFIG: NavbarConfig = {
  links: [
    {
      label: "Products",
      href: "#",
      children: [
        { label: "Conversational Analytics", href: SITE_ROUTES.products.conversationalAnalytics, description: "Ask questions in plain English, get instant insights" },
        { label: "KPIs Tracker", href: SITE_ROUTES.products.kpisTracker, description: "Track goals across GA4, Search Console, and Google Ads" },
        { label: "Report Builder", href: SITE_ROUTES.products.reportBuilder, description: "HTML presentation decks from connected marketing data" },
      ],
    },
    { label: "Features", href: SITE_ROUTES.features },
    { label: "About", href: SITE_ROUTES.about },
    {
      label: "Resources",
      href: "#",
      children: [
        { label: "Integrations", href: SITE_ROUTES.integrations, description: "Connect with your favorite tools" },
        { label: "Blogs", href: SITE_ROUTES.blogs, description: "Tips, trends, and analytics insights" },
        { label: "Careers", href: SITE_ROUTES.careers, description: "Join the Conalytic team" },
      ],
    },
  ],
  loginLabel: "Login",
  loginHref: CHAT_APP_LOGIN_URL,
  primaryCtaLabel: "Book A Demo",
  primaryCtaHref: MARKETING_CONTACT_PATH,
};

export const DEFAULT_FOOTER_CONFIG: FooterConfig = {
  email: "admin@conalytic.com",
  columns: [
    {
      title: "Company",
      links: [
        { label: "Home", href: SITE_ROUTES.home },
        { label: "Features", href: SITE_ROUTES.features },
        { label: "About Us", href: SITE_ROUTES.about },
        { label: "Pricing", href: SITE_ROUTES.pricing },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: SITE_ROUTES.blogs },
        { label: "Integrations", href: SITE_ROUTES.integrations },
        { label: "Careers", href: SITE_ROUTES.careers },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Support Center", href: SITE_ROUTES.contact },
        { label: "Contact Us", href: SITE_ROUTES.contact },
        { label: "FAQs", href: SITE_ROUTES.faq },
      ],
    },
    {
      title: "Product",
      links: [
        { label: "Conversational Analytics", href: SITE_ROUTES.products.conversationalAnalytics },
        { label: "KPIs Tracker", href: SITE_ROUTES.products.kpisTracker },
        { label: "Report Builder", href: SITE_ROUTES.products.reportBuilder },
        { label: "Brand assets", href: SITE_ROUTES.brand },
      ],
    },
  ],
  socialLinks: [],
  legalLinks: [
    { label: "Terms", href: TERMS_OF_SERVICE_PATH },
    { label: "Privacy", href: PRIVACY_POLICY_PATH },
    { label: "Cookies", href: "/cookies" },
  ],
  copyrightText: "© 2026 Conalytic. All rights reserved.",
};
