import { publicFetch } from "@/lib/backend";
import GalleryAdmin from "./gallery-admin";

export default async function GalleryPage() {
  const items = (await publicFetch("/api/gallery")) ?? [];
  return <GalleryAdmin initial={items} />;
}
