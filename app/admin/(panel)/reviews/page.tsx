import { publicFetch } from "@/lib/backend";
import ReviewsAdmin from "./reviews-admin";

export default async function ReviewsPage() {
  const items = (await publicFetch("/api/reviews")) ?? [];
  return <ReviewsAdmin initial={items} />;
}
