import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/sections/CTA";
import {
  LayoutTemplate,
  Sparkles,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Palette,
  Link2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Report Builder – Conalytic",
  description:
    "Transform your marketing reports from static data dumps into intelligent, branded presentations. Create stunning white-label reports with AI-generated insights in minutes.",
};

const keyFeatures = [
  {
    icon: LayoutTemplate,
    title: "Drag-and-Drop Studio",
    description:
      "Build professional reports with intuitive visual editor, custom branding, and white-label capabilities for client delivery.",
  },
  {
    icon: Sparkles,
    title: "AI-Generated Insights",
    description:
      "Automatically generate contextual commentary, trend analysis, and actionable recommendations for every report section.",
  },
  {
    icon: Calendar,
    title: "Automated Scheduling",
    description:
      "Set up weekly, monthly, or quarterly report delivery with fresh data and updated insights automatically generated.",
  },
];

const plans = [
  {
    name: "Free Plan",
    price: "$0",
    period: "/mth",
    description: "Perfect for individuals and small teams just getting started.",
    features: [
      "Up to 5 reports per month",
      "Basic report templates",
      "Standard branding options",
      "Manual delivery",
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
      "Unlimited reports",
      "50+ professional templates",
      "Full white-label capabilities",
      "Automated scheduling",
      "AI insights for every section",
      "Access to all integrations",
    ],
    cta: "Try Pro Plan",
    href: "https://app.conalytic.com/signup?plan=pro",
    popular: true,
  },
  {
    name: "Enterprise Plan",
    price: "Contact Us",
    period: "",
    description: "Custom solutions for agencies and large organizations.",
    features: [
      "Everything in Pro",
      "Custom domain delivery",
      "Dedicated account manager",
      "Priority SLA",
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
];

const agencyBenefits = [
  { icon: Palette, title: "Custom Branding", description: "Upload your logo, set brand colors, and customize fonts across all reports" },
  { icon: Link2, title: "Shareable Links", description: "Responsive reports that look professional on desktop, tablet, and mobile" },
  { icon: Calendar, title: "Automated Delivery", description: "Shareable links with your domain for seamless client experience" },
];

export default function ReportBuilderPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#0ea5e9]/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#6B5FF8]/15 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Professional Report Builder &{" "}
            <span className="gradient-text">Automated Analytics Reporting</span>
          </h1>
          <p className="text-lg text-white/60 mb-6 max-w-3xl mx-auto leading-relaxed">
            Transform your marketing reports from static data dumps into intelligent, branded
            presentations that clients actually read. Conalytic Report Builder combines
            drag-and-drop simplicity with AI-powered insights.
          </p>
          <p className="text-white/50 text-base mb-10 max-w-2xl mx-auto">
            Perfect for agencies delivering client reports and marketing teams presenting to
            executives. Create stunning, white-label reports in minutes instead of hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="https://app.conalytic.com/signup" external size="lg" className="glow-purple">
              Start Building
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
            Want to save 20+ hours weekly on report creation?
          </h2>
          <p className="text-white/60 leading-relaxed mb-4">
            Eliminate manual reporting with Conalytic&apos;s intelligent report automation. Replace
            time-consuming copy-paste workflows with AI-powered report generation.
          </p>
          <p className="text-white/50 text-sm mb-4">
            Generate client reports in 5 minutes instead of 5 hours. Transform your agency workflow
            with automated insights that add value to every deliverable.
          </p>
          <p className="text-[#a78bfa] font-semibold">
            More than 50 professional templates with full white-label customization for Google Ads,
            Meta Ads, GA4, Search Console, and cross-channel performance analysis.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-white/50">Start free, scale as your agency grows</p>
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

      {/* Reports that impress */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0E1526]/60">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Build Reports That Impress Clients
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Whether you&apos;re creating monthly performance reviews, campaign analysis, or
                executive summaries, every report includes AI-generated insights that explain what
                the data means and what to do next.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Drag widgets, charts, and KPI cards onto your branded canvas instantly",
                  'AI automatically writes insights like "Facebook Ads drove 40% more leads at 25% lower cost"',
                  "Schedule automatic delivery with fresh data and updated commentary",
                ].map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <Button href="https://app.conalytic.com/signup" external size="lg">
                Start Building
              </Button>
            </div>

            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#0ea5e9]/20 to-[#6B5FF8]/10 border border-white/[0.07] flex items-center justify-center">
              <div className="text-center">
                <LayoutTemplate className="w-16 h-16 text-[#60a5fa] mx-auto mb-4" />
                <p className="text-white/30 text-sm">Report builder screenshot</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White-label section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Perfect White-Label Solution for Agencies
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Remove all Conalytic branding and replace with your agency&apos;s logo, colors, and
              custom styling. Clients see only your brand on every report.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agencyBenefits.map((benefit) => (
              <Card key={benefit.title} hover className="text-center p-8">
                <div className="w-12 h-12 rounded-2xl bg-[#6B5FF8]/15 border border-[#6B5FF8]/20 flex items-center justify-center mb-5 mx-auto">
                  <benefit.icon className="w-6 h-6 text-[#a78bfa]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                <p className="text-white/50 text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button href="https://app.conalytic.com/signup" external size="lg">
              Start Building
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
