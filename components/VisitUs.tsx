"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import { RESTAURANT } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

export default function VisitUs() {
  return (
    <section id="visit" className="bg-[#F9F4ED] py-20 lg:py-28">
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
            Come Visit
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[#1C1710] text-3xl sm:text-4xl lg:text-5xl font-bold">
            Find Us
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left: contact info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Address */}
            <motion.div
              variants={fadeUp}
              className="flex gap-4 pb-6 border-b border-[#E5D5B0]"
            >
              <div className="w-10 h-10 rounded-full bg-[#F5E6C8] flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={18} className="text-[#C8860A]" />
              </div>
              <div>
                <p className="text-[#1C1710] font-semibold text-sm mb-1">
                  Address
                </p>
                <p className="text-[#2C2210] leading-relaxed">
                  {RESTAURANT.address}
                </p>
                <a
                  href={RESTAURANT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 mt-3 px-5 py-2.5 w-full sm:w-auto bg-[#1C1710] text-[#F5E6C8] text-sm font-medium rounded-full hover:bg-[#C8860A] hover:text-[#1C1710] transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
                >
                  <MapPin size={14} />
                  Get Directions
                </a>
              </div>
            </motion.div>

            {/* Phones */}
            <motion.div
              variants={fadeUp}
              className="flex gap-4 py-6 border-b border-[#E5D5B0]"
            >
              <div className="w-10 h-10 rounded-full bg-[#F5E6C8] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone size={18} className="text-[#C8860A]" />
              </div>
              <div>
                <p className="text-[#1C1710] font-semibold text-sm mb-2">
                  Phone
                </p>
                <div className="flex flex-col gap-1.5">
                  {RESTAURANT.phones.map((phone) => (
                    <a
                      key={phone.number}
                      href={phone.href}
                      className="text-[#2C2210] hover:text-[#C8860A] transition-colors duration-150 font-mono text-sm"
                    >
                      {phone.number}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              variants={fadeUp}
              className="flex gap-4 py-6 border-b border-[#E5D5B0]"
            >
              <div className="w-10 h-10 rounded-full bg-[#F5E6C8] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock size={18} className="text-[#C8860A]" />
              </div>
              <div>
                <p className="text-[#1C1710] font-semibold text-sm mb-1">
                  Hours
                </p>
                <p className="text-[#2C2210]">Open daily</p>
                <p className="text-[#7D4E1A] text-xs mt-1">
                  Check Google Maps for current hours
                </p>
              </div>
            </motion.div>

            {/* Instagram */}
            <motion.div
              variants={fadeUp}
              className="flex gap-4 py-6 border-b border-[#E5D5B0]"
            >
              <div className="w-10 h-10 rounded-full bg-[#F5E6C8] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-[18px] h-[18px] text-[#C8860A]" aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <div>
                <p className="text-[#1C1710] font-semibold text-sm mb-1">
                  Instagram
                </p>
                <a
                  href={RESTAURANT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C8860A] hover:text-[#7D4E1A] transition-colors duration-150 font-medium"
                >
                  {RESTAURANT.instagramHandle}
                </a>
              </div>
            </motion.div>

            {/* No delivery badge */}
            <motion.div variants={fadeUp} className="pt-6">
              <div className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl border-2 border-[#C8860A]/50 bg-[#F5E6C8]/60">
                <span className="text-2xl">🚫</span>
                <div>
                  <p className="text-[#1C1710] font-bold text-sm">
                    No Home Delivery — Dine-In Only
                  </p>
                  <p className="text-[#7D4E1A] text-xs mt-0.5">
                    Experience Aangan in person, on the rooftop
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Google Maps embed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl overflow-hidden border border-[#C8860A]/40 shadow-lg"
          >
            <iframe
              src={RESTAURANT.mapEmbedUrl}
              width="100%"
              style={{
                border: 0,
                display: "block",
                height: "clamp(280px, 40vw, 480px)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Aangan Restaurant Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
