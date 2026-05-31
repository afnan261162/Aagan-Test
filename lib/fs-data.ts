/**
 * Server-only helpers for reading and writing persisted JSON data.
 * Never import this file in Client Components.
 */
import fs from "fs";
import path from "path";
import { MENU_ITEMS, type MenuItem } from "./menu-data";
import { DEFAULT_GALLERY, type GalleryImage } from "./gallery-data";

// On Vercel (read-only FS) write to /tmp; locally write to project data/
const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "aangan-data")
  : path.join(process.cwd(), "data");

function filePath(name: string) {
  return path.join(DATA_DIR, name);
}

function readJson<T>(file: string, fallback: T): T {
  try {
    const raw = fs.readFileSync(filePath(file), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(file: string, data: unknown) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(filePath(file), JSON.stringify(data, null, 2), "utf-8");
}

// ── Menu ──────────────────────────────────────────────────────────────────────

export function getMenuItems(): MenuItem[] {
  return readJson<MenuItem[]>("menu.json", MENU_ITEMS);
}

export function saveMenuItems(items: MenuItem[]) {
  writeJson("menu.json", items);
}

// ── Gallery ───────────────────────────────────────────────────────────────────

export function getGalleryImages(): GalleryImage[] {
  return readJson<GalleryImage[]>("gallery.json", DEFAULT_GALLERY);
}

export function saveGalleryImages(images: GalleryImage[]) {
  writeJson("gallery.json", images);
}

/** Update a single gallery slot's URL (null to clear). */
export function updateGallerySlot(slot: string, url: string | null) {
  const images = getGalleryImages().map((img) =>
    img.slot === slot ? { ...img, url } : img
  );
  saveGalleryImages(images);
}

/** Update a single menu item's image URL (null to clear). */
export function updateMenuItemImage(id: string, image: string | null) {
  const items = getMenuItems().map((item) =>
    item.id === id ? { ...item, image } : item
  );
  saveMenuItems(items);
}
