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
import { getGalleryData } from "@/lib/gallery-store";

/* ─────────────────────────────────────────────────────────────────────────────
   Static data — kept at module level so the server component stays clean
───────────────────────────────────────────────────────────────────────────── */
const FOOD_CARDS = [
  {
    name: "Charcoal Grill",
    url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
  },
  {
    name: "Biryani",
    url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
  },
  {
    name: "Chicken Karahi",
    url: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80",
  },
  {
    name: "Rooftop View",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
  },
  {
    name: "Naan & Dips",
    url: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=80",
  },
  {
    name: "Dessert",
    url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80",
  },
];

const WHY_CARDS = [
  {
    icon: "🌆",
    title: "Rooftop Views",
    desc: "Dine with a panoramic view of Sargodha city",
  },
  {
    icon: "🍽️",
    title: "Authentic Flavors",
    desc: "Traditional Pakistani cuisine crafted with love",
  },
  {
    icon: "✨",
    title: "Premium Ambiance",
    desc: "A luxurious setting for every occasion",
  },
];

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
          {/* Background photo */}
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
            alt="Elegant rooftop restaurant dining"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Gradient overlay — dark at bottom fading to semi-dark at top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />

          {/* Hero content */}
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-heroFadeIn">
            <p
              className="mb-4 text-lg sm:text-xl tracking-widest uppercase"
              style={{
                fontFamily: "var(--font-dancing)",
                color: "#D97706",
              }}
            >
              Xin Mall · Sargodha
            </p>

            <h1
              className="text-white font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Dine Above
              <br />
              <span style={{ color: "#D97706" }}>the City</span>
            </h1>

            <p className="text-white/75 text-base sm:text-lg lg:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Rooftop fine dining at Xin Mall, Sargodha.
              <br className="hidden sm:block" />
              Charcoal grills, signature steaks &amp; Pakistani classics.
            </p>

            <Link
              href="/menu"
              className="inline-block font-bold text-white px-9 py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-xl"
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

        {/* ── 2. FOOD SHOWCASE ─────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28" style={{ background: "#F9F4ED" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center mb-14">
              <p
                className="text-lg mb-2"
                style={{
                  fontFamily: "var(--font-dancing)",
                  color: "#D97706",
                }}
              >
                From Our Kitchen
              </p>
              <h2
                className="font-bold text-3xl sm:text-4xl lg:text-5xl"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "#1C1710",
                }}
              >
                A Taste of Aangan
              </h2>
              <div
                className="mt-4 mx-auto w-16 h-0.5 rounded-full"
                style={{ background: "#D97706" }}
              />
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FOOD_CARDS.map((card) => (
                <div
                  key={card.name}
                  className="group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                >
                  <div className="relative h-64">
                    <Image
                      src={card.url}
                      alt={card.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    {/* Dish label */}
                    <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
                      <p className="text-white font-semibold text-base tracking-wide">
                        {card.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA below cards */}
            <div className="text-center mt-12">
              <Link
                href="/menu"
                className="inline-block font-semibold px-8 py-3 rounded-full border-2 text-sm sm:text-base transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: "#D97706",
                  color: "#D97706",
                  background: "transparent",
                }}
              >
                See Full Menu
              </Link>
            </div>
          </div>
        </section>

        {/* ── 3. WHY AANGAN ───────────────────────────────────────────────── */}
        <section className="py-20 lg:py-28" style={{ background: "#1a1a1a" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center mb-14">
              <p
                className="text-lg mb-2"
                style={{
                  fontFamily: "var(--font-dancing)",
                  color: "#D97706",
                }}
              >
                The Experience
              </p>
              <h2
                className="text-white font-bold text-3xl sm:text-4xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Why Aangan?
              </h2>
              <div
                className="mt-4 mx-auto w-16 h-0.5 rounded-full"
                style={{ background: "#D97706" }}
              />
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {WHY_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl p-8 text-center transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: "#252525",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="text-5xl mb-5">{card.icon}</div>
                  <h3
                    className="text-white font-bold text-xl mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#9ca3af" }}
                  >
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
