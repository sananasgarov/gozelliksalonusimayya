"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type TabKey = "privacy" | "terms" | "booking";

const tabs: { key: TabKey; label: string; href: string }[] = [
  { key: "privacy", label: "Privacy Policy", href: "/privacy-policy" },
  { key: "terms", label: "Terms & Conditions", href: "/terms" },
  { key: "booking", label: "Booking Policy", href: "/booking-policy" },
];

function Bullet() {
  return (
    <span className="inline-block size-1.5 rounded-full bg-[#433459] shrink-0 mr-3 mt-2.5" />
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-[#433459] text-[22px] md:text-[28px] font-medium leading-9 tracking-[-0.56px]">
        {title}
      </h2>
      {children}
    </div>
  );
}

function BodyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-black text-base md:text-xl leading-7 tracking-[-0.4px]">
      {children}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start text-black text-base md:text-xl leading-7 tracking-[-0.4px]">
          <Bullet />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  const [activeTab] = useState<TabKey>("privacy");

  return (
    <div className="bg-[#f4f2ee] min-h-screen">
      <Navbar darkIcons />

      <div className="px-4 md:px-15 pt-28 md:pt-52 pb-16 md:pb-24 mx-auto">

        {/* Tabs */}
        <div className="flex gap-6 mb-16 md:mb-30 flex-wrap">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              className="text-xl md:text-2xl font-medium leading-8 tracking-[-0.48px] transition-colors"
              style={{ color: activeTab === t.key ? "#9b6dff" : "#433459" }}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {/* Page Title */}
        <div className="flex flex-col gap-13">
          <h1
            className="text-[#433459] text-[32px] md:text-[40px] leading-12 tracking-[-0.8px]"
            style={{ fontFamily: "var(--font-antonio)" }}
          >
            Privacy Policy
          </h1>

          {/* Sections */}
          <div className="flex flex-col gap-13">

            <Section title="Introduction">
              <BodyText>
                At Samiyya, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect information provided by clients when booking or receiving our beauty services.
              </BodyText>
            </Section>

            <Section title="Information We Collect">
              <BodyText>We may collect the following information:</BodyText>
              <BulletList items={[
                "Full name",
                "Phone number",
                "Email address",
                "Appointment details",
                "Service preferences",
                "Communication history related to bookings and inquiries",
                "Customer reviews and feedback submitted through Google or other review platforms",
                "Photos and videos taken after services are completed, with the client's permission",
                "Portfolio and service-result images approved by clients for website, social media, and marketing purposes",
              ]} />
            </Section>

            <Section title="How We Use Your Information">
              <BodyText>Your information may be used to:</BodyText>
              <BulletList items={[
                "Schedule and manage appointments",
                "Confirm, modify, or cancel bookings",
                "Respond to inquiries and customer requests",
                "Provide beauty services",
                "Improve client experience and service quality",
                "Maintain business records",
                "Display customer reviews and testimonials",
                "Share approved photos and videos on our website, portfolio, social media platforms, and marketing materials",
              ]} />
            </Section>

            <Section title="Booking Communications">
              <BodyText>
                By contacting Samiyya through Instagram Direct Messages, phone calls, or text messages, you consent to receiving communications related to your appointment and requested services.
              </BodyText>
            </Section>

            <Section title="Information Sharing">
              <BodyText>
                We do not sell, rent, or trade your personal information to third parties.
              </BodyText>
              <BodyText>
                Information may only be disclosed when required by law or to protect the rights, safety, and security of our business and clients.
              </BodyText>
              <BodyText>
                {"Photos and videos of completed services will only be shared publicly with the client's permission. Clients may contact us at any time regarding the use of approved content."}
              </BodyText>
            </Section>

            <Section title="Data Security">
              <BodyText>
                We take reasonable measures to protect personal information from unauthorized access, misuse, or disclosure.
              </BodyText>
              <BodyText>
                However, no method of electronic communication or data storage can be guaranteed to be completely secure.
              </BodyText>
            </Section>

            <Section title="Your Rights">
              <BodyText>You may request to:</BodyText>
              <BulletList items={[
                "Access your personal information",
                "Correct inaccurate information",
                "Request deletion of personal information where legally permitted",
              ]} />
              <BodyText>
                Requests can be submitted using the contact information provided below.
              </BodyText>
            </Section>

            <Section title="Contact Information">
              <BodyText>4624 Chatsworth Ave, Pittsburgh, PA 15207, USA</BodyText>
              <BodyText>Phone: 347-612-7994</BodyText>
              <BodyText>Email: samiyya@gmail.com</BodyText>
            </Section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
