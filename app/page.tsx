export const dynamic = "force-dynamic";
export const revalidate = 0;

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import MenuHighlights from "@/components/MenuHighlights";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import VisitUs from "@/components/VisitUs";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import MenuBanner from "@/components/MenuBanner";
import FoodShowcaseSection from "@/components/FoodShowcaseSection";
import WhyAanganSection from "@/components/WhyAanganSection";
import { getGalleryData } from "@/lib/gallery-store";

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */
export default async function Home() {
  const galleryImages = await getGalleryData();

  return (
    <>
      <Navbar />

      <main>
        {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
        >
          {/* Background photo — slow fade in */}
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
            alt="Elegant rooftop restaurant dining"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center animate-fadeIn"
            style={{ animationDuration: "1.2s" }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />

          {/* Hero content — each element animates independently */}
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            <p
              className="mb-4 text-lg sm:text-xl tracking-widest uppercase animate-fadeInDown"
              style={{
                fontFamily: "var(--font-dancing)",
                color: "#D97706",
              }}
            >
              Xin Mall · Sargodha
            </p>

            <h1
              className="text-white font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] mb-6 animate-fadeInDown animate-delay-100"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Dine Above
              <br />
              <span style={{ color: "#D97706" }}>the City</span>
            </h1>

            <p className="text-white/75 text-base sm:text-lg lg:text-xl mb-10 max-w-xl mx-auto leading-relaxed animate-fadeInUp animate-delay-200">
              Rooftop fine dining at Xin Mall, Sargodha.
              <br className="hidden sm:block" />
              Charcoal grills, signature steaks &amp; Pakistani classics.
            </p>

            <Link
              href="/menu"
              className="inline-block font-bold text-white px-9 py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-xl animate-fadeInUp animate-delay-400"
              style={{
                background: "#D97706",
                boxShadow: "0 0 32px rgba(217,119,6,0.45)",
              }}
            >
              View Our Menu →
            </Link>
          </div>

          {/* Scroll-down caret */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-bounce opacity-60">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </section>

        {/* ── 2. FOOD SHOWCASE — animated client component ─────────────────── */}
        <FoodShowcaseSection />

        {/* ── 3. WHY AANGAN — animated client component ───────────────────── */}
        <WhyAanganSection />

        {/* ── 4. EXISTING SECTIONS (kept as-is) ───────────────────────────── */}
        <About />
        <MenuHighlights />
        <Gallery images={galleryImages} />
        <Testimonials />
        <VisitUs />
      </main>

      <Footer />
      <MobileCallButton />
      <MenuBanner />
    </>
  );
}
