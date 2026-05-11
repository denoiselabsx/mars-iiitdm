import { ogSize, ogContentType, renderOG } from "@/lib/og-template";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "MaRS Rovers — Rudra, Shaurya, Khoj, Vetri, Lakshya, Destiny";

export default async function OG() {
  return renderOG({
    channel: "Rovers",
    headline: "Built from the chassis up,",
    italic: "in-house",
    tail: ".",
  });
}
