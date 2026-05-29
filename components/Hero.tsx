"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" as const, delay },
  }),
};

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #1C1710 0%, #2C2210 45%, #7D4E1A 100%)",
      }}
    >
      {/* Warm atmosphere overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(200,134,10,0.12) 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(125,78,26,0.18) 0%, transparent 55%)",
        }}
      />

      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #C8860A 0px, #C8860A 1px, transparent 1px, transparent 10px)",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1C1710]/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Label */}
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-[family-name:var(--font-dancing)] text-[#C8860A] text-xl sm:text-2xl mb-4 tracking-wide"
        >
          Sargodha&apos;s Finest Rooftop
        </motion.p>

        {/* H1 */}
        <motion.h1
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-[family-name:var(--font-playfair)] text-[#F5E6C8] font-bold leading-tight mb-6"
          style={{ fontSize: "clamp(32px, 6vw, 72px)" }}
        >
          Where Every Meal
          <br />
          <span className="text-[#C8860A]">Touches the Sky</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          custom={0.4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-[#F5E6C8]/75 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Dine above the city at Aangan — an experience of flavor, ambiance,
          and stunning rooftop views at Xin Mall, Sargodha.
        </motion.p>

        {/* Buttons */}
        <motion.div
          custom={0.6}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("#visit")}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#C8860A] text-[#1C1710] font-semibold rounded-full hover:bg-[#F5E6C8] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#C8860A]/30 text-sm sm:text-base min-h-[44px]"
          >
            Reserve a Table
          </button>
          <button
            onClick={() => scrollTo("#menu")}
            className="w-full sm:w-auto px-8 py-3.5 border border-[#F5E6C8]/50 text-[#F5E6C8] font-semibold rounded-full hover:border-[#C8860A] hover:text-[#C8860A] transition-all duration-200 hover:scale-[1.02] text-sm sm:text-base min-h-[44px]"
          >
            Explore Menu
          </button>
        </motion.div>

        {/* Dine-in badge */}
        <motion.div
          custom={0.8}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C8860A]/40 bg-[#C8860A]/10 text-[#C8860A] text-xs font-medium tracking-wider uppercase">
            <span>🍽️</span> Rooftop Dine-In Experience · No Home Delivery
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-bounce">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[#F5E6C8]/40 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <ChevronDown className="text-[#C8860A]/60" size={20} />
        </div>
      </div>
    </section>
  );
}
