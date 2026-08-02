/**
 * Canonical marketing routes and CTA targets for consistent internal linking.
 */
import {
  CHAT_APP_LOGIN_URL,
  CHAT_APP_SIGNUP_URL,
  MARKETING_CONTACT_PATH,
} from "@/lib/app-urls";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";
import { blogPostPath, SITE_PATHS } from "@/lib/site-paths";

export const SITE_ROUTES = {
  home: SITE_PATHS.home,
  features: SITE_PATHS.platform.features,
  pricing: SITE_PATHS.platform.pricing,
  about: SITE_PATHS.company.about,
  contact: SITE_PATHS.company.contact,
  contactThankYou: SITE_PATHS.company.contactThankYou,
  blogs: SITE_PATHS.resources.blogs,
  blogPost: blogPostPath,
  integrations: SITE_PATHS.resources.integrations,
  careers: SITE_PATHS.resources.careers,
  cookies: SITE_PATHS.legal.cookies,
  brand: SITE_PATHS.company.brand,
  faq: "/#faq",
  products: {
    conversationalAnalytics: SITE_PATHS.products.conversationalAnalytics,
    kpisTracker: SITE_PATHS.products.kpisTracker,
    reportBuilder: SITE_PATHS.products.reportBuilder,
  },
} as const;

export const MARKETING_CTAS = {
  signup: { label: "Get started", href: CHAT_APP_SIGNUP_URL },
  login: { label: "Login", href: CHAT_APP_LOGIN_URL },
  demo: { label: "Book a demo", href: MARKETING_CONTACT_PATH },
  pricing: { label: "View pricing", href: SITE_ROUTES.pricing },
} as const;

export {
  CHAT_APP_LOGIN_URL,
  CHAT_APP_SIGNUP_URL,
  MARKETING_CONTACT_PATH,
  PRIVACY_POLICY_PATH,
  TERMS_OF_SERVICE_PATH,
};
