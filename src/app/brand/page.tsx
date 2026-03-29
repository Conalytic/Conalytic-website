import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand – Conalytic",
  description:
    "Conalytic brand assets, logo guidelines, color palette, and typography. Download our official brand kit for media and partner use.",
};

const colors = [
  { name: "Brand Purple", hex: "#6B5FF8", rgb: "107, 95, 248", usage: "Primary CTA, links, icons" },
  { name: "Light Purple", hex: "#a78bfa", rgb: "167, 139, 250", usage: "Accents, highlights" },
  { name: "Navy Dark", hex: "#0A0F1E", rgb: "10, 15, 30", usage: "Page background" },
  { name: "Navy Mid", hex: "#0E1526", rgb: "14, 21, 38", usage: "Section backgrounds" },
  { name: "Pure White", hex: "#FFFFFF", rgb: "255, 255, 255", usage: "Headings" },
  { name: "Muted White", hex: "rgba(255,255,255,0.6)", rgb: "255, 255, 255, 60%", usage: "Body text" },
];

const logoVariants = [
  { name: "Full Logo – Dark bg", description: "Primary usage on dark backgrounds" },
  { name: "Full Logo – Light bg", description: "Use on white or light backgrounds" },
  { name: "Icon only – Color", description: "App icon, favicon, small spaces" },
  { name: "Wordmark only", description: "Text-only variant for tight spaces" },
];

const typography = [
  { name: "Inter", weight: "700 Bold", usage: "Headings (H1–H3)", sample: "Conalytic" },
  { name: "Inter", weight: "600 SemiBold", usage: "Subheadings, UI labels", sample: "Analytics Platform" },
  { name: "Inter", weight: "400 Regular", usage: "Body text, descriptions", sample: "Ask questions in plain English." },
];

export default function BrandPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Conalytic <span className="gradient-text">Brand</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl">
          Official brand assets, guidelines, and resources for media, partners, and press.
          Please follow these guidelines when representing Conalytic.
        </p>
      </div>

      {/* Logo section */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-8">Logo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          {logoVariants.map((variant) => (
            <div
              key={variant.name}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden"
            >
              {/* Preview area */}
              <div className="h-36 flex items-center justify-center bg-[#141C30]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B5FF8] to-[#a78bfa] flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <span className="text-white font-bold text-base">C</span>
                  </div>
                  <span className="text-white font-semibold text-xl tracking-tight">Conalytic</span>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{variant.name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{variant.description}</p>
                </div>
                <button className="flex items-center gap-1.5 text-[#a78bfa] text-xs hover:text-white transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  SVG
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Download all */}
        <Button variant="secondary" size="md">
          <Download className="w-4 h-4" />
          Download Full Brand Kit (.zip)
        </Button>
      </section>

      {/* Colors */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-8">Color Palette</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colors.map((color) => (
            <div
              key={color.name}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden"
            >
              <div
                className="h-20 w-full"
                style={{ background: color.hex }}
              />
              <div className="p-4">
                <p className="text-white font-medium text-sm">{color.name}</p>
                <p className="text-white/50 text-xs font-mono mt-1">{color.hex}</p>
                <p className="text-white/30 text-xs mt-0.5">RGB: {color.rgb}</p>
                <p className="text-white/40 text-xs mt-2">{color.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-8">Typography</h2>
        <div className="space-y-4">
          {typography.map((type, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1">
                <p
                  className="text-white mb-2"
                  style={{
                    fontWeight: i === 0 ? 700 : i === 1 ? 600 : 400,
                    fontSize: i === 0 ? "2rem" : i === 1 ? "1.25rem" : "1rem",
                  }}
                >
                  {type.sample}
                </p>
                <p className="text-white/40 text-xs">
                  {type.name} · {type.weight}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-white/50 text-sm">{type.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage guidelines */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-8">Usage Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-[#10b981]/20 bg-[#10b981]/5 p-6">
            <h3 className="text-[#34d399] font-semibold mb-4">✓ Do</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>Use the logo with adequate clear space around it</li>
              <li>Use approved color variations on appropriate backgrounds</li>
              <li>Maintain the logo proportions when resizing</li>
              <li>Use the brand name &quot;Conalytic&quot; with a capital C</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <h3 className="text-red-400 font-semibold mb-4">✗ Don&apos;t</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>Don&apos;t stretch or distort the logo</li>
              <li>Don&apos;t change the logo colors outside approved variants</li>
              <li>Don&apos;t place the logo on cluttered backgrounds</li>
              <li>Don&apos;t use the brand to imply endorsement without permission</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <div className="rounded-2xl bg-[#6B5FF8]/10 border border-[#6B5FF8]/20 p-8 text-center">
        <h3 className="text-white font-semibold text-xl mb-2">Need something specific?</h3>
        <p className="text-white/50 mb-6">
          For press inquiries, partnership assets, or custom brand requests, reach out to us
          directly.
        </p>
        <Button href="mailto:hello@conalytic.com" external size="lg">
          Contact Brand Team
        </Button>
      </div>
    </div>
  );
}
