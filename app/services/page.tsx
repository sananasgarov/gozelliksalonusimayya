import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ServicesClient from "./services-client";
import { publicFetch } from "@/lib/backend";

type ServiceItem = { title: string; desc: string; category: string; imageUrl: string };

const FALLBACK_MAKEUP: ServiceItem[] = [
  { title: "Natural Makeup", desc: "A fresh and minimal makeup look that enhances your natural beauty.", category: "makeup", imageUrl: "/servicemarkup.png" },
  { title: "Soft Glam Makeup", desc: "A soft and elegant makeup look with subtle definition and a natural glow.", category: "makeup", imageUrl: "/servicemarkup.png" },
  { title: "Full Glam Makeup", desc: "A bold and flawless makeup look with dramatic eyes and defined features.", category: "makeup", imageUrl: "/servicemarkup.png" },
  { title: "Evening Makeup", desc: "An elegant makeup look designed for formal and nighttime occasions.", category: "makeup", imageUrl: "/servicemarkup.png" },
  { title: "Birthday Party Makeup", desc: "A stylish makeup look created to make you shine on your special day.", category: "makeup", imageUrl: "/servicemarkup.png" },
  { title: "Engagement Makeup", desc: "A refined and long-lasting makeup look for your engagement celebration.", category: "makeup", imageUrl: "/servicemarkup.png" },
  { title: "Wedding Makeup", desc: "A timeless and flawless bridal makeup look tailored for your wedding day.", category: "makeup", imageUrl: "/servicemarkup.png" },
  { title: "Photoshoot Makeup", desc: "A camera-ready makeup look that highlights your best features.", category: "makeup", imageUrl: "/servicemarkup.png" },
  { title: "Event Makeup", desc: "A customized makeup look suitable for any special occasion or event.", category: "makeup", imageUrl: "/servicemarkup.png" },
  { title: "Brow Lamination", desc: "A brow treatment that lifts and sets hairs for fuller and perfectly styled eyebrows.", category: "makeup", imageUrl: "/servicemarkup.png" },
  { title: "Lash Lamination", desc: "A lash treatment that lifts and curls natural lashes for a longer, defined look.", category: "makeup", imageUrl: "/servicemarkup.png" },
  { title: "Brow Shaping", desc: "A precise eyebrow shaping service that enhances your facial features.", category: "makeup", imageUrl: "/servicemarkup.png" },
];

const FALLBACK_HAIR: ServiceItem[] = [
  { title: "Blowout & Style", desc: "A professional blowout giving you smooth, voluminous, and long-lasting results.", category: "hair", imageUrl: "/servicemarkup.png" },
  { title: "Hair Coloring", desc: "Full or partial color application to transform and refresh your hair look.", category: "hair", imageUrl: "/servicemarkup.png" },
  { title: "Balayage", desc: "A freehand highlighting technique for natural-looking sun-kissed dimension.", category: "hair", imageUrl: "/servicemarkup.png" },
  { title: "Hair Extensions", desc: "High-quality extensions to add length and volume seamlessly to your hair.", category: "hair", imageUrl: "/servicemarkup.png" },
  { title: "Brazilian Blowout", desc: "A smoothing treatment that eliminates frizz and adds lasting shine.", category: "hair", imageUrl: "/servicemarkup.png" },
  { title: "Keratin Treatment", desc: "A protein treatment that strengthens and smooths hair from within.", category: "hair", imageUrl: "/servicemarkup.png" },
  { title: "Updo & Bridal Hair", desc: "Elegant and structured hairstyles designed for your most special days.", category: "hair", imageUrl: "/servicemarkup.png" },
  { title: "Hair Cut & Trim", desc: "Precision cuts and trims tailored to suit your face shape and style.", category: "hair", imageUrl: "/servicemarkup.png" },
  { title: "Highlights", desc: "Customized highlights woven through your hair for multi-dimensional color.", category: "hair", imageUrl: "/servicemarkup.png" },
  { title: "Toner Treatment", desc: "A toning service to neutralize brassiness and enhance your hair color.", category: "hair", imageUrl: "/servicemarkup.png" },
  { title: "Scalp Treatment", desc: "A nourishing scalp treatment to promote healthy hair growth and balance.", category: "hair", imageUrl: "/servicemarkup.png" },
  { title: "Braiding", desc: "Creative and classic braiding styles for every occasion and hair type.", category: "hair", imageUrl: "/servicemarkup.png" },
];

