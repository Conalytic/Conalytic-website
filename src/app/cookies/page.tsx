import type { Metadata } from "next";
import Link from "next/link";
import { CmsPage } from "@/components/storyblok/CmsPage";
import { getPageMetadata } from "@/lib/storyblok-page";

const fallbackMetadata: Metadata = {
  title: "Cookies Policy – Conalytic",
  description:
    "Conalytic uses cookies and similar technologies to enhance your experience and analyze how our services are used. Learn how we use cookies and how to manage your preferences.",
};

const cookieTypes = [
  { name:"Essential Cookies",    description:"These cookies are necessary for the platform to function properly. They enable core features such as account login and security." },
  { name:"Performance Cookies",  description:"These cookies collect information about how users interact with our platform. We use this data to improve functionality and optimize user experience." },
  { name:"Functional Cookies",   description:"These cookies remember your preferences, such as language or region settings, to make your experience more personalized." },
  { name:"Marketing Cookies",    description:"These cookies help us deliver relevant advertisements and measure the effectiveness of our marketing campaigns." },
];

const browserInstructions = [
  { browser:"Chrome",  steps:"Settings → Privacy and Security → Cookies and other site data" },
  { browser:"Firefox", steps:"Preferences → Privacy & Security → Cookies and Site Data" },
  { browser:"Safari",  steps:"Preferences → Privacy → Manage Website Data" },
];

const toc = [
  { id:"what-are-cookies", title:"What Are Cookies?" },
  { id:"types",            title:"Types of Cookies We Use" },
  { id:"why-we-use",       title:"Why We Use Cookies" },
  { id:"managing",         title:"Managing Your Preferences" },
  { id:"updates",          title:"Updates to This Policy" },
  { id:"contact",          title:"Contact Us" },
];

const whyList = [
  "Enable core functionality, such as secure login and navigation.",
  "Analyze how users engage with our platform to improve performance.",
  "Remember user preferences for a personalized experience.",
  "Deliver targeted content and advertisements relevant to your interests.",
];

function CookiesFallback() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0C0C12] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">Legal</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">Cookies Policy</h1>
          <p className="text-gray-400 dark:text-white/40 text-sm">Last Updated: October 01, 2024</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl bg-[#F6F7FE] dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.07] p-5">
              <p className="text-gray-400 dark:text-white/45 text-xs font-bold uppercase tracking-widest mb-4">Contents</p>
              <nav className="space-y-1">
                {toc.map(s=>(
                  <a key={s.id} href={`#${s.id}`} className="block text-gray-500 dark:text-white/50 hover:text-brand-600 dark:hover:text-brand-300 text-sm transition-colors py-1 pl-2 border-l-2 border-transparent hover:border-brand-400">
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="lg:col-span-3 space-y-10">
            <p className="text-gray-600 dark:text-white/65 leading-relaxed">
              At Conalytic, we use cookies and similar technologies to enhance your experience, analyze how our services are used, and improve their functionality. By using Conalytic, you agree to the use of cookies as outlined in this policy.
            </p>

            {/* What are cookies */}
            <div id="what-are-cookies" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">What Are Cookies?</h2>
              <p className="text-gray-600 dark:text-white/65 leading-relaxed">Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, improve functionality, and provide a more personalized experience. Cookies can be temporary (session cookies) or stored on your device for a longer period (persistent cookies).</p>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8"/>
            </div>

            {/* Types */}
            <div id="types" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">Types of Cookies We Use</h2>
              <div className="space-y-4">
                {cookieTypes.map(type=>(
                  <div key={type.name} className="rounded-xl border border-gray-100 dark:border-white/[0.07] bg-[#F6F7FE] dark:bg-white/[0.03] p-5">
                    <h3 className="text-gray-900 dark:text-white font-semibold mb-2">{type.name}</h3>
                    <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed">{type.description}</p>
                  </div>
                ))}
              </div>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8"/>
            </div>

            {/* Why we use */}
            <div id="why-we-use" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Why We Use Cookies</h2>
              <p className="text-gray-600 dark:text-white/65 mb-4">We use cookies to:</p>
              <ul className="space-y-2">
                {whyList.map((item,i)=>(
                  <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-white/65 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0"/>
                    {item}
                  </li>
                ))}
              </ul>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8"/>
            </div>

            {/* Managing */}
            <div id="managing" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Managing Your Cookie Preferences</h2>
              <p className="text-gray-600 dark:text-white/65 mb-5 leading-relaxed">You have control over how cookies are used. Most web browsers allow you to manage or disable cookies through their settings. Please note that disabling essential cookies may affect the functionality of Conalytic. To manage cookies in your browser:</p>
              <div className="space-y-3">
                {browserInstructions.map(b=>(
                  <div key={b.browser} className="flex items-start gap-3 text-sm">
                    <span className="text-brand-600 dark:text-brand-400 font-bold w-16 shrink-0">{b.browser}:</span>
                    <span className="text-gray-500 dark:text-white/60">Go to {b.steps}</span>
                  </div>
                ))}
              </div>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8"/>
            </div>

            {/* Updates */}
            <div id="updates" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Updates to This Policy</h2>
              <p className="text-gray-600 dark:text-white/65 leading-relaxed">We may update this Cookies Policy to reflect changes in our practices or legal requirements. Any updates will be posted on this page, and we encourage you to review the policy periodically.</p>
              <hr className="border-gray-100 dark:border-white/[0.06] mt-8"/>
            </div>

            {/* Contact */}
            <div id="contact" className="scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Contact Us</h2>
              <p className="text-gray-600 dark:text-white/65 leading-relaxed">
                If you have questions or concerns about our use of cookies, please contact us at:{" "}
                <a href="mailto:hello@conalytic.com" className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors font-medium">
                  hello@conalytic.com
                </a>
              </p>
            </div>

            <div className="flex gap-4 text-sm text-gray-400 dark:text-white/35 pt-4">
              <Link href="/privacy" className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">Privacy Policy</Link>
              <span>·</span>
              <Link href="/terms"   className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">Terms of Service</Link>
              <span>·</span>
              <Link href="/contact" className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">Contact Us</Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/cookies", fallbackMetadata);
}

export default async function CookiesPage() {
  return <CmsPage slug="/cookies" fallback={<CookiesFallback />} />;
}
