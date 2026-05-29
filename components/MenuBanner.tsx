"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const DISMISSED_KEY = "menu_banner_dismissed";

export default function MenuBanner() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Never show on /menu page itself
    if (window.location.pathname === "/menu") return;
    // Never show if already dismissed
    if (localStorage.getItem(DISMISSED_KEY) === "true") return;

    const menuSection = document.getElementById("menu");
    if (!menuSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show once user has scrolled PAST the menu section (section top above viewport)
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setVisible(true);
        }
      },
      { threshold: 0 }
    );

    observer.observe(menuSection);
    return () => observer.disconnect();
  }, []);

  function dismiss(e: React.MouseEvent) {
    e.stopPropagation();
    setVisible(false);
    localStorage.setItem(DISMISSED_KEY, "true");
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" as const }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          style={{ height: "60px" }}
        >
          <div
            role="button"
            tabIndex={0}
            onClick={() => router.push("/menu")}
            onKeyDown={(e) => e.key === "Enter" && router.push("/menu")}
            className="relative flex items-center justify-center w-full h-full cursor-pointer select-none"
            style={{
              background: "#C8860A",
              boxShadow: "0 -4px 20px rgba(200,134,10,0.35)",
            }}
          >
            <span className="text-white font-bold text-base tracking-wide">
              📋 See Full Menu &amp; Prices
            </span>

            <button
              onClick={dismiss}
              aria-label="Dismiss banner"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
