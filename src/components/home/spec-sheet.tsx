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
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  // Auto-scroll state — paused on hover, touch, drag, or focus.
  const paused = useRef(false);
  const resumeAt = useRef(0);
  const drag = useRef<{ active: boolean; startX: number; startScroll: number; moved: boolean }>({
    active: false,
    startX: 0,
    startScroll: 0,
    moved: false,
  });

  // Track scroll position → progress bar.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const half = el.scrollWidth / 2;
      const max = el.scrollWidth - el.clientWidth;
      // Treat the first copy as the canonical track for the progress bar.
      const x = half > 0 ? el.scrollLeft % half : el.scrollLeft;
      const denom = half > 0 ? half : max;
      setProgress(denom > 0 ? Math.min(1, x / denom) : 0);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Auto-scroll loop. Duplicated list lets us wrap by subtracting half scrollWidth.
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const speed = 28; // px/sec — slow, ambient

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!paused.current && now >= resumeAt.current) {
        const half = el.scrollWidth / 2;
        let next = el.scrollLeft + speed * dt;
        if (half > 0 && next >= half) next -= half;
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  // Any user input pauses auto-scroll; idle for ~1.5s before resuming.
  const nudgePause = (ms = 1500) => {
    resumeAt.current = performance.now() + ms;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    nudgePause();
    if (e.pointerType === "touch") return; // touch uses native scroll
    const el = ref.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = ref.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
    nudgePause();
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el && el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
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

  return (
    <div className="relative">
      <div
        ref={ref}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onMouseEnter={() => { paused.current = true; }}
        onMouseLeave={() => { paused.current = false; }}
        onTouchStart={() => nudgePause(2200)}
        onTouchMove={() => nudgePause(2200)}
        onTouchEnd={() => nudgePause(2200)}
        onFocusCapture={() => { paused.current = true; }}
        onBlurCapture={() => { paused.current = false; }}
        className="flex items-stretch overflow-x-auto overflow-y-hidden overscroll-x-contain scrollbar-none cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
        style={{ scrollbarWidth: "none" }}
      >
        {/* spacer so first card starts inside the mask */}
        <span aria-hidden className="shrink-0 w-4 md:w-8" />
        {/* Doubled list — auto-scroll wraps by subtracting half the width */}
        {[...lineup, ...lineup].map((r, i) => (
          <Card key={`${r.slug}-${i}`} r={r} />
        ))}
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
