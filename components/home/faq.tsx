"use client";

import { useState } from "react";

const faqs = [
  "How can I book an appointment?",
  "Do you offer bridal makeup services?",
  "Are your tools sanitized after each client?",
  "What payment methods do you accept?",
  "Can I cancel or reschedule my appointment?",
  "What beauty brands do you use?",
];

function FaqItem({ question, isOpen, onToggle }: { question: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-t border-[#433459]/50 last:border-b">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left text-[#615a6a] text-[28px] font-medium leading-9 tracking-[-0.56px] hover:text-[#433459] transition-colors"
      >
        {question}
        <span
          className="text-[#433459] text-3xl font-light shrink-0 ml-4 size-9 flex items-center justify-center transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isOpen ? "300px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 pb-6 text-[#615a6a] text-xl leading-7">
          Please contact us via our booking page or social media for detailed information.
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-8 mx-auto w-full">
      <h2
        className="text-[#433459] text-[40px] leading-12 tracking-[-0.8px] mb-8"
        style={{ fontFamily: "var(--font-antonio)" }}
      >
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col max-w-246.25 ml-auto">
        {faqs.map((q, i) => (
          <FaqItem
            key={i}
            question={q}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
