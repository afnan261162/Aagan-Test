"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  LogOut,
  Menu,
  X,
  ChefHat,
  ExternalLink,
} from "lucide-react";

const NAV = [
  { href: "/admin",         label: "Menu",    icon: LayoutDashboard },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex flex-col h-full w-64 bg-[#1C1710] border-r border-[#C8860A]/15">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-[#C8860A]/15">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#C8860A] flex items-center justify-center">
            <ChefHat size={15} className="text-[#1C1710]" />
          </div>
          <div>
            <div className="font-[family-name:var(--font-playfair)] text-[#F5E6C8] text-base font-bold leading-none">
              Aangan
            </div>
            <div className="text-[#A0916F] text-[10px] mt-0.5">Admin Panel</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-[#A0916F] hover:text-[#F5E6C8] lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-[#C8860A]/15 text-[#C8860A] border border-[#C8860A]/25"
                  : "text-[#A0916F] hover:text-[#F5E6C8] hover:bg-[#2C2210]"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-[#C8860A]/15 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#A0916F] hover:text-[#F5E6C8] hover:bg-[#2C2210] transition-all"
        >
          <ExternalLink size={15} />
          View Website
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Login page renders without the admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9F4ED]">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full z-10">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center gap-3 px-4 h-14 border-b border-[#E8DDD0] bg-white shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#7D4E1A] p-1"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <span className="font-[family-name:var(--font-playfair)] text-[#1C1710] font-bold">
            Aangan Admin
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
