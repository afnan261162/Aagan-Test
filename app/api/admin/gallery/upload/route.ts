import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { requireAdmin } from "@/lib/admin-auth";
import { updateGallerySlot } from "@/lib/fs-data";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const OUT_DIR = path.join(process.cwd(), "public", "images", "gallery");

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const form = await req.formData();
  const slot = form.get("slot");
  const file = form.get("file");

  if (typeof slot !== "string" || !slot)
    return NextResponse.json({ error: "slot required" }, { status: 400 });
  if (!(file instanceof Blob))
    return NextResponse.json({ error: "file required" }, { status: 400 });

  if (!ALLOWED.includes(file.type))
    return NextResponse.json(
      { error: "Only JPEG, PNG and WebP images are accepted" },
      { status: 400 }
    );
  if (file.size > MAX_BYTES)
    return NextResponse.json(
      { error: "File must be under 8 MB" },
      { status: 400 }
    );

  const buffer = Buffer.from(await file.arrayBuffer());

  // Ensure output directory exists
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const filename = `${slot}.jpg`;
  const outPath = path.join(OUT_DIR, filename);

  // Resize to max 1600px width, convert to JPEG
  await sharp(buffer)
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true })
    .toFile(outPath);

  const url = `/images/gallery/${filename}?t=${Date.now()}`;
  updateGallerySlot(slot, `/images/gallery/${filename}`);

  return NextResponse.json({ success: true, url });
}
