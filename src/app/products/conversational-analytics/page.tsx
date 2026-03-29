import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/sections/CTA";
import { MessageSquare, Globe, Sparkles, CheckCircle2, ArrowRight, Users, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Conversational Analytics – Conalytic",
  description:
    "Transform how your team analyzes marketing data with AI-powered conversations. Ask questions in plain English and get instant insights from GA4, Google Ads, Meta, and Search Console.",
};

const keyFeatures = [
  {
    icon: MessageSquare,
    title: "Natural Language Queries",
    description:
      "Ask complex analytics questions in plain English and get instant visualizations with AI-generated insights.",
  },
  {
    icon: Globe,
    title: "Multi-Channel Integration",
    description:
      "Connect GA4, Google Ads, Meta Ads, and Search Console data into one unified BigQuery warehouse.",
  },
  {
    icon: Sparkles,
    title: "Automated Insights",
    description:
      "Receive AI-powered recommendations, trend analysis, and actionable next steps with every query response.",
  },
];

const plans = [
  {
    name: "Free Plan",
    price: "$0",
    period: "/mth",
    description: "Perfect for individuals and small teams just getting started.",
    features: [
      "Up to 3 data source connections",
      "100 AI queries per month",
      "Basic visualizations",
      "7-day data history",
    ],
    cta: "Get Started for Free",
    href: "https://app.conalytic.com/signup",
    popular: false,
  },
  {
    name: "Pro Plan",
    price: "$12",
    period: "/mth",
    description: "Take your team to the next level with advanced tools.",
    features: [
      "Unlimited data source connections",
      "Unlimited AI queries",
      "Access to all integrations",
      "Full historical data access",
      "Priority support",
      "Team collaboration features",
    ],
    cta: "Try Pro Plan",
    href: "https://app.conalytic.com/signup?plan=pro",
    popular: true,
  },
  {
    name: "Enterprise Plan",
    price: "Contact Us",
    period: "",
    description: "Custom solutions for large organizations.",
    features: [
      "Everything in Pro",
      "Custom BigQuery setup",
      "Dedicated account manager",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
];

const collaborationFeatures = [
  { icon: Users, title: "Team Sharing", description: "Share conversational analytics sessions with team members instantly" },
  { icon: MessageSquare, title: "Shared Histories", description: "Collaborative insight generation with shared chat histories" },
  { icon: Bell, title: "Real-Time Alerts", description: "Real-time notifications when new insights are discovered" },
];

export default function ConversationalAnalyticsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#6B5FF8]/15 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Conversational Analytics &{" "}
            <span className="gradient-text">Marketing Intelligence Platform</span>
          </h1>
          <p className="text-lg text-white/60 mb-6 max-w-3xl mx-auto leading-relaxed">
            Transform how your team analyzes marketing data with AI-powered conversations. Conalytic
            lets you ask questions in plain English and get instant insights from GA4, Google Ads,
            Meta, and Search Console.
          </p>
          <p className="text-white/50 text-base mb-10 max-w-2xl mx-auto">
            This isn&apos;t just a static dashboard—it&apos;s your intelligent analytics partner
            that turns complex data queries into simple conversations, helping you make data-driven
            decisions faster than ever before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="https://app.conalytic.com/signup" external size="lg" className="glow-purple">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button href="https://app.conalytic.com/demo" external variant="secondary" size="lg">
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Key features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {keyFeatures.map((feature) => (
              <Card key={feature.title} hover className="text-center p-8">
                <div className="w-14 h-14 rounded-2xl bg-[#6B5FF8]/15 border border-[#6B5FF8]/20 flex items-center justify-center mb-5 mx-auto">
                  <feature.icon className="w-7 h-7 text-[#a78bfa]" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value proposition */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0E1526]/60">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to save more on your analytics budget?
          </h2>
          <p className="text-white/60 leading-relaxed mb-4">
            Save time and money with Conalytic&apos;s intelligent conversational analytics platform.
            Replace expensive BI tools and complex dashboards with our intuitive chat interface.
          </p>
          <p className="text-white/50 text-sm mb-4">
            Get insights in seconds instead of hours. Transform your analytics workflow with natural
            language processing that understands marketing context.
          </p>
          <p className="text-[#a78bfa] font-semibold">
            More than 100 integrated data points from major advertising platforms including Google
            Ads, Meta Ads, GA4, Search Console, and more.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-white/50">Start free, scale as you grow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 border transition-all ${
                  plan.popular
                    ? "border-[#6B5FF8]/60 bg-[#6B5FF8]/8 shadow-xl shadow-purple-500/10"
                    : "border-white/[0.07] bg-white/[0.02]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#6B5FF8] to-[#a78bfa] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                      Most popular plan 🚀
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-white/50 text-sm mb-2">{plan.name}</p>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-white/50 mb-1">{plan.period}</span>}
                  </div>
                  <p className="text-white/50 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                      <CheckCircle2 className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Button
                  href={plan.href}
                  external={plan.href.startsWith("http")}
                  variant={plan.popular ? "primary" : "secondary"}
                  className="w-full justify-center"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0E1526]/60">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Collaborate Seamlessly, Anytime, Anywhere
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Whether you&apos;re analyzing campaign performance, sharing insights with
                stakeholders, or discussing optimization strategies, everything happens in real-time
                with AI assistance.
              </p>
              <ul className="space-y-4">
                {collaborationFeatures.map((feat) => (
                  <li key={feat.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#6B5FF8]/15 border border-[#6B5FF8]/20 flex items-center justify-center shrink-0">
                      <feat.icon className="w-5 h-5 text-[#a78bfa]" />
                    </div>
                    <div>
                      <p className="text-white font-medium mb-1">{feat.title}</p>
                      <p className="text-white/50 text-sm">{feat.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button href="https://app.conalytic.com/signup" external size="lg" className="mt-8">
                Get Started
              </Button>
            </div>

            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#6B5FF8]/20 to-[#0ea5e9]/10 border border-white/[0.07] flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-[#a78bfa] mx-auto mb-4" />
                <p className="text-white/30 text-sm">Chat interface screenshot</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance monitoring */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#0ea5e9]/20 to-[#6B5FF8]/10 border border-white/[0.07] flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-[#60a5fa] mx-auto mb-4" />
                <p className="text-white/30 text-sm">Analytics dashboard screenshot</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Stay on Top of Your Marketing Performance
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Monitor campaign ROI, conversion tracking, and performance optimization with
                Conalytic&apos;s intelligent conversational analytics.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Ask questions like "Which campaigns drove the most conversions this month?"',
                  "Get automated insights about CTR, ROAS, and conversion rate trends",
                  "Receive proactive recommendations for campaign optimization",
                ].map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <Button href="https://app.conalytic.com/signup" external size="lg">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
