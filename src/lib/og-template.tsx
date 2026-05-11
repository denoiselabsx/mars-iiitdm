import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderOG({
  channel,
  headline,
  italic,
  tail,
  meta = "marsiiitdm.vercel.app",
}: {
  channel: string;
  headline: string;
  italic?: string;
  tail?: string;
  meta?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(ellipse 80% 70% at 50% 110%, #c1440e44 0%, transparent 60%), #08080c",
          color: "#f5f2ee",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Top: signature */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "20px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#a4a3ad",
          }}
        >
          <div style={{ width: "40px", height: "1px", background: "#c1440e" }} />
          MaRS · {channel}
        </div>

        {/* Middle: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: "108px",
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              color: "#f5f2ee",
            }}
          >
            {headline}
          </div>
          {italic && (
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "108px",
                fontWeight: 400,
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
                color: "#c1440e",
              }}
            >
              {italic}
              {tail && (
                <span style={{ fontFamily: "system-ui", fontStyle: "normal", color: "#f5f2ee" }}>
                  {tail}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom: meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: "22px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#5d5d6a",
          }}
        >
          <span>IIITDM Kancheepuram</span>
          <span>{meta}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
