import Link from "next/link";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { MonoLabel } from "@/components/motion/mono-label";
import { MarsHorizon } from "@/components/motion/mars-horizon";

const stats = [
  { value: "10th", label: "IRC 2026", sub: "International Rover Challenge" },
  { value: "9th", label: "ISDC 2026", sub: "Space Drone Challenge" },
  { value: "Design Innovation", label: "SHAASTRA 2026", sub: "Caterpillar Autonomy" },
];

export default function Home() {
  return (
    <>
      {/* Hero — placeholder for W2 scroll-driven 3D rover scene */}
      <section className="relative min-h-svh flex items-end overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, color-mix(in oklab, var(--color-mars) 28%, transparent) 0%, transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px -z-10 bg-gradient-to-r from-transparent via-[color:var(--color-mars)]/40 to-transparent"
        />

        <div className="container-page pb-20 md:pb-32 pt-32">
          <Reveal>
            <MonoLabel index={1}>Mars Rover Students Club · IIITDM Kancheepuram</MonoLabel>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-8 max-w-5xl text-balance font-sans text-6xl md:text-8xl lg:text-[9rem] font-medium leading-[0.92] tracking-tight">
              Exploration{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                begins
              </span>{" "}
              here.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-[color:var(--color-muted)]">
              We design, build, and field autonomous rovers for Mars-analog terrains —
              competing on the world stage at IRC, ISDC, and IRoC-U.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/rovers"
                  className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--color-paper)] bg-[color:var(--color-paper)] px-6 py-3 text-sm font-medium text-[color:var(--color-void)] transition-all hover:bg-[color:var(--color-mars)] hover:border-[color:var(--color-mars)] hover:text-[color:var(--color-paper)]"
                >
                  See our rovers
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/join"
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)] px-6 py-3 text-sm font-medium text-[color:var(--color-paper)] transition-colors hover:border-[color:var(--color-paper)]"
                >
                  Join the team
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

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
