"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SlideText from "@/components/slide-text";

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

export default function BookingPolicyPage() {
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
              style={{ color: t.href === "/booking-policy" ? "#9b6dff" : "#433459" }}
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
            Booking Policy
          </h1>

          <div className="flex flex-col gap-13">

            <Section title="Appointment Booking">
              <BodyText>Appointments may be requested through:</BodyText>
              <BulletList items={[
                "Instagram Direct Message",
                "Phone Call",
                "Text Message",
              ]} />
              <BodyText>
                Appointments are considered confirmed only after approval by Samiyya and receipt of the required non-refundable deposit.
              </BodyText>
            </Section>

            <Section title="Deposit Policy">
              <BodyText>
                A non-refundable deposit of $50 is required for all appointments.
              </BodyText>
            </Section>

            <Section title="Services">
              <BodyText>
                Services are available both at our home studio and as a mobile beauty service.
              </BodyText>
            </Section>

            <Section title="Studio Appointments">
              <BodyText>
                Clients are welcome to book appointments at the home studio. Studio appointments may be offered at a lower rate as no travel is required.
              </BodyText>
            </Section>

            <Section title="Mobile Services">
              <BodyText>
                Mobile makeup services are available for clients who prefer to receive services at their home, hotel, or event location.
              </BodyText>
              <BodyText>
                Mobile services are subject to location and scheduling availability. Additional travel fees may apply depending on the distance and location.
              </BodyText>
            </Section>

            <Section title="Payments">
              <BodyText>The remaining balance is due on the day of the service.</BodyText>
              <BodyText>Accepted payment methods include:</BodyText>
              <BulletList items={[
                "Cash",
                "Zelle",
                "Cash App",
                "Apple Pay",
              ]} />
            </Section>

            <Section title="Cancellation Policy">
              <BodyText>All deposits are non-refundable.</BodyText>
              <BodyText>
                {"If you need to cancel or reschedule your appointment, at least 48 hours' notice is required."}
              </BodyText>
              <BodyText>Rescheduling requests are subject to availability.</BodyText>
              <BodyText>
                Late cancellations or failure to attend an appointment may result in the loss of your deposit.
              </BodyText>
            </Section>

            <Section title="Late Arrival Policy">
              <BodyText>
                Clients are allowed a maximum grace period of 15 minutes.
              </BodyText>
              <BodyText>
                Clients arriving more than 15 minutes late may be required to reschedule their appointment or may receive a shortened service time depending on the remaining appointment time.
              </BodyText>
            </Section>

            <Section title="Client Preparation">
              <BodyText>To achieve the best possible results, clients should:</BodyText>
              <BulletList items={[
                "Arrive with a clean face free of makeup whenever possible",
                "Inform Samiyya in advance of any allergies, skin sensitivities, or special concerns",
                "Communicate any questions or concerns before or during the appointment",
              ]} />
            </Section>

            <Section title="Satisfaction & Service Concerns">
              <BodyText>
                Client satisfaction is important. Any concerns regarding the service should be communicated during the appointment so that reasonable adjustments can be made when possible.
              </BodyText>
            </Section>

            <Section title="Contact Information">
              <BodyText>Phone: <a href="tel:+13476127994" className="hover:text-[#433459] transition-colors group"><SlideText>347-612-7994</SlideText></a></BodyText>
              <BodyText>Email: <a href="mailto:samiyya@gmail.com" className="hover:text-[#433459] transition-colors group"><SlideText>samiyya@gmail.com</SlideText></a></BodyText>
            </Section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
