"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "#",
    children: [
      { name: "Conversational Analytics", href: "/products/conversational-analytics", description: "Ask questions in plain English, get instant insights" },
      { name: "Report Builder", href: "/products/report-builder", description: "AI-powered professional report automation" },
      { name: "Applicant Tracking System", href: "/products/applicant-tracking-system", description: "Smart recruitment & talent management" },
    ],
  },
  { name: "Features", href: "/features" },
  { name: "About", href: "/about-us" },
  {
    name: "Resources",
    href: "#",
    children: [
      { name: "Integrations", href: "/integrations", description: "Connect with your favorite tools" },
      { name: "Blogs", href: "/blogs", description: "Tips, trends, and analytics insights" },
      { name: "Careers", href: "/careers", description: "Join the Conalytic team" },
    ],
  },
  { name: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">

      {/* ── Floating pill navbar ─────────────────────── */}
      <div
        className={cn(
          "max-w-5xl mx-auto rounded-2xl transition-all duration-300",
          scrolled
            ? "bg-white/88 dark:bg-[#121219]/90 backdrop-blur-2xl border border-black/8 dark:border-white/[0.07] shadow-xl shadow-black/8 dark:shadow-black/50"
            : "bg-white/72 dark:bg-[#0C0C12]/80 backdrop-blur-xl border border-black/6 dark:border-white/[0.06] shadow-lg shadow-black/5 dark:shadow-black/30"
        )}
      >
        <nav className="px-5 sm:px-6">
          <div className="flex h-14 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              {/* Light mode logo */}
              <Image
                src="/logo.png"
                alt="Conalytic"
                width={140}
                height={40}
                className="h-8 w-auto dark:hidden"
                priority
              />
              {/* Dark mode logo */}
              <Image
                src="/logo-white.png"
                alt="Conalytic"
                width={140}
                height={40}
                className="h-8 w-auto hidden dark:block"
                priority
              />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navigation.map((item) =>
                item.children ? (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                        "text-gray-600 hover:text-gray-900 hover:bg-black/5",
                        "dark:text-white/65 dark:hover:text-white dark:hover:bg-white/5"
                      )}
                    >
                      {item.name}
                      <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", activeDropdown === item.name && "rotate-180")} />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 transition-all duration-200",
                        activeDropdown === item.name
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      )}
                    >
                      <div className="bg-white dark:bg-[#18181F] rounded-2xl border border-black/8 dark:border-white/[0.07] shadow-xl shadow-black/10 dark:shadow-black/60 overflow-hidden p-2">
                        {item.children.map((child) => (
                          <Link key={child.name} href={child.href}
                            className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                          >
                            <span className="text-gray-900 dark:text-white text-sm font-medium group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                              {child.name}
                            </span>
                            {child.description && (
                              <span className="text-gray-400 dark:text-white/40 text-xs">{child.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link key={item.name} href={item.href}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "text-brand-600 dark:text-brand-300 bg-brand-50 dark:bg-brand-600/10"
                        : "text-gray-600 hover:text-gray-900 hover:bg-black/5 dark:text-white/65 dark:hover:text-white dark:hover:bg-white/5"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* Right: theme + CTA buttons */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <ThemeToggle />
              <a href="https://app.conalytic.com/login" target="_blank" rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-xl text-sm font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/15 hover:border-gray-300 dark:hover:border-white/25 bg-white/60 dark:bg-transparent hover:bg-white dark:hover:bg-white/5 transition-all duration-200"
              >
                Login
              </a>
              <a href="https://app.conalytic.com/demo" target="_blank" rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-xl text-sm font-semibold text-white bg-gray-900 dark:bg-brand-600 dark:hover:bg-brand-700 shadow-sm dark:shadow-brand-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Book A Demo
              </a>
            </div>

            {/* Mobile: theme + hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="p-1.5 rounded-lg text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile dropdown (inside the pill) */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          isOpen ? "max-h-screen" : "max-h-0"
        )}>
          <div className="px-4 pb-4 pt-1 space-y-0.5 border-t border-black/6 dark:border-white/6">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name}>
                  <button
                    className="w-full flex items-center justify-between px-3 py-2.5 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white text-sm font-medium rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  >
                    {item.name}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", activeDropdown === item.name && "rotate-180")} />
                  </button>
                  {activeDropdown === item.name && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {item.children.map((child) => (
                        <Link key={child.name} href={child.href}
                          className="block px-3 py-2 text-gray-500 dark:text-white/55 hover:text-gray-900 dark:hover:text-white text-sm rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.name} href={item.href}
                  className={cn(
                    "block px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                    pathname === item.href
                      ? "text-brand-600 dark:text-brand-300 bg-brand-50 dark:bg-brand-600/10"
                      : "text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="pt-3 flex flex-col gap-2 border-t border-black/6 dark:border-white/6 mt-2">
              <a href="https://app.conalytic.com/login" target="_blank" rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl text-sm font-medium text-center text-gray-700 dark:text-white border border-gray-200 dark:border-white/15 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >Login</a>
              <a href="https://app.conalytic.com/demo" target="_blank" rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-center text-white bg-gray-900 dark:bg-brand-600 dark:hover:bg-brand-700 transition-all"
              >Book A Demo</a>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}
