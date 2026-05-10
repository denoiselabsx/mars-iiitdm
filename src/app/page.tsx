import Link from "next/link";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { MonoLabel } from "@/components/motion/mono-label";
import { MarsHorizon } from "@/components/motion/mars-horizon";
import { ScrollHero } from "@/components/hero/scroll-hero";

const stats = [
  { value: "10th", label: "IRC 2026", sub: "International Rover Challenge" },
  { value: "9th", label: "ISDC 2026", sub: "Space Drone Challenge" },
  { value: "Design Innovation", label: "SHAASTRA 2026", sub: "Caterpillar Autonomy" },
];

export default function Home() {
  return (
    <>
      {/* Preload hero GLB so download starts in parallel with JS chunks */}
      <link rel="preload" as="fetch" href="/models/rover.glb" crossOrigin="anonymous" />

      <ScrollHero />

      {/* Achievement strip */}
      <section className="relative py-24 md:py-32 border-t border-[color:var(--color-line)]/40">
        <div className="container-page">
          <Reveal>
            <MonoLabel index={2}>2025–26 season</MonoLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 max-w-3xl text-balance text-3xl md:text-5xl font-medium leading-[1.05] tracking-tight">
              Three flagships. Three rankings on the international board.
            </h2>
          </Reveal>

          <RevealStagger className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--color-line)]/50 border border-[color:var(--color-line)]/50">
            {stats.map((s) => (
              <Reveal
                key={s.label}
                className="bg-[color:var(--color-void)] p-8 md:p-10 hover:bg-[color:var(--color-surface)] transition-colors"
              >
                <p className="font-sans text-4xl md:text-5xl font-medium tracking-tight text-[color:var(--color-paper)]">
                  {s.value}
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-mars)]">
                  {s.label}
                </p>
                <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                  {s.sub}
                </p>
              </Reveal>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* CTA → join */}
      <section className="relative py-32 md:py-40">
        <MarsHorizon className="top-0" />
        <div className="container-page text-center">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)]">
              Recruitment opens July 2026
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 max-w-3xl mx-auto text-balance font-sans text-4xl md:text-6xl font-medium leading-[1.02] tracking-tight">
              Build something that moves on{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">another world</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 inline-block">
              <Magnetic>
                <Link
                  href="/join"
                  className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-mars)] px-7 py-3.5 text-sm font-medium text-[color:var(--color-paper)] transition-colors hover:bg-[color:var(--color-mars-glow)]"
                >
                  Apply to MaRS
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
