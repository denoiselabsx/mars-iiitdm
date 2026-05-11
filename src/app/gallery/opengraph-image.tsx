import { ogSize, ogContentType, renderOG } from "@/lib/og-template";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "From the field — MaRS gallery";

export default async function OG() {
  return renderOG({
    channel: "Gallery",
    headline: "From the",
    italic: "field",
    tail: ".",
  });
}
