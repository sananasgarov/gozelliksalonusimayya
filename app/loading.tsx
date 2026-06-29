export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        backgroundColor: "#f4f2ee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <span
          style={{
            fontFamily: "var(--font-great-vibes)",
            fontSize: "64px",
            lineHeight: 1,
            color: "#433459",
            marginRight: "-6px",
          }}
        >
          Samiyya
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logoblack.png"
          alt=""
          style={{ width: 44, height: 44, objectFit: "contain", marginTop: 2 }}
        />
      </div>
      <p
        style={{
          fontFamily: "var(--font-geist)",
          fontSize: "14px",
          color: "#9b8aaa",
          letterSpacing: "0.08em",
          fontWeight: 400,
        }}
      >
        Where Beauty Meets Elegance
      </p>
    </div>
  );
}
