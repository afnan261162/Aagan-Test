import { NextRequest, NextResponse } from "next/server";
import { getGalleryImages, saveGalleryImages } from "@/lib/fs-data";
import type { GalleryImage } from "@/lib/gallery-data";

// GET /api/admin/gallery — return all images (used by admin gallery page)
export async function GET() {
  return NextResponse.json(getGalleryImages());
}

// PUT /api/admin/gallery — update a single slot's metadata
export async function PUT(req: NextRequest) {
  let payload: GalleryImage | GalleryImage[];
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  if (Array.isArray(payload)) {
    saveGalleryImages(payload);
    return NextResponse.json(payload);
  } else {
    const images = getGalleryImages().map((i) =>
      i.id === payload.id ? payload : i
    );
    saveGalleryImages(images);
    return NextResponse.json(payload);
  }
}
