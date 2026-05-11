import { ogSize, ogContentType, renderOG } from "@/lib/og-template";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "MaRS at IRC, ISDC, IRoC-U — competition results";

export default async function OG() {
  return renderOG({
    channel: "Competitions",
    headline: "Where the rover",
    italic: "earns",
    tail: " its name.",
  });
}
