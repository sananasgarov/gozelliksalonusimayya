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
        }}
      >
        <About />
      </div>

      {/* Brands pinned — ServicesHighlight slides over it */}
      <div style={{ position: "relative", zIndex: 3, height: "calc(100vh + 200px)" }}>
        <div style={{ position: "sticky", top: 0, width: "100%", background: "#f4f2ee" }}>
          <Brands />
        </div>
      </div>

      {/* ServicesHighlight: slides over Brands AND pins for GalleryPreview */}
      <div style={{ position: "relative", zIndex: 4, marginTop: "-100vh", height: "calc(100vh + 800px)" }}>
        <div style={{ position: "sticky", top: 0 }}>
          <ServicesHighlight />
        </div>
      </div>

      {/* GalleryPreview slides over ServicesHighlight */}
      <div style={{ position: "relative", zIndex: 5, marginTop: "-100vh", background: "#f4f2ee" }}>
        <GalleryPreview />
      </div>
      <Reviews />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}
