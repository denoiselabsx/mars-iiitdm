"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// One card per machine the team has actually shipped (or is shipping).
// Newest first; legacy Vajra closes the loop because it's the rover that
// put MaRS on the international podium. Each entry pairs a hardware fact
// with a competition outcome — so the marquee tells the lineup's story
// instead of inventing a single "average" rover.
type RoverCard = {
  slug: string;
  name: string;
  year: string;
  event: string;
  status: "in build" | "active" | "legacy";
  signature: string;
  result?: string;
};

const lineup: RoverCard[] = [
  {
    slug: "rudra",
    name: "Rudra",
    year: "2026",
    event: "ERC 2026",
    status: "in build",
    signature: "Cycloidal gearbox · Ackermann steer",
    result: "30 cm sample drill",
  },
  {
    slug: "shaurya",
    name: "Shaurya",
    year: "2026",
    event: "IRC 2026",
    status: "active",
    signature: "ROS 2 autonomy · ZED stereo",
    result: "10th globally",
  },
  {
    slug: "vetri",
    name: "Vetri",
    year: "2026",
    event: "SHAASTRA Caterpillar",
    status: "active",
    signature: "Underbelly scooping mechanism",
    result: "Design Innovation Award",
  },
  {
    slug: "khoj-drone",
    name: "Khoj",
    year: "2026",
    event: "IRC 2026 · aerial recon",
    status: "active",
    signature: "GPS nav · FPV · payload drop",
    result: "9th — ISDC 2026",
  },
  {
    slug: "lakshya",
    name: "Lakshya",
    year: "2025",
    event: "ERC 2025",
    status: "legacy",
    signature: "5-DOF arm · science cache",
  },
  {
    slug: "brick",
    name: "Rover Brick",
    year: "2025",
    event: "IRC 2025",
    status: "legacy",
    signature: "4WD · linear-actuator arm",
  },
  {
    slug: "vajra-rover",
    name: "Vajra",
    year: "2024",
    event: "ERC 2023 · IRC 2024",
    status: "legacy",
    signature: "4WD differential · custom suspension",
    result: "21st globally",
  },
];

function StatusPip({ status }: { status: RoverCard["status"] }) {
  const tone =
    status === "in build"
      ? "bg-[color:var(--color-mars)]"
      : status === "active"
        ? "bg-[color:var(--color-paper)]/70"
        : "bg-[color:var(--color-faint)]";
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${tone}`}>
        {status === "in build" && (
          <span className="absolute inset-0 rounded-full bg-[color:var(--color-mars)] animate-ping opacity-60" />
        )}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
        {status}
      </span>
    </span>
  );
}

function Card({ r }: { r: RoverCard }) {
  const isLegacy = r.status === "legacy";
  return (
    <Link
      href={`/rovers#${r.slug}`}
      aria-label={`${r.name} — ${r.event}`}
      className="group/card relative shrink-0 w-[280px] md:w-[360px] px-7 md:px-9 py-9 md:py-11 border-l border-[color:var(--color-line)]/40 first:border-l-0 hover:bg-[color:var(--color-surface)]/30 transition-colors"
    >
      {/* Diagonal accent — only on retired/legacy, signals 'archived' without text */}
      {isLegacy && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-12 w-12 overflow-hidden"
        >
          <span
            className="absolute -top-[1px] right-0 h-px w-16 rotate-45 origin-top-right bg-[color:var(--color-faint)]/60"
            style={{ transformOrigin: "100% 0" }}
          />
        </span>
      )}

      <div className="flex items-center justify-between">
        <StatusPip status={r.status} />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)]">
          {r.year}
        </span>
      </div>

      <h3
        className={`mt-7 md:mt-9 leading-[0.95] tracking-[-0.02em] text-[color:var(--color-paper)] ${
          isLegacy
            ? "font-serif italic text-5xl md:text-6xl"
            : "font-sans font-medium text-5xl md:text-6xl"
        }`}
      >
        {r.name}
      </h3>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.20em] text-[color:var(--color-mars)]">
        {r.event}
      </p>

      <div className="mt-7 md:mt-9 space-y-2">
        <p className="text-sm md:text-[15px] text-[color:var(--color-paper)]/90 leading-snug">
          {r.signature}
        </p>
        {r.result && (
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
            {r.result}
          </p>
        )}
      </div>

      {/* Hover bottom-line — subtle 'this is a link' affordance */}
      <span
        aria-hidden
        className="absolute left-7 md:left-9 right-7 md:right-9 bottom-5 h-px bg-[color:var(--color-mars)] scale-x-0 group-hover/card:scale-x-100 origin-left transition-transform duration-500"
      />
    </Link>
  );
}

