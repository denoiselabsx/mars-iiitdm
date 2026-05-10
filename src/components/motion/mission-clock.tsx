"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// MaRS founding date — placeholder. Update to actual founding date when confirmed.
const EPOCH = new Date("2020-08-15T00:00:00+05:30").getTime();

function format(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(days).padStart(4, "0")}:${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function MissionClock({ className, prefix = "T+" }: { className?: string; prefix?: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const display = now ? format(now - EPOCH) : "----:--:--:--";

  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.18em] tabular-nums text-[color:var(--color-muted)]",
        className,
      )}
      suppressHydrationWarning
    >
      <span className="text-[color:var(--color-mars)]">{prefix}</span>{" "}
      {display}
    </span>
  );
}
