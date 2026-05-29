"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Plus, Pencil, Trash2, X, Search,
  CheckCircle2, XCircle, ChevronDown,
  Download, Upload, UtensilsCrossed, Loader2,
} from "lucide-react";
import {
  MENU_CATEGORIES, TAG_STYLES,
  type MenuItem, type MenuTag,
} from "@/lib/menu-data";

function generateId() {
  return `item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const ALL_TAGS: MenuTag[] = [
  "bestseller", "spicy", "vegetarian", "new", "chef's pick", "must try",
];

const BLANK_ITEM: Omit<MenuItem, "id"> = {
  name: "", category: MENU_CATEGORIES[0].id, description: "",
  price: 0, tags: [], featured: false, available: true, prepTime: 15, image: null,
};

// ── Image upload section inside modal ─────────────────────────────────────────

function ImageUpload({
  currentUrl,
  onPendingFile,
  onRemove,
}: {
  currentUrl: string | null;
  onPendingFile: (f: File | null) => void;
  onRemove: () => void;
}) {
  const [preview, setPreview] = useState<string | null>(currentUrl);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    onPendingFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleRemove() {
    setPreview(null);
    onPendingFile(null);
    onRemove();
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-[#7D4E1A] mb-2 uppercase tracking-wide">
        Food Photo
      </label>

      {/* Preview box */}
      <div
        className="relative w-full h-[160px] rounded-xl overflow-hidden border border-[#E8DDD0] mb-2 cursor-pointer"
        onClick={() => fileRef.current?.click()}
        style={
          preview
            ? undefined
            : { background: "linear-gradient(135deg, #2C2210 0%, #4A3520 100%)" }
        }
      >
        {preview ? (
          <Image src={preview} fill style={{ objectFit: "cover" }} alt="Preview" unoptimized />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <UtensilsCrossed size={28} className="text-[#C8860A]/40" />
            <span className="text-[#F5E6C8]/30 text-xs">Click to upload a photo</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
          <Upload size={20} className="text-white opacity-0 hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFile}
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[#C8860A]/40 text-[#C8860A] text-xs font-medium hover:bg-[#C8860A]/10 transition-colors min-h-[44px]"
        >
          <Upload size={12} />
          {preview ? "Replace Photo" : "📷 Upload Food Photo"}
        </button>
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="px-3 py-2 rounded-xl border border-red-200 text-red-500 text-xs hover:bg-red-50 transition-colors min-h-[44px]"
            title="Remove photo"
          >
            <Trash2 size={12} />
          </button>
        )}
      </div>
      <p className="text-[#C4B49A] text-[10px] mt-1.5">
        Recommended: clear photo, good lighting. Max 8 MB (JPEG/PNG/WebP).
      </p>
    </div>
  );
}

// ── Add / Edit modal ──────────────────────────────────────────────────────────

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onSave: (item: MenuItem) => Promise<void>;
}

function ItemModal({ item, onClose, onSave }: ItemModalProps) {
  const editing = item !== null;
  const [form, setForm] = useState<Omit<MenuItem, "id">>(
    item ? { ...item } : { ...BLANK_ITEM }
  );
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (form.price <= 0) e.price = "Price must be greater than 0";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;
    setSaving(true);

    const itemId = item?.id ?? generateId();
    let imageUrl = form.image;

    // If user wants to remove the image
    if (removeImage && item?.image) {
      await fetch("/api/admin/menu/remove-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: itemId }),
      });
      imageUrl = null;
    }

    // If user uploaded a new file
    if (pendingFile) {
      const fd = new FormData();
      fd.append("id", itemId);
      fd.append("file", pendingFile);
      const res = await fetch("/api/admin/menu/upload-image", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        imageUrl = data.url;
      }
    }

    await onSave({ id: itemId, ...form, image: imageUrl });
    setSaving(false);
  }

  function toggleTag(tag: MenuTag) {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-[#E8DDD0] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DDD0]">
          <h2 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[#1C1710]">
            {editing ? "Edit Item" : "Add New Item"}
          </h2>
          <button onClick={onClose} className="text-[#A0916F] hover:text-[#1C1710]">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">

          {/* Image upload */}
          <ImageUpload
            currentUrl={form.image ?? null}
            onPendingFile={setPendingFile}
            onRemove={() => { setRemoveImage(true); setForm((f) => ({ ...f, image: null })); }}
          />

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-[#7D4E1A] mb-1 uppercase tracking-wide">
              Dish Name *
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full px-3 py-2.5 rounded-xl border text-sm text-[#1C1710] bg-[#FAF7F3] placeholder:text-[#C4B49A] focus:outline-none focus:ring-2 focus:ring-[#C8860A]/20 min-h-[48px] ${
                errors.name ? "border-red-300" : "border-[#E8DDD0] focus:border-[#C8860A]"
              }`}
              placeholder="e.g. Charcoal Chicken (Full)"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Category + Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#7D4E1A] mb-1 uppercase tracking-wide">
                Category
              </label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full appearance-none px-3 py-2.5 rounded-xl border border-[#E8DDD0] bg-[#FAF7F3] text-sm text-[#1C1710] focus:outline-none focus:border-[#C8860A] min-h-[48px]"
                >
                  {MENU_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                  ))}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0916F] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#7D4E1A] mb-1 uppercase tracking-wide">
                Price (Rs) *
              </label>
              <input
                type="number" min="1"
                value={form.price || ""}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className={`w-full px-3 py-2.5 rounded-xl border text-sm text-[#1C1710] bg-[#FAF7F3] focus:outline-none focus:ring-2 focus:ring-[#C8860A]/20 min-h-[48px] ${
                  errors.price ? "border-red-300" : "border-[#E8DDD0] focus:border-[#C8860A]"
                }`}
                placeholder="0"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[#7D4E1A] mb-1 uppercase tracking-wide">
              Description *
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={`w-full px-3 py-2.5 rounded-xl border text-sm text-[#1C1710] bg-[#FAF7F3] resize-none placeholder:text-[#C4B49A] focus:outline-none focus:ring-2 focus:ring-[#C8860A]/20 ${
                errors.description ? "border-red-300" : "border-[#E8DDD0] focus:border-[#C8860A]"
              }`}
              placeholder="Describe the dish…"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Prep time + status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#7D4E1A] mb-1 uppercase tracking-wide">
                Prep Time (min)
              </label>
              <input
                type="number" min="1"
                value={form.prepTime}
                onChange={(e) => setForm({ ...form, prepTime: Number(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl border border-[#E8DDD0] bg-[#FAF7F3] text-sm text-[#1C1710] focus:outline-none focus:border-[#C8860A] min-h-[48px]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#7D4E1A] mb-1 uppercase tracking-wide">
                Status
              </label>
              <div className="flex gap-2 mt-1">
                {[{ val: true, label: "Available" }, { val: false, label: "Hidden" }].map(({ val, label }) => (
                  <button
                    key={label} type="button"
                    onClick={() => setForm({ ...form, available: val })}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all min-h-[44px] ${
                      form.available === val
                        ? val
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                          : "bg-red-50 border-red-300 text-red-600"
                        : "bg-[#FAF7F3] border-[#E8DDD0] text-[#A0916F]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-[#7D4E1A] mb-2 uppercase tracking-wide">Tags</label>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => {
                const s = TAG_STYLES[tag];
                const active = form.tags.includes(tag);
                return (
                  <button
                    key={tag} type="button"
                    onClick={() => toggleTag(tag)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all min-h-[36px]"
                    style={
                      active
                        ? { background: s.bg, color: s.text, borderColor: s.border }
                        : { background: "#FAF7F3", color: "#A0916F", borderColor: "#E8DDD0" }
                    }
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3 py-1">
            <div
              onClick={() => setForm({ ...form, featured: !form.featured })}
              className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${form.featured ? "bg-[#C8860A]" : "bg-[#E8DDD0]"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.featured ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
            <span className="text-sm text-[#7D4E1A] font-medium">Show on homepage highlights</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-[#E8DDD0]">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-[#E8DDD0] text-[#A0916F] text-sm hover:bg-[#FAF7F3] min-h-[48px]">
            Cancel
          </button>
          <button
            onClick={handleSave} disabled={saving}
            className="flex-1 py-3 rounded-xl bg-[#1C1710] text-[#C8860A] font-semibold text-sm hover:bg-[#2C2210] disabled:opacity-60 flex items-center justify-center gap-2 min-h-[48px]"
          >
            {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : (editing ? "Update Item" : "Add Item")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete confirmation ───────────────────────────────────────────────────────

function DeleteConfirm({ name, onCancel, onConfirm }: { name: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-[#E8DDD0] p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={20} className="text-red-500" />
        </div>
        <h3 className="text-[#1C1710] font-semibold mb-1">Delete Item?</h3>
        <p className="text-[#A0916F] text-sm mb-5">
          <strong className="text-[#1C1710]">{name}</strong> will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl border border-[#E8DDD0] text-[#A0916F] text-sm hover:bg-[#FAF7F3] min-h-[48px]">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 min-h-[48px]">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [editingItem, setEditingItem] = useState<MenuItem | null | "new">(null);
  const [deletingItem, setDeletingItem] = useState<MenuItem | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const showToast = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const loadItems = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/menu");
      setItems(await res.json());
    } catch {
      showToast("Failed to load menu", "err");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { loadItems(); }, [loadItems]);

  const filtered = items.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch = !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    const matchCat = catFilter === "all" || item.category === catFilter;
    return matchSearch && matchCat;
  });

  async function handleSave(item: MenuItem) {
    const isNew = !items.find((i) => i.id === item.id);
    await fetch("/api/admin/menu", {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    await loadItems();
    setEditingItem(null);
    showToast(isNew ? "Item added!" : "Item updated!");
  }

  async function handleDelete(item: MenuItem) {
    await fetch(`/api/admin/menu?id=${item.id}`, { method: "DELETE" });
    await loadItems();
    setDeletingItem(null);
    showToast("Item deleted", "err");
  }

  async function toggleAvailable(item: MenuItem) {
    await fetch("/api/admin/menu", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, available: !item.available }),
    });
    await loadItems();
  }

  function exportCSV() {
    const header = "Name,Category,Price,Available,Tags,Prep Time\n";
    const rows = items.map((i) =>
      `"${i.name}","${i.category}",${i.price},${i.available},"${i.tags.join(";")}",${i.prepTime}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `aangan-menu-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1C1710]">Menu Management</h1>
          <p className="text-[#A0916F] text-sm mt-0.5">{items.length} items across {MENU_CATEGORIES.length} categories</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E8DDD0] bg-white text-[#7D4E1A] text-sm font-medium hover:bg-[#FAF7F3] min-h-[44px]">
            <Download size={14} /> Export CSV
          </button>
          <button onClick={() => setEditingItem("new")} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C1710] text-[#C8860A] text-sm font-semibold hover:bg-[#2C2210] min-h-[44px]">
            <Plus size={14} /> Add Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0916F]" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E8DDD0] bg-white text-sm text-[#1C1710] placeholder:text-[#C4B49A] focus:outline-none focus:border-[#C8860A] min-h-[44px]"
          />
        </div>
        <div className="relative">
          <select
            value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-[#E8DDD0] bg-white text-sm text-[#1C1710] focus:outline-none focus:border-[#C8860A] min-h-[44px]"
          >
            <option value="all">All Categories</option>
            {MENU_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A0916F] pointer-events-none" />
        </div>
      </div>

      {/* Table — desktop */}
      <div className="hidden sm:block bg-white rounded-2xl border border-[#E8DDD0] overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-16 text-[#A0916F] text-sm">Loading…</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8DDD0] bg-[#FAF7F3]">
                {["Photo", "Dish", "Category", "Price", "Status", "Tags", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[#7D4E1A] text-xs font-semibold uppercase tracking-wider first:pl-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E9E0]">
              {filtered.map((item) => {
                const cat = MENU_CATEGORIES.find((c) => c.id === item.category);
                return (
                  <tr key={item.id} className="hover:bg-[#FAF7F3] transition-colors">
                    {/* Thumbnail */}
                    <td className="px-4 pl-5 py-2">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#E8DDD0] flex-shrink-0">
                        {item.image ? (
                          <Image src={item.image} width={48} height={48} style={{ objectFit: "cover" }} alt={item.name} unoptimized />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2C2210, #4A3520)" }}>
                            <UtensilsCrossed size={14} className="text-[#C8860A]/40" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#1C1710] text-sm">{item.name}</div>
                      <div className="text-[#A0916F] text-xs mt-0.5 line-clamp-1 max-w-[220px]">{item.description}</div>
                    </td>
                    <td className="px-4 py-3 text-[#7D4E1A] text-xs">{cat?.icon} {cat?.label}</td>
                    <td className="px-4 py-3 font-semibold text-[#C8860A] text-sm whitespace-nowrap">Rs {item.price.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleAvailable(item)} className="flex items-center gap-1.5 text-xs font-medium" title={item.available ? "Click to hide" : "Click to show"}>
                        {item.available
                          ? <><CheckCircle2 size={13} className="text-emerald-500" /><span className="text-emerald-600">Live</span></>
                          : <><XCircle size={13} className="text-[#C4B49A]" /><span className="text-[#A0916F]">Hidden</span></>}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((t) => {
                          const s = TAG_STYLES[t as MenuTag];
                          return (
                            <span key={t} className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: s.bg, color: s.text }}>
                              {s.label}
                            </span>
                          );
                        })}
                        {item.tags.length > 2 && <span className="text-[#A0916F] text-[10px]">+{item.tags.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => setEditingItem(item)} className="p-2 rounded-lg hover:bg-[#C8860A]/10 text-[#A0916F] hover:text-[#C8860A] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                          <Pencil size={13} />
                        </button>
                        <button onClick={() => setDeletingItem(item)} className="p-2 rounded-lg hover:bg-red-50 text-[#A0916F] hover:text-red-500 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-[#A0916F] text-sm">No items match your search</div>
        )}
      </div>

      {/* Card layout — mobile */}
      <div className="sm:hidden space-y-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E8DDD0] h-24 animate-pulse" />
          ))
        ) : filtered.map((item) => {
          const cat = MENU_CATEGORIES.find((c) => c.id === item.category);
          return (
            <div key={item.id} className="bg-white rounded-xl border border-[#E8DDD0] p-4 flex items-center gap-3">
              {/* Thumbnail */}
              <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-[#E8DDD0]">
                {item.image ? (
                  <Image src={item.image} width={56} height={56} style={{ objectFit: "cover" }} alt={item.name} unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2C2210, #4A3520)" }}>
                    <UtensilsCrossed size={14} className="text-[#C8860A]/40" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#1C1710] font-semibold text-sm truncate">{item.name}</p>
                <p className="text-[#A0916F] text-xs">{cat?.icon} {cat?.label}</p>
                <p className="text-[#C8860A] font-bold text-sm">Rs {item.price.toLocaleString()}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <button onClick={() => setEditingItem(item)} className="p-2 rounded-lg bg-[#FAF7F3] text-[#C8860A] min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <Pencil size={14} />
                </button>
                <button onClick={() => setDeletingItem(item)} className="p-2 rounded-lg bg-red-50 text-red-400 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {editingItem !== null && (
        <ItemModal
          item={editingItem === "new" ? null : editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSave}
        />
      )}
      {deletingItem && (
        <DeleteConfirm
          name={deletingItem.name}
          onCancel={() => setDeletingItem(null)}
          onConfirm={() => handleDelete(deletingItem)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium border ${
          toast.type === "ok" ? "bg-white text-emerald-700 border-emerald-200" : "bg-white text-red-600 border-red-200"
        }`}>
          {toast.type === "ok" ? <CheckCircle2 size={15} className="text-emerald-500" /> : <XCircle size={15} className="text-red-500" />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}
