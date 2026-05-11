import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { rovers, process } from "@/lib/data";
import { routeMeta } from "@/lib/seo";

export const metadata = routeMeta("/rovers", {
  title: "Rovers",
  description:
    "Every rover MaRS has built — Shaurya (IRC 2026), Lakshya (ERC 2025), Vajra, Destiny, Vetri — and Rudra, the next-gen build for ERC 2026.",
});

const active = rovers.filter((r) => r.status === "active");
const upcoming = rovers.filter((r) => r.status === "designing" || r.status === "concept");

const statusLabel = {
  active: "Active",
  designing: "Designing",
  concept: "Concept",
  retired: "Retired",
} as const;

export default function RoversPage() {
  return (
    <>
      <Breadcrumbs
        visual={true}
        trail={[
          { label: "Home", href: "/" },
          { label: "Rovers", href: "/rovers" },
        ]}
      />
      <PageHero
        tight
        index={1}
        eyebrow="Rovers"
        title={
          <>
            Built from the chassis up,{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              in-house
            </span>
            .
          </>
        }
        lead="Every drivetrain, arm, and PCB is designed and machined by students. Three platforms in active rotation — and three more on the bench."
      />

      {/* ── Active rovers ─────────────────────────────────────────────── */}
      <section className="container-page pb-24 md:pb-32">
        <div className="flex items-end justify-between gap-8 flex-wrap mb-12 md:mb-16">
          <div>
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              In rotation
            </p>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faint)]">
            {active.length} platforms · active
          </p>
        </div>

        <ul className="space-y-px">
          {active.map((r, i) => (
            <Reveal
              key={r.slug}
              as="li"
              delay={i * 0.04}
              className="group relative border-t border-[color:var(--color-line)]/50 last:border-b py-10 md:py-14 transition-colors hover:bg-[color:var(--color-surface)]/30"
            >
              <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-4 items-baseline">
                {/* Name + kind */}
                <div className="col-span-12 md:col-span-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                    {String(i + 1).padStart(2, "0")} · {r.kind}
                  </p>
                  <h2 className="mt-3 font-sans text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.025em] leading-[0.95] text-[color:var(--color-paper)] group-hover:text-[color:var(--color-mars)] transition-colors duration-700">
                    {r.name}
                  </h2>
                </div>

                {/* Description */}
                <div className="col-span-12 md:col-span-7 md:pl-8 md:border-l md:border-[color:var(--color-line)]/40">
                  <p className="text-base md:text-lg leading-relaxed text-[color:var(--color-muted)] max-w-xl">
                    {r.blurb}
                  </p>
                  {r.highlight && (
                    <p className="mt-5 inline-flex items-center gap-3 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-paper)]">
                      <span className="h-px w-8 bg-[color:var(--color-mars)]" />
                      {r.highlight}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── How we work ─────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-t border-[color:var(--color-line)]/40 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-32"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 50%, color-mix(in oklab, var(--color-mars) 18%, transparent) 0%, transparent 70%)",
          }}
        />

        <div className="container-page">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-16 md:mb-20">
            <div className="md:col-span-7">
              <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                Our process
              </p>
              <h2 className="mt-6 text-balance font-sans text-4xl md:text-6xl font-medium tracking-tight leading-[1]">
                Five stages,{" "}
                <span className="font-serif italic text-[color:var(--color-mars)]">
                  every season
                </span>
                .
              </h2>
            </div>
            <p className="md:col-span-5 md:pl-8 text-[color:var(--color-muted)] leading-relaxed">
              Every rover travels the same path — from ideation through validation. Each
              stage feeds the next; mistakes caught early stay cheap.
            </p>
          </div>

          <RevealStagger
            as="ol"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40"
          >
            {process.map((p) => (
              <Reveal
                as="li"
                key={p.n}
                className="bg-[color:var(--color-void)] p-6 md:p-7 hover:bg-[color:var(--color-surface)] transition-colors"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                  {p.n}
                </p>
                <h3 className="mt-3 font-sans text-xl md:text-2xl font-medium tracking-tight text-[color:var(--color-paper)]">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {p.desc}
                </p>
              </Reveal>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── Upcoming ─────────────────────────────────────────────────── */}
      <section className="container-page py-24 md:py-32">
        <div className="flex items-end justify-between gap-8 flex-wrap mb-12 md:mb-16">
          <div>
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              On the bench
            </p>
            <h2 className="mt-6 text-balance font-sans text-4xl md:text-6xl font-medium tracking-tight leading-[1]">
              What we&rsquo;re{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                building next
              </span>
              .
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faint)]">
            {upcoming.length} in development
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40">
          {upcoming.map((r) => (
            <Reveal
              key={r.slug}
              className="bg-[color:var(--color-void)] p-8 md:p-10 hover:bg-[color:var(--color-surface)] transition-colors min-h-[280px] flex flex-col"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                {statusLabel[r.status]}
              </p>
              <h3 className="mt-4 font-sans text-3xl md:text-4xl font-medium tracking-[-0.02em] leading-[1] text-[color:var(--color-paper)]">
                {r.name}
              </h3>
              <p className="mt-6 text-sm leading-relaxed text-[color:var(--color-muted)] flex-1">
                {r.blurb}
              </p>
            </Reveal>
          ))}
        </RevealStagger>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 w-[120%] h-[60vh] -z-10"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 85% 90%, color-mix(in oklab, var(--color-mars) 22%, transparent) 0%, transparent 65%)",
          }}
        />
        <div className="container-page">
          <h2 className="max-w-3xl text-balance font-sans text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1]">
            Helped build one?{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              Or want to.
            </span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Magnetic>
              <Link
                href="/join"
                className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-signal)] text-[color:var(--color-void)] px-7 py-3.5 text-sm font-medium transition-colors"
              >
                Apply to MaRS
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
            <Link
              href="/competitions"
              className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
            >
              See competition results
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
