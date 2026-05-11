import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { MonoLabel } from "@/components/motion/mono-label";
import { routeMeta } from "@/lib/seo";

export const metadata = routeMeta("/team", {
  title: "Team",
  description:
    "40+ engineers across mechanical, electronics, and software. The team behind MaRS — Team SHUNYA.",
});

const subteams = [
  { tag: "MECH", name: "Mechanical", focus: "Chassis, suspension, end-effectors" },
  { tag: "ELEC", name: "Electronics", focus: "Custom PCBs, power delivery, sensor stacks" },
  { tag: "AUT",  name: "Autonomy & Software", focus: "Path planning, perception, telemetry" },
];

export default function TeamPage() {
  return (
    <>
      <Breadcrumbs
        visual={true}
        trail={[
          { label: "Home", href: "/" },
          { label: "Team", href: "/team" },
        ]}
      />
      <PageHero
        index={3}
        eyebrow="Team Shunya"
        title={
          <>
            Thirty engineers,{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">one rover</span>.
          </>
        }
        lead="MaRS pulls undergrads from mechanical, electronics, and CS. Year-round, we design, fabricate, debug, and field rovers as one team — Team Shunya."
      />

      <section className="container-page pb-24 md:pb-32">
        <Reveal>
          <MonoLabel index={1}>Sub-teams</MonoLabel>
        </Reveal>
        <div className="mt-10 grid gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40 md:grid-cols-3">
          {subteams.map((t) => (
            <Reveal
              key={t.tag}
              className="bg-[color:var(--color-void)] p-8 hover:bg-[color:var(--color-surface)] transition-colors"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-mars)]">
                {t.tag}
              </p>
              <h3 className="mt-3 text-2xl font-medium tracking-tight text-[color:var(--color-paper)]">
                {t.name}
              </h3>
              <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                {t.focus}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page pb-32">
        <Reveal>
          <MonoLabel index={2}>Roster</MonoLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[color:var(--color-muted)]">
            Full member roster with roles, sub-team assignments, and links is being prepared
            with the MaRS team. Coming soon.
          </p>
        </Reveal>
      </section>
    </>
  );
}
