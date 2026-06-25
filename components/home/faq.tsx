"use client";

import { useState } from "react";

const faqs = [
  { q: "How can I book an appointment?", a: "You can book an appointment through our booking page, Instagram DMs, or by calling us directly. We'll confirm your slot within 24 hours." },
  { q: "Do you offer bridal makeup services?", a: "Yes! We specialize in bridal makeup and offer packages for weddings, engagement shoots, and pre-wedding events." },
  { q: "Are your tools sanitized after each client?", a: "Absolutely. All brushes, sponges, and tools are thoroughly sanitized between each appointment to ensure hygiene and safety." },
  { q: "What payment methods do you accept?", a: "We accept cash, credit/debit cards, and major mobile payment apps. Payment is collected at the end of the session." },
  { q: "Can I cancel or reschedule my appointment?", a: "Yes, cancellations or reschedules are accepted up to 24 hours before your appointment with no extra charge." },
  { q: "What beauty brands do you use?", a: "We use professional-grade brands including MAC, Estée Lauder, L'Oréal, Maybelline, NYX, and more." },
];

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-t border-[#433459]/40 last:border-b">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-6 px-2 text-left group"
      >
        <span
          className="text-[#615a6a] text-[24px] font-medium leading-8 tracking-[-0.48px] transition-colors duration-300 group-hover:text-[#433459]"
        >
          {q}
        </span>
        <span
          className="shrink-0 size-8 rounded-full border border-[#433459]/40 flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: isOpen ? "#433459" : "transparent",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="1" x2="7" y2="13" stroke={isOpen ? "#fff" : "#433459"} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="1" y1="7" x2="13" y2="7" stroke={isOpen ? "#fff" : "#433459"} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* Grid trick for smooth auto-height animation */}
      <div
        className="grid transition-all duration-500 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-2 pb-6 text-[#615a6a] text-lg leading-7 tracking-[-0.36px]">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-20 px-4 md:px-15 w-full">
      <h2
        className="text-[#433459] text-[28px] md:text-[40px] leading-9 md:leading-12 tracking-[-0.8px] mb-6 md:mb-8"
        style={{ fontFamily: "var(--font-antonio)" }}
      >
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col w-full md:max-w-246.25 md:ml-auto">
        {faqs.map((item, i) => (
          <FaqItem
            key={i}
            q={item.q}
            a={item.a}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