function Strip() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  // Carousel uses GPU-composited transform on the inner track instead of
  // writing scrollLeft. scrollLeft only accepts integer pixels, so at the
  // slow ambient speed (~28 px/s ≈ 0.45 px/frame) most frames produced no
  // visible movement and the carousel looked stuck. Transform takes sub-
  // pixel values and doesn't fight Lenis.
  const offset = useRef(0); // current track translation (px)
  const paused = useRef(false);
  const offscreen = useRef(true);
  const resumeAt = useRef(0);
  const drag = useRef<{ active: boolean; startX: number; startOffset: number; moved: boolean }>({
    active: false,
    startX: 0,
    startOffset: 0,
    moved: false,
  });

  // Single RAF: advance offset, apply transform, update progress bar.
  useEffect(() => {
    if (reduced) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let raf = 0;
    let last = performance.now();
    const speed = 36; // px/sec — slightly quicker now that motion is buttery
    let lastProgress = -1;

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000); // clamp dt after tab-blur
      last = now;

      if (!paused.current && !offscreen.current && now >= resumeAt.current && !drag.current.active) {
        offset.current += speed * dt;
      }

      // Wrap: one full lineup is half the track's scrollWidth (it's doubled).
      const half = track.scrollWidth / 2;
      if (half > 0) {
        if (offset.current >= half) offset.current -= half;
        else if (offset.current < 0) offset.current += half;
      }

      track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;

      // Throttle progress updates — only re-render when the % changes by ≥1.
      if (half > 0) {
        const p = Math.min(1, offset.current / half);
        const stepped = Math.round(p * 100);
        if (stepped !== lastProgress) {
          lastProgress = stepped;
          setProgress(p);
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Pause the loop entirely when off-screen — no wasted work during
    // initial page load or when the reader is elsewhere on the page.
    const io = new IntersectionObserver(
      ([entry]) => {
        offscreen.current = !entry.isIntersecting;
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(viewport);

    // Resume timing baseline when tab regains focus so we don't lurch.
    const onVis = () => {
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  // Any user input pauses auto-scroll; idle for ~1.5s before resuming.
  const nudgePause = (ms = 1500) => {
    resumeAt.current = performance.now() + ms;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return; // touch: native pan-x via wheel/scroll feel handled separately
    nudgePause();
    const viewport = viewportRef.current;
    if (!viewport) return;
    drag.current = { active: true, startX: e.clientX, startOffset: offset.current, moved: false };
    viewport.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    offset.current = drag.current.startOffset - dx;
    nudgePause();
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (viewport && viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId);
    requestAnimationFrame(() => {
      drag.current.active = false;
    });
    nudgePause();
  };
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  // Touch: native horizontal wheel/trackpad still works for desktop touchpads,
  // and a mobile finger swipe drives the same offset via touch events.
  const touchStartX = useRef(0);
  const touchStartOffset = useRef(0);
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    nudgePause(2200);
    touchStartX.current = e.touches[0].clientX;
    touchStartOffset.current = offset.current;
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    offset.current = touchStartOffset.current - dx;
    nudgePause(2200);
  };

  return (
    <div className="relative">
      <div
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onMouseEnter={() => { paused.current = true; }}
        onMouseLeave={() => { paused.current = false; }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => nudgePause(2200)}
        onFocusCapture={() => { paused.current = true; }}
        onBlurCapture={() => { paused.current = false; }}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent_0,black_8%,black_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0,black_8%,black_92%,transparent_100%)]"
        style={{ touchAction: "pan-y" }}
      >
        <div
          ref={trackRef}
          className="flex items-stretch will-change-transform"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {/* Doubled list — track wraps by subtracting half the track width */}
          {[...lineup, ...lineup].map((r, i) => (
            <Card key={`${r.slug}-${i}`} r={r} />
          ))}
        </div>
      </div>

      {/* Progress rail — quiet indicator that there's more to scroll */}
      <div className="container-page mt-6 md:mt-8">
        <div className="relative h-px w-full max-w-[200px] bg-[color:var(--color-line)]/40">
          <div
            className="absolute inset-y-0 left-0 bg-[color:var(--color-mars)] transition-[width] duration-150"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function SpecSheet() {
  return (
    <section
      data-scene="dusk"
      className="relative py-24 md:py-32 overflow-hidden border-y border-[color:var(--color-line)]/40 bg-[color:var(--color-void)] text-[color:var(--color-paper)]"
    >
      {/* Subtle horizon glow at center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-32"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 50%, color-mix(in oklab, var(--color-mars) 18%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Header — anchored mono label + a quiet line of context */}
      <div className="container-page mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4 relative">
        <div className="flex items-baseline gap-4">
          <span className="h-px w-12 bg-[color:var(--color-mars)]" />
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
            The lineup · seven machines, three seasons
          </span>
        </div>
        <Link
          href="/rovers"
          className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors self-start md:self-auto"
        >
          See every build →
        </Link>
      </div>

      <Strip />
    </section>
  );
}
