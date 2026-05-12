import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Magnetic } from "@/components/motion/magnetic";
import { org } from "@/lib/data";
import { site } from "@/lib/site";
import { routeMeta } from "@/lib/seo";

export const metadata = routeMeta("/join", {
  title: "Join",
  description:
    "Recruitment for the current cycle is closed. The next MaRS intake is in March 2027 — follow on Instagram for the call.",
});

export default function JoinPage() {
  return (
    <>
      <Breadcrumbs
        visual={true}
        trail={[
          { label: "Home", href: "/" },
          { label: "Join", href: "/join" },
        ]}
      />
      <PageHero
        tight
        index={6}
        eyebrow="Join"
        title={
          <>
            Recruitment is{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              closed
            </span>
            .
          </>
        }
        lead="The March 2026 intake is complete. MaRS recruits once a year — the next call goes out in March 2027 on Instagram."
      />

      {/* ── Status + next steps ──────────────────────────────────────── */}
      <section className="container-page pb-24 md:pb-32 grid md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-5">
          <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            Status
          </p>
          <h2 className="mt-6 text-balance font-sans text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
            Next intake{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              March 2027
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
            across mechanical, electronics, and software — and the team for this
            year is set. Thanks to everyone who turned up at Open House.
          </p>
          <p>
            We open recruitment once a year. The next call goes out in March
            2027. Follow MaRS on Instagram so you don&rsquo;t miss it, or drop us
            a line if you want to chat in the meantime.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Magnetic>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-mars)] hover:bg-[color:var(--color-mars-glow)] text-white px-6 py-3 text-sm font-medium transition-colors"
              >
                Follow on Instagram
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
              </a>
            </Magnetic>
            <a
              href={`mailto:${org.emailGeneral}?subject=MaRS%20%C2%B7%20Hello`}
              className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
            >
              Email the team
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Sub-teams (informational) ────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-t border-[color:var(--color-line)]/40">
        <div className="container-page">
          <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            Sub-teams
          </p>
          <h2 className="mt-6 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
            How MaRS is{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              built
            </span>
            .
          </h2>
          <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-[color:var(--color-muted)]">
            For when recruitment reopens — here&rsquo;s the lay of the land.
          </p>

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
    </>
  );
}
