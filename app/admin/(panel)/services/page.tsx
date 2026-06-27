import { publicFetch } from "@/lib/backend";
import ServicesAdmin from "./services-admin";
import HomeSlidesAdmin from "./home-slides-admin";

export default async function ServicesPage() {
  const [items, homeSlides] = await Promise.all([
    publicFetch("/api/services").then((r) => r ?? []),
    publicFetch("/api/home-slides").then((r) => r ?? []),
  ]);

  return (
    <>
      <HomeSlidesAdmin initial={homeSlides} />
      <ServicesAdmin initial={items} />
    </>
  );
}
