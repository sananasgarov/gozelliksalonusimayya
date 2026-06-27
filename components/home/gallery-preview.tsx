import Image from "next/image";

type GalleryItem = { imageUrl: string; altText: string };

const FALLBACK: GalleryItem[] = Array(6).fill(null).map((_, i) => ({
  imageUrl: "/gallery-1.png",
  altText: `Gallery photo ${i + 1}`,
}));

export default function GalleryPreview({ images }: { images?: GalleryItem[] | null }) {
  const items = images && images.length > 0 ? images : FALLBACK;

  return (
    <section id="gallery" className="pt-25 pb-25 w-full overflow-hidden">
      <h2
        className="text-[#433459] text-[28px] md:text-[40px] leading-9 md:leading-12 tracking-[-0.8px] mb-6 md:mb-8 px-4 md:px-15"
        style={{ fontFamily: "var(--font-antonio)" }}
      >
        Gallery Preview
      </h2>

      <div className="flex gap-5 animate-gallery-scroll w-max">
        {[...items, ...items].map((img, i) => (
          <div
            key={i}
            className="shrink-0 w-44 sm:w-56 md:w-78.75 h-60 sm:h-80 md:h-118.25 rounded-[20px] overflow-hidden relative group cursor-pointer"
          >
            <Image
              src={img.imageUrl}
              alt={img.altText || `Gallery photo ${(i % items.length) + 1}`}
              fill
              sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 315px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
