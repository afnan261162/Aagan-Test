"use client";

import { motion } from "framer-motion";
import { RESTAURANT } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
};

const stats = [
  {
    icon: "⭐",
    value: `${RESTAURANT.rating}/5`,
    label: "Google Rating",
    sub: `from ${RESTAURANT.reviewCount}+ reviews`,
  },
  {
    icon: "👥",
    value: `${RESTAURANT.reviewCount}+`,
    label: "Happy Diners Reviewed",
    sub: "and counting",
  },
  {
    icon: "🍽️",
    value: `Rs ${RESTAURANT.priceRange.min.toLocaleString()}–${RESTAURANT.priceRange.max.toLocaleString()}`,
    label: "Per Person",
    sub: "inclusive experience",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-[#F9F4ED] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
        >
          {/* Left: story */}
          <motion.div variants={fadeUp}>
            <p className="font-[family-name:var(--font-dancing)] text-[#C8860A] text-lg mb-3">
              Our Story
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-[#1C1710] text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              A Rooftop{" "}
              <span className="text-[#C8860A]">Born in Sargodha</span>
            </h2>

            {/* Large decorative quote */}
            <div className="relative pl-6 border-l-2 border-[#C8860A]/40">
              <span
                className="absolute -top-4 -left-3 font-[family-name:var(--font-playfair)] text-6xl text-[#C8860A]/25 select-none leading-none"
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="text-[#2C2210] text-lg leading-relaxed font-light">
                Born on the rooftop of Xin Mall, Aangan brings together the
                finest Pakistani BBQ, charcoal grills, and international flavors
                in an atmosphere unlike any other in Sargodha. A place to
                gather, share, and savor.
              </p>
              <span
                className="font-[family-name:var(--font-playfair)] text-5xl text-[#C8860A]/25 select-none leading-none float-right"
                aria-hidden
              >
                &rdquo;
              </span>
            </div>

            {/* Dine-in badge */}
            <div className="mt-10">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-[#C8860A]/50 bg-[#F5E6C8]/60">
                <span className="text-xl">🚫</span>
                <div>
                  <p className="text-[#1C1710] font-semibold text-sm">
                    Dine-In Only · No Home Delivery
                  </p>
                  <p className="text-[#7D4E1A] text-xs mt-0.5">
                    We&apos;re crafted for the in-person experience
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: stats grid */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="flex items-center gap-5 p-5 bg-white rounded-xl border border-[#E5D5B0] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-full bg-[#F5E6C8] text-2xl">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-playfair)] text-[#1C1710] text-2xl font-bold leading-tight">
                      {stat.value}
                    </p>
                    <p className="text-[#2C2210] font-semibold text-sm">
                      {stat.label}
                    </p>
                    <p className="text-[#7D4E1A] text-xs mt-0.5">{stat.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Small visual note */}
            <p className="text-[#7D4E1A]/70 text-sm text-center">
              Rated{" "}
              <strong className="text-[#C8860A]">
                {RESTAURANT.rating} ★ on Google
              </strong>{" "}
              by {RESTAURANT.reviewCount}+ diners
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
