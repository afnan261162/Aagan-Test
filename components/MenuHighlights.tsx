"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MENU_ITEMS } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

export default function MenuHighlights() {
  return (
    <section id="menu" className="bg-[#1C1710] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-[family-name:var(--font-dancing)] text-[#C8860A] text-lg mb-2">
            What We Serve
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[#F5E6C8] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Our Signature Flavours
          </h2>
          <p className="text-[#F5E6C8]/60 max-w-xl mx-auto text-base">
            A curated journey through Pakistani BBQ, charcoal grills, and
            international delights
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {MENU_ITEMS.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="group relative bg-[#2C2210] rounded-2xl p-6 border border-[#C8860A]/10 hover:border-[#C8860A]/50 transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden"
            >
              {/* Gold bottom border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8860A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="text-4xl mb-4">{item.icon}</div>

              {/* Title */}
              <h3 className="font-[family-name:var(--font-playfair)] text-[#F5E6C8] text-xl font-semibold mb-3 group-hover:text-[#C8860A] transition-colors duration-200">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[#F5E6C8]/60 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Unmissable CTA ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 flex flex-col items-center gap-5"
        >
          <p className="text-[#F5E6C8]/40 text-sm">
            Prices from{" "}
            <span className="text-[#C8860A]/70">Rs 350 per person</span>
            {" "}— dine-in only at Xin Mall, Sargodha.
          </p>

          {/* Pulsing cascade chevrons */}
          <div className="flex flex-col items-center -space-y-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, 8, 0], opacity: [0.25, 1, 0.25] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: "easeInOut" as const,
                }}
              >
                <ChevronDown size={26} className="text-[#C8860A]" />
              </motion.div>
            ))}
          </div>

          {/* Big gold button */}
          <Link href="/menu" className="block w-full max-w-sm sm:max-w-md">
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const,
              }}
            >
              <span
                className="flex items-center justify-center gap-3 w-full rounded-2xl text-white font-bold"
                style={{
                  height: "72px",
                  fontSize: "clamp(16px, 4vw, 20px)",
                  background: "#C8860A",
                  boxShadow:
                    "0 0 32px rgba(200,134,10,0.55), 0 0 64px rgba(200,134,10,0.25)",
                }}
              >
                👆 TAP HERE — SEE FULL MENU
              </span>
            </motion.div>
          </Link>

          <p className="text-[#F5E6C8]/30 text-xs">
            You can also tap &ldquo;Menu&rdquo; in the top navigation bar
          </p>
        </motion.div>
      </div>
    </section>
  );
}
