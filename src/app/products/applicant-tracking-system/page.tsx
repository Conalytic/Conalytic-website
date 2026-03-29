import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/sections/CTA";
import { Users, Search, BarChart3, FileText, CheckCircle2, ArrowRight, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Applicant Tracking System – Conalytic",
  description:
    "Streamline your recruitment process with Conalytic's AI-powered Applicant Tracking System. Track candidates, automate workflows, and hire smarter with data-driven insights.",
};

const features = [
  {
    icon: Search,
    title: "Smart Candidate Search",
    description:
      "AI-powered search and filtering to find the perfect candidates from your talent pool instantly.",
  },
  {
    icon: Users,
    title: "Collaborative Hiring",
    description:
      "Bring your whole team into the hiring process with shared notes, scorecards, and real-time collaboration.",
  },
  {
    icon: BarChart3,
    title: "Hiring Analytics",
    description:
      "Track time-to-hire, source quality, pipeline conversion, and team performance with rich dashboards.",
  },
  {
    icon: FileText,
    title: "Resume Parsing",
    description:
      "Automatically extract and structure candidate information from resumes in any format.",
  },
  {
    icon: Bell,
    title: "Automated Workflows",
    description:
      "Set up automated emails, interview reminders, and status updates to keep candidates engaged.",
  },
  {
    icon: CheckCircle2,
    title: "Offer Management",
    description:
      "Generate, send, and track offer letters digitally with e-signature support built in.",
  },
];

const pipeline = [
  { step: "01", label: "Source", description: "Post to job boards & collect applications" },
  { step: "02", label: "Screen", description: "AI-assisted resume screening & scoring" },
  { step: "03", label: "Interview", description: "Schedule and conduct structured interviews" },
  { step: "04", label: "Evaluate", description: "Team scorecards and collaborative decisions" },
  { step: "05", label: "Offer", description: "Send offers and collect e-signatures" },
  { step: "06", label: "Onboard", description: "Seamless transition from hire to team member" },
];

export default function ATSPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-[#10b981]/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#6B5FF8]/15 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-[#10b981]/15 border border-[#10b981]/25 text-[#34d399] text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
            Coming Soon
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Applicant Tracking System for{" "}
            <span className="gradient-text">Modern Teams</span>
          </h1>
          <p className="text-lg text-white/60 mb-6 max-w-3xl mx-auto leading-relaxed">
            Streamline your entire recruitment process with AI-powered tools that help you source,
            screen, and hire the best talent faster. Built natively inside Conalytic so your hiring
            data lives alongside your marketing intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg" className="glow-purple">
              Get Early Access
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button href="https://app.conalytic.com/demo" external variant="secondary" size="lg">
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to Hire Smarter
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              From first application to signed offer, Conalytic ATS handles every step of your
              recruitment workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} hover>
                <div className="w-12 h-12 rounded-2xl bg-[#10b981]/15 border border-[#10b981]/20 flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-[#34d399]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0E1526]/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Your Complete Hiring Pipeline
            </h2>
            <p className="text-white/50">Every stage tracked, every candidate accounted for</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pipeline.map((stage, i) => (
              <div key={stage.step} className="text-center group">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6B5FF8] to-[#10b981] flex items-center justify-center text-white font-bold text-sm mx-auto mb-3 group-hover:scale-110 transition-transform">
                  {stage.step}
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{stage.label}</h3>
                <p className="text-white/40 text-xs leading-snug">{stage.description}</p>
                {i < pipeline.length - 1 && (
                  <div className="hidden lg:block absolute" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: "60%", label: "Reduction in time-to-hire", desc: "Teams using Conalytic ATS fill roles 60% faster on average" },
              { value: "3x", label: "More quality candidates", desc: "AI-powered screening surfaces the best talent from any pipeline" },
              { value: "100%", label: "Candidate visibility", desc: "Every team member stays in sync with a single source of truth" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-8 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-white font-semibold mb-2">{stat.label}</div>
                <div className="text-white/40 text-sm">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Be First to Access Conalytic ATS"
        subtitle="Join the waitlist and get early access when we launch"
        primaryCta={{ label: "Get Early Access", href: "/contact" }}
        secondaryCta={{ label: "Learn More", href: "/features" }}
      />
    </>
  );
}
