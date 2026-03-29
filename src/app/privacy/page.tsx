import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – Conalytic",
  description:
    "At Conalytic, we value your privacy and are committed to protecting your personal information. Read our Privacy Policy to understand how we collect, use, and protect your data.",
};

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content:
      "We collect information that you provide directly to us, such as when you create an account, communicate with our support team, or use our services. This may include your name, email address, company details, and payment information. Additionally, we automatically collect certain information, such as your IP address, browser type, device details, and usage data, to help improve our platform and services.",
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content:
      "The information we collect is used to provide and improve our services, process payments, communicate updates, and ensure the security of our platform. For example, your email address may be used to send important notifications, such as account updates or product announcements.",
  },
  {
    id: "sharing",
    title: "3. Sharing Your Information",
    content:
      "We respect your data and do not sell it to third parties. However, we may share your information with trusted service providers who assist in operating our platform, such as payment processors or email marketing tools.",
  },
  {
    id: "retention",
    title: "4. Retention of Data",
    content:
      "All intellectual property related to Conalytic's platform, including software, design, and branding, is owned by us. However, any content you upload or share on Conalytic remains your property. You agree not to reproduce, modify, or distribute Conalytic's intellectual property without prior authorization.",
  },
  {
    id: "updates",
    title: "5. Updates to This Policy",
    content:
      "Your privacy is important to us. We collect, store, and use your information in accordance with our Privacy Policy, which explains how your data is handled when using Conalytic. By using our platform, you agree to the practices outlined in our Privacy Policy.",
  },
  {
    id: "contact",
    title: "6. Contact Us",
    content: "If you have any questions or concerns about this Privacy Policy or how your information is handled, please reach out to us at:",
    hasContact: true,
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-white/40 text-sm">Last Updated: October 01, 2024</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Table of contents */}
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

        {/* Content */}
        <article className="lg:col-span-3 space-y-10">
          <div className="prose prose-invert prose-sm max-w-none">
            <p className="text-white/60 leading-relaxed text-base mb-8">
              At Conalytic, we value your privacy and are committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, store, and share your
              data when you use our platform.
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
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
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
