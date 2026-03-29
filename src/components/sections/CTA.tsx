import { Button } from "@/components/ui/Button";

interface CTAProps {
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function CTA({
  title = "Ready to Transform Your Analytics?",
  subtitle = "Join 2,000+ teams already using Conalytic to turn data into decisions",
  primaryCta = { label: "Book a demo", href: "https://app.conalytic.com/demo" },
  secondaryCta = { label: "Start a free trial", href: "https://app.conalytic.com/signup" },
}: CTAProps) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6B5FF8] via-[#7c3aed] to-[#4f46e5]" />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Glow orbs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative px-8 py-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              {title}
            </h2>
            <p className="text-white/75 text-lg mb-10 max-w-xl mx-auto">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href={primaryCta.href}
                external
                className="bg-white text-[#6B5FF8] hover:bg-white/90 shadow-xl shadow-black/20 font-semibold"
                size="lg"
              >
                {primaryCta.label}
              </Button>
              <Button
                href={secondaryCta.href}
                external
                variant="secondary"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                {secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
