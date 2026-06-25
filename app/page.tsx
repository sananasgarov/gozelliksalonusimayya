import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import Brands from "@/components/home/brands";
import ServicesHighlight from "@/components/home/services-highlight";
import GalleryPreview from "@/components/home/gallery-preview";
import Reviews from "@/components/home/reviews";
import Faq from "@/components/home/faq";
import Contact from "@/components/home/contact";

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <Hero />
      <About />
      <Brands />
      <ServicesHighlight />
      <GalleryPreview />
      <Reviews />
      <Faq />
      <Contact />
    </main>
  );
}
