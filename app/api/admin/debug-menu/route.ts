/**
 * Temporary debug route — remove after verifying image paths.
 * Visit /api/admin/debug-menu to see all menu items with their image field.
 * Verify values look like "/images/menu/cg-1.jpg" NOT a full disk path.
 */
import { NextResponse } from "next/server";
import { getMenuItems } from "@/lib/fs-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = getMenuItems();
  return NextResponse.json(
    items.map((i) => ({ id: i.id, name: i.name, image: i.image ?? null }))
  );
}
