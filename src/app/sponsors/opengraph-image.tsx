import { ogSize, ogContentType, renderOG } from "@/lib/og-template";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Partner with MaRS — Sponsorship";

export default async function OG() {
  return renderOG({
    channel: "Sponsors",
    headline: "Power the",
    italic: "next rover",
    tail: ".",
  });
}
