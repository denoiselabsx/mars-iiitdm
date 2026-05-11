import { ogSize, ogContentType, renderOG } from "@/lib/og-template";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Team Shunya — 40+ engineers";

export default async function OG() {
  return renderOG({
    channel: "Team",
    headline: "Forty engineers,",
    italic: "one rover",
    tail: ".",
  });
}
