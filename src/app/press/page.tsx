import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { leads, org, competitions } from "@/lib/data";
import { routeMeta } from "@/lib/seo";

export const metadata = routeMeta("/press", {
  title: "Press & Media Kit",
  description:
    "MaRS press kit — official logo, brand colours, fact sheet, and direct contacts for media inquiries.",
});

const factSheet = [
  { k: "Founded at", v: "IIITDM Kancheepuram" },
  { k: "Team brand", v: "Team SHUNYA" },
  { k: "Members", v: "40+ undergraduates" },
  { k: "Sub-teams", v: "Mechanical · Electronics · Software · Autonomy" },
  { k: "Active rovers", v: "Vajra · Destiny · Kutti" },
  { k: "Competitions", v: "IRC · ISDC · ERC · IRoC-U · ARCh · SHAASTRA" },
  { k: "Best global rank", v: "6th globally · ERC 2022 Remote World Finals" },
  { k: "Best national rank", v: "6th of 273 · IRoC-U 2024" },
];

const recentResults = competitions
  .filter((c) => c.year >= 2024)
  .slice(0, 6);

export default function PressPage() {
  return (
    <>
      <Breadcrumbs
        visual={true}
        trail={[
          { label: "Home", href: "/" },
          { label: "Press", href: "/press" },
        ]}
      />
      <PageHero
        tight
        index={7}
        eyebrow="Press & Media"
        title={
          <>
            Everything press,{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              in one place
            </span>
            .
          </>
        }
        lead="Logos, brand guide, fact sheet, recent results, and direct contacts. For journalists, sponsors, faculty bodies, and partner organisations."
      />

      {/* ── Fact sheet ───────────────────────────────────────────────── */}
      <section className="container-page pb-24 md:pb-32 grid md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-4">
          <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            Fact sheet
          </p>
          <h2 className="mt-6 text-balance font-sans text-3xl md:text-4xl font-medium tracking-tight leading-[1.05]">
            The{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              quick read
            </span>
            .
          </h2>
        </div>

        <dl className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40">
          {factSheet.map((f) => (
            <div
              key={f.k}
              className="bg-[color:var(--color-void)] p-6 hover:bg-[color:var(--color-surface)] transition-colors"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)]">
                {f.k}
              </dt>
              <dd className="mt-3 text-base md:text-lg leading-snug text-[color:var(--color-paper)]">
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Brand assets ─────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-t border-[color:var(--color-line)]/40">
        <div className="container-page">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-16 md:mb-20">
            <div className="md:col-span-7">
              <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                Brand
              </p>
              <h2 className="mt-6 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
                Logo &amp;{" "}
                <span className="font-serif italic text-[color:var(--color-mars)]">
                  colours
                </span>
                .
              </h2>
            </div>
            <p className="md:col-span-5 md:pl-8 text-[color:var(--color-muted)] leading-relaxed">
              Use the assets below in coverage, sponsor decks, or sister-club
              cross-promotion. The official lockup uses the hexagonal mark
              alongside the &ldquo;MaRS&rdquo; wordmark in Geist Sans.
            </p>
          </div>

          {/* Logo download tiles */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40 mb-12">
            <li className="bg-[color:var(--color-surface)] aspect-[16/9] flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/mars-logo.png"
                  alt="MaRS logo"
                  className="h-32 md:h-40 w-auto object-contain drop-shadow-[0_0_24px_rgba(220, 38, 38,0.3)]"
                />
              </div>
              <div className="border-t border-[color:var(--color-line)]/40 px-6 py-4 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                  Primary mark · PNG
                </span>
                <a
                  href="/brand/mars-logo.png"
                  download
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-paper)] hover:text-[color:var(--color-signal)] transition-colors"
                >
                  Download ↓
                </a>
              </div>
            </li>

            <li className="bg-[color:var(--color-void)] aspect-[16/9] flex flex-col border border-[color:var(--color-line)]/40 border-l-0">
              <div className="flex-1 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/mars-logo.png"
                  alt="MaRS logo on dark"
                  className="h-32 md:h-40 w-auto object-contain drop-shadow-[0_0_24px_rgba(220, 38, 38,0.3)]"
                />
              </div>
              <div className="border-t border-[color:var(--color-line)]/40 px-6 py-4 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                  On dark · for headers
                </span>
                <a
                  href="/brand/mars-logo.png"
                  download
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-paper)] hover:text-[color:var(--color-signal)] transition-colors"
                >
                  Download ↓
                </a>
              </div>
            </li>
          </ul>

          {/* Colour palette */}
          <RevealStagger className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40">
            {[
              { name: "Mars", hex: "#DC2626", role: "Primary accent" },
              { name: "Void", hex: "#08080C", role: "Background" },
              { name: "Paper", hex: "#F5F2EE", role: "Primary text" },
              { name: "Signal", hex: "#5CF2FF", role: "Interaction" },
            ].map((c) => (
              <Reveal
                key={c.hex}
                className="bg-[color:var(--color-void)] p-6 flex flex-col gap-4"
              >
                <div
                  className="aspect-[3/2] border border-[color:var(--color-line)]/50"
                  style={{ background: c.hex }}
                />
                <div>
                  <p className="font-sans text-lg font-medium tracking-tight text-[color:var(--color-paper)]">
                    {c.name}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-mars)]">
                    {c.hex}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-faint)]">
                    {c.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── Recent results (for journalists) ────────────────────────── */}
      <section className="container-page py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-12 md:mb-16">
          <div className="md:col-span-7">
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              Recent results
            </p>
            <h2 className="mt-6 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              For headlines &amp; sponsor decks.
            </h2>
          </div>
          <Link
            href="/competitions"
            className="md:col-span-5 md:pl-8 group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
          >
            See the full legacy
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <ul className="space-y-px border border-[color:var(--color-line)]/40">
          {recentResults.map((r) => (
            <li
              key={r.code}
              className="bg-[color:var(--color-void)] p-6 md:p-7 border-b border-[color:var(--color-line)]/40 last:border-b-0 grid grid-cols-12 gap-4 items-baseline"
            >
              <p className="col-span-12 md:col-span-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                {r.year}
              </p>
              <p className="col-span-12 md:col-span-6 font-sans text-lg md:text-xl font-medium tracking-tight text-[color:var(--color-paper)]">
                {r.full}
              </p>
              <p className="col-span-12 md:col-span-4 md:text-right font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-paper)]">
                {r.result}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Press contact ────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-t border-[color:var(--color-line)]/40 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-0 w-[120%] h-[60vh] -z-10"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 85% 90%, color-mix(in oklab, var(--color-mars) 22%, transparent) 0%, transparent 65%)",
          }}
        />

        <div className="container-page">
          <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            Press contact
          </p>
          <h2 className="mt-6 max-w-3xl text-balance font-sans text-4xl md:text-6xl font-medium tracking-tight leading-[1]">
            Reach the{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              team directly
            </span>
            .
          </h2>

          <div className="mt-12 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
              {leads[0].role}
            </p>
            <p className="mt-3 font-sans text-2xl md:text-3xl font-medium tracking-tight">
              {leads[0].name}
            </p>
            <div className="mt-6 space-y-2 text-base">
              {leads[0].email && (
                <a
                  href={`mailto:${leads[0].email}?subject=Press · MaRS`}
                  className="block text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
                >
                  {leads[0].email}
                </a>
              )}
              {leads[0].phone && (
                <a
                  href={`tel:${leads[0].phone.replace(/\s/g, "")}`}
                  className="block font-mono text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
                >
                  {leads[0].phone}
                </a>
              )}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Magnetic>
              <a
                href={`mailto:${org.emailGeneral}?subject=Press · MaRS`}
                className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-signal)] text-[color:var(--color-void)] px-7 py-3.5 text-sm font-medium transition-colors"
              >
                Email the team
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Link
              href="/sponsors"
              className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
            >
              Or partner as a sponsor
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-faint)]">
            {org.address}
          </p>
        </div>
      </section>
    </>
  );
}
