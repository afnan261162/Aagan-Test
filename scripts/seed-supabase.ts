/**
 * Seed Supabase tables with menu items and gallery images.
 *
 * Run with:
 *   npm run seed:supabase
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */
import { createClient } from "@supabase/supabase-js";
import { MENU_ITEMS } from "../lib/menu-data";
import { DEFAULT_GALLERY } from "../lib/gallery-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "❌  Missing env vars: NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY\n" +
      "    Make sure .env.local is loaded. Run: npm run seed:supabase"
  );
  process.exit(1);
}

const sb = createClient(url, serviceKey);

async function seedMenuItems() {
  console.log("→  Seeding menu_items…");
  const rows = MENU_ITEMS.map((item, idx) => ({
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
    sort_order: idx,
  }));

  const { error } = await sb
    .from("menu_items")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    console.error("❌  menu_items seed failed:", error.message);
    process.exit(1);
  }
  console.log(`✓  Seeded ${rows.length} menu items`);
}

async function seedGalleryImages() {
  console.log("→  Seeding gallery_images…");
  const rows = DEFAULT_GALLERY.map((img, idx) => ({
    id: img.id,
    slot: img.slot,
    label: img.label,
    url: img.url,
    alt: img.alt,
    sort_order: idx,
  }));

  const { error } = await sb
    .from("gallery_images")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    console.error("❌  gallery_images seed failed:", error.message);
    process.exit(1);
  }
  console.log(`✓  Seeded ${rows.length} gallery images`);
}

async function main() {
  console.log("\n🌱  Starting Supabase seed…\n");
  await seedMenuItems();
  await seedGalleryImages();
  console.log("\n✅  Seed complete!\n");
}

main().catch((err) => {
  console.error("❌  Unexpected error:", err);
  process.exit(1);
});
