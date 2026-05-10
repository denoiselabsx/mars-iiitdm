import { cn } from "@/lib/utils";

type Props = {
  channel: string;
  children: React.ReactNode;
  live?: boolean;
  className?: string;
};

export function TelemetryLabel({ channel, children, live = false, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)]",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {live && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5cf2b0] opacity-60" />
        )}
        <span
          className={cn(
            "relative inline-flex h-1.5 w-1.5 rounded-full",
            live ? "bg-[#5cf2b0]" : "bg-[color:var(--color-mars)]",
          )}
        />
      </span>
      <span className="text-[color:var(--color-mars)]">{channel}</span>
      <span aria-hidden className="h-px w-6 bg-[color:var(--color-line)]" />
      <span className="text-[color:var(--color-muted)]">{children}</span>
    </span>
  );
}
