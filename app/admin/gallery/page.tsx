"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Camera, Upload, Trash2, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import type { GalleryImage } from "@/lib/gallery-data";

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const showToast = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const loadImages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      setImages(await res.json());
    } catch {
      showToast("Failed to load gallery", "err");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { loadImages(); }, [loadImages]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1C1710]">
          Gallery Photos
        </h1>
        <p className="text-[#A0916F] text-sm mt-0.5">
          Upload restaurant photos — they go live on the website immediately.
        </p>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#F0E9E0] rounded-2xl h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((img) => (
            <GalleryCard
              key={img.id}
              image={img}
              onUpdate={loadImages}
              showToast={showToast}
            />
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium border ${
            toast.type === "ok"
              ? "bg-white text-emerald-700 border-emerald-200"
              : "bg-white text-red-600 border-red-200"
          }`}
        >
          {toast.type === "ok" ? (
            <CheckCircle2 size={15} className="text-emerald-500" />
          ) : (
            <XCircle size={15} className="text-red-500" />
          )}
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ── Per-slot card ─────────────────────────────────────────────────────────────

function GalleryCard({
  image,
  onUpdate,
  showToast,
}: {
  image: GalleryImage;
  onUpdate: () => void;
  showToast: (msg: string, type?: "ok" | "err") => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Add cache-bust so browser reloads after re-upload
  const displayUrl = image.url ? `${image.url}?t=${Date.now()}` : null;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append("slot", image.slot);
    form.append("file", file);

    try {
      const res = await fetch("/api/admin/gallery/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      await onUpdate();
      showToast("Photo uploaded! It's now live on the website.");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Upload failed", "err");
    } finally {
      setUploading(false);
      // Reset input so same file can be re-selected
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleRemove() {
    if (!confirm(`Remove the photo for "${image.label}"?`)) return;
    setRemoving(true);
    try {
      await fetch("/api/admin/gallery/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot: image.slot }),
      });
      await onUpdate();
      showToast("Photo removed. Placeholder is showing again.");
    } catch {
      showToast("Failed to remove photo", "err");
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E8DDD0] overflow-hidden shadow-sm flex flex-col">
      {/* Preview area */}
      <div className="relative h-40 w-full flex-shrink-0">
        {displayUrl ? (
          <Image
            src={displayUrl}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
            alt={image.alt}
            unoptimized
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #2C2210 0%, #7D4E1A 100%)" }}
          >
            <Camera size={28} className="text-[#C8860A]/60" />
            <span className="text-[#F5E6C8]/50 text-xs uppercase tracking-widest">
              No photo yet
            </span>
          </div>
        )}

        {/* Uploading overlay */}
        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 size={24} className="text-[#C8860A] animate-spin" />
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <p className="text-[#1C1710] font-semibold text-sm">{image.label}</p>

        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFile}
        />

        {/* Upload button */}
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-[#C8860A] text-[#C8860A] text-sm font-semibold hover:bg-[#C8860A] hover:text-[#1C1710] transition-all duration-200 disabled:opacity-60 min-h-[44px]"
        >
          {uploading ? (
            <><Loader2 size={14} className="animate-spin" /> Uploading…</>
          ) : (
            <><Upload size={14} /> {image.url ? "Replace Photo" : "📷 Upload Photo"}</>
          )}
        </button>

        {/* Remove button — only shown when image exists */}
        {image.url && (
          <button
            onClick={handleRemove}
            disabled={removing}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50 transition-colors disabled:opacity-60 min-h-[36px]"
          >
            {removing ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <><Trash2 size={12} /> Remove Photo</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
