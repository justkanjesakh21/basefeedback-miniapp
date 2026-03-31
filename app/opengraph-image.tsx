import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(180deg, #fff8ef 0%, #f3eadb 100%)",
          color: "#1e2430",
          padding: "54px",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#6c7480",
          }}
        >
          Feedback Mini App
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: "-0.06em" }}>
            BaseFeedback
          </div>
          <div style={{ fontSize: 34, color: "#4d5766", maxWidth: 900 }}>
            Submit short feedback notes to Base Mainnet with a clean mobile-first flow.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 999,
                background: "#2274ff",
              }}
            />
            Input first
          </div>
          <div>basefeedback-miniapp.vercel.app</div>
        </div>
      </div>
    ),
    size,
  );
}
