import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { requireAdmin } from "@/lib/admin-auth";
import { updateGallerySlot, getGalleryImages } from "@/lib/fs-data";

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const { slot } = await req.json();
  if (!slot) return NextResponse.json({ error: "slot required" }, { status: 400 });

  // Find current URL
  const images = getGalleryImages();
  const img = images.find((i) => i.slot === slot);
  if (img?.url) {
    const filePath = path.join(process.cwd(), "public", img.url.split("?")[0]);
    try { fs.unlinkSync(filePath); } catch { /* file may not exist */ }
  }

  updateGallerySlot(slot, null);
  return NextResponse.json({ success: true });
}
