import { getMenuItems } from "@/lib/fs-data";
import MenuClient from "./MenuClient";

// Always fetch fresh data — never serve a stale cached page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function MenuPage() {
  const items = getMenuItems();
  return <MenuClient items={items} />;
}
