import LogoutButton from "@/components/admin/logout-button";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f4f2ee" }}>
      <header
        className="flex items-center justify-between px-8 py-5"
        style={{ backgroundColor: "#d9caea" }}
      >
        <div className="flex items-start">
          <span
            className="text-[#433459] text-[32px] leading-none -mr-0.5"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            Samiyya
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logoblack.png" alt="" className="w-7 h-7 object-contain mt-0.5" />
          <span className="ml-3 text-[#615a6a] text-sm self-end mb-0.5">Admin Panel</span>
        </div>

        <LogoutButton />
      </header>

      <main className="px-8 py-10">
        <h1
          className="text-[#433459] text-[32px] md:text-[40px] leading-12 tracking-[-0.8px] mb-8"
          style={{ fontFamily: "var(--font-antonio)" }}
        >
          Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { label: "Total Bookings", value: "—" },
            { label: "Active Services", value: "36" },
            { label: "Gallery Images", value: "—" },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-[20px] px-6 py-7 flex flex-col gap-2"
              style={{ backgroundColor: "#d9caea" }}
            >
              <p className="text-[#615a6a] text-sm tracking-[-0.28px]">{card.label}</p>
              <p
                className="text-[#433459] text-[40px] leading-none tracking-[-1.6px]"
                style={{ fontFamily: "var(--font-antonio)" }}
              >
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
