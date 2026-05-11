import { ogSize, ogContentType, renderOG } from "@/lib/og-template";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Apply to MaRS or partner as a sponsor";

export default async function OG() {
  return renderOG({
    channel: "Join · Support",
    headline: "Build with us",
    italic: "— or back us",
    tail: ".",
  });
}
