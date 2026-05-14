import Link from "next/link";
import Image from "next/image";

import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { DenoiseMark } from "@/components/site/denoise-mark";
import { site } from "@/lib/site";
import { routeMeta } from "@/lib/seo";

const socialUrl = {
  instagram: (h: string) => `https://instagram.com/${h}`,
  x: (h: string) => `https://x.com/${h}`,
  linkedin: (h: string) => `https://www.linkedin.com/in/${h}/`,
  github: (h: string) => `https://github.com/${h}`,
} as const;

export const metadata = routeMeta("/credits", {
  title: "Credits",
  description:
    "The people, partners, and open-source work that made the MaRS website possible.",
  robots: { index: true, follow: true },
});

const stack = [
  { name: "Next.js", href: "https://nextjs.org", role: "App Router · React framework" },
  { name: "React Three Fiber", href: "https://r3f.docs.pmnd.rs", role: "Declarative WebGL · the rover scene" },
  { name: "Drei", href: "https://drei.docs.pmnd.rs", role: "r3f helpers · GLTF loading, environments" },
  { name: "Motion (Framer Motion)", href: "https://motion.dev", role: "Component-level interactions" },
  { name: "GSAP ScrollTrigger", href: "https://gsap.com/scrolltrigger", role: "Scroll-driven scenes" },
  { name: "Lenis", href: "https://lenis.darkroom.engineering", role: "Smooth-scroll" },
  { name: "Tailwind CSS", href: "https://tailwindcss.com", role: "Styling system" },
  { name: "shadcn/ui", href: "https://ui.shadcn.com", role: "Accessible primitives" },
];

