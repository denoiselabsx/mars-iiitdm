import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { leads, sponsorTiers, waysToSponsor, org } from "@/lib/data";

export const metadata: Metadata = {
  title: "Join & Support",
  description:
    "Apply to MaRS as a first-year engineer or partner with the team as a sponsor. Sponsorship tiers, ways to support, and direct contacts.",
};

export default function JoinPage() {
  return (
    <>
      <PageHero
        index={6}
        eyebrow="Join & Support"
        title={
          <>
            Build with us — or{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              back us
            </span>
            .
          </>
        }
        lead="Two ways into MaRS. Apply as an engineer during the first-year orientation, or support the programme as a partner. Both keep the rovers rolling."
      />

      {/* ── For students ──────────────────────────────────────────────── */}
      <section
        id="students"
        className="container-page pb-24 md:pb-32 grid md:grid-cols-12 gap-8 md:gap-12"
      >
        <Reveal className="md:col-span-5">
          <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            For students
          </p>
          <h2 className="mt-6 text-balance font-sans text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
            Recruitment opens{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              July 2026
            </span>
            .
          </h2>
        </Reveal>

        <div className="md:col-span-7 space-y-6 text-[color:var(--color-muted)] leading-relaxed text-base md:text-lg">
          <p>
            MaRS recruits during first-year orientation week. The Open House is our
            primary entry point — drop in, see the rovers, talk to the leads, and
            understand which sub-team fits how you want to engineer.
          </p>
          <p>
            We&rsquo;re a club of <span className="text-[color:var(--color-paper)]">{org.memberCount} engineers</span> across mechanical, electronics, and
            software. No prior experience required — only curiosity and the willingness
            to ship hardware that actually moves.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Magnetic>
              <a
                href={`mailto:${leads[0].email}?subject=MaRS · Recruitment query`}
                className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-signal)] text-[color:var(--color-void)] px-6 py-3 text-sm font-medium transition-colors"
              >
                Email the Team Lead
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </Magnetic>
            <a
              href="https://instagram.com/mars_iiitdm"
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
            >
              Follow recruitment updates on Instagram
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── For sponsors — intro ─────────────────────────────────────── */}
      <section
        id="sponsors"
        className="relative py-24 md:py-32 border-t border-[color:var(--color-line)]/40 overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 w-[100%] h-[60vh] -z-10"
          style={{
            background:
              "radial-gradient(ellipse 50% 70% at 80% 0%, color-mix(in oklab, var(--color-mars) 18%, transparent) 0%, transparent 70%)",
          }}
        />

        <div className="container-page grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-16 md:mb-24">
          <div className="md:col-span-7">
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              For sponsors
            </p>
            <h2 className="mt-6 text-balance font-sans text-4xl md:text-6xl font-medium tracking-tight leading-[1]">
              Power the{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                next rover
              </span>
              .
            </h2>
          </div>
          <p className="md:col-span-5 md:pl-8 text-[color:var(--color-muted)] leading-relaxed">
            International competitions on a student budget. Components, fabrication,
            international travel — every season runs on partner support. Tax benefits
            apply under Section 35 of the Income Tax Act (12.5% rebate for research).
          </p>
        </div>

        {/* Sponsor tiers */}
        <div className="container-page">
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40">
            {sponsorTiers.map((tier, i) => (
              <Reveal
                key={tier.name}
                className="bg-[color:var(--color-void)] p-7 md:p-8 hover:bg-[color:var(--color-surface)] transition-colors flex flex-col"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                  {String(i + 1).padStart(2, "0")} — Tier
                </p>
                <h3 className="mt-3 font-sans text-3xl font-medium tracking-tight text-[color:var(--color-paper)]">
                  {tier.name}
                </h3>
                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {tier.perks.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden className="text-[color:var(--color-mars)] mt-1">·</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── Ways to support ──────────────────────────────────────────── */}
      <section className="container-page py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-12 md:mb-16">
          <div className="md:col-span-7">
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              Ways to support
            </p>
            <h2 className="mt-6 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              Not just{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">money</span>.
            </h2>
          </div>
          <p className="md:col-span-5 md:pl-8 text-[color:var(--color-muted)] leading-relaxed">
            Manufacturing, logistics, technical insight, products at cost — every form
            of support extends what the team can attempt.
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40">
          {waysToSponsor.map((w, i) => (
            <Reveal
              key={w.name}
              className="bg-[color:var(--color-void)] p-6 md:p-7 hover:bg-[color:var(--color-surface)] transition-colors"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-sans text-lg md:text-xl font-medium tracking-tight text-[color:var(--color-paper)]">
                {w.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                {w.desc}
              </p>
            </Reveal>
          ))}
        </RevealStagger>
      </section>

      {/* ── Direct contacts ──────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-t border-[color:var(--color-line)]/40">
        <div className="container-page">
          <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            Direct contacts
          </p>
          <h2 className="mt-6 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
            Talk to a{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">human</span>.
          </h2>

          <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40">
            {leads.map((l, i) => (
              <Reveal
                as="li"
                key={l.email}
                delay={i * 0.05}
                className="bg-[color:var(--color-void)] p-8 hover:bg-[color:var(--color-surface)] transition-colors"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                  {l.role}
                </p>
                <p className="mt-3 font-sans text-2xl md:text-3xl font-medium tracking-tight text-[color:var(--color-paper)]">
                  {l.name}
                </p>
                <div className="mt-6 space-y-2 text-sm">
                  {l.email && (
                    <a
                      href={`mailto:${l.email}`}
                      className="block text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
                    >
                      {l.email}
                    </a>
                  )}
                  {l.phone && (
                    <a
                      href={`tel:${l.phone.replace(/\s/g, "")}`}
                      className="block font-mono text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
                    >
                      {l.phone}
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>

          <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-faint)]">
            {org.address}
          </p>
        </div>
      </section>
    </>
  );
}
