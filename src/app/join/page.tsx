import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { Magnetic } from "@/components/motion/magnetic";
import { leads, org } from "@/lib/data";
import { routeMeta } from "@/lib/seo";

export const metadata = routeMeta("/join", {
  title: "Join",
  description:
    "Apply to MaRS as a first-year IIITDM engineer. Recruitment opens July 2026 — Open House is the entry point.",
});

export default function JoinPage() {
  return (
    <>
      <PageHero
        index={6}
        eyebrow="Join"
        title={
          <>
            Build something that{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              moves
            </span>
            .
          </>
        }
        lead="MaRS recruits during first-year orientation week. The Open House is our primary entry point — drop in, see the rovers, talk to the leads, and find which sub-team fits how you want to engineer."
      />

      {/* ── Recruitment intro ────────────────────────────────────────── */}
      <section className="container-page pb-24 md:pb-32 grid md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-5">
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
        </div>

        <div className="md:col-span-7 space-y-6 text-[color:var(--color-muted)] leading-relaxed text-base md:text-lg">
          <p>
            We&rsquo;re a club of{" "}
            <span className="text-[color:var(--color-paper)]">
              {org.memberCount} engineers
            </span>{" "}
            across mechanical, electronics, and software. No prior experience
            required — only curiosity and the willingness to ship hardware that
            actually moves.
          </p>
          <p>
            Open House is where it starts. Follow MaRS on Instagram for dates,
            requirements, and how to prepare.
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

      {/* ── Sub-teams to choose from ─────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-t border-[color:var(--color-line)]/40">
        <div className="container-page">
          <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            Sub-teams
          </p>
          <h2 className="mt-6 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
            Pick where you want to{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              specialise
            </span>
            .
          </h2>

          <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40">
            {[
              {
                tag: "MECH",
                name: "Mechanical",
                focus: "Chassis, suspension, manipulators, end-effectors.",
              },
              {
                tag: "ELEC",
                name: "Electronics",
                focus:
                  "Custom PCBs, motor control, power delivery, sensor stacks.",
              },
              {
                tag: "AUT",
                name: "Autonomy & Software",
                focus: "ROS 2, perception, SLAM, mission sequencing, telemetry.",
              },
            ].map((t) => (
              <li
                key={t.tag}
                className="bg-[color:var(--color-void)] p-8 hover:bg-[color:var(--color-surface)] transition-colors"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                  {t.tag}
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-tight text-[color:var(--color-paper)]">
                  {t.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {t.focus}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Pointer to /sponsors ─────────────────────────────────────── */}
      <section className="container-page py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-7">
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              For sponsors
            </p>
            <h2 className="mt-6 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              Looking to partner?
            </h2>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-[color:var(--color-muted)]">
              Tiers, ways to support, and how to reach the team — all on the
              sponsors page.
            </p>
          </div>
          <div className="md:col-span-5 md:pl-8">
            <Link
              href="/sponsors"
              className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-signal)] text-[color:var(--color-void)] px-7 py-3.5 text-sm font-medium transition-colors"
            >
              See sponsorship details
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
