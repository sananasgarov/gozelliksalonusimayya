import { publicFetch } from "@/lib/backend";
import FaqAdmin from "./faq-admin";

export default async function FaqPage() {
  const items = (await publicFetch("/api/faq")) ?? [];
  return <FaqAdmin initial={items} />;
}
