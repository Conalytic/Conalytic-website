/**
 * Canonical marketing routes and CTA targets for consistent internal linking.
 */
import {
  CHAT_APP_LOGIN_URL,
  CHAT_APP_SIGNUP_URL,
  MARKETING_CONTACT_PATH,
} from "@/lib/app-urls";
import { PRIVACY_POLICY_PATH, TERMS_OF_SERVICE_PATH } from "@/lib/legal-urls";

export const SITE_ROUTES = {
  home: "/",
  features: "/features",
  about: "/about-us",
  contact: MARKETING_CONTACT_PATH,
  blogs: "/blogs",
  integrations: "/integrations",
  careers: "/careers",
  cookies: "/cookies",
  brand: "/brand",
  pricing: "/#pricing",
  faq: "/#faq",
  products: {
    conversationalAnalytics: "/products/conversational-analytics",
    kpisTracker: "/products/kpis-tracker",
    reportBuilder: "/products/report-builder",
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
