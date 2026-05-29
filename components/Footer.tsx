"use client";

import { RESTAURANT, NAV_LINKS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-[#1C1710] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 border-b border-[#C8860A]/15">
          {/* Col 1: Brand */}
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-[#C8860A] text-3xl font-bold mb-2">
              Aangan
            </h2>
            <p className="text-[#F5E6C8]/50 text-sm mb-4">
              Sargodha&apos;s Rooftop Dining Experience
            </p>
            <p className="text-[#F5E6C8]/40 text-xs leading-relaxed max-w-xs">
              Bringing together the finest Pakistani BBQ, charcoal grills, and
              international flavors atop Xin Mall, Sargodha.
            </p>
          </div>

          {/* Col 2: Quick links */}
          <div>
            <h3 className="text-[#F5E6C8] font-semibold text-sm uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterNavLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h3 className="text-[#F5E6C8] font-semibold text-sm uppercase tracking-widest mb-5">
              Contact
            </h3>
            <ul className="flex flex-col gap-2.5 mb-6">
              {RESTAURANT.phones.map((phone) => (
                <li key={phone.number}>
                  <a
                    href={phone.href}
                    className="text-[#F5E6C8]/60 hover:text-[#C8860A] text-sm font-mono transition-colors duration-150"
                  >
                    {phone.number}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="flex gap-3">
              <a
                href={RESTAURANT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2C2210] border border-[#C8860A]/20 flex items-center justify-center text-[#F5E6C8]/60 hover:text-[#C8860A] hover:border-[#C8860A]/50 transition-all duration-200"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={RESTAURANT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2C2210] border border-[#C8860A]/20 flex items-center justify-center text-[#F5E6C8]/60 hover:text-[#C8860A] hover:border-[#C8860A]/50 transition-all duration-200"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#F5E6C8]/30 text-xs">
            © 2025 Aangan Restaurant, Sargodha. All rights reserved.
          </p>
          <p className="text-[#C8860A]/40 text-xs font-medium tracking-wide">
            Dine-In Only · No Delivery Service Available
          </p>
        </div>

        {/* Management login — visible to staff, subtle to customers */}
        <div
          style={{
            borderTop: "1px solid rgba(245,230,200,0.08)",
            marginTop: "28px",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ManagementLoginLink />
        </div>
      </div>
    </footer>
  );
}

function ManagementLoginLink() {
  return (
    <a
      href="/admin/login"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        border: "1px solid rgba(200,134,10,0.3)",
        borderRadius: "8px",
        color: "rgba(200,134,10,0.6)",
        fontSize: "13px",
        textDecoration: "none",
        transition: "all 0.2s",
        letterSpacing: "0.02em",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(200,134,10,0.7)";
        e.currentTarget.style.color = "#C8860A";
        e.currentTarget.style.backgroundColor = "rgba(200,134,10,0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(200,134,10,0.3)";
        e.currentTarget.style.color = "rgba(200,134,10,0.6)";
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      Management Login
    </a>
  );
}

function FooterNavLink({ href, label }: { href: string; label: string }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-[#F5E6C8]/60 hover:text-[#C8860A] text-sm transition-colors duration-150"
    >
      {label}
    </a>
  );
}
