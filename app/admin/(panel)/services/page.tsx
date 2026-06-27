import { publicFetch } from "@/lib/backend";
import ServicesAdmin from "./services-admin";

export default async function ServicesPage() {
  const items = (await publicFetch("/api/services")) ?? [];
  return <ServicesAdmin initial={items} />;
}
