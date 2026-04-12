"use client";

import Link from "next/link";
import { EXTERNAL_PRIVACY_POLICY_URL, EXTERNAL_TERMS_OF_SERVICE_URL } from "@/lib/legal-external-urls";

export type CookiesTocItem = { id: string; title: string };
export type CookiesTypeItem = { name: string; description: string };
export type CookiesBrowserRow = { browser: string; steps: string };

export type CookiesContentPreset = {
  kicker: string;
  pageTitle: string;
  lastUpdated: string;
  intro: string;
  toc: CookiesTocItem[];
  whatHeading: string;
  whatBody: string;
  typesSectionHeading: string;
  cookieTypes: CookiesTypeItem[];
  whyHeading: string;
  whyIntro: string;
  whyList: string[];
  managingHeading: string;
  managingIntro: string;
  browserInstructions: CookiesBrowserRow[];
  updatesHeading: string;
  updatesBody: string;
  contactHeading: string;
  contactLead: string;
  contactEmail: string;
};

export const COOKIES_DEFAULT_PRESET: CookiesContentPreset = {
  kicker: "Legal",
  pageTitle: "Cookies Policy",
  lastUpdated: "Last Updated: October 01, 2024",
  intro:
    "This marketing site uses a small set of cookies and similar technologies. When you first visit, you can choose Essential only or Accept all in the banner; your choice is stored in your browser (local storage). For full details, read the sections below.",
  toc: [
    { id: "what-are-cookies", title: "What Are Cookies?" },
    { id: "types", title: "Types of Cookies We Use" },
    { id: "why-we-use", title: "Why We Use Cookies" },
    { id: "managing", title: "Managing Your Preferences" },
    { id: "updates", title: "Updates to This Policy" },
    { id: "contact", title: "Contact Us" },
  ],
  whatHeading: "What Are Cookies?",
  whatBody:
    "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, improve functionality, and provide a more personalized experience. Cookies can be temporary (session cookies) or stored on your device for a longer period (persistent cookies).",
  typesSectionHeading: "Types of Cookies We Use",
  cookieTypes: [
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
  ],
  whyHeading: "Why We Use Cookies",
  whyIntro: "We use cookies to:",
  whyList: [
    "Enable core functionality, such as secure login and navigation.",
    "Analyze how users engage with our platform to improve performance.",
    "Remember user preferences for a personalized experience.",
    "Deliver targeted content and advertisements relevant to your interests.",
  ],
  managingHeading: "Managing Your Cookie Preferences",
  managingIntro:
    "You have control over how cookies are used. Most web browsers allow you to manage or disable cookies through their settings. Please note that disabling essential cookies may affect the functionality of Conalytic. To manage cookies in your browser:",
  browserInstructions: [
    { browser: "Chrome", steps: "Settings → Privacy and Security → Cookies and other site data" },
    { browser: "Firefox", steps: "Preferences → Privacy & Security → Cookies and Site Data" },
    { browser: "Safari", steps: "Preferences → Privacy → Manage Website Data" },
  ],
  updatesHeading: "Updates to This Policy",
  updatesBody:
    "We may update this Cookies Policy to reflect changes in our practices or legal requirements. Any updates will be posted on this page, and we encourage you to review the policy periodically.",
  contactHeading: "Contact Us",
  contactLead: "If you have questions or concerns about our use of cookies, please contact us at:",
  contactEmail: "admin@conalytic.com",
};

export function CookiesClient({ content }: { content?: Partial<CookiesContentPreset> }) {
  const c: CookiesContentPreset = { ...COOKIES_DEFAULT_PRESET, ...content };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0C0C12] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">
            {c.kicker}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">{c.pageTitle}</h1>
          <p className="text-gray-400 dark:text-white/40 text-sm">{c.lastUpdated}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl bg-[#F6F7FE] dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.07] p-5">
              <p className="text-gray-400 dark:text-white/45 text-xs font-bold uppercase tracking-widest mb-4">Contents</p>
              <nav className="space-y-1">
                {c.toc.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-gray-500 dark:text-white/50 hover:text-brand-600 dark:hover:text-brand-300 text-sm transition-colors py-1 pl-2 border-l-2 border-transparent hover:border-brand-400"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="lg:col-span-3 space-y-10">
            <p className="text-gray-600 dark:text-white/65 leading-relaxed">{c.intro}</p>

            <div id="what-are-cookies" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{c.whatHeading}</h2>
              <p className="text-gray-600 dark:text-white/65 leading-relaxed">{c.whatBody}</p>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8" />
            </div>

            <div id="types" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">{c.typesSectionHeading}</h2>
              <div className="space-y-4">
                {c.cookieTypes.map((type) => (
                  <div
                    key={type.name}
                    className="rounded-xl border border-gray-100 dark:border-white/[0.07] bg-[#F6F7FE] dark:bg-white/[0.03] p-5"
                  >
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-2">{type.name}</h3>
                    <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed">{type.description}</p>
                  </div>
                ))}
              </div>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8" />
            </div>

            <div id="why-we-use" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{c.whyHeading}</h2>
              <p className="text-gray-600 dark:text-white/65 mb-4">{c.whyIntro}</p>
              <ul className="space-y-2">
                {c.whyList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-white/65 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8" />
            </div>

            <div id="managing" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{c.managingHeading}</h2>
              <p className="text-gray-600 dark:text-white/65 mb-5 leading-relaxed">{c.managingIntro}</p>
              <div className="space-y-3">
                {c.browserInstructions.map((b) => (
                  <div key={b.browser} className="flex items-start gap-3 text-sm">
                    <span className="text-brand-600 dark:text-brand-400 font-bold w-16 shrink-0">{b.browser}:</span>
                    <span className="text-gray-500 dark:text-white/60">Go to {b.steps}</span>
                  </div>
                ))}
              </div>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8" />
            </div>

            <div id="updates" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{c.updatesHeading}</h2>
              <p className="text-gray-600 dark:text-white/65 leading-relaxed">{c.updatesBody}</p>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8" />
            </div>

            <div id="contact" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{c.contactHeading}</h2>
              <p className="text-gray-600 dark:text-white/65 leading-relaxed">
                {c.contactLead}{" "}
                <a
                  href={`mailto:${c.contactEmail}`}
                  className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors font-medium"
                >
                  {c.contactEmail}
                </a>
              </p>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 dark:text-white/35 pt-4">
              <a
                href={EXTERNAL_PRIVACY_POLICY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
              >
                Privacy Policy
              </a>
              <span>·</span>
              <a
                href={EXTERNAL_TERMS_OF_SERVICE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
              >
                Terms of Service
              </a>
              <span>·</span>
              <Link href="/contact" className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                Contact Us
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
