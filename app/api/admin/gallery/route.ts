import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getGalleryData, saveGalleryData } from "@/lib/gallery-store";
import type { GalleryImage } from "@/lib/gallery-data";

export const dynamic = "force-dynamic";

// GET /api/admin/gallery — return all images
export async function GET(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;
  return NextResponse.json(await getGalleryData());
}

// PUT /api/admin/gallery — update a single slot's metadata or full reorder
export async function PUT(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;
  let payload: GalleryImage | GalleryImage[];
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  if (Array.isArray(payload)) {
    await saveGalleryData(payload);
    return NextResponse.json(payload);
  } else {
    const images = (await getGalleryData()).map((i) =>
      i.id === payload.id ? payload : i
    );
    await saveGalleryData(images);
    return NextResponse.json(payload);
  }
}
