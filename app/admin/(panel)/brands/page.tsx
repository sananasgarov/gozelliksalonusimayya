import { publicFetch } from "@/lib/backend";
import BrandsAdmin from "./brands-admin";

export default async function BrandsPage() {
  const items = (await publicFetch("/api/brands")) ?? [];
  return <BrandsAdmin initial={items} />;
}
