import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { competitions } from "@/lib/data";
import { routeMeta } from "@/lib/seo";

export const metadata = routeMeta("/competitions", {
  title: "Competitions",
  description:
    "MaRS at ERC, IRC, ISDC, IRoC-U, SHAASTRA — every international and national result from 2022 to 2026.",
});

// Group results by year, newest first
const byYear = competitions.reduce<Record<number, typeof competitions>>(
  (acc, c) => {
    if (!acc[c.year]) acc[c.year] = [];
    acc[c.year].push(c);
    return acc;
  },
  {},
);
const years = Object.keys(byYear)
  .map(Number)
  .sort((a, b) => b - a);

const headline = competitions.filter((c) => c.year === 2026);

export default function CompetitionsPage() {
  return (
    <>
      <Breadcrumbs
        visual={true}
        trail={[
          { label: "Home", href: "/" },
          { label: "Competitions", href: "/competitions" },
        ]}
      />
      <PageHero
        tight
        index={2}
        eyebrow="Competitions"
        title={
          <>
            Where the rover{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              earns
            </span>{" "}
            its name.
          </>
        }
        lead="Designs survive in the lab. Rankings are earned in the dust. Every international and national result MaRS has put on the board — across ERC, IRC, ISDC, IRoC-U, ARCh, and SHAASTRA."
      />

      {/* ── Headline numbers from 2025-26 season ──────────────────────── */}
      <section className="container-page pb-24 md:pb-32">
        <div className="mb-12 flex items-baseline gap-4">
          <span className="h-px w-12 bg-[color:var(--color-mars)]" />
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
            2025–26 Season — current
          </p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40">
          {headline.map((c) => (
            <Reveal
              as="li"
              key={c.code}
              className="bg-[color:var(--color-void)] p-8 md:p-10 hover:bg-[color:var(--color-surface)] transition-colors"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                {c.code}
              </p>
              <p className="mt-3 font-sans text-3xl md:text-4xl font-medium tracking-[-0.02em] leading-[1.05] text-[color:var(--color-paper)]">
                {c.result}
              </p>
              <p className="mt-4 text-sm text-[color:var(--color-muted)] leading-relaxed">
                {c.full}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-faint)]">
                {c.org}
                {c.dates && ` · ${c.dates}`}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── Full legacy timeline ─────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-t border-[color:var(--color-line)]/40">
        <div className="container-page">
          <div className="mb-16 md:mb-20 grid md:grid-cols-12 gap-8 md:gap-12 items-end">
            <div className="md:col-span-7">
              <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                Full legacy
              </p>
              <h2 className="mt-6 text-balance font-sans text-4xl md:text-6xl font-medium tracking-tight leading-[1]">
                Every event,{" "}
                <span className="font-serif italic text-[color:var(--color-mars)]">
                  every result
                </span>
                .
              </h2>
            </div>
            <p className="md:col-span-5 md:pl-8 text-[color:var(--color-muted)] leading-relaxed">
              Top-10 globally at ERC. Top-6 nationally at IRoC. Rover presented to the
              President of India and the ISRO Chairman. The list, in full.
            </p>
          </div>

          {/* Timeline grouped by year */}
          <div className="space-y-16 md:space-y-24">
            {years.map((year) => (
              <div key={year} className="grid md:grid-cols-12 gap-x-8 gap-y-8 md:gap-x-16">
                <Reveal className="md:col-span-3">
                  <p className="font-sans text-6xl md:text-7xl font-medium tracking-[-0.03em] leading-[1] text-[color:var(--color-paper)]">
                    {year}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)]">
                    {byYear[year].length} event{byYear[year].length > 1 ? "s" : ""}
                  </p>
                </Reveal>

                <ul className="md:col-span-9 space-y-px border border-[color:var(--color-line)]/40">
                  {byYear[year].map((c, i) => (
                    <Reveal
                      as="li"
                      key={c.code}
                      delay={i * 0.04}
                      className="group bg-[color:var(--color-void)] p-6 md:p-7 border-b border-[color:var(--color-line)]/40 last:border-b-0 hover:bg-[color:var(--color-surface)]/40 transition-colors"
                    >
                      <div className="flex items-baseline flex-wrap gap-x-4 gap-y-1">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                          {c.code}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-faint)]">
                          {c.group}
                        </p>
                      </div>
                      <p className="mt-2 font-sans text-xl md:text-2xl font-medium tracking-tight text-[color:var(--color-paper)]">
                        {c.full}
                      </p>
                      <p className="mt-1 text-sm text-[color:var(--color-faint)] font-mono tracking-[0.06em]">
                        {c.org}
                        {c.venue && ` · ${c.venue}`}
                      </p>
                      <p className="mt-4 inline-flex items-center gap-3 font-mono text-[11px] md:text-xs uppercase tracking-[0.16em] text-[color:var(--color-paper)]">
                        <span className="h-px w-8 bg-[color:var(--color-mars)]" />
                        {c.result}
                      </p>
                      {c.note && (
                        <p className="mt-4 text-sm text-[color:var(--color-muted)] leading-relaxed max-w-2xl">
                          {c.note}
                        </p>
                      )}
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Press / context ──────────────────────────────────────────── */}
      <section className="container-page py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-5">
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              Beyond the leaderboard
            </p>
            <h2 className="mt-6 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              The rover that{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                left the lab
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-[color:var(--color-muted)] leading-relaxed">
            <p>
              MaRS&rsquo;s rover has been presented to{" "}
              <span className="text-[color:var(--color-paper)]">
                Hon&rsquo;ble President of India Smt. Droupadi Murmu
              </span>{" "}
              and{" "}
              <span className="text-[color:var(--color-paper)]">
                ISRO Chairman Dr. S. Somanath
              </span>{" "}
              during IRoC-U at the U R Rao Satellite Centre, Bengaluru.
            </p>
            <p>
              Coverage in DT Next, GST Online Media, and Tamil regional press — the
              SHUNYA squad has represented IIITDM as the sole Indian contingent at the
              European Rover Challenge Onsite Edition 2023, Poland.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
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
            More results next{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              season
            </span>
            .
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Magnetic>
              <Link
                href="/rovers"
                className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-signal)] text-[color:var(--color-void)] px-7 py-3.5 text-sm font-medium transition-colors"
              >
                See the rovers
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
            <Link
              href="/join"
              className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
            >
              Help build the next one
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
