import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MaRS — Mars Rover Students Club · IIITDM Kancheepuram";

export default async function OG() {
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
            "radial-gradient(ellipse 80% 70% at 50% 110%, #d6382844 0%, transparent 60%), #08080c",
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
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "#d63828",
            }}
          />
          MaRS · IIITDM Kancheepuram
        </div>

        {/* Middle: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
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
            India&rsquo;s student
          </div>
          <div
            style={{
              fontSize: "108px",
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              color: "#f5f2ee",
              display: "flex",
              alignItems: "baseline",
              gap: "16px",
            }}
          >
            <span>rover team.</span>
            <span
              style={{
                fontStyle: "italic",
                color: "#d63828",
                fontWeight: 400,
                fontFamily: "Georgia, serif",
                fontSize: "100px",
              }}
            >
              &mdash;
            </span>
          </div>
        </div>

        {/* Bottom: stats + url */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: "22px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#a4a3ad",
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            <span>
              10<sup style={{ fontSize: "12px" }}>th</sup> · IRC 2026
            </span>
            <span style={{ color: "#5d5d6a" }}>·</span>
            <span>
              9<sup style={{ fontSize: "12px" }}>th</sup> · ISDC 2026
            </span>
          </div>
          <div style={{ color: "#5d5d6a" }}>marsiiitdm.vercel.app</div>
        </div>
      </div>
    ),
    size,
  );
}
