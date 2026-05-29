/**
 * Menu data store.
 *
 * Strategy:
 *   • On Vercel (KV_REST_API_URL is set) → Vercel KV (persistent across requests)
 *   • Local dev without KV             → data/menu.json on the filesystem
 *   • Hard fallback                    → static MENU_ITEMS from menu-data.ts
 *
 * All functions are async so callers work identically in both environments.
 */
import { MENU_ITEMS, type MenuItem } from "./menu-data";

const KV_KEY = "aangan:menu";

export async function getMenuData(): Promise<MenuItem[]> {
  if (process.env.KV_REST_API_URL) {
    try {
      const { kv } = await import("@vercel/kv");
      const data = await kv.get<MenuItem[]>(KV_KEY);
      return data ?? MENU_ITEMS;
    } catch {
      // KV not reachable — fall through
    }
  }
  // Local filesystem fallback
  try {
    const { getMenuItems } = await import("./fs-data");
    return getMenuItems();
  } catch {
    return MENU_ITEMS;
  }
}

export async function saveMenuData(items: MenuItem[]): Promise<void> {
  if (process.env.KV_REST_API_URL) {
    const { kv } = await import("@vercel/kv");
    await kv.set(KV_KEY, items);
    return;
  }
  const { saveMenuItems } = await import("./fs-data");
  saveMenuItems(items);
}

/** Update a single menu item's image URL (null to clear). */
export async function setMenuItemImage(id: string, image: string | null): Promise<void> {
  const items = await getMenuData();
  const updated = items.map((i) => (i.id === id ? { ...i, image } : i));
  await saveMenuData(updated);
}