const FALLBACK_NAIL: ServiceItem[] = [
  { title: "Classic Manicure", desc: "A timeless nail care service that leaves your nails polished and perfect.", category: "nail", imageUrl: "/servicemarkup.png" },
  { title: "Gel Manicure", desc: "Long-lasting gel polish that stays chip-free for weeks with a glossy finish.", category: "nail", imageUrl: "/servicemarkup.png" },
  { title: "Acrylic Nails", desc: "Durable acrylic extensions for a stronger and more defined nail look.", category: "nail", imageUrl: "/servicemarkup.png" },
  { title: "Nail Art", desc: "Creative and intricate nail designs tailored to your personal style.", category: "nail", imageUrl: "/servicemarkup.png" },
  { title: "Pedicure", desc: "A relaxing foot care treatment that softens skin and pampers your feet.", category: "nail", imageUrl: "/servicemarkup.png" },
  { title: "French Manicure", desc: "A classic white-tip manicure for an elegant and timeless appearance.", category: "nail", imageUrl: "/servicemarkup.png" },
  { title: "Dip Powder Nails", desc: "A lightweight and durable nail technique using colored powder for lasting color.", category: "nail", imageUrl: "/servicemarkup.png" },
  { title: "Nail Extensions", desc: "Seamless nail extensions crafted to match your desired length and shape.", category: "nail", imageUrl: "/servicemarkup.png" },
  { title: "Gel Pedicure", desc: "A long-lasting gel polish pedicure that keeps your toes looking flawless.", category: "nail", imageUrl: "/servicemarkup.png" },
  { title: "Nail Removal", desc: "Safe and gentle nail product removal to protect the health of your nails.", category: "nail", imageUrl: "/servicemarkup.png" },
  { title: "Nail Repair", desc: "Expert nail repair to fix breakage and restore the strength of your nails.", category: "nail", imageUrl: "/servicemarkup.png" },
  { title: "Shellac Manicure", desc: "A Shellac polish service combining gel durability with classic nail polish ease.", category: "nail", imageUrl: "/servicemarkup.png" },
];

export default async function ServicesPage() {
  const [allServices, gallery, reviews] = await Promise.all([
    publicFetch("/api/services"),
    publicFetch("/api/gallery"),
    publicFetch("/api/reviews"),
  ]);

  const services: ServiceItem[] = Array.isArray(allServices) ? allServices : [];

  const makeup = services.filter((s) => s.category === "makeup");
  const hair = services.filter((s) => s.category === "hair");
  const nail = services.filter((s) => s.category === "nail");

  return (
    <div className="bg-[#f4f2ee] min-h-screen">
      <Navbar darkIcons />

      <div className="px-4 md:px-15 pt-32 md:pt-42 pb-4 md:pb-6">
        <h1
          className="text-[#433459] text-[32px] md:text-[40px] leading-12 tracking-[-0.8px]"
          style={{ fontFamily: "var(--font-antonio)" }}
        >
          Services
        </h1>
      </div>

      <ServicesClient
        makeup={makeup.length > 0 ? makeup : FALLBACK_MAKEUP}
        hair={hair.length > 0 ? hair : FALLBACK_HAIR}
        nail={nail.length > 0 ? nail : FALLBACK_NAIL}
        gallery={gallery}
        reviews={reviews}
      />

      <Footer />
    </div>
  );
}
