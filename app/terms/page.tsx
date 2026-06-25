"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const tabs = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Booking Policy", href: "/booking-policy" },
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

export default function TermsPage() {
  return (
    <div className="bg-[#f4f2ee] min-h-screen">
      <Navbar darkIcons />

      <div className="px-4 md:px-15 pt-28 md:pt-52 pb-16 md:pb-24 mx-auto">

        {/* Tabs */}
        <div className="flex gap-6 mb-16 md:mb-30 flex-wrap">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="text-xl md:text-2xl font-medium leading-8 tracking-[-0.48px] transition-colors"
              style={{ color: t.href === "/terms" ? "#9b6dff" : "#433459" }}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {/* Page Title + Sections */}
        <div className="flex flex-col gap-13">
          <h1
            className="text-[#433459] text-[32px] md:text-[40px] leading-12 tracking-[-0.8px]"
            style={{ fontFamily: "var(--font-antonio)" }}
          >
            Terms & Conditions
          </h1>

          <div className="flex flex-col gap-13">

            <Section title="Agreement">
              <BodyText>
                By booking an appointment, contacting Samiyya, or receiving any service, you agree to these Terms & Conditions.
              </BodyText>
            </Section>

            <Section title="Services">
              <BodyText>Samiyya provides professional beauty services including:</BodyText>
              <BulletList items={[
                "Simple Hairstyling Services (including soft curls, waves, straightening, and other simple styles that complement makeup)",
                "Nail Services",
                "Makeup Services",
              ]} />
              <BodyText>Services may be provided:</BodyText>
              <BulletList items={[
                "At our home studio",
                "As a mobile beauty service at the client's home, hotel, or event location",
              ]} />
              <BodyText>
                Mobile services are subject to location and scheduling availability, and additional travel fees may apply depending on the distance and location.
              </BodyText>
              <BodyText>
                Studio appointments may be offered at a lower rate since no travel is required.
              </BodyText>
            </Section>

            <Section title="Appointment Booking">
              <BodyText>Appointments can be requested through:</BodyText>
              <BulletList items={[
                "Instagram Direct Message",
                "Phone Call",
                "Text Message",
              ]} />
              <BodyText>
                Appointments are considered confirmed only after approval by Samiyya and receipt of the required non-refundable deposit.
              </BodyText>
            </Section>

            <Section title="Deposit Requirement">
              <BodyText>
                A non-refundable deposit of $50 is required to secure an appointment.
              </BodyText>
            </Section>

            <Section title="Payments">
              <BodyText>Accepted payment methods:</BodyText>
              <BulletList items={[
                "Cash",
                "Zelle",
                "Cash App",
                "Apple Pay",
              ]} />
              <BodyText>
                The remaining balance must be paid on the day the service is provided.
              </BodyText>
            </Section>

            <Section title="Cancellations">
              <BodyText>Deposits are non-refundable.</BodyText>
              <BodyText>
                {"Clients must provide at least 48 hours' notice for cancellation or rescheduling requests."}
              </BodyText>
              <BodyText>
                Rescheduling requests are subject to appointment availability.
              </BodyText>
              <BodyText>
                Late cancellations or failure to attend an appointment may result in the loss of the deposit.
              </BodyText>
            </Section>

            <Section title="Late Arrivals">
              <BodyText>
                Clients arriving more than 15 minutes late may be required to reschedule their appointment or may receive a shortened service time based on availability.
              </BodyText>
            </Section>

            <Section title="Client Responsibilities">
              <BodyText>Clients are responsible for:</BodyText>
              <BulletList items={[
                "Providing accurate booking information",
                "Arriving on time for appointments",
                "Arriving with a clean face free of makeup whenever possible",
                "Informing Samiyya in advance about any allergies, skin sensitivities, or special concerns",
                "Communicating any service concerns during the appointment",
              ]} />
            </Section>

            <Section title="Photography & Content Usage">
              <BodyText>
                {"Photos and videos of completed services may be taken for portfolio and social media purposes. Content will only be publicly shared with the client's permission."}
              </BodyText>
            </Section>

            <Section title="Refund Policy">
              <BodyText>All deposits are non-refundable.</BodyText>
              <BodyText>No refunds will be issued for completed services.</BodyText>
            </Section>

            <Section title="Intellectual Property">
              <BodyText>
                All content displayed on this website, including text, images, logos, branding, designs, and other materials, remains the property of Samiyya and may not be copied, reproduced, or used without permission.
              </BodyText>
            </Section>

            <Section title="Limitation of Liability">
              <BodyText>
                Samiyya is not responsible for issues resulting from inaccurate information provided by clients, undisclosed allergies or sensitivities, or circumstances beyond our reasonable control.
              </BodyText>
            </Section>

            <Section title="Changes to Terms">
              <BodyText>
                Samiyya reserves the right to modify these Terms & Conditions at any time without prior notice.
              </BodyText>
            </Section>

            <Section title="Governing Law">
              <BodyText>
                These Terms & Conditions are governed by the laws of Pennsylvania, United States.
              </BodyText>
            </Section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
