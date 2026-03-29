import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service – Conalytic",
  description:
    "By accessing or using Conalytic services, you agree to these terms. Please read them carefully to understand your rights and obligations.",
};

const sections = [
  {
    id: "use-of-services",
    title: "Use of Services",
    content:
      "Conalytic provides tools designed to enhance marketing analytics and productivity. To use our services, you must act in accordance with applicable laws and avoid any activities that could harm our platform or other users. Misuse of our services, including attempts to disrupt or interfere with our system, is strictly prohibited. Our platform is intended to support analytics, collaboration, and lawful activities only.",
  },
  {
    id: "your-account",
    title: "Your Account",
    content:
      "When you create an account with Conalytic, you are responsible for maintaining the security of your account credentials. Any activity performed under your account is your responsibility, so it's important to protect your login information and notify us immediately if you suspect unauthorized access. Your account should only be used by you, and sharing credentials is discouraged to ensure security.",
  },
  {
    id: "billing",
    title: "Billing and Payments",
    content:
      "Conalytic operates on a subscription model, and payments are processed at the start of each billing cycle. Unless canceled before the renewal date, subscriptions will automatically renew. Payments made for subscriptions are generally non-refundable unless specifically stated otherwise. If payment fails, we may suspend access to your account until the issue is resolved.",
  },
  {
    id: "ownership",
    title: "Ownership of Content",
    content:
      "All intellectual property related to Conalytic's platform, including software, design, and branding, is owned by us. However, any content you upload or share on Conalytic remains your property. You agree not to reproduce, modify, or distribute Conalytic's intellectual property without prior authorization.",
  },
  {
    id: "privacy",
    title: "Your Privacy",
    content:
      "Your privacy is important to us. We collect, store, and use your information in accordance with our Privacy Policy, which explains how your data is handled when using Conalytic. By using our platform, you agree to the practices outlined in our Privacy Policy.",
  },
  {
    id: "contact",
    title: "Contact Us",
    content:
      "If you have any questions or concerns about these Terms of Service, please reach out to us at:",
    hasContact: true,
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-white/40 text-sm">Last Updated: October 01, 2024</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <aside className="lg:col-span-1">
          <div className="sticky top-28 rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
              Contents
            </p>
            <nav className="space-y-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-white/50 hover:text-white text-sm transition-colors py-1"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <article className="lg:col-span-3 space-y-10">
          <div className="prose prose-invert prose-sm max-w-none">
            <p className="text-white/60 leading-relaxed text-base mb-8">
              Welcome to Conalytic! By accessing or using our services, you agree to these terms.
              Please read them carefully to understand your rights and obligations when using
              Conalytic.
            </p>

            {sections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-xl font-semibold text-white mb-3">{section.title}</h2>
                <p className="text-white/60 leading-relaxed">{section.content}</p>
                {section.hasContact && (
                  <p className="text-white/60 mt-2">
                    Email:{" "}
                    <a
                      href="mailto:hello@conalytic.com"
                      className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors"
                    >
                      hello@conalytic.com
                    </a>
                  </p>
                )}
                <hr className="border-white/[0.06] mt-8" />
              </div>
            ))}
          </div>

          <div className="flex gap-4 text-sm text-white/30">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/cookies" className="hover:text-white/60 transition-colors">Cookies Policy</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-white/60 transition-colors">Contact Us</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
