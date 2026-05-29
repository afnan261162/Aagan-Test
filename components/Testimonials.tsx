"use client";

import { motion } from "framer-motion";
import { REVIEWS, RESTAURANT } from "@/lib/data";

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < count ? "text-[#C8860A]" : "text-[#C8860A]/20"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <div className="flex-shrink-0 w-72 sm:w-80 bg-[#1C1710]/60 border border-[#C8860A]/15 rounded-2xl p-6 mx-3 hover:border-[#C8860A]/40 transition-all duration-200">
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#C8860A]/20 border border-[#C8860A]/40 flex items-center justify-center text-[#C8860A] font-bold text-xs flex-shrink-0">
            {review.initials}
          </div>
          <div>
            <p className="text-[#F5E6C8] font-semibold text-sm leading-tight">
              {review.name}
            </p>
            <StarRow count={review.rating} />
          </div>
        </div>
        {/* Google badge */}
        <div className="flex items-center gap-1 opacity-40">
          <svg viewBox="0 0 24 24" className="w-4 h-4" aria-label="Google">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-[#F5E6C8]/40 text-[10px] font-medium">
            Google
          </span>
        </div>
      </div>

      {/* Review text */}
      <p className="text-[#F5E6C8]/70 text-sm leading-relaxed line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>
    </div>
  );
}

export default function Testimonials() {
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" className="bg-[#2C2210] py-20 lg:py-28 overflow-hidden">
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
            Guest Voices
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-[#F5E6C8] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            What Our Guests Say
          </h2>
          <p className="text-[#F5E6C8]/50 text-base max-w-lg mx-auto">
            {RESTAURANT.rating} stars across {RESTAURANT.reviewCount} Google
            reviews — hear it from those who&apos;ve dined with us
          </p>
        </motion.div>
      </div>

      {/* Carousel — full width overflow */}
      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#2C2210] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#2C2210] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="flex carousel-track">
            {doubled.map((review, idx) => (
              <ReviewCard key={`${review.id}-${idx}`} review={review} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center text-[#F5E6C8]/30 text-xs mt-10 px-4"
      >
        Based on {RESTAURANT.reviewCount}+ verified Google reviews
      </motion.p>
    </section>
  );
}
