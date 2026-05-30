/**
 * Menu data store.
 *
 * Priority:
 *   1. Supabase PostgreSQL (NEXT_PUBLIC_SUPABASE_URL set)
 *   2. Vercel KV / Upstash   (KV_REST_API_URL set)
 *   3. Local filesystem       (data/menu.json)
 *   4. Static fallback        (MENU_ITEMS from menu-data.ts)
 */
import { MENU_ITEMS, type MenuItem, type MenuTag } from "./menu-data";

// ── Row mappers ───────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbRowToMenuItem(row: Record<string, any>): MenuItem {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as string,
    description: row.description as string,
    price: row.price as number,
    tags: ((row.tags as string[] | null) ?? []) as MenuTag[],
    featured: (row.is_featured as boolean) ?? false,
    available: (row.available as boolean) ?? true,
    prepTime: (row.prep_time as number) ?? 15,
    image: (row.image as string | null) ?? null,
  };
}

function menuItemToDbRow(item: MenuItem, sortOrder: number) {
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    description: item.description,
    price: item.price,
    tags: item.tags,
    is_featured: item.featured,
    available: item.available,
    prep_time: item.prepTime,
    image: item.image,
    sort_order: sortOrder,
    updated_at: new Date().toISOString(),
  };
}

const KV_KEY = "aangan:menu";

// ── Public API ────────────────────────────────────────────────────────────────

export async function getMenuData(): Promise<MenuItem[]> {
  // 1. Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { supabase } = await import("./supabase");
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!error && data && data.length > 0) {
        return data.map(dbRowToMenuItem);
      }
    } catch {
      // fall through
    }
  }

  // 2. Vercel KV / Upstash
  if (process.env.KV_REST_API_URL) {
    try {
      const { kv } = await import("@vercel/kv");
      const data = await kv.get<MenuItem[]>(KV_KEY);
      if (data) return data;
    } catch {
      // fall through
    }
  }

  // 3. Local filesystem
  try {
    const { getMenuItems } = await import("./fs-data");
    return getMenuItems();
  } catch {
    return MENU_ITEMS;
  }
}

export async function saveMenuData(items: MenuItem[]): Promise<void> {
  // 1. Supabase
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { supabaseAdmin } = await import("./supabase");
    const { data: existing } = await supabaseAdmin
      .from("menu_items")
      .select("id");
    const existingIds = new Set(
      (existing ?? []).map((r: { id: string }) => r.id)
    );
    const newIds = new Set(items.map((i) => i.id));
    const toDelete = [...existingIds].filter((id) => !newIds.has(id));
    if (toDelete.length > 0) {
      await supabaseAdmin.from("menu_items").delete().in("id", toDelete);
    }
    const rows = items.map((item, idx) => menuItemToDbRow(item, idx));
    const { error } = await supabaseAdmin
      .from("menu_items")
      .upsert(rows, { onConflict: "id" });
    if (error) throw new Error(`Supabase saveMenuData: ${error.message}`);
    return;
  }

  // 2. Vercel KV / Upstash
  if (process.env.KV_REST_API_URL) {
    const { kv } = await import("@vercel/kv");
    await kv.set(KV_KEY, items);
    return;
  }

  // 3. Local filesystem
  const { saveMenuItems } = await import("./fs-data");
  saveMenuItems(items);
}

/** Update a single menu item's image URL (null to clear). */
export async function setMenuItemImage(
  id: string,
  image: string | null
): Promise<void> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { supabaseAdmin } = await import("./supabase");
    const { error } = await supabaseAdmin
      .from("menu_items")
      .update({ image, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw new Error(`Supabase setMenuItemImage: ${error.message}`);
    return;
  }
  const items = await getMenuData();
  const updated = items.map((i) => (i.id === id ? { ...i, image } : i));
  await saveMenuData(updated);
}
