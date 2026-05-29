import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { requireAdmin } from "@/lib/admin-auth";
import { setMenuItemImage } from "@/lib/menu-store";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 8 * 1024 * 1024;

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
    return NextResponse.json({ error: "Only JPEG, PNG or WebP images are accepted" }, { status: 400 });
  if (file.size > MAX_BYTES)
    return NextResponse.json({ error: "File must be under 8 MB" }, { status: 400 });

  // Resize with sharp to max 800×600 before storage
  const raw = Buffer.from(await file.arrayBuffer());
  const resized = await sharp(raw)
    .resize({ width: 800, height: 600, fit: "cover", withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true })
    .toBuffer();

  let publicUrl: string;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    // ── Vercel Blob ──────────────────────────────────────────────────────
    const { put } = await import("@vercel/blob");
    const blob = await put(`menu/${id}-${Date.now()}.jpg`, resized, {
      access: "public",
      contentType: "image/jpeg",
    });
    publicUrl = blob.url;
  } else {
    // ── Local filesystem fallback ────────────────────────────────────────
    const { default: fs } = await import("fs");
    const { default: path } = await import("path");
    const outDir = path.join(process.cwd(), "public", "images", "menu");
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const filename = `${id}.jpg`;
    fs.writeFileSync(path.join(outDir, filename), resized);
    publicUrl = `/images/menu/${filename}`;
  }

  await setMenuItemImage(id, publicUrl);

  return NextResponse.json({ success: true, url: publicUrl });
}
