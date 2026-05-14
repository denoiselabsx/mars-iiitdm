import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { team, teamSubteams, faculty, type TeamMember, type FacultyMember } from "@/lib/data";
import { routeMeta } from "@/lib/seo";

export const metadata = routeMeta("/team", {
  title: "Team",
  description:
    "The 2026 MaRS roster — Management, Mechanical, Electronics, Software, Science. The team behind Team Shunya.",
});

// Top-tier leadership — Team Lead → Co-Lead → Manager (excluded from subteams)
const leadership = team
  .filter((m): m is typeof m & { leadershipRank: 1 | 2 | 3 } => !!m.leadershipRank)
  .sort((a, b) => a.leadershipRank - b.leadershipRank);

// Group remaining members by sub-team. Sub-team leads first, then alphabetical.
const grouped = teamSubteams.map((s) => {
  const members = team
    .filter((m) => m.subteam === s.key && !m.leadershipRank)
    .sort((a, b) => {
      const aLead = a.rolePrefix?.toLowerCase().includes("lead") ?? false;
      const bLead = b.rolePrefix?.toLowerCase().includes("lead") ?? false;
      if (aLead && !bLead) return -1;
      if (!aLead && bLead) return 1;
      return a.name.localeCompare(b.name);
    });
  return { ...s, members };
});

const totalMembers = team.length;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

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
              one team
            </span>
            .
          </>
        }
        lead="MaRS pulls undergrads from mechanical, electronics, computer science, and the basic sciences. Year-round, we design, fabricate, debug, and field rovers as Team Shunya."
      />

      {/* ── Faculty (top of the org tree) ───────────────────────────── */}
      {faculty.length > 0 && (
        <section className="container-page pb-20 md:pb-28">
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end mb-10 md:mb-14">
            <div className="md:col-span-7">
              <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                Guided by
              </p>
              <h2 className="mt-4 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
                Faculty{" "}
                <span className="font-serif italic text-[color:var(--color-mars)]">
                  advisors
                </span>
                .
              </h2>
            </div>
            <div className="md:col-span-5 md:pl-8 text-[color:var(--color-muted)] leading-relaxed text-sm md:text-base">
              <p>
                The IIITDM Kancheepuram professors-in-charge who anchor the
                club&rsquo;s research direction, review designs, and mentor
                every cohort of Team Shunya.
              </p>
            </div>
          </div>

          <RevealStagger
            as="ol"
            className={`grid gap-3 md:gap-4 ${
              faculty.length === 1
                ? "grid-cols-1"
                : faculty.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-3"
            }`}
          >
            {faculty.map((f) => (
              <FacultyCard key={f.name} member={f} />
            ))}
          </RevealStagger>
        </section>
      )}

      {/* ── Top-tier leadership ─────────────────────────────────────── */}
      {leadership.length > 0 && (
        <section className="container-page pb-20 md:pb-28">
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end mb-10 md:mb-14">
            <div className="md:col-span-7">
              <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                Leadership
              </p>
              <h2 className="mt-4 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
                Team Shunya{" "}
                <span className="font-serif italic text-[color:var(--color-mars)]">
                  2026
                </span>
                .
              </h2>
            </div>
            <div className="md:col-span-5 md:pl-8 text-[color:var(--color-muted)] leading-relaxed text-sm md:text-base">
              <p>Team Lead, Technical Lead, and Manager for the current season.</p>
            </div>
          </div>

          <RevealStagger
            as="ol"
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
          >
            {leadership.map((m) => (
              <LeadershipCard key={m.name} member={m} />
            ))}
          </RevealStagger>
        </section>
      )}

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
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
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
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40"
            >
              {s.members.map((m, idx) => (
                <MemberCard key={m.name} member={m} index={idx} />
              ))}
            </RevealStagger>
          </section>
        ))}
      </div>
    </>
  );
}

/* ───────────────────────────────────────────────────────────────────
   Faculty Card — most editorial weight on the page. Larger portrait,
   serif name treatment, formal mono designation strip. No hover-grayscale
   trick — faculty stay in colour because their photos are formal.
   ─────────────────────────────────────────────────────────────────── */
