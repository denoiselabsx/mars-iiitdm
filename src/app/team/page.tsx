import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { team, teamSubteams, type TeamMember } from "@/lib/data";
import { routeMeta } from "@/lib/seo";

export const metadata = routeMeta("/team", {
  title: "Team",
  description:
    "The 2026 MaRS roster — Management, Mechanical, Electronics, Software, Science. The team behind Team Shunya.",
});

// Group members by sub-team. Within each, leads first, then alphabetical.
const grouped = teamSubteams.map((s) => {
  const members = team
    .filter((m) => m.subteam === s.key)
    .sort((a, b) => {
      const aLead = a.rolePrefix?.toLowerCase().includes("lead") ?? false;
      const bLead = b.rolePrefix?.toLowerCase().includes("lead") ?? false;
      if (aLead && !bLead) return -1;
      if (!aLead && bLead) return 1;
      // Manager next
      const aMgr = a.rolePrefix?.toLowerCase().includes("manager") ?? false;
      const bMgr = b.rolePrefix?.toLowerCase().includes("manager") ?? false;
      if (aMgr && !bMgr) return -1;
      if (!aMgr && bMgr) return 1;
      return a.name.localeCompare(b.name);
    });
  return { ...s, members };
});

const totalMembers = team.length;

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
        tight
        index={3}
        eyebrow="Team Shunya"
        title={
          <>
            {totalMembers} engineers,{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              one rover
            </span>
            .
          </>
        }
        lead="MaRS pulls undergrads from mechanical, electronics, computer science, and the basic sciences. Year-round, we design, fabricate, debug, and field rovers as one team — Team Shunya."
      />

      {/* ── Sub-team overview strip ─────────────────────────────────── */}
      <section className="container-page pb-16 md:pb-24">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-10">
          <div className="md:col-span-7">
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              {teamSubteams.length} sub-teams
            </p>
            <h2 className="mt-6 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              Built across{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                disciplines
              </span>
              .
            </h2>
          </div>
          <nav className="md:col-span-5 md:pl-8" aria-label="Sub-team index">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              {grouped.map((s) => (
                <li key={s.key}>
                  <a
                    href={`#${s.key.toLowerCase()}`}
                    className="group flex items-baseline gap-3 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mars)] group-hover:text-[color:var(--color-signal)] w-5">
                      {String(s.members.length).padStart(2, "0")}
                    </span>
                    <span className="font-sans">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <RevealStagger
          as="ul"
          className="grid grid-cols-2 md:grid-cols-5 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40"
        >
          {grouped.map((s) => (
            <Reveal
              key={s.key}
              as="li"
              className="bg-[color:var(--color-void)] p-5 md:p-6 hover:bg-[color:var(--color-surface)] transition-colors"
            >
              <p className="font-sans text-4xl md:text-5xl font-medium tracking-[-0.02em] text-[color:var(--color-paper)]">
                {s.members.length}
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mars)]">
                {s.label}
              </p>
              <p className="mt-2 text-xs text-[color:var(--color-muted)] leading-snug">
                {s.focus}
              </p>
            </Reveal>
          ))}
        </RevealStagger>
      </section>

      {/* ── Roster — one section per sub-team ──────────────────────── */}
      <div className="space-y-24 md:space-y-32 pb-32">
        {grouped.map((s) => (
          <section
            key={s.key}
            id={s.key.toLowerCase()}
            className="container-page scroll-mt-24"
            aria-labelledby={`${s.key}-title`}
          >
            <header className="grid md:grid-cols-12 gap-6 md:gap-12 items-end mb-10 md:mb-14">
              <div className="md:col-span-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                  {String(s.members.length).padStart(2, "0")} members
                </p>
                <h2
                  id={`${s.key}-title`}
                  className="mt-3 font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]"
                >
                  {s.label.split(" ")[0]}{" "}
                  {s.label.split(" ")[1] && (
                    <span className="font-serif italic text-[color:var(--color-mars)]">
                      {s.label.split(" ").slice(1).join(" ")}
                    </span>
                  )}
                </h2>
              </div>
              <div className="md:col-span-6 md:col-start-7 text-[color:var(--color-muted)] leading-relaxed">
                <p>{s.focus}.</p>
              </div>
            </header>

            <RevealStagger
              as="ul"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40"
            >
              {s.members.map((m) => (
                <MemberCard key={m.name} member={m} />
              ))}
            </RevealStagger>
          </section>
        ))}
      </div>
    </>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  const isLead = member.rolePrefix?.toLowerCase().includes("lead");
  return (
    <Reveal
      as="li"
      className={`group relative bg-[color:var(--color-void)] p-6 md:p-7 hover:bg-[color:var(--color-surface)] transition-colors ${
        isLead ? "ring-1 ring-inset ring-[color:var(--color-mars)]/30" : ""
      }`}
    >
      {member.rolePrefix && (
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
          {member.rolePrefix}
        </p>
      )}
      <h3
        className={`mt-3 font-sans font-medium tracking-tight text-[color:var(--color-paper)] leading-tight ${
          member.rolePrefix ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
        }`}
      >
        {member.name}
      </h3>
      <p className="mt-3 text-sm text-[color:var(--color-muted)] leading-snug text-pretty">
        {member.blurb}
      </p>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
          aria-label={`${member.name} on LinkedIn`}
        >
          LinkedIn ↗
        </a>
      )}
    </Reveal>
  );
}
