import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getMenuData, saveMenuData } from "@/lib/menu-store";
import type { MenuItem } from "@/lib/menu-data";

export const dynamic = "force-dynamic";

// GET /api/admin/menu — return all items
export async function GET(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;
  return NextResponse.json(await getMenuData());
}

// POST /api/admin/menu — create new item
export async function POST(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;
  let item: MenuItem;
  try {
    item = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const items = await getMenuData();
  items.push(item);
  await saveMenuData(items);
  return NextResponse.json(item, { status: 201 });
}

// PUT /api/admin/menu — update existing item
export async function PUT(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;
  let updated: MenuItem;
  try {
    updated = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const items = (await getMenuData()).map((i) => (i.id === updated.id ? updated : i));
  await saveMenuData(items);
  return NextResponse.json(updated);
}

// DELETE /api/admin/menu?id=xxx — delete item
export async function DELETE(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const items = (await getMenuData()).filter((i) => i.id !== id);
  await saveMenuData(items);
  return NextResponse.json({ ok: true });
}
