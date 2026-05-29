"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * Invisible component mounted in the root layout.
 * Listens for the A → A → G key sequence anywhere on the page
 * (ignoring inputs/textareas) and navigates to /admin/login.
 * Buffer resets after 2 s of inactivity.
 */
export default function GlobalListeners() {
  const router = useRouter();
  const keysRef = useRef<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const SEQUENCE = ["a", "a", "g"];

    function handleKey(e: KeyboardEvent) {
      // Ignore when user is typing inside a form element
      const tag = (e.target as HTMLElement)?.tagName?.toUpperCase();
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      keysRef.current.push(e.key.toLowerCase());
      // Keep only the last N keys (N = sequence length)
      if (keysRef.current.length > SEQUENCE.length) {
        keysRef.current.shift();
      }

      // Reset inactivity timer
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        keysRef.current = [];
      }, 2000);

      // Check if sequence matches
      if (keysRef.current.join("") === SEQUENCE.join("")) {
        keysRef.current = [];
        router.push("/admin/login");
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [router]);

  return null;
}
