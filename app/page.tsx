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


  return (
    <div className="flex flex-col w-full bg-[#f4f2ee]" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero — mobile: 100vh, desktop: 200vh sticky zone */}
      <div className="relative z-1 h-screen lg:h-[200vh]">
        <Hero data={hero} />
      </div>

      {/* About — mobile: normal flow, desktop: slides over Hero */}
      <div className="relative z-2 lg:mt-[-100vh] bg-[#f4f2ee]">
        <About data={about} />
      </div>

      {/* Brands — mobile: normal flow, desktop: sticky pin */}
      <div className="relative z-3 h-auto lg:h-[calc(100vh+200px)]">
        <div className="relative lg:sticky top-0 w-full bg-[#f4f2ee]">
          <Brands brands={brands} />
        </div>
      </div>

      {/* ServicesHighlight — mobile: normal flow, desktop: slides over Brands + sticky */}
      <div className="relative z-4 h-auto lg:mt-[-100vh] lg:h-[calc(100vh+800px)]">
        <div className="relative lg:sticky top-0">
          <ServicesHighlight homeSlides={homeSlides} />
        </div>
      </div>

      {/* GalleryPreview — mobile: normal flow, desktop: slides over Services */}
      <div className="relative z-5 lg:mt-[-100vh] bg-[#f4f2ee]">
        <GalleryPreview images={gallery} />
      </div>
      <Reviews reviews={reviews} />
      <Faq faqs={faqs} />
      <Contact contact={contact} />
      <Footer contact={contact} />
    </div>
  );
}
