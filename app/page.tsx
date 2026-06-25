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

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#f4f2ee]" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* 200vh wrapper: Hero sticky top-0, About slides over it from scroll 0–100vh */}
      <div style={{ position: "relative", zIndex: 1, height: "200vh" }}>
        <Hero />
      </div>

      {/* About slides up over Hero — negative margin pulls it into the sticky zone */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: "-100vh",
          background: "#f4f2ee",
          borderRadius: "24px 24px 0 0",
          overflow: "hidden",
          boxShadow: "0 -12px 48px rgba(0,0,0,0.18)",
        }}
      >
        <About />
      </div>

      <Brands />
      <ServicesHighlight />
      <GalleryPreview />
      <Reviews />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}
