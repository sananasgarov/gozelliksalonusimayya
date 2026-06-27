import { publicFetch } from "@/lib/backend";
import AboutAdmin from "./about-admin";

export default async function AboutPage() {
  const data = await publicFetch("/api/about");
  return <AboutAdmin initial={data} />;
}
