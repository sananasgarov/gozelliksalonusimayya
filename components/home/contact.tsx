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
    <section id="contact" className="py-20 px-8   mx-auto w-full">
      <h2
        className="text-[#433459] text-[40px] leading-12 tracking-[-0.8px] mb-10"
        style={{ fontFamily: "var(--font-antonio)" }}
      >
        Contact Us
      </h2>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Map */}
        <div className="md:w-1/2 h-150 rounded-[20px] overflow-hidden shrink-0 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgMap}
            alt="Location map"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between h-150 flex-1 gap-8">
          {/* Phones + Social */}
          <div className="flex gap-5 items-start">
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-[#615a6a] text-[28px] font-medium leading-9 tracking-[-0.56px]">
                Phones
              </p>
              <p className="text-[#615a6a] text-xl leading-7 tracking-[-0.4px]">
                347-612-7994
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-[#615a6a] text-[28px] font-medium leading-9 tracking-[-0.56px]">
                Social Media
              </p>
              <div className="flex gap-7">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#615a6a] text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#615a6a] text-xl leading-7 tracking-[-0.4px] hover:text-[#433459] transition-colors"
                >
                  Tik Tok
                </a>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-3">
            <p className="text-[#615a6a] text-[28px] font-medium leading-9 tracking-[-0.56px]">
              Address
            </p>
            <p className="text-[#615a6a] text-xl leading-7 tracking-[-0.4px]">
              4624 Chatsworth Ave zip 15207
              <br />
              Pelsilvaniya, Pittsburgh
            </p>
          </div>

          {/* Work Schedule */}
          <div className="flex flex-col gap-3">
            <p className="text-[#615a6a] text-[28px] font-medium leading-9 tracking-[-0.56px]">
              Work Schedule
            </p>
            <div className="grid grid-cols-2 gap-x-5 gap-y-3">
              {workSchedule.map((s) => (
                <div key={s.day} className="flex flex-col gap-2">
                  <p className="text-[#958ca2] text-xl leading-7 tracking-[-0.4px]">
                    {s.day}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#615a6a] text-xl leading-7 tracking-[-0.4px] whitespace-nowrap">
                      {s.open}
                    </span>
                    <div className="bg-[#433459] h-px rounded-full mx-3 flex-1" />
                    <span className="text-[#615a6a] text-xl leading-7 tracking-[-0.4px] whitespace-nowrap">
                      {s.close}
                    </span>
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
