import { ImageResponse } from "next/og";

export const alt = "Your agency's AI department. Cole Bonawitz, Durham, NC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const steps = ["Choose", "Connect", "Run", "Keep current"];

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#ffffff",
          backgroundImage: "radial-gradient(circle at 1px 1px, #e4e4e7 1.5px, transparent 0)",
          backgroundSize: "28px 28px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#71717a" }}>
          <div style={{ width: 12, height: 12, borderRadius: 99, background: "#16a34a" }} />
          colebonawitz.com
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, color: "#0a0a0a", lineHeight: 1.02 }}>
            Your agency&apos;s
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, color: "#a1a1aa", lineHeight: 1.02 }}>
            AI department.
          </div>
          <div style={{ fontSize: 30, color: "#3f3f46", marginTop: 28 }}>
            Cole Bonawitz · Durham, NC
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  display: "flex",
                  padding: "12px 20px",
                  borderRadius: 14,
                  border: i === 3 ? "2px solid #2f5bff" : "2px solid #e4e4e7",
                  background: "#fff",
                  fontSize: 24,
                  color: "#0a0a0a",
                }}
              >
                {s}
              </div>
              {i < steps.length - 1 && <div style={{ width: 28, height: 2, background: "#2f5bff" }} />}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
