import { ogSize, ogContentType, renderOG } from "@/lib/og-template";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "MaRS Press & Media Kit";

export default async function OG() {
  return renderOG({
    channel: "Press · Media Kit",
    headline: "Everything press,",
    italic: "in one place",
    tail: ".",
  });
}
