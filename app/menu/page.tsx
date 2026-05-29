import { getMenuData } from "@/lib/menu-store";
import MenuClient from "./MenuClient";

// Always fetch fresh data from KV / filesystem — never serve a stale cached page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MenuPage() {
  const items = await getMenuData();
  return <MenuClient items={items} />;
}
