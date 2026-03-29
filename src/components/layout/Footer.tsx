import Link from "next/link";

// Inline SVG social icons (lucide-react doesn't include brand icons)
const SocialFacebook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const SocialInstagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const SocialLinkedin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const SocialX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const footerLinks = {
  Products: [
    { name: "Conversational Analytics", href: "/products/conversational-analytics" },
    { name: "Report Builder", href: "/products/report-builder" },
    { name: "Integrations", href: "/integrations" },
    { name: "Book a Demo", href: "https://app.conalytic.com/demo" },
  ],
  Company: [
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact" },
    { name: "Blogs", href: "/blogs" },
    { name: "Brand", href: "/brand" },
  ],
  Support: [
    { name: "Support", href: "/contact" },
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
    { name: "Cookies", href: "/cookies" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/conalytic", Icon: SocialFacebook },
  { name: "Instagram", href: "https://instagram.com/conalytic", Icon: SocialInstagram },
  { name: "LinkedIn", href: "https://linkedin.com/company/conalytic", Icon: SocialLinkedin },
  { name: "X / Twitter", href: "https://twitter.com/conalytic", Icon: SocialX },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0E1526]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6B5FF8] to-[#a78bfa] flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-white font-semibold text-lg">Conalytic</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Empowering marketers worldwide with intelligent, conversational analytics that transform data into actionable insights.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/[0.07] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-[#6B5FF8]/30 transition-all"
                  aria-label={social.name}
                >
                  <social.Icon />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-white/70 text-sm font-medium mb-2">Weekly newsletter</p>
              <p className="text-white/40 text-xs mb-3">Read about our privacy policy.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#6B5FF8]/50 focus:bg-white/[0.06] transition-all"
                />
                <button className="bg-[#6B5FF8] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#5a43f0] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-white text-sm transition-colors"
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
        <div className="border-t border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">© 2025 Conalytic. All rights reserved.</p>
          <p className="text-white/30 text-xs">
            Powered by{" "}
            <a href="https://peakovate.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">
              Peakovate
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
