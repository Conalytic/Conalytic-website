import Link from "next/link";
import Image from "next/image";

const SocialFacebook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const SocialInstagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const SocialLinkedin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const SocialX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const footerLinks = {
  Company: [
    { name: "Home",        href: "/" },
    { name: "Features",    href: "/features" },
    { name: "About Us",    href: "/about-us" },
    { name: "Pricing",     href: "/contact" },
  ],
  About: [
    { name: "Trendings",   href: "/blogs" },
    { name: "About Us",    href: "/about-us" },
    { name: "Features",    href: "/features" },
  ],
  Support: [
    { name: "Support Center", href: "/contact" },
    { name: "Contact Us",  href: "/contact" },
    { name: "FAQs",        href: "/#faq" },
  ],
  Movement: [
    { name: "What is Conalytic?", href: "/about-us" },
    { name: "Support Us",  href: "/contact" },
  ],
};

const socialLinks = [
  { name: "Facebook",  href: "https://facebook.com/conalytic",          Icon: SocialFacebook  },
  { name: "LinkedIn",  href: "https://linkedin.com/company/conalytic",  Icon: SocialLinkedin  },
  { name: "Instagram", href: "https://instagram.com/conalytic",         Icon: SocialInstagram },
  { name: "X",         href: "https://twitter.com/conalytic",           Icon: SocialX         },
];

export function Footer() {
  return (
    /* Outer wrapper — gives the page-level padding so the floating card has space */
    <div className="px-4 pb-4 pt-2">
      <footer className="relative overflow-hidden rounded-3xl">

        {/* ── Background ── */}
        <div className="absolute inset-0 dark:hidden"
          style={{ background:"linear-gradient(135deg,#ede9fe 0%,#f3e8ff 30%,#fce7f3 60%,#fef3c7 100%)" }}/>
        <div className="absolute inset-0 hidden dark:block"
          style={{ background:"linear-gradient(135deg,#0E0B1C 0%,#0C0C12 40%,#0B0E1C 100%)" }}/>
        <div className="absolute inset-0 hidden dark:block pointer-events-none"
          style={{ background:"radial-gradient(ellipse 70% 60% at 30% 100%, rgba(107,95,248,0.08) 0%, transparent 65%)" }}/>

        {/* ── Content ── */}
        <div className="relative z-10 max-w-6xl mx-auto px-8 sm:px-12">

          {/* Top row: email address */}
          <div className="flex justify-end pt-10 pb-2">
            <a href="mailto:info@conalytic.com"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-white/50 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              info@conalytic.com
            </a>
          </div>

          {/* Main columns */}
          <div className="py-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8">

            {/* Logo + description — takes 1 col on sm, 1 col on lg */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex flex-col gap-4">
              <Link href="/" className="inline-flex">
                <Image src="/logo.png" alt="Conalytic" width={130} height={38} className="h-8 w-auto dark:hidden"/>
                <Image src="/logo-white.png" alt="Conalytic" width={130} height={38} className="h-8 w-auto hidden dark:block"/>
              </Link>
              <p className="text-xs text-gray-500 dark:text-white/45 leading-relaxed max-w-[180px]">
                Casting Spells of Clarity on Your Data.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-xs font-bold text-gray-800 dark:text-white uppercase tracking-wider mb-4">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link.name}>
                      <Link href={link.href}
                        className="text-sm text-gray-500 dark:text-white/45 hover:text-brand-600 dark:hover:text-white transition-colors leading-none"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-black/8 dark:border-white/8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo mark + copyright */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-gray-300 dark:border-white/20 flex items-center justify-center">
                <Image src="/logo-icon.png" alt="" width={16} height={16}/>
              </div>
              <span className="text-xs text-gray-400 dark:text-white/30">© 2025 Conalytic. All rights reserved.</span>
            </div>

            {/* Social icons + legal */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                {socialLinks.map(s => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                    className="text-gray-400 dark:text-white/30 hover:text-brand-600 dark:hover:text-white transition-colors"
                  >
                    <s.Icon/>
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-white/30">
                <Link href="/terms"   className="hover:text-gray-600 dark:hover:text-white transition-colors">Terms</Link>
                <Link href="/privacy" className="hover:text-gray-600 dark:hover:text-white transition-colors">Privacy</Link>
                <Link href="/cookies" className="hover:text-gray-600 dark:hover:text-white transition-colors">Security</Link>
              </div>
            </div>
          </div>
        </div>

      </footer>
    </div>
  );
}
