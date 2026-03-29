import type { Metadata } from "next";
import { CTA } from "@/components/sections/CTA";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Integrations – Conalytic",
  description:
    "Connect Conalytic to the tools your team already loves. Integrate with GA4, Google Ads, Meta Ads, Search Console, Slack, and many more.",
};

const integrations = [
  {
    name: "Google Analytics 4",
    category: "Analytics",
    description: "Track website traffic, user behavior, and conversion events with deep GA4 integration.",
    status: "available",
  },
  {
    name: "Google Ads",
    category: "Advertising",
    description: "Monitor campaign performance, ad spend, ROAS, and CTR across all Google Ads campaigns.",
    status: "available",
  },
  {
    name: "Meta Ads",
    category: "Advertising",
    description: "Analyze Facebook and Instagram ad performance, audience insights, and conversion data.",
    status: "available",
  },
  {
    name: "Google Search Console",
    category: "SEO",
    description: "Track organic search performance, keyword rankings, and click-through rates.",
    status: "available",
  },
  {
    name: "Slack",
    category: "Collaboration",
    description: "Keep your team in the loop with real-time updates and notifications directly in Slack.",
    status: "available",
  },
  {
    name: "Zoom",
    category: "Communication",
    description: "Schedule and join video meetings without leaving your analytics workflow.",
    status: "available",
  },
  {
    name: "Trello",
    category: "Project Management",
    description: "Organize your projects and track progress with Trello's visual collaboration tool.",
    status: "available",
  },
  {
    name: "Asana",
    category: "Project Management",
    description: "Empower your team with Asana's work tracking software connected to your analytics.",
    status: "available",
  },
  {
    name: "Google Docs",
    category: "Productivity",
    description: "Collaborate on documents in real-time with Google Docs integration.",
    status: "available",
  },
  {
    name: "Notion",
    category: "Productivity",
    description: "Capture ideas, share feedback, and stay organized with Notion.",
    status: "available",
  },
  {
    name: "Microsoft Teams",
    category: "Collaboration",
    description: "Connect your team with Microsoft Teams, a chat-based workspace.",
    status: "available",
  },
  {
    name: "Dropbox",
    category: "Storage",
    description: "Access and share files stored in Dropbox directly from your projects.",
    status: "available",
  },
  {
    name: "HubSpot",
    category: "CRM",
    description: "Track your team's sales tasks and customer interactions by connecting HubSpot.",
    status: "available",
  },
  {
    name: "GitHub",
    category: "Development",
    description: "Bridge the gap between development and management by syncing GitHub.",
    status: "available",
  },
  {
    name: "Calendly",
    category: "Scheduling",
    description: "Streamline scheduling by connecting Calendly to manage meetings effortlessly.",
    status: "available",
  },
  {
    name: "Zapier",
    category: "Automation",
    description: "Automate workflows by connecting Conalytic with over 2,000 apps using Zapier.",
    status: "available",
  },
  {
    name: "LinkedIn Ads",
    category: "Advertising",
    description: "Analyze LinkedIn advertising performance and B2B lead generation metrics.",
    status: "coming-soon",
  },
  {
    name: "TikTok Ads",
    category: "Advertising",
    description: "Track TikTok advertising campaigns and social commerce performance.",
    status: "coming-soon",
  },
];

const categoryColors: Record<string, string> = {
  Analytics: "bg-[#6B5FF8]/15 text-[#a78bfa]",
  Advertising: "bg-[#0ea5e9]/15 text-[#60a5fa]",
  SEO: "bg-[#10b981]/15 text-[#34d399]",
  Collaboration: "bg-[#f59e0b]/15 text-[#fbbf24]",
  Communication: "bg-[#ec4899]/15 text-[#f472b6]",
  "Project Management": "bg-[#8b5cf6]/15 text-[#c4b5fd]",
  Productivity: "bg-[#06b6d4]/15 text-[#22d3ee]",
  Storage: "bg-[#f97316]/15 text-[#fb923c]",
  CRM: "bg-[#ef4444]/15 text-[#f87171]",
  Development: "bg-white/10 text-white/60",
  Scheduling: "bg-[#84cc16]/15 text-[#a3e635]",
  Automation: "bg-[#d946ef]/15 text-[#e879f9]",
};

export default function IntegrationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#6B5FF8]/15 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Work Better Together with{" "}
            <span className="gradient-text">Seamless Integrations</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Connect Conalytic to the tools your team already loves and streamline your workflow in
            one place.
          </p>
        </div>
      </section>

      {/* Integrations grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className={`relative rounded-2xl p-6 border transition-all group hover:-translate-y-1 ${
                  integration.status === "coming-soon"
                    ? "border-white/[0.05] bg-white/[0.01] opacity-60"
                    : "border-white/[0.07] bg-white/[0.03] hover:border-[#6B5FF8]/30 hover:bg-white/[0.05]"
                }`}
              >
                {integration.status === "coming-soon" && (
                  <span className="absolute top-3 right-3 text-[10px] font-medium text-white/40 border border-white/10 rounded-full px-2 py-0.5">
                    Coming soon
                  </span>
                )}

                {/* Icon placeholder */}
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-4">
                  <span className="text-white/50 text-xs font-bold">
                    {integration.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <h3 className="text-white font-semibold text-sm">{integration.name}</h3>
                </div>

                <span
                  className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mb-3 ${
                    categoryColors[integration.category] || "bg-white/10 text-white/50"
                  }`}
                >
                  {integration.category}
                </span>

                <p className="text-white/40 text-xs leading-relaxed">{integration.description}</p>

                {integration.status === "available" && (
                  <div className="mt-4 flex items-center gap-1 text-[#a78bfa] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View docs</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Why Choose Conalytic?"
        subtitle="Built for teams who want to work smarter, faster, and happier with their marketing data"
      />
    </>
  );
}
