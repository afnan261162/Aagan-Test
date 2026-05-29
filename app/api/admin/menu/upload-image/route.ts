import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { requireAdmin } from "@/lib/admin-auth";
import { updateMenuItemImage } from "@/lib/fs-data";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const OUT_DIR = path.join(process.cwd(), "public", "images", "menu");

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const form = await req.formData();
  const id = form.get("id");
  const file = form.get("file");

  if (typeof id !== "string" || !id)
    return NextResponse.json({ error: "id required" }, { status: 400 });
  if (!(file instanceof Blob))
    return NextResponse.json({ error: "file required" }, { status: 400 });

  if (!ALLOWED.includes(file.type))
    return NextResponse.json(
      { error: "Only JPEG, PNG and WebP images are accepted" },
      { status: 400 }
    );
  if (file.size > MAX_BYTES)
    return NextResponse.json({ error: "File must be under 8 MB" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const filename = `${id}.jpg`;
  const outPath = path.join(OUT_DIR, filename);

  await sharp(buffer)
    .resize({ width: 800, height: 600, fit: "cover", withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true })
    .toFile(outPath);

  const publicUrl = `/images/menu/${filename}`;
  updateMenuItemImage(id, publicUrl);

  return NextResponse.json({ success: true, url: publicUrl });
}
