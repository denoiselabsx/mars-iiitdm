import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { alumni, alumniStats, org } from "@/lib/data";
import { routeMeta } from "@/lib/seo";

export const metadata = routeMeta("/alumni", {
  title: "Alumni",
  description:
    "Engineers who came through MaRS — where they are now. Industry, grad school, startups, research. Built into IIITDM's pipeline since 2020.",
});

// Group by sector for the "by the numbers" block
const sectorLabel: Record<string, string> = {
  industry: "Industry",
  "grad-school": "Graduate School",
  startup: "Startups",
  research: "Research",
  government: "Government / Public",
};

const bySector = alumni.reduce<Record<string, number>>((acc, a) => {
  acc[a.sector] = (acc[a.sector] ?? 0) + 1;
  return acc;
}, {});

const sectors = Object.entries(bySector).sort((a, b) => b[1] - a[1]);

const isPopulated = alumni.length > 0;

export default function AlumniPage() {
  return (
    <>
      <Breadcrumbs
        visual={true}
        trail={[
          { label: "Home", href: "/" },
          { label: "Alumni", href: "/alumni" },
        ]}
      />

      <PageHero
        tight
        index={8}
        eyebrow="Alumni"
        title={
          <>
            Where MaRS engineers{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              go next
            </span>
            .
          </>
        }
        lead="MaRS is a pipeline. Every senior who walks across the convocation stage carries hardware experience most of their peers don't. Here's where they land."
      />

      {/* ── Headline number ──────────────────────────────────────────── */}
      <section className="container-page pb-24 md:pb-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-7">
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              The pipeline
            </p>
            <h2 className="mt-6 text-balance font-sans text-4xl md:text-6xl font-medium tracking-tight leading-[1.02]">
              Building engineers since{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                {alumniStats.totalSince}
              </span>
              .
            </h2>
          </div>

          <div className="md:col-span-5 md:pl-8 text-[color:var(--color-muted)] leading-relaxed">
            {isPopulated ? (
              <p>
                <span className="font-sans text-5xl md:text-6xl font-medium tracking-tight text-[color:var(--color-paper)]">
                  {alumni.length}
                </span>
                <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faint)]">
                  Alumni placed
                </span>
              </p>
            ) : (
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-faint)]">
                Roster being curated · update Aug 2026
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Alumni grid OR placeholder note ──────────────────────────── */}
      {isPopulated ? (
        <section className="container-page pb-24 md:pb-32">
          <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            Where they went
          </p>
          <h2 className="mt-6 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05] mb-16">
            Featured{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              placements
            </span>
            .
          </h2>

          <RevealStagger
            as="ul"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40"
          >
            {alumni.map((a) => (
              <Reveal
                key={`${a.name}-${a.gradYear}`}
                as="li"
                className="group bg-[color:var(--color-void)] p-6 md:p-7 hover:bg-[color:var(--color-surface)] transition-colors"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                  {a.gradYear} · {a.subteam}
                </p>
                <h3 className="mt-3 font-sans text-2xl md:text-3xl font-medium tracking-tight text-[color:var(--color-paper)]">
                  {a.name}
                </h3>
                <p className="mt-3 text-sm text-[color:var(--color-muted)] leading-snug">
                  {a.role}
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-paper)]">
                  {a.org}
                </p>
                {a.linkedin && (
                  <a
                    href={a.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </Reveal>
            ))}
          </RevealStagger>
        </section>
      ) : (
        <section className="container-page pb-24 md:pb-32">
          <div className="border border-[color:var(--color-line)]/40 p-10 md:p-16 max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
              In progress
            </p>
            <h3 className="mt-5 font-serif italic text-3xl md:text-4xl text-[color:var(--color-paper)] leading-[1.15]">
              The alumni roster is being curated with the MaRS leads.
            </h3>
            <p className="mt-6 max-w-2xl text-[color:var(--color-muted)] leading-relaxed">
              {alumniStats.pipelineNote} If you graduated from MaRS — please get in
              touch and we&rsquo;ll add you. The page goes live as soon as we have a
              first cohort confirmed.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Magnetic>
                <a
                  href={`mailto:${org.emailGeneral}?subject=MaRS Alumni — update my info`}
                  className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-signal)] text-[color:var(--color-void)] px-6 py-3 text-sm font-medium transition-colors"
                >
                  I&rsquo;m a MaRS alum
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </Magnetic>
              <Link
                href="/join"
                className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
              >
                Looking to join instead?
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── By the numbers (only when populated) ─────────────────────── */}
      {isPopulated && sectors.length > 0 && (
        <section className="relative py-24 md:py-32 border-t border-[color:var(--color-line)]/40">
          <div className="container-page">
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              By the numbers
            </p>
            <h2 className="mt-6 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05] mb-16">
              The shape of the{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                pipeline
              </span>
              .
            </h2>

            <ul className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40">
              {sectors.map(([k, count]) => (
                <li
                  key={k}
                  className="bg-[color:var(--color-void)] p-6 md:p-7"
                >
                  <p className="font-sans text-5xl md:text-6xl font-medium tracking-[-0.03em] text-[color:var(--color-paper)]">
                    {count}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mars)]">
                    {sectorLabel[k] ?? k}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Voices / CTA ─────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-t border-[color:var(--color-line)]/40 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 w-[120%] h-[60vh] -z-10"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 85% 90%, color-mix(in oklab, var(--color-mars) 22%, transparent) 0%, transparent 65%)",
          }}
        />

        <div className="container-page grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-7">
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              Stay in the loop
            </p>
            <h2 className="mt-6 text-balance font-sans text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1]">
              Alumni who{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                give back
              </span>
              .
            </h2>
            <p className="mt-6 max-w-xl text-[color:var(--color-muted)] leading-relaxed">
              Mentor the next cohort, sponsor a subsystem, or simply stay in the
              network. If you came through MaRS, we&rsquo;d love to hear what
              you&rsquo;re building now.
            </p>
          </div>

          <div className="md:col-span-5 md:pl-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Magnetic>
              <a
                href={`mailto:${org.emailGeneral}?subject=MaRS Alumni`}
                className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-signal)] text-[color:var(--color-void)] px-7 py-3.5 text-sm font-medium transition-colors"
              >
                Get in touch
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Link
              href="/team"
              className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
            >
              See the current team
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
