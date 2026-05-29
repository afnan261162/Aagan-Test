import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { requireAdmin } from "@/lib/admin-auth";
import { getMenuItems, updateMenuItemImage } from "@/lib/fs-data";

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const item = getMenuItems().find((i) => i.id === id);
  if (item?.image) {
    const filePath = path.join(process.cwd(), "public", item.image.split("?")[0]);
    try { fs.unlinkSync(filePath); } catch { /* already gone */ }
  }

  updateMenuItemImage(id, null);
  return NextResponse.json({ success: true });
}
