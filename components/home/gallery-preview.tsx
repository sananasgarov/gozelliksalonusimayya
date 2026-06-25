const images = Array(6).fill("/gallery-1.png");

export default function GalleryPreview() {
  return (
    <section id="gallery" className="py-12 md:py-20 w-full overflow-hidden">
      <h2
        className="text-[#433459] text-[28px] md:text-[40px] leading-9 md:leading-12 tracking-[-0.8px] mb-6 md:mb-8 px-4 md:px-15"
        style={{ fontFamily: "var(--font-antonio)" }}
      >
        Gallery Preview
      </h2>

      <div className="flex gap-5 animate-gallery-scroll w-max">
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            className="shrink-0 w-44 sm:w-56 md:w-78.75 h-60 sm:h-80 md:h-118.25 rounded-[20px] overflow-hidden relative group cursor-pointer"
            style={{ animationPlayState: "inherit" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Gallery ${(i % images.length) + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
