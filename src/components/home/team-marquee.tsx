"use client";

import Link from "next/link";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "@/components/motion/section-header";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// Placeholder roster — swap in real names + sub-teams in W4
const members = [
  { name: "Manas Narayan", team: "Lead" },
  { name: "Vashist Managari", team: "Lead" },
  { name: "Aarav Singh", team: "Mech" },
  { name: "Priya Iyer", team: "Elec" },
  { name: "Rohan Mehta", team: "Aut" },
  { name: "Sneha Kulkarni", team: "Mech" },
  { name: "Kiran Rao", team: "Elec" },
  { name: "Aditi Sharma", team: "Aut" },
  { name: "Vikram Joshi", team: "Mech" },
  { name: "Divya Patel", team: "Elec" },
  { name: "Sahil Khan", team: "Aut" },
  { name: "Meera Pillai", team: "Mech" },
  { name: "Arjun Reddy", team: "Elec" },
  { name: "Tara Gupta", team: "Aut" },
  { name: "Karthik Nair", team: "Mech" },
];

const teamColors: Record<string, string> = {
  Lead: "text-[color:var(--color-mars)]",
  Mech: "text-[color:var(--color-paper)]",
  Elec: "text-[color:var(--color-signal)]",
  Aut: "text-[#5cf2b0]",
};

function MarqueeRow({ direction = 1 }: { direction?: 1 | -1 }) {
  const x = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    if (!ref.current) return;
    const width = ref.current.scrollWidth / 2;
    const speed = 0.025; // pixels per ms
    const next = x.get() - direction * delta * speed;
    if (direction === 1 && next <= -width) x.set(next + width);
    else if (direction === -1 && next >= 0) x.set(next - width);
    else x.set(next);
  });

  const list = [...members, ...members];

  return (
    <motion.div ref={ref} style={{ x }} className="flex gap-12 md:gap-16 whitespace-nowrap">
      {list.map((m, i) => (
        <span key={`${m.name}-${i}`} className="inline-flex items-baseline gap-3 shrink-0">
          <span className="font-sans text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[color:var(--color-paper)]">
            {m.name}
          </span>
          <span
            className={[
              "font-mono text-[10px] uppercase tracking-[0.22em]",
              teamColors[m.team] ?? "text-[color:var(--color-muted)]",
            ].join(" ")}
          >
            {m.team}
          </span>
        </span>
      ))}
    </motion.div>
  );
}

export function TeamMarquee() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <div className="container-page mb-16 md:mb-24">
        <SectionHeader
          eyebrow="Thirty engineers, one rover"
          title={
            <>
              Mechanical, electronics, software —{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                working as one
              </span>
              .
            </>
          }
        />
      </div>

      {/* Marquee — two rows, opposite directions */}
      <div className="relative space-y-6 md:space-y-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <MarqueeRow direction={1} />
        <MarqueeRow direction={-1} />
      </div>

      <div className="container-page mt-20 md:mt-28">
        <Link
          href="/team"
          className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-paper)]"
        >
          <span className="h-px w-12 bg-[color:var(--color-mars)] transition-all duration-500 group-hover:w-24" />
          Meet the full roster
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
