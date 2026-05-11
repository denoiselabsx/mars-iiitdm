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
          <nav className="md:col-span-5 md:pl-8" aria-label="Event index">
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
        {eventGalleries.map((event) => (
          <EventChapter key={event.slug} event={event} />
        ))}
      </div>
    </>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// One editorial chapter per event.
// Layout:
//   - Feature photo (the visual anchor) renders full-width at its NATURAL
//     orientation — landscapes get a wide 16:10 hero, portraits get a tall
//     4:5 hero. No forced cropping.
//   - Remaining photos pack into a 6-column mosaic: landscapes span 4 cols,
//     portraits span 2 cols (and double height). `grid-auto-flow: dense`
//     lets the browser fit them without holes.
//   - On mobile: stacked single column at native aspect ratios.
// ──────────────────────────────────────────────────────────────────────────

function EventChapter({ event }: { event: EventGallery }) {
  const feature = event.photos.find((p) => p.feature) ?? event.photos[0];
  const rest = event.photos.filter((p) => p !== feature);

  return (
    <section
      id={event.slug}
      className="container-page scroll-mt-24"
      aria-labelledby={`${event.slug}-title`}
    >
      {/* Header */}
      <header className="grid md:grid-cols-12 gap-6 md:gap-12 items-end mb-10 md:mb-14">
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

      {/* Feature photo — full width, slot aspect follows the photo */}
      <Reveal>
        <Figure
          event={event}
          photo={feature}
          variant="feature"
          index={1}
          priority={event.slug === "irc-2026"}
        />
      </Reveal>

      {/* Mosaic — pairs of photos per row. Each pair = (landscape + landscape)
          OR (portrait + landscape) OR (landscape + portrait). Portraits get a
          narrower column so a single row stays the same height across pairs,
          and no spans overlap. On mobile, single column at native aspect. */}
      {rest.length > 0 && (
        <RevealStagger as="div" className="mt-3 md:mt-4 space-y-3 md:space-y-4">
          {pairUp(rest).map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4"
            >
              {row.map((p, i) => (
                <Reveal
                  key={p.image}
                  as="div"
                  className={colSpanFor(p, row)}
                >
                  <Figure
                    event={event}
                    photo={p}
                    variant="grid"
                    index={rowIdx * 2 + i + 2}
                  />
                </Reveal>
              ))}
            </div>
          ))}
        </RevealStagger>
      )}
    </section>
  );
}

// One photo — slot aspect locked to natural orientation, no forced crops.
function Figure({
  event,
  photo,
  variant,
  index,
  priority,
}: {
  event: EventGallery;
  photo: EventPhoto;
  variant: "feature" | "grid";
  index: number;
  priority?: boolean;
}) {
  // Slot aspect — natural orientation, never forced. Feature gets a wider
  // landscape on md+; grid cells keep the photo's true aspect on every
  // viewport so nothing crops the subject out.
  const aspectClass =
    variant === "feature"
      ? photo.aspect === "portrait"
        ? "aspect-[4/5]"
        : "aspect-[3/2] md:aspect-[16/9]"
      : photo.aspect === "portrait"
        ? "aspect-[4/5]"
        : "aspect-[3/2]";

  const size = variant === "feature" ? "hero" : "grid";

  const sizes =
    variant === "feature"
      ? "(min-width: 1280px) 1200px, 100vw"
      : photo.aspect === "portrait"
        ? "(min-width: 768px) 33vw, 100vw"
        : "(min-width: 768px) 66vw, 100vw";

  return (
    <figure
      className={`group relative overflow-hidden bg-[color:var(--color-surface)] ${aspectClass}`}
    >
      <Image
        src={`/gallery/${event.slug}/${photo.image}-${size}.webp`}
        alt={photo.caption}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />
      {/* Gradient — always visible on mobile (no hover), reveals on hover desktop */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 ${
          variant === "feature"
            ? "h-1/3 bg-gradient-to-t from-[color:var(--color-void)]/80 via-[color:var(--color-void)]/30 to-transparent"
            : "h-2/5 bg-gradient-to-t from-[color:var(--color-void)]/85 via-[color:var(--color-void)]/25 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
        }`}
      />
      <figcaption
        className={`pointer-events-none absolute left-4 right-4 flex items-end gap-3 ${
          variant === "feature"
            ? "bottom-4 md:left-8 md:bottom-6 md:right-8"
            : "bottom-3 md:left-5 md:bottom-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-1 md:group-hover:translate-y-0 transition-all duration-300"
        }`}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-paper)]/70 shrink-0">
          {String(index).padStart(2, "0")}
        </span>
        <span
          className={`leading-tight text-[color:var(--color-paper)] ${
            variant === "feature" ? "text-sm md:text-base max-w-2xl" : "text-xs md:text-sm"
          }`}
        >
          {photo.caption}
        </span>
      </figcaption>
    </figure>
  );
}

// Group remaining photos into pairs. Portraits prefer pairing with the
// following landscape so each row reads as one balanced composition.
function pairUp(photos: EventPhoto[]): EventPhoto[][] {
  const rows: EventPhoto[][] = [];
  let i = 0;
  while (i < photos.length) {
    if (i + 1 < photos.length) {
      rows.push([photos[i], photos[i + 1]]);
      i += 2;
    } else {
      rows.push([photos[i]]);
      i += 1;
    }
  }
  return rows;
}

// In a 12-col grid: two landscapes split 6/6; portrait+landscape splits 4/8
// (or 8/4 if portrait is second). A lone photo takes the full 12.
function colSpanFor(p: EventPhoto, row: EventPhoto[]): string {
  if (row.length === 1) return "md:col-span-12";
  const [a, b] = row;
  if (a.aspect === "portrait" && b.aspect === "landscape") {
    return p === a ? "md:col-span-4" : "md:col-span-8";
  }
  if (a.aspect === "landscape" && b.aspect === "portrait") {
    return p === a ? "md:col-span-8" : "md:col-span-4";
  }
  if (a.aspect === "portrait" && b.aspect === "portrait") {
    return "md:col-span-6";
  }
  return "md:col-span-6"; // landscape + landscape
}

function shortName(e: EventGallery): string {
  if (e.name.startsWith("International Rover Challenge")) return `IRC ${e.year}`;
  if (e.name.startsWith("ISRO Robotics")) return `IRoC-U ${e.year}`;
  return e.name;
}
