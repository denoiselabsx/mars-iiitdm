import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import {
  sponsorTiers,
  waysToSponsor,
  sponsors,
  leads,
  org,
} from "@/lib/data";
import { routeMeta } from "@/lib/seo";

export const metadata = routeMeta("/sponsors", {
  title: "Sponsors",
  description:
    "Partner with MaRS — sponsorship tiers, ways to support, current partners, and direct contacts for the team leadership.",
});

export default function SponsorsPage() {
  return (
    <>
      <Breadcrumbs
        visual={true}
        trail={[
          { label: "Home", href: "/" },
          { label: "Sponsors", href: "/sponsors" },
        ]}
      />
      <PageHero
        index={4}
        eyebrow="Sponsors"
        title={
          <>
            Power the{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              next rover
            </span>
            .
          </>
        }
        lead="MaRS competes internationally on a student budget. Components, fabrication, travel — every season runs on partner support. Tax benefits apply under Section 35 of the Income Tax Act (12.5% rebate for research)."
      />

      {/* ── Current partners ──────────────────────────────────────────── */}
      <section className="container-page pb-24 md:pb-32">
        <div className="flex items-end justify-between gap-8 flex-wrap mb-12 md:mb-16">
          <div>
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              Current partners
            </p>
            <h2 className="mt-6 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              The ones already{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                backing us
              </span>
              .
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faint)]">
            {sponsors.length} partners · ongoing
          </p>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40">
          {sponsors.map((s) => (
            <li
              key={s.name}
              className="group bg-[color:var(--color-void)] aspect-[5/3] flex items-center justify-center px-4 hover:bg-[color:var(--color-surface)] transition-colors"
            >
              {s.href ? (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)] group-hover:text-[color:var(--color-paper)] transition-colors"
                >
                  {s.name}
                </a>
              ) : (
                <span className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
                  {s.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Sponsor tiers ─────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-t border-[color:var(--color-line)]/40 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 w-[100%] h-[60vh] -z-10"
          style={{
            background:
              "radial-gradient(ellipse 50% 70% at 80% 0%, color-mix(in oklab, var(--color-mars) 18%, transparent) 0%, transparent 70%)",
          }}
        />

        <div className="container-page">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-16 md:mb-20">
            <div className="md:col-span-7">
              <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                Tiers
              </p>
              <h2 className="mt-6 text-balance font-sans text-4xl md:text-6xl font-medium tracking-tight leading-[1]">
                Four levels of{" "}
                <span className="font-serif italic text-[color:var(--color-mars)]">
                  partnership
                </span>
                .
              </h2>
            </div>
            <p className="md:col-span-5 md:pl-8 text-[color:var(--color-muted)] leading-relaxed">
              Each tier compounds the one below. We tailor recognition and access
              to match your support — and we&rsquo;re flexible on what counts.
            </p>
          </div>

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
            Manufacturing, logistics, technical insight, products at cost — every
            form of support extends what the team can attempt.
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

      {/* ── Contact CTA ──────────────────────────────────────────────── */}
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
            Talk to us
          </p>
          <h2 className="mt-6 max-w-3xl text-balance font-sans text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1]">
            Let&rsquo;s build the{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              next rover
            </span>{" "}
            together.
          </h2>

          <div className="mt-12 grid gap-8 md:gap-px md:grid-cols-2 md:bg-[color:var(--color-line)]/40 md:border md:border-[color:var(--color-line)]/40">
            {leads.map((l) => (
              <div
                key={l.email}
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
                      href={`mailto:${l.email}?subject=Sponsorship%20%C2%B7%20MaRS`}
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
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Magnetic>
              <a
                href={`mailto:${org.emailGeneral}?subject=Sponsorship%20%C2%B7%20MaRS`}
                className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-signal)] text-[color:var(--color-void)] px-7 py-3.5 text-sm font-medium transition-colors"
              >
                Email the team
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Link
              href="/join"
              className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
            >
              See recruitment for students
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
