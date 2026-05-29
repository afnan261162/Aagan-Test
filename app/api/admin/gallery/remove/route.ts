import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getGalleryData, setGallerySlotUrl } from "@/lib/gallery-store";

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const { slot } = await req.json();
  if (!slot) return NextResponse.json({ error: "slot required" }, { status: 400 });

  const images = await getGalleryData();
  const img = images.find((i) => i.slot === slot);

  if (img?.url) {
    if (img.url.startsWith("https://") && process.env.BLOB_READ_WRITE_TOKEN) {
      // Delete from Vercel Blob
      try {
        const { del } = await import("@vercel/blob");
        await del(img.url);
      } catch { /* already deleted or external URL */ }
    } else if (img.url.startsWith("/")) {
      // Delete local file
      try {
        const { default: fs } = await import("fs");
        const { default: path } = await import("path");
        fs.unlinkSync(path.join(process.cwd(), "public", img.url.split("?")[0]));
      } catch { /* file may not exist */ }
    }
  }

  await setGallerySlotUrl(slot, null);
  return NextResponse.json({ success: true });
}
