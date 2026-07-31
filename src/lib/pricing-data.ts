import { CHAT_APP_SIGNUP_URL, MARKETING_CONTACT_PATH } from "@/lib/app-urls";

export const FREE_SIGNUP_TOKENS = 325203;
export const FREE_SIGNUP_TOKENS_LABEL = "325,203";

export type PricingPlan = {
  id: string;
  name: string;
  badge: string | null;
  priceLabel: string;
  priceSubtext: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured: boolean;
  isEnterprise: boolean;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "pro",
    name: "Conalytic Pro",
    badge: "Most popular",
    priceLabel: "Free to start",
    priceSubtext: `${FREE_SIGNUP_TOKENS_LABEL} tokens on signup`,
    description:
      "Create your account at no cost. Explore Conversational Analytics, KPIs Tracker, and Report Builder. AI features consume tokens; top up anytime in the app.",
    features: [
      `${FREE_SIGNUP_TOKENS_LABEL} free signup tokens`,
      "Connect up to 4 marketing platforms",
      "Usage-based AI queries & report insights",
      "Token top-ups in-app when you need more",
      "Priority support",
      "12-month data history",
      "Custom dashboards",
      "Advanced AI models (GPT, Claude, Gemini)",
    ],
    cta: "Get started free",
    ctaHref: CHAT_APP_SIGNUP_URL,
    featured: true,
    isEnterprise: false,
  },
  {
    id: "enterprise",
    name: "Conalytic Enterprise",
    badge: null,
    priceLabel: "Custom",
    priceSubtext: "Tailored for your organization",
    description:
      "For teams that need dedicated infrastructure, custom integrations, security reviews, and hands-on onboarding.",
    features: [
      "Unlimited users",
      "Dedicated infrastructure",
      "Custom integrations",
      "White-label options",
      "SLA guarantee",
      "Dedicated account manager",
      "SSO / SAML",
      "On-premise deployment",
    ],
    cta: "Contact sales",
    ctaHref: MARKETING_CONTACT_PATH,
    featured: false,
    isEnterprise: true,
  },
];

export const TOKEN_HOW_IT_WORKS = [
  {
    step: "01",
    title: "Sign up free",
    description:
      "Create your Conalytic account in minutes. No credit card required — you receive " +
      FREE_SIGNUP_TOKENS_LABEL +
      " tokens to start exploring the product.",
  },
  {
    step: "02",
    title: "Use tokens as you go",
    description:
      "AI-powered chat and report insights consume tokens based on model and query complexity. KPIs Tracker uses live APIs without LLM metering.",
  },
  {
    step: "03",
    title: "Top up when you need more",
    description:
      "When your balance runs low, purchase a token top-up inside the app and keep working. Pay only for what you use — no mandatory subscription.",
  },
];
