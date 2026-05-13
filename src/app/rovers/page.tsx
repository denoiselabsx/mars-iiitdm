import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { RoverVideoFrame } from "@/components/rovers/rover-video-frame";
import { rovers, process, type Rover } from "@/lib/data";
import { site } from "@/lib/site";
import { routeMeta } from "@/lib/seo";

export const metadata = routeMeta("/rovers", {
  title: "Rovers",
  description:
    "Every rover MaRS has built — Shaurya (IRC 2026), Lakshya (ERC 2025), Vajra, Destiny, Vetri — and Rudra, the next-gen build for ERC 2026.",
});

// Newest competition year first. Rovers without a year sort last in their bucket.
const byRecency = (a: { year?: number }, b: { year?: number }) =>
  (b.year ?? -Infinity) - (a.year ?? -Infinity);

// Section 1 — competition-bound builds currently in development (Rudra, Scout Drone)
const inDevelopment = rovers
  .filter((r) => r.status === "designing" && r.forEvent)
  .sort(byRecency);

// Section 2 — active fleet (newest competition first)
const active = rovers.filter((r) => r.status === "active").sort(byRecency);

// Section 3 — legacy (retired). The rover(s) that put MaRS on the map.
const legacy = rovers.filter((r) => r.status === "retired").sort(byRecency);

// Section 4 — bench projects (no competition target yet) + concepts
const bench = rovers.filter(
  (r) => (r.status === "designing" && !r.forEvent) || r.status === "concept",
);

const statusLabel = {
  active: "Active",
  designing: "In development",
  concept: "Concept",
  retired: "Retired",
} as const;

