/**
 * Gallery data store.
 *
 * Same strategy as menu-store.ts — KV on Vercel, filesystem locally.
 */
import { DEFAULT_GALLERY, type GalleryImage } from "./gallery-data";

const KV_KEY = "aangan:gallery";

export async function getGalleryData(): Promise<GalleryImage[]> {
  if (process.env.KV_REST_API_URL) {
    try {
      const { kv } = await import("@vercel/kv");
      const data = await kv.get<GalleryImage[]>(KV_KEY);
      return data ?? DEFAULT_GALLERY;
    } catch {
      // KV not reachable — fall through
    }
  }
  try {
    const { getGalleryImages } = await import("./fs-data");
    return getGalleryImages();
  } catch {
    return DEFAULT_GALLERY;
  }
}

export async function saveGalleryData(images: GalleryImage[]): Promise<void> {
  if (process.env.KV_REST_API_URL) {
    const { kv } = await import("@vercel/kv");
    await kv.set(KV_KEY, images);
    return;
  }
  const { saveGalleryImages } = await import("./fs-data");
  saveGalleryImages(images);
}

/** Update a single slot's URL (null to clear). */
export async function setGallerySlotUrl(slot: string, url: string | null): Promise<void> {
  const images = await getGalleryData();
  const updated = images.map((i) => (i.slot === slot ? { ...i, url } : i));
  await saveGalleryData(updated);
}