function FacultyCard({ member }: { member: FacultyMember }) {
  const cls =
    "group relative isolate overflow-hidden bg-[color:var(--color-void)] border border-[color:var(--color-line)]/60 hover:border-[color:var(--color-mars)]/60 transition-colors flex flex-col";

  return (
    <Reveal as="li" className={cls}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-surface)]">
        <Image
          src={`/team/${member.image}-hero.webp`}
          alt={`${member.name} portrait`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-[center_20%] group-hover:scale-[1.03] transition-transform duration-[900ms] ease-out"
          priority
        />
        <p className="absolute top-5 left-5 md:top-6 md:left-6 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-paper)] mix-blend-difference">
          {member.role}
        </p>
        <span
          aria-hidden
          className="absolute top-5 right-5 md:top-6 md:right-6 font-mono text-[9px] uppercase tracking-[0.32em] text-[color:var(--color-paper)]/70"
        >
          IIITDM-K
        </span>
      </div>

      <div className="p-6 md:p-7 lg:p-8 flex-1 flex flex-col">
        <h3 className="font-sans text-2xl md:text-3xl font-medium tracking-[-0.01em] text-[color:var(--color-paper)] leading-[1.1] text-balance">
          <span className="font-serif italic text-[color:var(--color-mars)]">
            {member.name.split(" ")[0]}
          </span>{" "}
          {member.name.split(" ").slice(1).join(" ")}
        </h3>
        {member.expertise && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
            {member.expertise}
          </p>
        )}

        {/* Profile CTA — explicit button below the name. Mars-tinted hairline,
            mono micro-text, sweep underline on hover, arrow nudges right. */}
        {member.href && (
          <a
            href={member.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${member.name} faculty profile on iiitdm.ac.in`}
            className="group/btn mt-6 self-start inline-flex items-center gap-2 px-4 py-2.5 border border-[color:var(--color-line)]/60 hover:border-[color:var(--color-mars)]/70 bg-[color:var(--color-surface)]/40 hover:bg-[color:var(--color-mars)]/10 transition-all duration-300 ease-out"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-paper)] group-hover/btn:text-[color:var(--color-paper)] transition-colors">
              Faculty profile
            </span>
            <span
              aria-hidden
              className="font-mono text-[10px] text-[color:var(--color-mars)] transition-transform duration-300 group-hover/btn:translate-x-1"
            >
              ↗
            </span>
          </a>
        )}
      </div>
    </Reveal>
  );
}

/* ───────────────────────────────────────────────────────────────────
   Leadership Card — large portrait + tier numeral watermark.
   The photo dominates; meta sits below in a strict editorial block.
   ─────────────────────────────────────────────────────────────────── */
function LeadershipCard({
  member,
}: {
  member: TeamMember & { leadershipRank: 1 | 2 | 3 };
}) {
  const tierLabel =
    member.leadershipRank === 1
      ? "01 · Lead"
      : member.leadershipRank === 2
        ? "02 · Co-Lead"
        : "03 · Manager";

  return (
    <Reveal
      as="li"
      className="group relative isolate overflow-hidden bg-[color:var(--color-void)] border border-[color:var(--color-line)]/50 hover:border-[color:var(--color-mars)]/60 transition-colors"
    >
      {/* corner accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-px left-0 z-20 h-px w-12 bg-[color:var(--color-mars)] origin-left scale-x-100 group-hover:scale-x-[5] transition-transform duration-500 ease-out"
      />

      {/* Portrait — 4:5 aspect, dominant */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-surface)]">
        {member.image ? (
          <Image
            src={`/team/${member.image}-hero.webp`}
            alt={`${member.name} portrait`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-[center_22%] grayscale-[40%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-[900ms] ease-out"
            priority={member.leadershipRank === 1}
          />
        ) : (
          <InitialsTile name={member.name} large />
        )}

        {/* watermark rank numeral */}
        <p
          aria-hidden
          className="pointer-events-none absolute top-4 right-5 md:top-5 md:right-6 font-sans text-7xl md:text-8xl font-medium tracking-[-0.05em] leading-none text-[color:var(--color-paper)]/10 group-hover:text-[color:var(--color-mars)]/35 transition-colors duration-500"
        >
          0{member.leadershipRank}
        </p>

        {/* tier chip — top-left */}
        <p className="absolute top-5 left-5 md:top-6 md:left-6 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-paper)] mix-blend-difference">
          {tierLabel}
        </p>
      </div>

      {/* Body */}
      <div className="p-6 md:p-7 lg:p-8">
        <h3 className="font-sans text-2xl md:text-3xl font-medium tracking-[-0.01em] text-[color:var(--color-paper)] leading-[1.1] text-balance">
          {member.name}
        </h3>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mars)]">
          {member.rolePrefix}
        </p>
        <p className="mt-4 text-sm md:text-[15px] text-[color:var(--color-muted)] leading-relaxed text-pretty">
          {member.blurb}
        </p>

        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
            aria-label={`${member.name} on LinkedIn`}
          >
            <span aria-hidden>LinkedIn</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              ↗
            </span>
          </a>
        )}
      </div>
    </Reveal>
  );
}

/* ───────────────────────────────────────────────────────────────────
   Member Card — portrait dominant, meta slides up on hover (desktop)
   and stays visible on mobile. Sub-team leads carry a rust ring.
   ─────────────────────────────────────────────────────────────────── */
function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const isLead = member.rolePrefix?.toLowerCase().includes("lead");
  return (
    <Reveal
      as="li"
      className={`group relative isolate overflow-hidden bg-[color:var(--color-void)] hover:bg-[color:var(--color-surface)] transition-colors ${
        isLead ? "ring-1 ring-inset ring-[color:var(--color-mars)]/40" : ""
      }`}
    >
      {/* Portrait — 4:5 aspect, edge-to-edge */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--color-surface)]">
        {member.image ? (
          <Image
            src={`/team/${member.image}-grid.webp`}
            alt={`${member.name} portrait`}
            fill
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 50vw"
            className="object-cover object-[center_22%] grayscale-[55%] group-hover:grayscale-0 group-hover:scale-[1.05] transition-all duration-[700ms] ease-out"
            loading={index < 6 ? "eager" : "lazy"}
          />
        ) : (
          <InitialsTile name={member.name} />
        )}

        {/* permanent edge vignette for legibility of overlaid index */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/20"
        />

        {/* mono index in top-right — gives the grid an editorial feel */}
        <span
          aria-hidden
          className="absolute top-3 right-3 md:top-4 md:right-4 font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-paper)]/60"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* role pill on photo for leads */}
        {isLead && member.rolePrefix && (
          <span className="absolute top-3 left-3 md:top-4 md:left-4 px-2 py-1 bg-[color:var(--color-mars)]/90 backdrop-blur-sm font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-paper)]">
            {member.rolePrefix}
          </span>
        )}

        {/* name strip — anchored bottom, name always visible, blurb slides on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
          <h3 className="font-sans text-base md:text-lg font-medium tracking-tight text-[color:var(--color-paper)] leading-tight">
            {member.name}
          </h3>
          {!isLead && member.rolePrefix && (
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
              {member.rolePrefix}
            </p>
          )}
        </div>
      </div>

      {/* Body — blurb + linkedin */}
      <div className="p-4 md:p-5">
        <p className="text-xs md:text-sm text-[color:var(--color-muted)] leading-snug text-pretty min-h-[2.5em]">
          {member.blurb}
        </p>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
            aria-label={`${member.name} on LinkedIn`}
          >
            LinkedIn ↗
          </a>
        )}
      </div>
    </Reveal>
  );
}

/* ───────────────────────────────────────────────────────────────────
   Initials tile — typographic fallback when no photo exists.
   Mars-red serif monogram on a subtly noised gradient backdrop.
   ─────────────────────────────────────────────────────────────────── */
function InitialsTile({ name, large }: { name: string; large?: boolean }) {
  const i = initials(name);
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 110% 80% at 50% 30%, color-mix(in oklab, var(--color-mars) 12%, transparent) 0%, transparent 70%), linear-gradient(180deg, var(--color-surface) 0%, var(--color-void) 100%)",
      }}
    >
      {/* faint grid hatch — gives the empty tile texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--color-paper) 60%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-paper) 60%, transparent) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <span
        className={`relative font-serif italic text-[color:var(--color-mars)]/75 select-none ${
          large ? "text-[14vw] md:text-[8vw] lg:text-[6vw]" : "text-[16vw] sm:text-[10vw] md:text-[7vw] lg:text-[5vw]"
        }`}
        style={{ lineHeight: 1 }}
      >
        {i}
      </span>
    </div>
  );
}
