import Image from "next/image";

import { PageHero } from "@/components/site/page-hero";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { eventGalleries, type EventGallery, type EventPhoto } from "@/lib/data";
import { routeMeta } from "@/lib/seo";

export const metadata = routeMeta("/gallery", {
  title: "Gallery",
  description:
    "Photos from the field — IRC 2026, IRC 2025, IRC 2024, IRoC-U 2024, and the Caterpillar industry-day demo.",
});

const totalPhotos = eventGalleries.reduce((n, e) => n + e.photos.length, 0);

export default function GalleryPage() {
  return (
    <>
      <Breadcrumbs
        visual={true}
        trail={[
          { label: "Home", href: "/" },
          { label: "Gallery", href: "/gallery" },
        ]}
      />

      <PageHero
        tight
        index={5}
        eyebrow="Gallery"
        title={
          <>
            From the{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              field
            </span>
            .
          </>
        }
        lead="Late nights in the pit. Dust on red soil. Podium handovers under bright lights. The work, in pictures."
      />

      {/* Index strip — anchors */}
      <section className="container-page pb-12 md:pb-20">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-7">
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              {eventGalleries.length} events · {totalPhotos} photos
            </p>
            <h2 className="mt-6 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              Three years on the{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                Mars-analog
              </span>{" "}
              circuit.
            </h2>
          </div>
          <nav
            className="md:col-span-5 md:pl-8"
            aria-label="Event index"
          >
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {eventGalleries.map((e) => (
                <li key={e.slug}>
                  <a
                    href={`#${e.slug}`}
                    className="group block text-sm leading-tight text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mars)] group-hover:text-[color:var(--color-signal)]">
                      {e.year}
                    </span>
                    <br />
                    <span className="font-sans">{shortName(e)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Event chapters */}
      <div className="space-y-32 md:space-y-48 pb-32">
        {eventGalleries.map((event, idx) => (
          <EventChapter key={event.slug} event={event} flip={idx % 2 === 1} />
        ))}
      </div>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Subcomponent — one editorial chapter per event
// Layout: [hero photo, full-bleed-ish] then asymmetric 2-col grid for the rest.
// Mobile: stacked single column with captions under each photo.
// ──────────────────────────────────────────────────────────────────────────

function EventChapter({ event, flip }: { event: EventGallery; flip: boolean }) {
  const [hero, ...rest] = event.photos;
  const tall = rest.find((p) => p.span === "tall") ?? rest[0];
  const others = rest.filter((p) => p !== tall);

  return (
    <section
      id={event.slug}
      className="container-page scroll-mt-24"
      aria-labelledby={`${event.slug}-title`}
    >
      {/* Header — title, location, blurb */}
      <header
        className={`grid md:grid-cols-12 gap-6 md:gap-12 items-end mb-10 md:mb-14 ${
          flip ? "md:[&>:first-child]:order-2" : ""
        }`}
      >
        <div className="md:col-span-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
            {event.year} · {event.location}
          </p>
          <h2
            id={`${event.slug}-title`}
            className="mt-3 font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]"
          >
            {event.name.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">
              {event.name.split(" ").slice(-1)[0]}
            </span>
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="text-[color:var(--color-muted)] leading-relaxed text-pretty">
            {event.blurb}
          </p>
          {event.result && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-paper)]">
              Result · {event.result}
            </p>
          )}
        </div>
      </header>

      {/* Hero photo — full width, cinematic 16:9 on desktop, 4:5 on mobile */}
      <Reveal>
        <figure className="group relative overflow-hidden bg-[color:var(--color-surface)]">
          <div className="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9]">
            <Image
              src={`/gallery/${event.slug}/${hero.image}-hero.webp`}
              alt={hero.caption}
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              priority={event.slug === "irc-2026"}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
            {/* Subtle bottom gradient for caption legibility */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[color:var(--color-void)]/70 to-transparent"
            />
          </div>
          <figcaption className="pointer-events-none absolute left-5 right-5 bottom-4 md:left-8 md:bottom-6 flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-paper)]/70">
              01
            </span>
            <span className="text-sm md:text-base text-[color:var(--color-paper)] leading-tight max-w-2xl">
              {hero.caption}
            </span>
          </figcaption>
        </figure>
      </Reveal>

      {/* Asymmetric grid — tall photo + 3 smaller, or just stack if <4 photos */}
      {rest.length > 0 && (
        <RevealStagger
          as="div"
          className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[minmax(0,1fr)]"
        >
          {/* Tall feature on one side (md:col-span-5, 2 rows) */}
          {tall && (
            <Reveal as="div" className="md:col-span-5 md:row-span-2">
              <figure className="group relative overflow-hidden bg-[color:var(--color-surface)] aspect-[4/5] md:aspect-[5/7] md:h-full">
                <PhotoBody event={event} photo={tall} index={2} sizes="(min-width: 768px) 42vw, 100vw" />
              </figure>
            </Reveal>
          )}

          {/* Smaller photos fill the right side */}
          {others.map((p, i) => (
            <Reveal
              key={p.image}
              as="div"
              className="md:col-span-7"
            >
              <figure className="group relative overflow-hidden bg-[color:var(--color-surface)] aspect-[4/3]">
                <PhotoBody
                  event={event}
                  photo={p}
                  index={i + 3}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </figure>
            </Reveal>
          ))}
        </RevealStagger>
      )}
    </section>
  );
}

function PhotoBody({
  event,
  photo,
  index,
  sizes,
}: {
  event: EventGallery;
  photo: EventPhoto;
  index: number;
  sizes: string;
}) {
  return (
    <>
      <Image
        src={`/gallery/${event.slug}/${photo.image}-grid.webp`}
        alt={photo.caption}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[color:var(--color-void)]/80 via-[color:var(--color-void)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <figcaption className="pointer-events-none absolute left-4 right-4 bottom-3 md:left-5 md:bottom-4 flex items-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-paper)]/70 shrink-0">
          {String(index).padStart(2, "0")}
        </span>
        <span className="text-xs md:text-sm text-[color:var(--color-paper)] leading-tight">
          {photo.caption}
        </span>
      </figcaption>
    </>
  );
}

function shortName(e: EventGallery): string {
  if (e.name.startsWith("International Rover Challenge")) return `IRC ${e.year}`;
  if (e.name.startsWith("ISRO Robotics")) return `IRoC-U ${e.year}`;
  return e.name;
}
