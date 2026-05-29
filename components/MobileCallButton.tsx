"use client";

import { useState } from "react";
import { Phone, X } from "lucide-react";
import { RESTAURANT } from "@/lib/data";

export default function MobileCallButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-4 z-50 md:hidden flex flex-col items-end gap-2">
      {/* Expanded phone options */}
      {expanded && (
        <div className="flex flex-col gap-2 items-end mb-1">
          {RESTAURANT.phones.map((phone) => (
            <a
              key={phone.number}
              href={phone.href}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-[#1C1710] border border-[#C8860A]/40 rounded-full shadow-lg text-[#F5E6C8] text-sm font-mono hover:bg-[#C8860A] hover:text-[#1C1710] hover:border-[#C8860A] transition-all duration-200"
              onClick={() => setExpanded(false)}
            >
              <Phone size={14} />
              {phone.number}
            </a>
          ))}
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-14 h-14 rounded-full bg-[#C8860A] shadow-xl shadow-[#C8860A]/40 flex items-center justify-center text-[#1C1710] hover:bg-[#F5E6C8] active:scale-95 transition-all duration-200"
        aria-label="Call Aangan Restaurant"
      >
        {expanded ? <X size={22} /> : <Phone size={22} />}
      </button>
    </div>
  );
}
