const brandLogos = [
  { src: "/brand1.png", alt: "MAC" },
  { src: "/brand1.png", alt: "HLDBEAUTY" },
  { src: "/brand1.png", alt: "MAYBELLINE" },
  { src: "/brand1.png", alt: "L'ORÉAL" },
  { src: "/brand1.png", alt: "ESTÉE LAUDER" },
  { src: "/brand1.png", alt: "NYX" },
];

export default function Brands() {
  return (
    <div className="w-full overflow-hidden py-16 md:py-35">
      <div className="flex gap-28 items-center animate-marquee whitespace-nowrap">
        {[...brandLogos, ...brandLogos].map((b, i) => (
          <img
            key={i}
            src={b.src}
            alt={b.alt}
            className="shrink-0 h-12 object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            style={{ width: 250 }}
          />
        ))}
      </div>
    </div>
  );
}
