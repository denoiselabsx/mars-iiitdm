"use client";

import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const specs = [
  { value: "6", unit: "wheels", label: "Rocker-bogie · independent drive" },
  { value: "5", unit: "DOF", label: "Manipulator arm" },
  { value: "80", unit: "kg", label: "Curb weight, payload-ready" },
  { value: "2", unit: "m/s", label: "Top traverse speed" },
  { value: "2", unit: "km", label: "Telemetry range" },
  { value: "4", unit: "cams", label: "Stereo + nav + sci" },
  { value: "ROS 2", unit: "", label: "Autonomy stack" },
  { value: "30", unit: "engineers", label: "Mechanical · Electronics · Software" },
];

function Row({ direction = 1 }: { direction?: 1 | -1 }) {
  const x = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    if (!ref.current) return;
    const width = ref.current.scrollWidth / 2;
    const speed = 0.018;
    const next = x.get() - direction * delta * speed;
    if (direction === 1 && next <= -width) x.set(next + width);
    else if (direction === -1 && next >= 0) x.set(next - width);
    else x.set(next);
  });

  const list = [...specs, ...specs];

  return (
    <motion.div
      ref={ref}
      style={{ x }}
      className="flex items-stretch whitespace-nowrap"
    >
      {list.map((s, i) => (
        <div
          key={`${s.value}-${i}`}
          className="shrink-0 px-6 md:px-10 py-8 md:py-12 border-l border-[color:var(--color-line)]/40 first:border-l-0 min-w-[240px] md:min-w-[300px]"
        >
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-5xl md:text-7xl font-medium tracking-[-0.03em] text-[color:var(--color-paper)]">
              {s.value}
            </span>
            {s.unit && (
              <span className="font-mono text-sm md:text-base text-[color:var(--color-muted)] uppercase tracking-[0.12em]">
                {s.unit}
              </span>
            )}
          </div>
          <p className="mt-3 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-faint)]">
            {s.label}
          </p>
        </div>
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

      {/* Sticky mono label — anchors the section without taking up vertical space */}
      <div className="container-page mb-10 md:mb-14 flex items-baseline gap-4 relative">
        <span className="h-px w-12 bg-[color:var(--color-mars)]" />
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
          Spec sheet · across our rovers
        </span>
      </div>

      {/* Edge-fade marquee */}
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <Row direction={1} />
      </div>
    </section>
  );
}
