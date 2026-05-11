import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  /** Render size in pixels (height). Width auto-scales. */
  height?: number;
  className?: string;
  /** "auto" picks variant based on scene token; "dark" / "light" forces it. */
  variant?: "auto" | "dark" | "light";
};

/**
 * Denoise Labs horizontal lockup.
 *
 * Two variants exist:
 *   - logo_light_x.png : white logo on black plate    → use on DARK surfaces
 *   - logo_dark_x.png  : black logo on light plate    → use on LIGHT surfaces
 *
 * In "auto" mode both variants render and CSS shows the correct one based on
 * the `data-scene` attribute set by SceneController:
 *   - scene-void  | scene-dusk → dark site → show LIGHT lockup
 *   - scene-bright             → light site → show DARK lockup
 */
export function DenoiseMark({ height = 16, className, variant = "auto" }: Props) {
  const width = Math.round(height * 6.13); // PNG aspect ≈ 6.13:1

  if (variant === "dark") {
    return (
      <Image
        src="/brand/logo_dark_x.png"
        alt="Denoise Labs"
        width={width * 2}
        height={height * 2}
        className={className}
        style={{ height, width: "auto" }}
      />
    );
  }
  if (variant === "light") {
    return (
      <Image
        src="/brand/logo_light_x.png"
        alt="Denoise Labs"
        width={width * 2}
        height={height * 2}
        className={className}
        style={{ height, width: "auto" }}
      />
    );
  }

  // Auto: render both, show the right one via data-scene CSS
  return (
    <span className={cn("inline-block relative", className)} style={{ height, width }}>
      <Image
        src="/brand/logo_light_x.png"
        alt="Denoise Labs"
        width={width * 2}
        height={height * 2}
        className="denoise-mark-on-dark absolute inset-0 h-full w-auto"
      />
      <Image
        src="/brand/logo_dark_x.png"
        alt=""
        aria-hidden
        width={width * 2}
        height={height * 2}
        className="denoise-mark-on-light absolute inset-0 h-full w-auto"
      />
    </span>
  );
}
