import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Contact Us – Conalytic",
  description:
    "Have questions, feedback, or just want to say hi? Let's connect! Reach out to Conalytic via email, phone, or our contact form.",
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    subtitle: "Our friendly team is here to help.",
    value: "hello@conalytic.com",
    href: "mailto:hello@conalytic.com",
  },
  {
    icon: MapPin,
    title: "Location",
    subtitle: "Let's catch up for a coffee.",
    value: "Pune, Maharashtra, India",
    href: null,
  },
  {
    icon: Phone,
    title: "Phone",
    subtitle: "Let's get on a call to schedule trial.",
    value: "+91-7900615417",
    href: "tel:+917900615417",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 hero-gradient overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#6B5FF8]/15 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            We&apos;re Here to <span className="gradient-text">Help!</span>
          </h1>
          <p className="text-xl text-white/60 max-w-xl mx-auto">
            Have questions, feedback, or just want to say hi? Let&apos;s connect!
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="text-center p-8 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-[#6B5FF8]/30 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#6B5FF8]/15 border border-[#6B5FF8]/20 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-7 h-7 text-[#a78bfa]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{info.title}</h3>
                <p className="text-white/40 text-sm mb-3">{info.subtitle}</p>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors font-medium"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-white/70 font-medium">{info.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-white mb-8">Send us a message</h2>

              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#6B5FF8]/50 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#6B5FF8]/50 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#6B5FF8]/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#6B5FF8]/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm mb-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#6B5FF8]/50 focus:bg-white/[0.06] transition-all resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full justify-center">
                  Send message
                </Button>
              </form>
            </div>
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
