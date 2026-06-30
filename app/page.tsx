export const revalidate = 3600;

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import Brands from "@/components/home/brands";
import ServicesHighlight from "@/components/home/services-highlight";
import GalleryPreview from "@/components/home/gallery-preview";
import Reviews from "@/components/home/reviews";
import Faq from "@/components/home/faq";
import Contact from "@/components/home/contact";
import { publicFetch } from "@/lib/backend";

export default async function Home() {
  const [hero, about, brands, homeSlides, gallery, reviews, faqs, contact] = await Promise.all([
    publicFetch("/api/hero"),
    publicFetch("/api/about"),
    publicFetch("/api/brands"),
    publicFetch("/api/home-slides"),
    publicFetch("/api/gallery"),
    publicFetch("/api/reviews"),
    publicFetch("/api/faq"),
    publicFetch("/api/contact"),
  ]);


  const phone = contact?.info?.phoneHref
    ? (contact.info.phoneHref as string).replace(/\D/g, "")
    : undefined;

  return (
    <div className="flex flex-col w-full bg-[#f4f2ee]">
      <Navbar phone={phone} />

      {/* Hero — 200dvh sticky zone */}
      <div className="relative z-1 h-[200dvh]">
        <Hero data={hero} phone={phone} />
      </div>

      {/* About — slides over Hero */}
      <div className="relative z-2 mt-[-100dvh] bg-[#f4f2ee]">
        <About data={about} />
      </div>

      {/* Brands */}
      <div className="relative z-3 bg-[#f4f2ee] py-20 md:py-35">
        <Brands brands={brands} />
      </div>

      {/* ServicesHighlight — sticky on all screens */}
      <div className="relative z-4 h-[calc(200dvh+500px)] lg:h-[calc(100dvh+800px)]">
        <div className="sticky top-0">
          <ServicesHighlight homeSlides={homeSlides} />
        </div>
      </div>

      {/* GalleryPreview — slides over Services on all screens */}
      <div className="relative z-5 mt-[-100dvh] bg-[#f4f2ee]">
        <GalleryPreview images={gallery} />
      </div>
      <div className="relative z-5 bg-[#f4f2ee]">
        <Reviews reviews={reviews} />
        <Faq faqs={faqs} />
        <Contact contact={contact} />
        <Footer contact={contact} />
      </div>
    </div>
  );
}
