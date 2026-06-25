import SlideText from "@/components/slide-text";

const imgMap = "/map.png";

const workSchedule = [
  { day: "Mon", open: "9:00 AM", close: "6:00 PM" },
  { day: "Thu", open: "9:00 AM", close: "6:00 PM" },
  { day: "Tue", open: "9:00 AM", close: "6:00 PM" },
  { day: "Fri", open: "9:00 AM", close: "6:00 PM" },
  { day: "Wed", open: "9:00 AM", close: "6:00 PM" },
  { day: "Sat", open: "9:00 AM", close: "6:00 PM" },
];

export default function Contact() {
  return (
    <section id="contact" className="pt-25 pb-25 px-4 md:px-15 w-full">
      <h2
        className="text-[#433459] text-[32px] md:text-[40px] leading-10 md:leading-12 tracking-[-0.8px] mb-8 md:mb-10"
        style={{ fontFamily: "var(--font-antonio)" }}
        data-aos="fade-up"
      >
        Contact Us
      </h2>

      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
        {/* Map */}
        <div className="w-full md:w-1/2 h-72 md:h-120 rounded-[20px] overflow-hidden shrink-0 relative" data-aos="fade-up">
          <img src={imgMap} alt="Location map" className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-8 flex-1">
          {/* Phones + Social */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-5 items-start" data-aos="fade-up" data-aos-delay="100">
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-[#615a6a] text-xl md:text-[28px] font-medium leading-8 tracking-[-0.56px]">
                Phones
              </p>
              <a href="tel:+13476127994" className="text-[#615a6a] text-base md:text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors group block">
                <SlideText>347-612-7994</SlideText>
              </a>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-[#615a6a] text-xl md:text-[28px] font-medium leading-8 tracking-[-0.56px]">
                Social Media
              </p>
              <div className="flex gap-7">
                <a href="https://www.instagram.com/samiyya.studio" target="_blank" rel="noopener noreferrer"
                  className="text-[#615a6a] text-base md:text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors group">
                  <SlideText>Instagram</SlideText>
                </a>
                <a href="https://www.tiktok.com/@samiyya.studio" target="_blank" rel="noopener noreferrer"
                  className="text-[#615a6a] text-base md:text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors group">
                  <SlideText>Tik Tok</SlideText>
                </a>
                <a href="https://www.facebook.com/samiyya.studio" target="_blank" rel="noopener noreferrer"
                  className="text-[#615a6a] text-base md:text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors group">
                  <SlideText>Facebook</SlideText>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2" data-aos="fade-up" data-aos-delay="200">
            <p className="text-[#615a6a] text-xl md:text-[28px] font-medium leading-8 tracking-[-0.56px]">
              Address
            </p>
            <a
              href="https://maps.google.com/?q=4624+Chatsworth+Ave+Pittsburgh+PA+15207"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#615a6a] text-base md:text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors group block"
            >
              <SlideText>4624 Chatsworth Ave zip 15207, Pennsylvania, Pittsburgh</SlideText>
            </a>
          </div>

          {/* Work Schedule */}
          <div className="flex flex-col gap-3" data-aos="fade-up" data-aos-delay="300">
            <p className="text-[#615a6a] text-xl md:text-[28px] font-medium leading-8 tracking-[-0.56px]">
              Work Schedule
            </p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3">
              {workSchedule.map((s) => (
                <div key={s.day} className="flex flex-col gap-1">
                  <p className="text-[#958ca2] text-base md:text-xl leading-7 tracking-[-0.4px]">{s.day}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#615a6a] text-sm md:text-xl leading-7 tracking-[-0.4px] whitespace-nowrap">{s.open}</span>
                    <div className="bg-[#433459] h-px rounded-full mx-2 flex-1" />
                    <span className="text-[#615a6a] text-sm md:text-xl leading-7 tracking-[-0.4px] whitespace-nowrap">{s.close}</span>
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
