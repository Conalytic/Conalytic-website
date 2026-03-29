import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookies Policy – Conalytic",
  description:
    "Conalytic uses cookies and similar technologies to enhance your experience and analyze how our services are used. Learn how we use cookies and how to manage your preferences.",
};

const cookieTypes = [
  {
    name: "Essential Cookies",
    description:
      "These cookies are necessary for the platform to function properly. They enable core features such as account login and security.",
  },
  {
    name: "Performance Cookies",
    description:
      "These cookies collect information about how users interact with our platform. We use this data to improve functionality and optimize user experience.",
  },
  {
    name: "Functional Cookies",
    description:
      "These cookies remember your preferences, such as language or region settings, to make your experience more personalized.",
  },
  {
    name: "Marketing Cookies",
    description:
      "These cookies help us deliver relevant advertisements and measure the effectiveness of our marketing campaigns.",
  },
];

const browserInstructions = [
  { browser: "Chrome", steps: "Settings → Privacy and Security → Cookies and other site data" },
  { browser: "Firefox", steps: "Preferences → Privacy & Security → Cookies and Site Data" },
  { browser: "Safari", steps: "Preferences → Privacy → Manage Website Data" },
];

const sections = [
  { id: "what-are-cookies", title: "What Are Cookies?" },
  { id: "types", title: "Types of Cookies We Use" },
  { id: "why-we-use", title: "Why We Use Cookies" },
  { id: "managing", title: "Managing Your Preferences" },
  { id: "updates", title: "Updates to This Policy" },
  { id: "contact", title: "Contact Us" },
];

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Cookies Policy</h1>
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

        <article className="lg:col-span-3">
          <p className="text-white/60 leading-relaxed mb-10">
            At Conalytic, we use cookies and similar technologies to enhance your experience,
            analyze how our services are used, and improve their functionality. By using Conalytic,
            you agree to the use of cookies as outlined in this policy.
          </p>

          {/* What are cookies */}
          <div id="what-are-cookies" className="scroll-mt-28 mb-10">
            <h2 className="text-xl font-semibold text-white mb-3">What Are Cookies?</h2>
            <p className="text-white/60 leading-relaxed">
              Cookies are small text files stored on your device when you visit a website. They help
              websites remember your preferences, improve functionality, and provide a more
              personalized experience. Cookies can be temporary (session cookies) or stored on your
              device for a longer period (persistent cookies).
            </p>
            <hr className="border-white/[0.06] mt-8" />
          </div>

          {/* Types */}
          <div id="types" className="scroll-mt-28 mb-10">
            <h2 className="text-xl font-semibold text-white mb-5">Types of Cookies We Use</h2>
            <div className="space-y-4">
              {cookieTypes.map((type) => (
                <div
                  key={type.name}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5"
                >
                  <h3 className="text-white font-medium mb-2">{type.name}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{type.description}</p>
                </div>
              ))}
            </div>
            <hr className="border-white/[0.06] mt-8" />
          </div>

          {/* Why we use */}
          <div id="why-we-use" className="scroll-mt-28 mb-10">
            <h2 className="text-xl font-semibold text-white mb-3">Why We Use Cookies</h2>
            <p className="text-white/60 mb-4">We use cookies to:</p>
            <ul className="space-y-2">
              {[
                "Enable core functionality, such as secure login and navigation.",
                "Analyze how users engage with our platform to improve performance.",
                "Remember user preferences for a personalized experience.",
                "Deliver targeted content and advertisements relevant to your interests.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <hr className="border-white/[0.06] mt-8" />
          </div>

          {/* Managing preferences */}
          <div id="managing" className="scroll-mt-28 mb-10">
            <h2 className="text-xl font-semibold text-white mb-3">
              Managing Your Cookie Preferences
            </h2>
            <p className="text-white/60 mb-5 leading-relaxed">
              You have control over how cookies are used. Most web browsers allow you to manage or
              disable cookies through their settings. Please note that disabling essential cookies
              may affect the functionality of Conalytic. To manage cookies in your browser:
            </p>
            <div className="space-y-3">
              {browserInstructions.map((b) => (
                <div key={b.browser} className="flex items-start gap-3 text-sm">
                  <span className="text-[#a78bfa] font-semibold w-16 shrink-0">{b.browser}:</span>
                  <span className="text-white/55">Go to {b.steps}</span>
                </div>
              ))}
            </div>
            <hr className="border-white/[0.06] mt-8" />
          </div>

          {/* Updates */}
          <div id="updates" className="scroll-mt-28 mb-10">
            <h2 className="text-xl font-semibold text-white mb-3">Updates to This Policy</h2>
            <p className="text-white/60 leading-relaxed">
              We may update this Cookies Policy to reflect changes in our practices or legal
              requirements. Any updates will be posted on this page, and we encourage you to review
              the policy periodically.
            </p>
            <hr className="border-white/[0.06] mt-8" />
          </div>

          {/* Contact */}
          <div id="contact" className="scroll-mt-28 mb-10">
            <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
            <p className="text-white/60 leading-relaxed">
              If you have questions or concerns about our use of cookies, please contact us at:{" "}
              <a
                href="mailto:hello@conalytic.com"
                className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors"
              >
                hello@conalytic.com
              </a>
            </p>
          </div>

          <div className="flex gap-4 text-sm text-white/30">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-white/60 transition-colors">Contact Us</Link>
          </div>
        </article>
      </div>
    </div>
  );
}
