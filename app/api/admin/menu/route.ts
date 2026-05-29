import { NextRequest, NextResponse } from "next/server";
import { getMenuItems, saveMenuItems } from "@/lib/fs-data";
import type { MenuItem } from "@/lib/menu-data";

// GET /api/admin/menu — return all items
export async function GET() {
  return NextResponse.json(getMenuItems());
}

// POST /api/admin/menu — create new item
export async function POST(req: NextRequest) {
  let item: MenuItem;
  try {
    item = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const items = getMenuItems();
  items.push(item);
  saveMenuItems(items);
  return NextResponse.json(item, { status: 201 });
}

// PUT /api/admin/menu — update existing item
export async function PUT(req: NextRequest) {
  let updated: MenuItem;
  try {
    updated = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const items = getMenuItems().map((i) => (i.id === updated.id ? updated : i));
  saveMenuItems(items);
  return NextResponse.json(updated);
}

// DELETE /api/admin/menu?id=xxx — delete item
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const items = getMenuItems().filter((i) => i.id !== id);
  saveMenuItems(items);
  return NextResponse.json({ ok: true });
}
