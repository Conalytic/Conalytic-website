import type { Metadata } from "next";
import Link from "next/link";
import { CmsPage } from "@/components/storyblok/CmsPage";
import { getPageMetadata } from "@/lib/storyblok-page";

const fallbackMetadata: Metadata = {
  title: "Privacy Policy – Conalytic",
  description:
    "At Conalytic, we value your privacy and are committed to protecting your personal information. Read our Privacy Policy to understand how we collect, use, and protect your data.",
};

const sections = [
  { id:"information-we-collect", title:"1. Information We Collect",   content:"We collect information that you provide directly to us, such as when you create an account, communicate with our support team, or use our services. This may include your name, email address, company details, and payment information. Additionally, we automatically collect certain information, such as your IP address, browser type, device details, and usage data, to help improve our platform and services." },
  { id:"how-we-use",             title:"2. How We Use Your Information", content:"The information we collect is used to provide and improve our services, process payments, communicate updates, and ensure the security of our platform. For example, your email address may be used to send important notifications, such as account updates or product announcements." },
  { id:"sharing",                title:"3. Sharing Your Information",   content:"We respect your data and do not sell it to third parties. However, we may share your information with trusted service providers who assist in operating our platform, such as payment processors or email marketing tools." },
  { id:"retention",              title:"4. Retention of Data",          content:"We retain your personal data for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When your data is no longer required, we securely delete or anonymize it." },
  { id:"updates",                title:"5. Updates to This Policy",     content:"Your privacy is important to us. We collect, store, and use your information in accordance with our Privacy Policy, which explains how your data is handled when using Conalytic. By using our platform, you agree to the practices outlined in our Privacy Policy. We may update this policy from time to time and will notify you of significant changes." },
  { id:"contact",                title:"6. Contact Us",                 content:"If you have any questions or concerns about this Privacy Policy or how your information is handled, please reach out to us at:", hasContact:true },
];

function PrivacyFallback() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0C0C12] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-100 dark:border-brand-500/20 mb-4">Legal</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">Privacy Policy</h1>
          <p className="text-gray-400 dark:text-white/40 text-sm">Last Updated: October 01, 2024</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* TOC */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl bg-[#F6F7FE] dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.07] p-5">
              <p className="text-gray-400 dark:text-white/45 text-xs font-bold uppercase tracking-widest mb-4">Contents</p>
              <nav className="space-y-1">
                {sections.map(s=>(
                  <a key={s.id} href={`#${s.id}`} className="block text-gray-500 dark:text-white/50 hover:text-brand-600 dark:hover:text-brand-300 text-sm transition-colors py-1 pl-2 border-l-2 border-transparent hover:border-brand-400">
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <article className="lg:col-span-3 space-y-10">
            <p className="text-gray-600 dark:text-white/65 leading-relaxed text-base">
              At Conalytic, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and share your data when you use our platform.
            </p>

            {sections.map(section=>(
              <div key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{section.title}</h2>
                <p className="text-gray-600 dark:text-white/65 leading-relaxed">{section.content}</p>
                {section.hasContact && (
                  <p className="text-gray-600 dark:text-white/65 mt-2">
                    Email:{" "}
                    <a href="mailto:hello@conalytic.com" className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors font-medium">
                      hello@conalytic.com
                    </a>
                  </p>
                )}
                <hr className="border-gray-100 dark:border-white/[0.06] mt-8"/>
              </div>
            ))}

            <div className="flex gap-4 text-sm text-gray-400 dark:text-white/35 pt-4">
              <Link href="/terms"   className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">Terms of Service</Link>
              <span>·</span>
              <Link href="/cookies" className="hover:text-brand-600 dark:hover:text-brand-300 transition-colors">Cookies Policy</Link>
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
  return getPageMetadata("/privacy", fallbackMetadata);
}

export default async function PrivacyPage() {
  return <CmsPage slug="/privacy" fallback={<PrivacyFallback />} />;
}
