import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { Database, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us – Conalytic",
  description:
    "At Conalytic, we're passionate about building tools that empower teams to analyze, create, and succeed together. Learn about our story, mission, and team.",
};

const stats = [
  { value: "2.5M+", label: "Data Points Analyzed", icon: Database },
  { value: "2,000+", label: "Active Teams", icon: Users },
  { value: "99.9%", label: "Platform Uptime", icon: Zap },
];

const teamMembers = [
  { name: "Alex Johnson", role: "CEO & Founder", initials: "AJ" },
  { name: "Sarah Chen", role: "CTO & Co-Founder", initials: "SC" },
  { name: "Marcus Williams", role: "Head of Product", initials: "MW" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-[#6B5FF8]/15 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Reimagining How{" "}
            <span className="gradient-text">Analytics Work Together</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            At Conalytic, we&apos;re passionate about building tools that empower teams to analyze,
            create, and succeed—together.
          </p>
        </div>
      </section>

      {/* Our story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">How It All Started</h2>
              <p className="text-white/60 leading-relaxed mb-4">
                Conalytic was founded with a simple idea: analytics should feel effortless.
                Frustrated with clunky tools that slowed down collaboration, our founders set out to
                create a solution that prioritizes simplicity, innovation, and inclusivity.
              </p>
              <p className="text-white/60 leading-relaxed">
                Today, Conalytic is trusted by teams around the world to do just that. From
                marketing agencies serving Fortune 500 clients to in-house teams at fast-growing
                startups, our platform turns complex data into clear conversations.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#6B5FF8]/15 border border-[#6B5FF8]/20 flex items-center justify-center shrink-0">
                    <stat.icon className="w-6 h-6 text-[#a78bfa]" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-white/50 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0E1526]/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Meet the People Behind Conalytic
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              At Conalytic, we&apos;re passionate about building tools that empower teams to
              collaborate, create, and succeed—together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="text-center p-8 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-[#6B5FF8]/30 transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6B5FF8] to-[#a78bfa] flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="text-white font-semibold text-lg">{member.name}</h3>
                <p className="text-white/50 text-sm mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
