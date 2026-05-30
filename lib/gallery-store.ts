/**
 * Gallery data store.
 *
 * Priority:
 *   1. Supabase PostgreSQL (NEXT_PUBLIC_SUPABASE_URL set)
 *   2. Vercel KV / Upstash   (KV_REST_API_URL set)
 *   3. Local filesystem       (data/gallery.json)
 *   4. Static fallback        (DEFAULT_GALLERY from gallery-data.ts)
 */
import { DEFAULT_GALLERY, type GalleryImage } from "./gallery-data";

// ── Row mappers ───────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbRowToGalleryImage(row: Record<string, any>): GalleryImage {
  return {
    id: row.id as string,
    slot: row.slot as string,
    label: row.label as string,
    url: (row.url as string | null) ?? null,
    alt: row.alt as string,
  };
}

const KV_KEY = "aangan:gallery";

// ── Public API ────────────────────────────────────────────────────────────────

export async function getGalleryData(): Promise<GalleryImage[]> {
  // 1. Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { supabase } = await import("./supabase");
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map(dbRowToGalleryImage);
      }
    } catch {
      // fall through
    }
  }

  // 2. Vercel KV / Upstash
  if (process.env.KV_REST_API_URL) {
    try {
      const { kv } = await import("@vercel/kv");
      const data = await kv.get<GalleryImage[]>(KV_KEY);
      if (data) return data;
    } catch {
      // fall through
    }
  }

  // 3. Local filesystem
  try {
    const { getGalleryImages } = await import("./fs-data");
    return getGalleryImages();
  } catch {
    return DEFAULT_GALLERY;
  }
}

export async function saveGalleryData(images: GalleryImage[]): Promise<void> {
  // 1. Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { supabaseAdmin } = await import("./supabase");
    const rows = images.map((img, idx) => ({
      id: img.id,
      slot: img.slot,
      label: img.label,
      url: img.url,
      alt: img.alt,
      sort_order: idx,
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabaseAdmin
      .from("gallery_images")
      .upsert(rows, { onConflict: "id" });
    if (error) throw new Error(`Supabase saveGalleryData: ${error.message}`);
    return;
  }

  // 2. Vercel KV / Upstash
  if (process.env.KV_REST_API_URL) {
    const { kv } = await import("@vercel/kv");
    await kv.set(KV_KEY, images);
    return;
  }

  // 3. Local filesystem
  const { saveGalleryImages } = await import("./fs-data");
  saveGalleryImages(images);
}

/** Update a single slot's URL (null to clear). */
export async function setGallerySlotUrl(
  slot: string,
  url: string | null
): Promise<void> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { supabaseAdmin } = await import("./supabase");
    const { error } = await supabaseAdmin
      .from("gallery_images")
      .update({ url, updated_at: new Date().toISOString() })
      .eq("slot", slot);
    if (error) throw new Error(`Supabase setGallerySlotUrl: ${error.message}`);
    return;
  }
  const images = await getGalleryData();
  const updated = images.map((i) => (i.slot === slot ? { ...i, url } : i));
  await saveGalleryData(updated);
}
