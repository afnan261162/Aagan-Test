"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Clock, Flame, UtensilsCrossed } from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  MENU_CATEGORIES,
  TAG_STYLES,
  type MenuTag,
  type MenuItem,
} from "@/lib/menu-data";

// ── Category navigation ───────────────────────────────────────────────────────

function CategoryNav({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const pill = nav.querySelector(`[data-cat="${active}"]`) as HTMLElement | null;
    if (pill) {
      const offset =
        pill.getBoundingClientRect().left -
        nav.getBoundingClientRect().left -
        nav.clientWidth / 2 +
        pill.clientWidth / 2;
      nav.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, [active]);

  return (
    <div
      ref={navRef}
      className="flex gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-1"
      style={{ scrollbarWidth: "none" }}
    >
      {MENU_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          data-cat={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border min-h-[44px] ${
            active === cat.id
              ? "bg-[#C8860A] text-[#1C1710] border-[#C8860A] shadow-lg shadow-[#C8860A]/20"
              : "bg-[#1C1710] border-[#C8860A]/20 text-[#A0916F] hover:text-[#F5E6C8] hover:border-[#C8860A]/40"
          }`}
        >
          <span className="text-base leading-none">{cat.icon}</span>
          <span className="whitespace-nowrap">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

// ── Tag chip ──────────────────────────────────────────────────────────────────

function TagChip({ tag }: { tag: MenuTag }) {
  const s = TAG_STYLES[tag];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border"
      style={{ background: s.bg, color: s.text, borderColor: s.border }}
    >
      {s.label}
    </span>
  );
}

// ── Menu item card ────────────────────────────────────────────────────────────

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div className="group bg-[#2C2210] hover:bg-[#332815] border border-[#C8860A]/10 hover:border-[#C8860A]/30 rounded-xl overflow-hidden transition-all duration-200 flex flex-col">
      {/* Image / placeholder */}
      <div className="relative h-[160px] sm:h-[180px] w-full flex-shrink-0">
        {item.image ? (
          <Image
            src={item.image}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            alt={item.name}
            unoptimized
            className="group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #2C2210 0%, #3D2E15 50%, #4A3520 100%)",
            }}
          >
            <UtensilsCrossed
              size={32}
              className="text-[#C8860A]/25 group-hover:text-[#C8860A]/40 transition-colors duration-300"
            />
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[#F5E6C8] font-semibold text-sm leading-snug line-clamp-2 group-hover:text-white transition-colors">
            {item.name}
          </h3>
          <span className="flex-shrink-0 text-[#C8860A] font-bold text-base leading-none pt-0.5">
            Rs {item.price.toLocaleString()}
          </span>
        </div>

        <p className="text-[#A0916F] text-xs leading-relaxed line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex flex-wrap gap-1">
            {item.tags.map((t) => (
              <TagChip key={t} tag={t} />
            ))}
          </div>
          <span className="flex items-center gap-1 text-[#6B5A3E] text-[10px] flex-shrink-0">
            <Clock size={10} />
            {item.prepTime} min
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Category section ──────────────────────────────────────────────────────────

function CategorySection({
  categoryId,
  allItems,
  sectionRef,
}: {
  categoryId: string;
  allItems: MenuItem[];
  sectionRef: (el: HTMLElement | null) => void;
}) {
  const cat = MENU_CATEGORIES.find((c) => c.id === categoryId)!;
  const items = allItems.filter((i) => i.category === categoryId && i.available);
  if (items.length === 0) return null;

  return (
    <section id={`section-${categoryId}`} ref={sectionRef} className="scroll-mt-32">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl leading-none">{cat.icon}</span>
        <div>
          <h2 className="text-[#F5E6C8] font-[family-name:var(--font-playfair)] text-2xl font-semibold">
            {cat.label}
          </h2>
          <p className="text-[#A0916F] text-xs mt-0.5">{cat.description}</p>
        </div>
        <div className="ml-auto h-px flex-1 bg-gradient-to-r from-[#C8860A]/30 to-transparent max-w-[140px]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

// ── Main client component ─────────────────────────────────────────────────────

export default function MenuClient({ items }: { items: MenuItem[] }) {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.id.replace("section-", "");
          setActiveCategory(id);
        }
      },
      { rootMargin: "-130px 0px -60% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const registerRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) sectionRefs.current.set(id, el);
      else sectionRefs.current.delete(id);
    },
    []
  );

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#1C1710]">
      <Navbar />

      {/* Compact hero */}
      <div className="relative pt-24 pb-10 text-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, #C8860A30, transparent)",
          }}
        />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[#A0916F] hover:text-[#C8860A] text-sm mb-5 transition-colors"
        >
          <ChevronLeft size={14} />
          Back to Home
        </Link>
        <div className="relative">
          <span className="inline-flex items-center gap-2 text-[#C8860A] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <Flame size={12} />
            Our Full Menu
          </span>
          <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(28px,6vw,48px)] font-bold text-[#F5E6C8] mb-3 px-4">
            What We Serve
          </h1>
          <p className="text-[#A0916F] text-sm max-w-lg mx-auto px-4">
            Rooftop dining at Xin Mall, Sargodha &mdash; dine-in only.
            Freshly prepared to order.
          </p>
        </div>
      </div>

      {/* Sticky category nav */}
      <div className="sticky top-16 z-30 bg-[#1C1710]/96 backdrop-blur-md border-b border-[#C8860A]/12 py-3">
        <div className="max-w-6xl mx-auto">
          <CategoryNav active={activeCategory} onSelect={scrollToCategory} />
        </div>
      </div>

      {/* Menu sections */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {MENU_CATEGORIES.map((cat) => (
          <CategorySection
            key={cat.id}
            categoryId={cat.id}
            allItems={items}
            sectionRef={registerRef(cat.id)}
          />
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#C8860A]/12 py-10 text-center">
        <p className="text-[#A0916F] text-xs mb-1">
          All prices in Pakistani Rupees (Rs) — inclusive of applicable charges.
        </p>
        <p className="text-[#6B5A3E] text-xs">
          Dine-In Only &middot; No Home Delivery &middot; Aangan Restaurant, Xin Mall, Sargodha
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[#C8860A] text-sm mt-5 hover:text-[#F5E6C8] transition-colors"
        >
          <ChevronLeft size={13} />
          Back to Home
        </Link>
      </footer>
    </div>
  );
}
