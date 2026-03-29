import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/sections/CTA";
import {
  MessageSquare,
  BarChart3,
  Database,
  Sparkles,
  CheckCircle2,
  Star,
  ChevronDown,
  Play,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Conalytic – AI-Powered Conversational Analytics Platform",
  description:
    "Casting Spells of Clarity on Your Data. From fragmented dashboards to unified intelligence. Ask questions in plain English and get instant insights from GA4, Google Ads, Meta, and Search Console.",
};

const features = [
  {
    icon: MessageSquare,
    title: "Conversational Intelligence",
    description:
      "Ask questions in plain English and get instant insights from GA4, Google Ads, Meta, and Search Console data – no SQL required.",
  },
  {
    icon: BarChart3,
    title: "Automated Reporting",
    description:
      "Generate professional, branded reports with AI-powered insights automatically scheduled and delivered to stakeholders.",
  },
  {
    icon: Database,
    title: "Unified Data Pipeline",
    description:
      "All your marketing data flows into BigQuery for consistent, reliable analytics across every channel and touchpoint.",
  },
  {
    icon: Sparkles,
    title: "AI-Driven Recommendations",
    description:
      "Get actionable recommendations and trend analysis that guide strategic decisions, not just raw numbers.",
  },
];

const platforms = [
  {
    title: "Conversational Analytics",
    description: "Chat with your marketing data in plain English",
    features: [
      "Natural language queries to your data",
      "Instant visualizations and insights",
      "Historical chat context for continuity",
    ],
    href: "/products/conversational-analytics",
    color: "from-[#6B5FF8] to-[#a78bfa]",
  },
  {
    title: "Professional Report Builder",
    description: "Create stunning client reports in minutes",
    features: [
      "Drag-and-drop report design studio",
      "Custom branding and white-label options",
      "Scheduled delivery automation",
    ],
    href: "/products/report-builder",
    color: "from-[#0ea5e9] to-[#6B5FF8]",
  },
  {
    title: "Enterprise-Ready Infrastructure",
    description: "Built for scale and security from day one",
    features: [
      "BigQuery data warehouse foundation",
      "SOC 2 compliant security standards",
      "Unlimited user scaling capabilities",
    ],
    href: "/features",
    color: "from-[#10b981] to-[#0ea5e9]",
  },
];

const testimonials = [
  {
    quote:
      "Conalytic replaced our entire dashboard stack. One conversation gives us insights that took hours to compile across 4 different platforms.",
    name: "Maria Rodriguez",
    title: "Marketing Manager",
    initials: "MR",
  },
  {
    quote:
      "Our client retention improved 40% after implementing Conalytic's automated reporting. The AI insights add incredible value to every deliverable.",
    name: "Jennifer Walsh",
    title: "Marketing Operations Lead",
    initials: "JW",
  },
  {
    quote:
      "We onboarded our entire marketing team in 30 minutes. No training needed – they just ask questions and get answers instantly.",
    name: "Alex Kumar",
    title: "Growth Marketing Director",
    initials: "AK",
  },
  {
    quote:
      "Client calls are so much smoother now. Instead of 'let me get back to you,' I answer performance questions in real-time.",
    name: "Rachel Park",
    title: "Agency Account Manager",
    initials: "RP",
  },
  {
    quote:
      "The AI insights help me catch missed trends I never would have spotted. My board presentations have never been stronger.",
    name: "Lisa Rodriguez",
    title: "Sr. SEO Analyst",
    initials: "LR",
  },
  {
    quote:
      "Saves me hours every week preparing client reviews. The AI catches trends I would have missed entirely.",
    name: "Sarah Thompson",
    title: "Sales Manager",
    initials: "ST",
  },
];

const faqs = [
  {
    question: "How quickly can we see results?",
    answer:
      "Connect your data sources in under 5 minutes. Start getting insights immediately through our conversational interface.",
  },
  {
    question: "What makes your AI insights different?",
    answer:
      "Our AI doesn't just show data – it explains trends, identifies opportunities, and provides specific recommendations for optimization.",
  },
  {
    question: "Can we customize reports for clients?",
    answer:
      "Absolutely. Full white-label capabilities with custom branding, logos, and color schemes for professional client deliverables.",
  },
  {
    question: "Do you integrate with our existing tools?",
    answer:
      "We connect with GA4, Google Search Console, Google Ads, Meta Ads, with more integrations launching quarterly.",
  },
];

const trustedLogos = [
  "Logo company",
  "Logo company (1)",
  "Logo company (2)",
  "Logo company (3)",
  "Logo company (4)",
  "Logo company (5)",
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-40" />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6B5FF8]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#60a5fa]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <Badge className="mb-8 mx-auto">
            <Sparkles className="w-3 h-3" />
            New Features Available
          </Badge>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
            Why Conalytic Is Your{" "}
            <span className="gradient-text">Analytics Game-Changer?</span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Casting Spells of Clarity on Your Data. From fragmented dashboards to unified
            intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="https://app.conalytic.com/demo"
              external
              size="lg"
              className="glow-purple"
            >
              Book a demo
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="lg" href="#demo-video">
              <Play className="w-4 h-4 fill-current" />
              Watch Video
            </Button>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ────────────────────────────────────── */}
      <section className="py-16 border-y border-white/[0.05] bg-[#0E1526]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold tracking-widest text-white/30 uppercase mb-10">
            Trusted by teams at the world&apos;s leading companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
            {trustedLogos.map((logo, i) => (
              <div
                key={i}
                className="w-28 h-8 bg-white/[0.06] rounded-lg flex items-center justify-center text-white/20 text-xs"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ─────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Conalytic is Your Team&apos;s Best Friend?
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Packed with features that make teamwork as seamless as it should be.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} hover>
                <div className="w-10 h-10 rounded-xl bg-[#6B5FF8]/15 border border-[#6B5FF8]/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-[#a78bfa]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE CONALYTIC ──────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0E1526]/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Choose Conalytic?
            </h2>
            <p className="text-white/50 text-lg">See how our dual-tool platform revolutionizes analytics</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {platforms.map((platform) => (
              <div
                key={platform.title}
                className="relative rounded-2xl overflow-hidden border border-white/[0.07] group hover:border-white/15 transition-all duration-300"
              >
                {/* Top gradient bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${platform.color}`} />

                <div className="p-8 bg-white/[0.02]">
                  <h3 className="text-white font-bold text-xl mb-2">{platform.title}</h3>
                  <p className="text-white/50 text-sm mb-6">{platform.description}</p>

                  <ul className="space-y-3 mb-8">
                    {platform.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-[#a78bfa] shrink-0 mt-0.5" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Button href={platform.href} variant="secondary" size="sm" className="group-hover:border-[#6B5FF8]/40">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Conalytic Is Transforming Analytics Teams?
            </h2>
            <p className="text-white/50 text-lg">Real results from agencies and marketing teams</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} hover className="flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>

                <p className="text-white/70 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6B5FF8] to-[#a78bfa] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{testimonial.name}</p>
                    <p className="text-white/40 text-xs">{testimonial.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0E1526]/60">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Got Questions? We&apos;ve Got Answers!
            </h2>
            <p className="text-white/50 text-lg">Everything about our AI-powered analytics platform</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-white/[0.07] bg-white/[0.02] overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none text-white font-medium hover:bg-white/[0.02] transition-colors">
                  {faq.question}
                  <ChevronDown className="w-4 h-4 text-white/40 group-open:rotate-180 transition-transform duration-200 shrink-0" />
                </summary>
                <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/[0.05] pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <CTA />
    </>
  );
}
