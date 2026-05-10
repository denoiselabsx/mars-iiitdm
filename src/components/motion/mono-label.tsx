import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  index?: string | number;
  className?: string;
};

export function MonoLabel({ children, index, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)]",
        className,
      )}
    >
      {index !== undefined && (
        <span className="text-[color:var(--color-mars)]">{String(index).padStart(2, "0")}</span>
      )}
      <span aria-hidden className="h-px w-6 bg-[color:var(--color-line)]" />
      <span className="text-[color:var(--color-muted)]">{children}</span>
    </span>
  );
}
