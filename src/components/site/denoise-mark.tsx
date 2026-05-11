import { cn } from "@/lib/utils";

type Props = {
  /** Render height in pixels. Wordmark scales proportionally. */
  height?: number;
  className?: string;
  /** Visual style. "plate" keeps the rounded-square black plate (PNG). "minimal" is plateless inline-SVG mark + wordmark. */
  variant?: "plate" | "minimal";
};

/**
 * Denoise Labs horizontal lockup.
 *
 * `minimal` (default) — plateless: inline-SVG mark + wordmark in current text color.
 * Works on any background, inherits color from CSS, scales perfectly.
 *
 * `plate` — uses the PNG with its rounded-square black plate, for stand-alone moments.
 */
export function DenoiseMark({ height = 18, className, variant = "minimal" }: Props) {
  if (variant === "plate") {
    const width = Math.round(height * 6.13);
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand/logo_light_x.png"
        alt="Denoise Labs"
        width={width * 2}
        height={height * 2}
        className={className}
        style={{ height, width: "auto" }}
      />
    );
  }

  // Minimal: SVG mark + wordmark, inherits currentColor
  return (
    <span
      className={cn("inline-flex items-center gap-2 align-middle", className)}
      style={{ height }}
      aria-label="Denoise Labs"
      role="img"
    >
      <svg
        viewBox="0 0 32 32"
        width={height}
        height={height}
        aria-hidden
        focusable="false"
        style={{ display: "block" }}
      >
        {/* Outer square frame */}
        <rect
          x="2"
          y="2"
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        {/* Horizontal centerline */}
        <line x1="2" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1.6" />
        {/* Top half-circle (outlined) */}
        <path
          d="M 2 16 A 14 14 0 0 1 30 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        {/* Bottom half-circle (filled) */}
        <path d="M 2 16 A 14 14 0 0 0 30 16 Z" fill="currentColor" />
      </svg>
      <span
        className="font-sans tracking-[-0.01em] leading-none"
        style={{
          fontSize: height * 0.85,
          fontWeight: 600,
        }}
      >
        denoise <span style={{ fontStyle: "italic", fontWeight: 500 }}>labs</span>
      </span>
    </span>
  );
}
