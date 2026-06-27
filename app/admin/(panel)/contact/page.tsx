import { publicFetch } from "@/lib/backend";
import ContactAdmin from "./contact-admin";

export default async function ContactPage() {
  const data = await publicFetch("/api/contact");
  return <ContactAdmin initial={data} />;
}
