import { publicFetch } from "@/lib/backend";
import LegalAdmin from "./legal-admin";

export default async function LegalPage() {
  const [terms, privacy, booking] = await Promise.all([
    publicFetch("/api/legal/terms"),
    publicFetch("/api/legal/privacy"),
    publicFetch("/api/legal/booking"),
  ]);

  return (
    <LegalAdmin
      initial={{
        terms: terms ?? [],
        privacy: privacy ?? [],
        booking: booking ?? [],
      }}
    />
  );
}
