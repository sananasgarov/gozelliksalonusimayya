import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SlideText from "@/components/slide-text";
import { publicFetch } from "@/lib/backend";

const tabs = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Booking Policy", href: "/booking-policy" },
];

type Section = { _id: string; title: string; body: string };

function renderBody(body: string) {
  const lines = body.split("\n");
  const groups: { type: "paragraph" | "bullets"; content: string[] }[] = [];
  let currentBullets: string[] = [];

  function flushBullets() {
    if (currentBullets.length > 0) {
      groups.push({ type: "bullets", content: [...currentBullets] });
      currentBullets = [];
    }
  }

  for (const line of lines) {
    if (line.startsWith("- ")) {
      currentBullets.push(line.slice(2));
    } else if (line.trim() === "") {
      flushBullets();
    } else {
      flushBullets();
      groups.push({ type: "paragraph", content: [line] });
    }
  }
  flushBullets();

  return groups.map((g, i) =>
    g.type === "bullets" ? (
      <ul key={i} className="flex flex-col gap-1">
        {g.content.map((item, j) => (
          <li key={j} className="flex items-start text-black text-base md:text-xl leading-7 tracking-[-0.4px]">
            <span className="inline-block size-1.5 rounded-full bg-[#433459] shrink-0 mr-3 mt-2.5" />
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <p key={i} className="text-black text-base md:text-xl leading-7 tracking-[-0.4px]">
        {g.content[0]}
      </p>
    )
  );
}

export default async function PrivacyPolicyPage() {
  const sections: Section[] = (await publicFetch("/api/legal/privacy")) ?? [];

  return (
    <div className="bg-[#f4f2ee] min-h-screen">
      <Navbar darkIcons />

      <div className="px-4 md:px-15 pt-28 md:pt-52 pb-16 md:pb-24 mx-auto">
        <div className="flex gap-6 mb-16 md:mb-30 flex-wrap">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="text-xl md:text-2xl font-medium leading-8 tracking-[-0.48px] transition-colors group"
              style={{ color: t.href === "/privacy-policy" ? "#9b6dff" : "#433459" }}
            >
              <SlideText>{t.label}</SlideText>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-13">
          <h1 className="text-[#433459] text-[32px] md:text-[40px] leading-12 tracking-[-0.8px]" style={{ fontFamily: "var(--font-antonio)" }}>
            Privacy Policy
          </h1>

          <div className="flex flex-col gap-13">
            {sections.map((s) => (
              <div key={s._id} className="flex flex-col gap-5">
                <h2 className="text-[#433459] text-[22px] md:text-[28px] font-medium leading-9 tracking-[-0.56px]">
                  {s.title}
                </h2>
                {renderBody(s.body)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
