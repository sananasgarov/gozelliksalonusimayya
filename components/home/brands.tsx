type BrandItem = { name: string; logoUrl: string };

const FALLBACK: BrandItem[] = [
  { name: "MAC", logoUrl: "/brand1.png" },
  { name: "HLDBEAUTY", logoUrl: "/brand1.png" },
  { name: "MAYBELLINE", logoUrl: "/brand1.png" },
  { name: "L'ORÉAL", logoUrl: "/brand1.png" },
  { name: "ESTÉE LAUDER", logoUrl: "/brand1.png" },
  { name: "NYX", logoUrl: "/brand1.png" },
];

export default function Brands({ brands }: { brands?: BrandItem[] | null }) {
  const items = brands && brands.length > 0 ? brands : FALLBACK;
  const track = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden py-18 md:py-10">
      <div className="flex items-center animate-marquee" style={{ width: "max-content" }}>
        {track.map((b, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={b.logoUrl || "/brand1.png"}
            alt={b.name}
            className="shrink-0 h-7.5 object-contain transition-transform duration-300 hover:scale-125 cursor-pointer"
            style={{ width: 200, marginRight: "7rem" }}
          />
        ))}
      </div>
    </div>
  );
}
