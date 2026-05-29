"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, AlertCircle, ChevronLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Login failed");
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "#1C1710" }}
    >
      {/* Subtle diagonal texture */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #C8860A 0px, #C8860A 1px,
            transparent 1px, transparent 10px
          )`,
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,134,10,0.06) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative w-full max-w-sm"
        style={{
          animation: shake
            ? "shake 0.6s cubic-bezier(0.36,0.07,0.19,0.97)"
            : undefined,
        }}
      >
        {/* Back to website */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[#A0916F] hover:text-[#C8860A] text-sm mb-8 transition-colors duration-200"
        >
          <ChevronLeft size={14} />
          Back to website
        </Link>

        {/* Logo area */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-xl"
            style={{
              border: "1px solid rgba(200,134,10,0.4)",
              boxShadow: "0 0 20px rgba(200,134,10,0.1)",
            }}
          >
            <Lock size={22} className="text-[#C8860A]" />
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#F5E6C8] mb-1">
            Aangan Admin
          </h1>
          <p className="text-[#A0916F] text-sm">Restaurant management portal</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 border"
          style={{
            background: "#2C2210",
            borderColor: "rgba(200,134,10,0.3)",
            boxShadow: "0 0 40px rgba(200,134,10,0.08)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#C8860A]/80 mb-1.5 uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A3E]"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                  required
                  className="w-full pl-9 pr-4 py-3 rounded-xl border text-sm placeholder:text-[#6B5A3E] focus:outline-none transition-all min-h-[44px]"
                  style={{
                    background: "#1C1710",
                    borderColor: "rgba(200,134,10,0.2)",
                    color: "#F5E6C8",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(200,134,10,0.7)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(200,134,10,0.2)")
                  }
                  placeholder="admin@aangan.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#C8860A]/80 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5A3E]"
                />
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                  required
                  className="w-full pl-9 pr-10 py-3 rounded-xl border text-sm placeholder:text-[#6B5A3E] focus:outline-none transition-all min-h-[44px]"
                  style={{
                    background: "#1C1710",
                    borderColor: "rgba(200,134,10,0.2)",
                    color: "#F5E6C8",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(200,134,10,0.7)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(200,134,10,0.2)")
                  }
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5A3E] hover:text-[#C8860A] transition-colors"
                  tabIndex={-1}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  borderColor: "rgba(239,68,68,0.3)",
                  color: "#f87171",
                }}
              >
                <AlertCircle size={13} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold text-sm rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed min-h-[52px]"
              style={{
                background: "#C8860A",
                color: "#1C1710",
                boxShadow: loading ? "none" : "0 0 24px rgba(200,134,10,0.35)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="w-4 h-4 border-2 rounded-full animate-spin"
                    style={{
                      borderColor: "rgba(28,23,16,0.3)",
                      borderTopColor: "#1C1710",
                    }}
                  />
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#6B5A3E] text-xs mt-6">
          Aangan Restaurant &middot; Internal Use Only
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 50%, 90% { transform: translateX(-8px); }
          30%, 70% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}
