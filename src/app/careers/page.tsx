import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/sections/CTA";
import { MapPin, Upload, Cpu, Target, TrendingUp, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers – Conalytic",
  description:
    "Join our mission to redefine analytics. At Conalytic, we're building the future of marketing intelligence. Explore open positions and join our team.",
};

const whyJoin = [
  {
    icon: Cpu,
    title: "Conversational AI Innovation",
    description:
      "Work on cutting-edge natural language processing that transforms how marketers interact with data.",
  },
  {
    icon: Target,
    title: "Impact-Driven Product Development",
    description:
      "Your code directly helps 850+ marketing teams make better, faster decisions every day.",
  },
  {
    icon: TrendingUp,
    title: "Rapid Growth Environment",
    description:
      "Join a fast-scaling platform processing 2.5M+ data points monthly with unlimited learning opportunities.",
  },
  {
    icon: Trophy,
    title: "Industry Recognition Culture",
    description:
      "Be part of the team revolutionizing analytics – from hackathons to industry conferences, we lead innovation.",
  },
];

const openRoles = [
  {
    title: "Senior AI Engineer – Conversational Analytics",
    location: "Remote – India",
    type: "Full-time",
    description:
      "We're looking for an experienced AI engineer to help build and improve our conversational analytics engine. You'll work on cutting-edge NLP models and help marketers get instant insights from their data.",
  },
  {
    title: "Sr. SEO Analyst",
    location: "Remote – India",
    type: "Full-time",
    description:
      "Join our growth team to drive organic traffic and improve our search visibility. You'll work closely with product and content teams to build scalable SEO strategies.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#6B5FF8]/15 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Join Our Mission to{" "}
            <span className="gradient-text">Redefine Analytics</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
            At Conalytic, we&apos;re not just building analytics tools—we&apos;re democratizing data
            insights for every marketer. Let&apos;s build the future together.
          </p>
          <Button href="#open-positions" size="lg">
            See Open Positions
          </Button>
        </div>
      </section>

      {/* Why join */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why You&apos;ll Love Building the Future with Us
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              We&apos;re a team of data scientists, product innovators, and marketing experts—here&apos;s
              why talented people choose Conalytic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyJoin.map((reason) => (
              <Card key={reason.title} hover>
                <div className="w-12 h-12 rounded-2xl bg-[#6B5FF8]/15 border border-[#6B5FF8]/20 flex items-center justify-center mb-5">
                  <reason.icon className="w-6 h-6 text-[#a78bfa]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{reason.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{reason.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section id="open-positions" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0E1526]/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Open Positions</h2>
            <p className="text-white/50">Find your next opportunity at Conalytic</p>
          </div>

          <div className="space-y-6">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-white font-bold text-xl mb-2">{role.title}</h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1.5 text-white/50 text-sm">
                          <MapPin className="w-3.5 h-3.5" />
                          {role.location}
                        </span>
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#6B5FF8]/15 text-[#a78bfa]">
                          {role.type}
                        </span>
                      </div>
                    </div>
                    <Button href={`/careers/${role.title.toLowerCase().replace(/\s+/g, "-")}`} variant="secondary" size="sm" className="shrink-0">
                      Apply now
                    </Button>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{role.description}</p>

                  {/* Application form */}
                  <div className="border-t border-white/[0.06] pt-6">
                    <p className="text-white/60 text-sm font-medium mb-4">Quick Application</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <label className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02] cursor-pointer hover:border-[#6B5FF8]/40 hover:bg-white/[0.04] transition-all group">
                        <Upload className="w-4 h-4 text-white/30 group-hover:text-[#a78bfa] transition-colors" />
                        <span className="text-white/30 text-sm group-hover:text-white/50 transition-colors">
                          Upload your resume
                        </span>
                        <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                      </label>
                      <Button type="submit" size="md">
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Ready to Transform Your Analytics?"
        subtitle="Join 2,000+ teams already using Conalytic to turn data into decisions"
        primaryCta={{ label: "Book a demo", href: "https://app.conalytic.com/demo" }}
        secondaryCta={{ label: "Start free trial", href: "https://app.conalytic.com/signup" }}
      />
    </>
  );
}