export default function CreditsPage() {
  return (
    <>
      <Breadcrumbs
        visual={true}
        trail={[
          { label: "Home", href: "/" },
          { label: "Credits", href: "/credits" },
        ]}
      />
      <PageHero
        tight
        index="00"
        eyebrow="Colophon"
        title={
          <>
            How this site was{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">made</span>.
          </>
        }
        lead="A note on the people, partners, and open-source work behind marsiiitdm.in. Mostly because attribution is the polite thing to do, partly because we're proud of the build."
      />

      {/* Acknowledgments — MaRS first */}
      <section className="container-page pb-20 md:pb-28 grid gap-10 md:gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
            01 — Partner
          </p>
          <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight">MaRS</h2>
        </Reveal>
        <Reveal className="md:col-span-8" delay={0.1}>
          <p className="text-base leading-relaxed text-[color:var(--color-muted)]">
            None of this matters without the team that builds the rovers. Thanks to the MaRS leads
            and every member of Team Shunya for trusting us with the brief, sharing material from
            two seasons of competition, and giving honest feedback on three rounds of design.
          </p>
        </Reveal>
      </section>

      <div className="container-page">
        <div className="h-px bg-[color:var(--color-line)]/60" />
      </div>

      {/* 3D model attribution — required by CC-BY */}
      <section className="container-page py-20 md:py-28 grid gap-10 md:gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
            02 — 3D Model
          </p>
          <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight">
            Curiosity Mars Rover
          </h2>
        </Reveal>
        <Reveal className="md:col-span-8" delay={0.1}>
          <p className="text-base leading-relaxed text-[color:var(--color-muted)]">
            The 3D rover model in the hero is{" "}
            <a
              href="https://sketchfab.com/3d-models/curiosity-mars-rover-6cab1b08f20a4408960413ff44694b36"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[color:var(--color-paper)] underline decoration-[color:var(--color-signal)] underline-offset-4 hover:text-[color:var(--color-signal)] transition-colors"
            >
              &ldquo;Curiosity Mars Rover&rdquo;
            </a>{" "}
            by{" "}
            <a
              href="https://sketchfab.com/robo-reboot"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[color:var(--color-paper)] underline decoration-[color:var(--color-signal)] underline-offset-4 hover:text-[color:var(--color-signal)] transition-colors"
            >
              Cybertron B-127
            </a>
            , licensed under{" "}
            <a
              href="http://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[color:var(--color-paper)] underline decoration-[color:var(--color-signal)] underline-offset-4 hover:text-[color:var(--color-signal)] transition-colors"
            >
              CC-BY 4.0
            </a>
            . It stands in until MaRS exports a CAD model of their own rover, at which point it
            will be replaced.
          </p>
        </Reveal>
      </section>

      <div className="container-page">
        <div className="h-px bg-[color:var(--color-line)]/60" />
      </div>

      {/* Stack */}
      <section className="container-page py-20 md:py-28 grid gap-10 md:gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
            03 — Built with
          </p>
          <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight">Open source</h2>
        </Reveal>
        <Reveal className="md:col-span-8" delay={0.1}>
          <p className="text-base leading-relaxed text-[color:var(--color-muted)]">
            Every interaction on this site stands on the work of independent maintainers. Thanks
            to all of them for shipping software we get to use for free.
          </p>
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {stack.map((s) => (
              <li key={s.name} className="border-t border-[color:var(--color-line)]/40 pt-4">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-baseline gap-2 text-base font-medium text-[color:var(--color-paper)] hover:text-[color:var(--color-signal)] transition-colors"
                >
                  {s.name}
                  <span aria-hidden className="text-[color:var(--color-faint)] group-hover:text-[color:var(--color-signal)] transition-colors text-xs">↗</span>
                </a>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-faint)]">
                  {s.role}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <div className="container-page">
        <div className="h-px bg-[color:var(--color-line)]/60" />
      </div>

      {/* Denoise — the studio behind the build */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[60vh]"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in oklab, var(--color-mars) 18%, transparent) 0%, transparent 70%)",
          }}
        />

        <div className="container-page grid gap-12 md:gap-16 md:grid-cols-12 relative">
          <Reveal className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
              04 — Studio
            </p>
            <h2 className="mt-4">
              <a
                href={site.agency.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Denoise Labs"
                className="inline-block transition-opacity hover:opacity-80"
              >
                <DenoiseMark height={32} />
                <span className="sr-only">Denoise Labs</span>
              </a>
            </h2>
            <a
              href={site.agency.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)] hover:text-[color:var(--color-signal)] transition-colors"
            >
              {site.agency.domain}
              <span aria-hidden>↗</span>
            </a>
          </Reveal>

          <Reveal className="md:col-span-8" delay={0.1}>
            <p className="max-w-xl text-balance font-sans text-2xl md:text-3xl leading-[1.2] tracking-tight text-[color:var(--color-paper)]">
              We&rsquo;re four students at IIITDM Kancheepuram, building software and design for
              teams who care about <span className="font-serif italic text-[color:var(--color-mars)]">how</span> things feel,
              not just whether they work.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--color-muted)]">
              MaRS is our first agency partner. If you&rsquo;re building something that deserves
              the same care — a club site, a launch page, a small product — we&rsquo;d love to
              talk.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Magnetic>
                <a
                  href={`mailto:${site.agency.email}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-signal)] text-[color:var(--color-void)] px-6 py-3 text-sm font-medium transition-colors"
                >
                  Start a conversation
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </Magnetic>
              <a
                href={site.agency.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors"
              >
                Visit {site.agency.domain}
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-page">
        <div className="h-px bg-[color:var(--color-line)]/60" />
      </div>

      {/* Denoise founders — the four people behind the build */}
      <section className="container-page py-20 md:py-28 grid gap-10 md:gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
            05 — Founders
          </p>
          <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight">
            Four founders.{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              Same bar.
            </span>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[color:var(--color-muted)]">
            The team that designed, engineered, and shipped this site. All four
            of us are at IIITDM Kancheepuram with you.
          </p>
        </Reveal>

        <div className="md:col-span-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
            {site.agency.founders.map((f, i) => (
              <Reveal key={f.name} delay={0.05 + i * 0.05} as="li">
                <article className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[color:var(--color-line)]/30 ring-1 ring-[color:var(--color-line)]/50 transition-all duration-500 group-hover:ring-[color:var(--color-mars)]/40">
                    {f.portrait ? (
                      <>
                        <Image
                          src={f.portrait.mono}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 22vw, 50vw"
                          className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
                        />
                        <Image
                          src={f.portrait.color}
                          alt={f.name}
                          fill
                          sizes="(min-width: 768px) 22vw, 50vw"
                          className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif italic text-6xl md:text-7xl text-[color:var(--color-muted)]/40 transition-colors duration-500 group-hover:text-[color:var(--color-mars)]/70">
                          {f.initials}
                        </span>
                      </div>
                    )}
                    <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-paper)]/80 mix-blend-difference">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="mt-5">
                    <p className="font-sans text-lg font-medium tracking-tight text-[color:var(--color-paper)]">
                      {f.name}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)]">
                      {f.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                      {f.oneLiner}
                    </p>

                    <ul className="mt-4 flex items-center gap-4">
                      {(["instagram", "x", "linkedin", "github"] as const).map(
                        (k) => {
                          const handle = f.socials[k];
                          if (!handle) return null;
                          const label = {
                            instagram: "IG",
                            x: "X",
                            linkedin: "IN",
                            github: "GH",
                          }[k];
                          return (
                            <li key={k}>
                              <a
                                href={socialUrl[k](handle)}
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label={`${f.name} on ${k}`}
                                className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)] hover:text-[color:var(--color-signal)] transition-colors"
                              >
                                {label}
                              </a>
                            </li>
                          );
                        },
                      )}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-page">
        <div className="h-px bg-[color:var(--color-line)]/60" />
      </div>

      {/* Closing line */}
      <section className="container-page pb-32 md:pb-48 text-center">
        <Reveal>
          <p className="font-serif italic text-2xl md:text-3xl text-[color:var(--color-muted)]">
            Made with care, in Chennai.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)]">
            <Link href="/" className="hover:text-[color:var(--color-paper)] transition-colors">
              ← Back to MaRS
            </Link>
          </p>
        </Reveal>
      </section>
    </>
  );
}
