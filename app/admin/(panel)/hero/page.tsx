import { publicFetch } from "@/lib/backend";
import HeroAdmin from "./hero-admin";

export default async function HeroPage() {
  const data = await publicFetch("/api/hero");
  return <HeroAdmin initial={data} />;
}
