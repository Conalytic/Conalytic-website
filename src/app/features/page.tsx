import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/sections/CTA";
import {
  MessageSquare,
  Sparkles,
  BarChart3,
  Zap,
  Calendar,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features – Conalytic",
  description:
    "Features that make analytics fun, easy, and super productive. From connecting data to real-time conversations and report building, Conalytic has everything your team needs.",
};

const features = [
  {
    icon: MessageSquare,
    title: "Conversational Analytics",
    description:
      "Ask questions in plain English and get instant insights from your GA4, Google Ads, and Meta data.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description:
      "Automatically generate trend analysis, recommendations, and actionable insights from your marketing data.",
  },
  {
    icon: BarChart3,
    title: "Custom Report Builder",
    description:
      "Design professional, branded reports with drag-and-drop simplicity and white-label capabilities.",
  },
  {
    icon: Zap,
    title: "Real-Time Data Sync",
    description:
      "Connect all your marketing platforms to BigQuery for unified, always-current analytics.",
  },
  {
    icon: Calendar,
    title: "Automated Reporting",
    description:
      "Schedule and deliver branded reports automatically with AI commentary and recommendations.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant with encrypted data storage and enterprise-grade access controls.",
  },
];

const deepDives = [
  {
    badge: "Chat Interface",
    title: "Chat With Your Data, Anytime, Anywhere",
    description:
      "Whether you're analyzing campaigns, tracking conversions, or exploring trends, everything happens through natural conversation with AI.",
    bullets: [
      "Ask questions like \"How did Google Ads perform last month?\" and get instant answers",
      "Automatic visualizations created from your queries in seconds",
      "Context-aware conversations that remember your previous questions",
    ],
    cta: { label: "Book a demo", href: "https://app.conalytic.com/demo" },
    gradient: "from-[#6B5FF8]/20 to-transparent",
  },
  {
    badge: "Performance Tracking",
    title: "Track Performance That Actually Matters",
    description:
      "Monitor campaign ROI, conversion trends, and team productivity with AI-generated insights that guide your next move.",
    bullets: [
      "See campaign performance metrics that impact your bottom line",
      "Track conversion rates, CTR, ROAS across all marketing channels",
      "Get AI recommendations for optimization opportunities",
    ],
    cta: { label: "Try It Today", href: "https://app.conalytic.com/signup" },
    gradient: "from-[#0ea5e9]/20 to-transparent",
  },
  {
    badge: "Report Builder",
    title: "Build Reports That Wow Clients",
    description:
      "Create stunning, branded reports with AI insights embedded directly into every page – no more manual commentary needed.",
    bullets: [
      "Drag-and-drop report builder with custom branding options",
      "AI automatically generates insights and recommendations for each section",
      "Schedule weekly, monthly, or quarterly reports for automatic delivery",
    ],
    cta: { label: "Try It Free Today", href: "https://app.conalytic.com/signup" },
    gradient: "from-[#10b981]/20 to-transparent",
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#6B5FF8]/15 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Features That Make Analytics{" "}
            <span className="gradient-text">Fun, Easy, and Super Productive!</span>
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            From connecting data to real-time conversations and report building, Conalytic has
            everything your team needs to thrive.
          </p>
          <Button href="https://app.conalytic.com/signup" external size="lg">
            Try It Free Today
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} hover className="group">
                <div className="w-12 h-12 rounded-2xl bg-[#6B5FF8]/15 border border-[#6B5FF8]/20 flex items-center justify-center mb-5 group-hover:bg-[#6B5FF8]/25 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#a78bfa]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deep dive sections */}
      <div className="space-y-2">
        {deepDives.map((section, index) => (
          <section
            key={section.title}
            className={`py-24 px-4 sm:px-6 lg:px-8 ${index % 2 === 1 ? "bg-[#0E1526]/60" : ""}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <span className="inline-block text-xs font-semibold tracking-widest text-[#a78bfa] uppercase mb-4">
                    {section.badge}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                    {section.title}
                  </h2>
                  <p className="text-white/60 leading-relaxed mb-8">{section.description}</p>
                  <ul className="space-y-3 mb-8">
                    {section.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <Button href={section.cta.href} external size="lg">
                    {section.cta.label}
                  </Button>
                </div>

                {/* Visual placeholder */}
                <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div
                    className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${section.gradient} border border-white/[0.07] flex items-center justify-center`}
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-2xl bg-[#6B5FF8]/20 border border-[#6B5FF8]/30 flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-10 h-10 text-[#a78bfa]" />
                      </div>
                      <p className="text-white/30 text-sm">Product screenshot</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <CTA />
    </>
  );
}
