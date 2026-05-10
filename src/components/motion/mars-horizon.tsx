import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function MarsHorizon({ className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 h-px overflow-visible",
        className,
      )}
    >
      <div className="absolute left-1/2 top-1/2 h-px w-[140%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[color:var(--color-line)] to-transparent" />
      <div
        className="absolute left-1/2 top-1/2 h-[280px] w-[80%] -translate-x-1/2 -translate-y-full opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, color-mix(in oklab, var(--color-mars) 35%, transparent) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
