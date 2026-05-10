import { Reveal } from "@/components/motion/reveal";
import { MonoLabel } from "@/components/motion/mono-label";
import { cn } from "@/lib/utils";

type Props = {
  index: string | number;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  className?: string;
};

export function PageHero({ index, eyebrow, title, lead, className }: Props) {
  return (
    <section className={cn("relative pt-40 pb-20 md:pt-48 md:pb-28", className)}>
      <div className="container-page">
        <Reveal>
          <MonoLabel index={index}>{eyebrow}</MonoLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 text-balance font-sans text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight text-[color:var(--color-paper)]">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[color:var(--color-muted)]">
              {lead}
            </p>
          </Reveal>
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-20 h-[60vh] -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, color-mix(in oklab, var(--color-mars) 18%, transparent) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}
