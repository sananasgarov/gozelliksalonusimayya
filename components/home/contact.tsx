import Image from "next/image";
import SlideText from "@/components/slide-text";

const imgMap = "/map.png";

type ContactInfo = {
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  mapUrl: string;
  instagram: string;
  tiktok: string;
  facebook: string;
};

type WorkHour = { day: string; openTime: string; closeTime: string };

type ContactData = { info: ContactInfo; hours: WorkHour[] };

const FALLBACK_INFO: ContactInfo = {
  phone: "347-612-7994",
  phoneHref: "tel:+13476127994",
  email: "",
  address: "4624 Chatsworth Ave zip 15207, Pennsylvania, Pittsburgh",
  mapUrl: "https://maps.google.com/?q=4624+Chatsworth+Ave+Pittsburgh+PA+15207",
  instagram: "https://www.instagram.com/samiyya.studio",
  tiktok: "https://www.tiktok.com/@samiyya.studio",
  facebook: "https://www.facebook.com/samiyya.studio",
};

const FALLBACK_HOURS: WorkHour[] = [
  { day: "Mon", openTime: "9:00 AM", closeTime: "6:00 PM" },
  { day: "Tue", openTime: "9:00 AM", closeTime: "6:00 PM" },
  { day: "Wed", openTime: "9:00 AM", closeTime: "6:00 PM" },
  { day: "Thu", openTime: "9:00 AM", closeTime: "6:00 PM" },
  { day: "Fri", openTime: "9:00 AM", closeTime: "6:00 PM" },
  { day: "Sat", openTime: "9:00 AM", closeTime: "6:00 PM" },
];

export default function Contact({ contact }: { contact?: ContactData | null }) {
  const info: ContactInfo = contact?.info ?? FALLBACK_INFO;
  const hours: WorkHour[] = contact?.hours && contact.hours.length > 0 ? contact.hours : FALLBACK_HOURS;

  return (
    <section id="contact" className="py-20 md:py-35 px-4 md:px-15 w-full">
      <h2
        className="text-[#433459] text-[32px] md:text-[40px] leading-10 md:leading-12 tracking-[-0.8px] mb-8 md:mb-10"
        style={{ fontFamily: "var(--font-antonio)" }}
        data-aos="fade-up"
        suppressHydrationWarning
      >
        Contact Us
      </h2>

      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center">
        {/* Map */}
        <div className="w-full md:w-1/2 h-72 md:h-120 rounded-[20px] overflow-hidden shrink-0 relative" data-aos="fade-up" suppressHydrationWarning>
          <Image src={imgMap} alt="Location map" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-8 flex-1">
          {/* Phones + Social */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-5 items-start" data-aos="fade-up" data-aos-delay="100" suppressHydrationWarning>
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-[#615a6a] text-xl md:text-[28px] font-medium leading-8 tracking-[-0.56px]">
                Phones
              </p>
              {info.phoneHref && (
                <a href={info.phoneHref} className="text-[#615a6a] text-base md:text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors group block">
                  <SlideText>{info.phone}</SlideText>
                </a>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-[#615a6a] text-xl md:text-[28px] font-medium leading-8 tracking-[-0.56px]">
                Social Media
              </p>
              <div className="flex gap-8 justify-between">
                {info.instagram && (
                  <a href={info.instagram} target="_blank" rel="noopener noreferrer"
                    className="text-[#615a6a] text-base md:text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors group">
                    <SlideText>Instagram</SlideText>
                  </a>
                )}
                {info.tiktok && (
                  <a href={info.tiktok} target="_blank" rel="noopener noreferrer"
                    className="text-[#615a6a] text-base md:text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors group">
                    <SlideText>Tik Tok</SlideText>
                  </a>
                )}
                {info.facebook && (
                  <a href={info.facebook} target="_blank" rel="noopener noreferrer"
                    className="text-[#615a6a] text-base md:text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors group">
                    <SlideText>Facebook</SlideText>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2" data-aos="fade-up" data-aos-delay="200" suppressHydrationWarning>
            <p className="text-[#615a6a] text-xl md:text-[28px] font-medium leading-8 tracking-[-0.56px]">
              Address
            </p>
            {info.address && (
              <a
                href={info.mapUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#615a6a] text-base md:text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors group block"
              >
                <SlideText>{info.address}</SlideText>
              </a>
            )}
          </div>

          {/* Work Schedule */}
          <div className="flex flex-col gap-3" data-aos="fade-up" data-aos-delay="300" suppressHydrationWarning>
            <p className="text-[#615a6a] text-xl md:text-[28px] font-medium leading-8 tracking-[-0.56px]">
              Work Schedule
            </p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3">
              {hours.map((s, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <p className="text-[#958ca2] text-base md:text-xl leading-7 tracking-[-0.4px]">{s.day}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#615a6a] text-sm md:text-xl leading-7 tracking-[-0.4px] whitespace-nowrap">{s.openTime}</span>
                    <div className="bg-[#433459] h-px rounded-full mx-2 flex-1" />
                    <span className="text-[#615a6a] text-sm md:text-xl leading-7 tracking-[-0.4px] whitespace-nowrap">{s.closeTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