export default function RoversPage() {
  return (
    <>
      <Breadcrumbs
        visual={true}
        trail={[
          { label: "Home", href: "/" },
          { label: "Rovers", href: "/rovers" },
        ]}
      />
      <PageHero
        tight
        index={1}
        eyebrow="Rovers"
        title={
          <>
            Built from the chassis up,{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              in-house
            </span>
            .
          </>
        }
        lead={`Every drivetrain, arm, and PCB is designed and machined by students. ${active.length} platforms in active rotation, ${inDevelopment.length} in development for the next competition season, and the lineage that started it all.`}
      />

      {/* ── In development (competition-bound builds) ─────────────────── */}
      {inDevelopment.length > 0 && (
        <section className="container-page pb-20 md:pb-28">
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end mb-10 md:mb-14">
            <div className="md:col-span-7">
              <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                In development
              </p>
              <h2 className="mt-4 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
                Building for the{" "}
                <span className="font-serif italic text-[color:var(--color-mars)]">
                  next season
                </span>
                .
              </h2>
            </div>
            <p className="md:col-span-5 md:pl-8 text-[color:var(--color-muted)] leading-relaxed text-sm md:text-base">
              The platforms currently under active engineering — designed,
              fabricated, and tuned for a specific competition on the calendar.
            </p>
          </div>

          <RevealStagger
            as="ol"
            className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4"
          >
            {inDevelopment.map((r) => (
              <Reveal
                key={r.slug}
                as="li"
                id={r.slug}
                className="group relative overflow-hidden bg-[color:var(--color-void)] border border-[color:var(--color-line)]/50 hover:border-[color:var(--color-mars)]/50 transition-colors p-6 md:p-8 lg:p-10 flex flex-col min-h-[clamp(260px,28vw,360px)] scroll-mt-24"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(ellipse 90% 70% at 25% 100%, color-mix(in oklab, var(--color-mars) 16%, transparent) 0%, transparent 70%)",
                  }}
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                  {r.forEvent ?? "In development"} · {r.kind}
                </p>
                <h3 className="mt-4 md:mt-5 font-sans text-4xl md:text-5xl lg:text-6xl font-medium tracking-[-0.025em] leading-[0.95] text-[color:var(--color-paper)] group-hover:text-[color:var(--color-mars)] transition-colors duration-700">
                  {r.name}
                </h3>
                <p className="mt-5 md:mt-6 text-sm md:text-base text-[color:var(--color-muted)] leading-relaxed text-pretty">
                  {r.blurb}
                </p>
                {r.highlight && (
                  <p className="mt-auto pt-6 inline-flex items-center gap-3 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-paper)]">
                    <span className="h-px w-8 bg-[color:var(--color-mars)]" />
                    {r.highlight}
                  </p>
                )}
              </Reveal>
            ))}
          </RevealStagger>
        </section>
      )}

      {/* ── Active fleet ─────────────────────────────────────────────── */}
      <section className="container-page pb-24 md:pb-32 border-t border-[color:var(--color-line)]/40 pt-16 md:pt-20">
        <div className="flex items-end justify-between gap-8 flex-wrap mb-12 md:mb-16">
          <div>
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              In rotation
            </p>
            <h2 className="mt-4 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              The current{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                fleet
              </span>
              .
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faint)]">
            {active.length} platforms · active
          </p>
        </div>

        <ol className="space-y-px">
          {active.map((r, i) => (
            <ActiveRoverRow key={r.slug} rover={r} index={i} id={r.slug} />
          ))}
        </ol>
      </section>

      {/* ── Legacy ─────────────────────────────────────────────────────── */}
      {legacy.length > 0 && (
        <section className="container-page pb-24 md:pb-32">
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end mb-10 md:mb-14">
            <div className="md:col-span-7">
              <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                Lineage
              </p>
              <h2 className="mt-4 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
                Where it{" "}
                <span className="font-serif italic text-[color:var(--color-mars)]">
                  began
                </span>
                .
              </h2>
            </div>
            <p className="md:col-span-5 md:pl-8 text-[color:var(--color-muted)] leading-relaxed text-sm md:text-base">
              The rover that put MaRS on the international podium. Retired from
              competition but kept on the floor — every new build inherits its
              design language.
            </p>
          </div>

          <RevealStagger
            as="ul"
            className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4"
          >
            {legacy.map((r) => {
              const photo = r.photos?.[0];
              const featured = !!photo;
              return (
                <Reveal
                  key={r.slug}
                  as="li"
                  id={r.slug}
                  className={
                    featured
                      ? "md:col-span-7 group relative overflow-hidden bg-[color:var(--color-void)] border border-[color:var(--color-line)]/50 hover:border-[color:var(--color-mars)]/40 transition-colors scroll-mt-24"
                      : "md:col-span-5 group bg-[color:var(--color-void)] border border-[color:var(--color-line)]/50 hover:border-[color:var(--color-mars)]/40 transition-colors p-6 md:p-8 min-h-[220px] flex flex-col scroll-mt-24"
                  }
                >
                  {featured && photo && (
                    <RoverFrame
                      photo={photo}
                      sizes="(min-width: 768px) 60vw, 100vw"
                      aspectClass="aspect-[4/3]"
                      priority={false}
                    />
                  )}
                  <div className={featured ? "p-6 md:p-8" : "contents"}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                      Retired · {r.forEvent ?? r.kind}
                    </p>
                    <h3 className="mt-3 font-sans text-3xl md:text-4xl font-medium tracking-[-0.02em] leading-[1] text-[color:var(--color-paper)] group-hover:text-[color:var(--color-mars)] transition-colors duration-500">
                      {r.name}
                    </h3>
                    <p className="mt-5 text-sm md:text-base leading-relaxed text-[color:var(--color-muted)] flex-1 text-pretty">
                      {r.blurb}
                    </p>
                    {r.highlight && (
                      <p className="mt-5 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-paper)]">
                        <span className="h-px w-8 bg-[color:var(--color-mars)]" />
                        {r.highlight}
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </RevealStagger>
        </section>
      )}

      {/* ── How we work ─────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-t border-[color:var(--color-line)]/40 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-32"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 50%, color-mix(in oklab, var(--color-mars) 18%, transparent) 0%, transparent 70%)",
          }}
        />

        <div className="container-page">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-16 md:mb-20">
            <div className="md:col-span-7">
              <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
                Our process
              </p>
              <h2 className="mt-6 text-balance font-sans text-4xl md:text-6xl font-medium tracking-tight leading-[1]">
                Five stages,{" "}
                <span className="font-serif italic text-[color:var(--color-mars)]">
                  every season
                </span>
                .
              </h2>
            </div>
            <p className="md:col-span-5 md:pl-8 text-[color:var(--color-muted)] leading-relaxed">
              Every rover travels the same path — from ideation through validation. Each
              stage feeds the next; mistakes caught early stay cheap.
            </p>
          </div>

          <RevealStagger
            as="ol"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40"
          >
            {process.map((p) => (
              <Reveal
                as="li"
                key={p.n}
                className="bg-[color:var(--color-void)] p-6 md:p-7 hover:bg-[color:var(--color-surface)] transition-colors"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                  {p.n}
                </p>
                <h3 className="mt-3 font-sans text-xl md:text-2xl font-medium tracking-tight text-[color:var(--color-paper)]">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {p.desc}
                </p>
              </Reveal>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── On the bench (non-competition experimental builds) ────────── */}
      {bench.length > 0 && (
      <section className="container-page py-24 md:py-32">
        <div className="flex items-end justify-between gap-8 flex-wrap mb-12 md:mb-16">
          <div>
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              On the bench
            </p>
            <h2 className="mt-6 text-balance font-sans text-4xl md:text-6xl font-medium tracking-tight leading-[1]">
              Long-horizon{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                experiments
              </span>
              .
            </h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faint)]">
            {bench.length} on the bench
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {bench.map((r) => (
            <Reveal
              key={r.slug}
              className="bg-[color:var(--color-void)] border border-[color:var(--color-line)]/50 hover:border-[color:var(--color-mars)]/40 transition-colors p-8 md:p-10 min-h-[240px] flex flex-col"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                {statusLabel[r.status]}
              </p>
              <h3 className="mt-4 font-sans text-3xl md:text-4xl font-medium tracking-[-0.02em] leading-[1] text-[color:var(--color-paper)]">
                {r.name}
              </h3>
              <p className="mt-6 text-sm leading-relaxed text-[color:var(--color-muted)] flex-1">
                {r.blurb}
              </p>
            </Reveal>
          ))}
        </RevealStagger>
      </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="relative py-32 md:py-40 overflow-hidden">
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
            Want to{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              follow along?
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-[color:var(--color-muted)]">
            Recruitment for the current cycle is closed. Next intake is March
            2027 — follow on Instagram for the call.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Magnetic>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-signal)] text-[color:var(--color-void)] px-7 py-3.5 text-sm font-medium transition-colors"
              >
                Follow on Instagram
                <span aria-hidden className="transition-transform group-hover:translate-x-1">↗</span>
              </a>
            </Magnetic>
            <Link
              href="/competitions"
              className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
            >
              See competition results
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Active fleet row.
//
// Editorial side-by-side: bold display type on one side, photograph on the
// other. The orientation flips every other row so the page reads like a
// printed feature instead of a stamped grid. Rows without a photo collapse
// gracefully to a type-only treatment so Khoj / Vetri / Destiny Manipulator
// still belong in the rhythm.
// ──────────────────────────────────────────────────────────────────────────
function ActiveRoverRow({ rover, index, id }: { rover: Rover; index: number; id?: string }) {
  const photo = rover.photos?.[0];
  const video = rover.video;
  const hasMedia = !!(video || photo);
  const reversed = index % 2 === 1;
  const numeral = String(index + 1).padStart(2, "0");
  // Pick the slot's aspect from the video (when present) or the photo,
  // so the frame's reserved space matches the source.
  const mediaAspect = video
    ? video.height > video.width
      ? "aspect-[4/5]"
      : "aspect-[16/9]"
    : photo && photo.height > photo.width
    ? "aspect-[4/5]"
    : "aspect-[5/4]";

  return (
    <Reveal
      as="li"
      id={id}
      delay={index * 0.04}
      className="group relative border-t border-[color:var(--color-line)]/50 last:border-b py-10 md:py-16 transition-colors hover:bg-[color:var(--color-surface)]/30 scroll-mt-24"
    >
      <div
        className={[
          "grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-8 items-center",
          reversed ? "md:[direction:rtl]" : "",
        ].join(" ")}
      >
        {/* Type column */}
        <div
          className={[
            "col-span-12 [direction:ltr]",
            hasMedia ? "md:col-span-6" : "md:col-span-12",
          ].join(" ")}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
            {numeral} · {rover.forEvent ?? rover.kind}
          </p>
          <h3 className="mt-3 font-sans text-[2.75rem] sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.025em] leading-[1] sm:leading-[0.95] text-[color:var(--color-paper)] group-hover:text-[color:var(--color-mars)] transition-colors duration-700">
            {rover.name}
          </h3>
          <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-[color:var(--color-muted)]">
            {rover.blurb}
          </p>
          {rover.highlight && (
            <p className="mt-5 inline-flex items-center gap-3 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-paper)]">
              <span className="h-px w-8 bg-[color:var(--color-mars)]" />
              {rover.highlight}
            </p>
          )}
        </div>

        {/* Media column — video takes precedence over photo when both exist */}
        {hasMedia && (
          <div className="col-span-12 md:col-span-6 [direction:ltr]">
            {video ? (
              <RoverVideoFrame video={video} aspectClass={mediaAspect} />
            ) : (
              photo && (
                <RoverFrame
                  photo={photo}
                  sizes="(min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw"
                  aspectClass={mediaAspect}
                  priority={index === 0}
                />
              )
            )}
          </div>
        )}
      </div>
    </Reveal>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Photographic frame.
//
// One concern: present the rover photograph as a static, posterized object —
// no drop shadows, no parallax. Subtle 1.03× scale + a Mars-red wash on
// hover hints at interactivity without theatrics. Caption sits below in
// mono micro-type, matching every other footnote on the site.
// ──────────────────────────────────────────────────────────────────────────
function RoverFrame({
  photo,
  sizes,
  aspectClass,
  priority = false,
}: {
  photo: NonNullable<Rover["photos"]>[number];
  sizes: string;
  aspectClass: string;
  priority?: boolean;
}) {
  return (
    <figure className="group/frame">
      <div
        className={[
          "relative overflow-hidden bg-[color:var(--color-void)] border border-[color:var(--color-line)]/50",
          aspectClass,
        ].join(" ")}
      >
        <Image
          src={photo.src}
          alt={photo.caption ?? "MaRS rover photograph"}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:scale-[1.03]"
        />
        {/* Red wash that builds on hover — ties the photo into the Mars palette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-700 mix-blend-soft-light"
          style={{
            background:
              "linear-gradient(140deg, color-mix(in oklab, var(--color-mars) 28%, transparent) 0%, transparent 55%)",
          }}
        />
        {/* Bottom fade for caption legibility on photos that bleed light */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--color-void) 70%, transparent) 0%, transparent 100%)",
          }}
        />
      </div>
      {photo.caption && (
        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-faint)] leading-snug">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}
