"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0A0F1E]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-xl shadow-black/20"
          : "bg-transparent"
      )}
    >
      {/* Announcement banner */}
      <div className="bg-gradient-to-r from-[#6B5FF8] via-[#7c3aed] to-[#6B5FF8] text-white text-center py-2 text-xs font-medium tracking-wide">
        🎉 New! Introducing New Features &nbsp;
        <a href="/features" className="underline underline-offset-2 opacity-90 hover:opacity-100">
          Explore now →
        </a>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6B5FF8] to-[#a78bfa] flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight group-hover:text-[#a78bfa] transition-colors">
              Conalytic
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
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
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        activeDropdown === item.name && "rotate-180"
                      )}
                    />
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
                    <div className="bg-[#141C30] rounded-2xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                          <span className="text-white text-sm font-medium group-hover:text-[#a78bfa] transition-colors">
                            {child.name}
                          </span>
                          {child.description && (
                            <span className="text-white/40 text-xs">{child.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-white bg-white/8"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" href="https://app.conalytic.com/login" external>
              Login
            </Button>
            <Button variant="primary" size="sm" href="https://app.conalytic.com/demo" external>
              Book a Demo
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden bg-[#0E1526]/95 backdrop-blur-xl border-b border-white/[0.06] transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.name}>
                <button
                  className="w-full flex items-center justify-between px-4 py-2.5 text-white/70 hover:text-white text-sm font-medium rounded-xl hover:bg-white/5 transition-colors"
                  onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                >
                  {item.name}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform",
                      activeDropdown === item.name && "rotate-180"
                    )}
                  />
                </button>
                {activeDropdown === item.name && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-white/60 hover:text-white text-sm rounded-xl hover:bg-white/5 transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors",
                  pathname === item.href
                    ? "text-white bg-white/8"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                {item.name}
              </Link>
            )
          )}
          <div className="pt-4 flex flex-col gap-2 border-t border-white/[0.06]">
            <Button variant="secondary" size="md" href="https://app.conalytic.com/login" external className="w-full justify-center">
              Login
            </Button>
            <Button variant="primary" size="md" href="https://app.conalytic.com/demo" external className="w-full justify-center">
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
