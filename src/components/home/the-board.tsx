"use client";

import { motion } from "motion/react";
import { SectionHeader } from "@/components/motion/section-header";
import { CountUp } from "@/components/motion/count-up";

const board = [
  {
    rank: 10,
    suffix: "th",
    code: "IRC",
    full: "International Rover Challenge 2026",
    org: "Space Robotics Society · Manipal",
    note: "Top-10 finish in our second consecutive year.",
    isText: false,
  },
  {
    rank: 9,
    suffix: "th",
    code: "ISDC",
    full: "International Space Drone Challenge 2026",
    org: "Space Robotics Society · Manipal",
    note: "Aerial counterpart to the rover programme.",
    isText: false,
  },
  {
    rank: 0,
    suffix: "",
    label: "Innovation Award",
    code: "SHAASTRA",
    full: "Caterpillar Autonomy Challenge 2026",
    org: "IIT Madras",
    note: "Design Innovation Award for KUTTI's underbelly scooping mechanism — debuting at IIT Madras's flagship technical fest.",
    isText: true,
  },
];

export function TheBoard() {
  return (
    <section className="relative py-28 md:py-44 overflow-hidden">
      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-paper) 1px, transparent 1px), linear-gradient(to bottom, var(--color-paper) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="container-page">
        <SectionHeader
          eyebrow="2025–26 Season"
          title={
            <>
              Three flagships.{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                Three results
              </span>{" "}
              on the international board.
            </>
          }
        />

        <ul className="mt-20 md:mt-28 space-y-px">
          {board.map((b, i) => (
            <motion.li
              key={b.code}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative border-t border-[color:var(--color-line)]/50 last:border-b py-6 md:py-10 transition-colors hover:bg-[color:var(--color-surface)]/30"
            >
              <div className="grid grid-cols-12 gap-x-4 md:gap-x-8 items-baseline">
                {/* Numeral / word — sized to fit its column */}
                <div className="col-span-12 md:col-span-5">
                  {b.isText ? (
                    // Two-line word so it fits col-span-5 at large weight
                    <span className="block font-serif italic text-[10vw] md:text-[5.2vw] lg:text-[4.6vw] leading-[0.92] tracking-[-0.02em] text-[color:var(--color-paper)] group-hover:text-[color:var(--color-mars)] transition-colors duration-700">
                      Innovation
                      <br />
                      Award
                    </span>
                  ) : (
                    // Digits are narrow — they can go bigger
                    <span className="block font-sans text-[20vw] md:text-[12vw] lg:text-[10vw] leading-[0.84] font-medium tracking-[-0.045em] text-[color:var(--color-paper)] group-hover:text-[color:var(--color-mars)] transition-colors duration-700">
                      <CountUp to={b.rank!} duration={1.6} />
                      <span className="font-serif italic text-[0.35em] text-[color:var(--color-muted)] -ml-2 align-baseline">
                        {b.suffix}
                      </span>
                    </span>
                  )}
                </div>

                {/* Right column: meta */}
                <div className="col-span-12 md:col-span-7 md:pl-8 lg:pl-12 md:border-l md:border-[color:var(--color-line)]/40 md:self-end">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                    {b.code}
                  </p>
                  <p className="mt-3 font-sans text-xl md:text-2xl font-medium tracking-tight text-[color:var(--color-paper)]">
                    {b.full}
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--color-faint)] font-mono tracking-[0.08em]">
                    {b.org}
                  </p>
                  <p className="mt-4 text-base text-[color:var(--color-muted)] leading-relaxed max-w-md">
                    {b.note}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
