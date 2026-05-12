"use client";

import Link from "next/link";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { useRef } from "react";
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
    status: "active",
    signature: "5-DOF arm · science cache",
  },
  {
    slug: "brick",
    name: "Rover Brick",
    year: "2025",
    event: "IRC 2025",
    status: "active",
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
      href="/rovers"
      aria-label={`${r.name} — ${r.event}`}
      className="group/card relative shrink-0 w-[300px] md:w-[360px] px-7 md:px-9 py-9 md:py-11 border-l border-[color:var(--color-line)]/40 first:border-l-0 hover:bg-[color:var(--color-surface)]/30 transition-colors"
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

function Row({ direction = 1 }: { direction?: 1 | -1 }) {
  const x = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    if (paused.current) return;
    if (!ref.current) return;
    const width = ref.current.scrollWidth / 2;
    const speed = 0.022;
    const next = x.get() - direction * delta * speed;
    if (direction === 1 && next <= -width) x.set(next + width);
    else if (direction === -1 && next >= 0) x.set(next - width);
    else x.set(next);
  });

  const list = [...lineup, ...lineup];

  return (
    <motion.div
      ref={ref}
      style={{ x }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      className="flex items-stretch whitespace-nowrap"
    >
      {list.map((r, i) => (
        <Card key={`${r.slug}-${i}`} r={r} />
      ))}
    </motion.div>
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

      {/* Edge-fade marquee */}
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <Row direction={1} />
      </div>
    </section>
  );
}
