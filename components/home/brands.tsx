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

  return (
    <div className="w-full overflow-hidden py-10">
      <div className="flex gap-28 items-center animate-marquee whitespace-nowrap">
        {[...items, ...items].map((b, i) => (
          <img
            key={i}
            src={b.logoUrl || "/brand1.png"}
            alt={b.name}
            className="shrink-0 h-7.5 object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            style={{ width: 250 }}
          />
        ))}
      </div>
    </div>
  );
}
