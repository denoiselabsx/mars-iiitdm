import { ogSize, ogContentType, renderOG } from "@/lib/og-template";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "How marsiiitdm.in was built — colophon by Denoise Labs";

export default async function OG() {
  return renderOG({
    channel: "Credits",
    headline: "How this site was",
    italic: "made",
    tail: ".",
  });
}
