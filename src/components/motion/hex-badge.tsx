import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  size?: number;
  tone?: "default" | "mars" | "signal" | "live";
  className?: string;
};

const tones = {
  default: "text-[color:var(--color-muted)] border-[color:var(--color-line)]",
  mars: "text-[color:var(--color-mars)] border-[color:var(--color-mars)]/50",
  signal: "text-[color:var(--color-signal)] border-[color:var(--color-signal)]/50",
  live: "text-[#5cf2b0] border-[#5cf2b0]/50",
};

export function HexBadge({ children, size = 32, tone = "default", className }: Props) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.12em] leading-none",
        tones[tone],
        className,
      )}
      style={{
        width: size,
        height: size,
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "currentColor",
          opacity: 0.08,
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}
