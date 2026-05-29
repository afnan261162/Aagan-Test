import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { requireAdmin } from "@/lib/admin-auth";
import { setGallerySlotUrl } from "@/lib/gallery-store";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 8 * 1024 * 1024;

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
    return NextResponse.json({ error: "Only JPEG, PNG or WebP images are accepted" }, { status: 400 });
  if (file.size > MAX_BYTES)
    return NextResponse.json({ error: "File must be under 8 MB" }, { status: 400 });

  // Resize with sharp before storage
  const raw = Buffer.from(await file.arrayBuffer());
  const resized = await sharp(raw)
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true })
    .toBuffer();

  let publicUrl: string;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    // ── Vercel Blob ──────────────────────────────────────────────────────
    const { put } = await import("@vercel/blob");
    const blob = await put(`gallery/${slot}-${Date.now()}.jpg`, resized, {
      access: "public",
      contentType: "image/jpeg",
    });
    publicUrl = blob.url;
  } else {
    // ── Local filesystem fallback ────────────────────────────────────────
    const { default: fs } = await import("fs");
    const { default: path } = await import("path");
    const outDir = path.join(process.cwd(), "public", "images", "gallery");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const filename = `${slot}.jpg`;
    fs.writeFileSync(path.join(outDir, filename), resized);
    publicUrl = `/images/gallery/${filename}`;
  }

  await setGallerySlotUrl(slot, publicUrl);

  return NextResponse.json({ success: true, url: publicUrl });
}
