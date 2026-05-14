"use client";

import { usePathname } from "next/navigation";
import { DenoiseMark } from "./denoise-mark";
import { site } from "@/lib/site";

export function DenoiseBadge() {
  const pathname = usePathname();
  if (pathname === "/credits") return null;

  return (
    <a
      href={site.agency.url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Built by ${site.agency.name}`}
      className="group fixed bottom-4 left-4 z-40 hidden md:inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)]/60 bg-[color:var(--color-void)]/70 px-3 py-1.5 backdrop-blur-md shadow-[0_2px_24px_-12px_rgba(0,0,0,0.7)] transition-all duration-500 hover:border-[color:var(--color-mars)]/40 hover:bg-[color:var(--color-void)]/90"
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-faint)] group-hover:text-[color:var(--color-muted)] transition-colors">
        built by
      </span>
      <span className="opacity-80 group-hover:opacity-100 transition-opacity">
        <DenoiseMark height={14} />
      </span>
    </a>
  );
}
