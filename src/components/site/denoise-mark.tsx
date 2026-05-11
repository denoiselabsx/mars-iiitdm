import Image from "next/image";

type Props = {
  /** Render height in pixels. Width auto-scales to PNG aspect (~6.13:1). */
  height?: number;
  className?: string;
};

/**
 * Denoise Labs horizontal lockup — single canonical black-plate variant.
 * White mark + wordmark on a black rounded-square plate. Works on any background.
 */
export function DenoiseMark({ height = 18, className }: Props) {
  const width = Math.round(height * 6.13);
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
