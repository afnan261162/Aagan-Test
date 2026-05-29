"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { RESTAURANT } from "@/lib/data";
import type { GalleryImage } from "@/lib/gallery-data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

const ASPECTS = [
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[4/3]",
];

function GallerySlot({
  item,
  index,
  aspect,
}: {
  item: GalleryImage;
  index: number;
  aspect: string;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="break-inside-avoid"
    >
      <div
        className={`w-full ${aspect} rounded-2xl overflow-hidden relative group`}
        style={
          item.url
            ? undefined
            : { background: "linear-gradient(135deg, #2C2210 0%, #7D4E1A 100%)" }
        }
      >
        {item.url ? (
          /* Real photo */
          <>
            <Image
              src={item.url}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              alt={item.alt}
              className="group-hover:scale-105 transition-transform duration-500"
            />
            {/* Subtle label overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1710]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-[#F5E6C8] text-xs font-medium uppercase tracking-widest">
                {item.label}
              </span>
            </div>
          </>
        ) : (
          /* Gradient placeholder — identical to original design */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center p-6">
            <Camera
              size={32}
              className="text-[#C8860A]/50 group-hover:text-[#C8860A] transition-colors duration-300"
            />
            <p className="text-[#F5E6C8]/50 text-xs font-medium uppercase tracking-widest group-hover:text-[#F5E6C8]/70 transition-colors duration-300">
              {item.label}
            </p>
            <p className="text-[#C8860A]/40 text-xs">📷 Photo coming soon</p>
          </div>
        )}

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-[#C8860A]/0 group-hover:bg-[#C8860A]/5 transition-all duration-300" />
      </div>
    </motion.div>
  );
}

export default function Gallery({
  images,
}: {
  images?: GalleryImage[];
}) {
  // Use passed-in images or fall back to all-null placeholders for SSR
  const slots: GalleryImage[] = images ?? [
    { id: "g1", slot: "rooftop-ambiance",  label: "Rooftop Ambiance",   url: null, alt: "Rooftop ambiance at Aangan Restaurant" },
    { id: "g2", slot: "city-view",         label: "City View at Night", url: null, alt: "City view from Aangan rooftop at night" },
    { id: "g3", slot: "table-setting",     label: "Table Setting",      url: null, alt: "Elegant table setting at Aangan" },
    { id: "g4", slot: "charcoal-grill",    label: "Charcoal Grill",     url: null, alt: "Live charcoal grill at Aangan" },
    { id: "g5", slot: "signature-dishes",  label: "Signature Dishes",   url: null, alt: "Signature dishes at Aangan Restaurant" },
    { id: "g6", slot: "bbq-platter",       label: "BBQ Platter",        url: null, alt: "BBQ platter at Aangan Restaurant" },
  ];

  return (
    <section id="gallery" className="bg-[#F9F4ED] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-[family-name:var(--font-dancing)] text-[#C8860A] text-lg mb-2">
            A Glimpse Inside
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[#1C1710] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            The Aangan Experience
          </h2>
          <p className="text-[#7D4E1A] text-base">
            City lights. Rooftop air. Unforgettable flavors.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {slots.map((item, i) => (
            <GallerySlot
              key={item.id}
              item={item}
              index={i}
              aspect={ASPECTS[i] ?? "aspect-[4/3]"}
            />
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <p className="text-[#2C2210]/70 text-sm mb-4">
            Follow our journey for the latest moments
          </p>
          <a
            href={RESTAURANT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#1C1710] text-[#F5E6C8] rounded-full font-medium text-sm hover:bg-[#C8860A] hover:text-[#1C1710] transition-all duration-200 hover:scale-[1.02]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            {RESTAURANT.instagramHandle}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
