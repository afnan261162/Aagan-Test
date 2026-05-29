"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHomepage = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // External page links
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }
    // Hash links — scroll on homepage, navigate home + hash otherwise
    if (isHomepage) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${href}`);
    }
  };

  const navLinkClass =
    "text-[#F5E6C8]/80 hover:text-[#C8860A] text-sm font-medium tracking-wide transition-colors duration-200";
  const activeLinkClass = "text-[#C8860A]";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHomepage
            ? "bg-[#1C1710]/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Wordmark */}
            <Link
              href="/"
              className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl font-bold text-[#C8860A] tracking-wide hover:text-[#F5E6C8] transition-colors duration-200"
            >
              Aangan
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`${navLinkClass} ${pathname === link.href ? activeLinkClass : ""}`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#visit")}
                className="ml-2 px-5 py-2 border border-[#C8860A] text-[#C8860A] text-sm font-semibold rounded-full hover:bg-[#C8860A] hover:text-[#1C1710] transition-all duration-200 hover:scale-[1.02]"
              >
                Reserve
              </button>
            </nav>

            {/* Mobile hamburger — 44×44 touch target */}
            <button
              className="md:hidden text-[#F5E6C8] flex items-center justify-center min-w-[44px] min-h-[44px]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#1C1710] border-l border-[#C8860A]/20 shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-[#C8860A]/20">
            <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#C8860A]">
              Aangan
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] text-[#F5E6C8]/60 hover:text-[#F5E6C8]"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-left py-3 px-4 min-h-[56px] flex items-center hover:bg-[#C8860A]/10 rounded-lg text-base font-medium transition-all duration-150 ${
                  pathname === link.href
                    ? "text-[#C8860A]"
                    : "text-[#F5E6C8]/80 hover:text-[#C8860A]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 mt-2 border-t border-[#C8860A]/20">
              <button
                onClick={() => handleNavClick("#visit")}
                className="w-full py-3 min-h-[48px] border border-[#C8860A] text-[#C8860A] font-semibold rounded-full hover:bg-[#C8860A] hover:text-[#1C1710] transition-all duration-200"
              >
                Reserve a Table
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
