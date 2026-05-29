import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getMenuData, setMenuItemImage } from "@/lib/menu-store";

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin(req);
  if (unauth) return unauth;

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const items = await getMenuData();
  const item = items.find((i) => i.id === id);

  if (item?.image) {
    if (item.image.startsWith("https://") && process.env.BLOB_READ_WRITE_TOKEN) {
      // Delete from Vercel Blob
      try {
        const { del } = await import("@vercel/blob");
        await del(item.image);
      } catch { /* already deleted or external URL */ }
    } else if (item.image.startsWith("/")) {
      // Delete local file
      try {
        const { default: fs } = await import("fs");
        const { default: path } = await import("path");
        fs.unlinkSync(path.join(process.cwd(), "public", item.image.split("?")[0]));
      } catch { /* file may not exist */ }
    }
  }

  await setMenuItemImage(id, null);
  return NextResponse.json({ success: true });
}
