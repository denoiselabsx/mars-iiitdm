import { ogSize, ogContentType, renderOG } from "@/lib/og-template";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "MaRS Alumni — engineers who came through the pipeline";

export default async function OG() {
  return renderOG({
    channel: "Alumni",
    headline: "Where MaRS engineers",
    italic: "go next",
    tail: ".",
  });
}
