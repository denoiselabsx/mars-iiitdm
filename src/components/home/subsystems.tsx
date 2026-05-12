"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Magnetic } from "@/components/motion/magnetic";

const subsystems = [
  {
    n: "01",
    name: "Chassis",
    spec: "Six-wheel rocker-bogie · independent drive",
    detail:
      "Equalised contact across uneven terrain. Differential coupling lets the rover crawl over obstacles up to a wheel diameter tall without lifting.",
  },
  {
    n: "02",
    name: "Manipulator",
    spec: "5-DOF arm · interchangeable end-effectors",
    detail:
      "Sample collection, valve actuation, equipment servicing. The underbelly scooping variant earned SHAASTRA's Design Innovation Award.",
  },
  {
    n: "03",
    name: "Electronics",
    spec: "Custom PCBs · CAN bus · onboard compute",
    detail:
      "Power distribution, motor control, and sensor stacks designed in-house. Telemetry over long-range radio plus 5GHz video downlink.",
  },
  {
    n: "04",
    name: "Autonomy",
    spec: "ROS 2 · SLAM · vision-language perception",
    detail:
      "Path planning, obstacle avoidance, and mission sequencing. Increasingly autonomous each season — the long game is full-mission autonomy.",
  },
];

// Diagonal staircase offsets: each card shifts further right + down than the last
const offsets = [
  { mdMl: "md:ml-0",       mdMt: "md:mt-0" },
  { mdMl: "md:ml-[18%]",   mdMt: "md:mt-24" },
  { mdMl: "md:ml-[6%]",    mdMt: "md:mt-32" },
  { mdMl: "md:ml-[24%]",   mdMt: "md:mt-32" },
];

export function Subsystems() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Cold opening — no SectionHeader. The 01 plate itself is the entry. */}
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-0">
          {subsystems.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={[
                "group relative md:col-span-7 max-w-2xl",
                offsets[i].mdMl,
                offsets[i].mdMt,
                "mt-20 first:mt-0",
              ].join(" ")}
            >
              {/* Number plate */}
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                  {s.n}
                </span>
                <span className="flex-1 h-px bg-gradient-to-r from-[color:var(--color-mars)]/60 via-[color:var(--color-line)] to-transparent transition-all duration-700 group-hover:from-[color:var(--color-mars)]" />
              </div>

              <h3 className="mt-6 font-sans text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.02] sm:leading-[0.98] text-[color:var(--color-paper)]">
                {s.name}
              </h3>
              <p className="mt-4 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                {s.spec}
              </p>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-[color:var(--color-muted)] max-w-lg">
                {s.detail}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-32 md:mt-40">
          <Magnetic>
            <Link
              href="/rovers"
              className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-paper)]"
            >
              <span className="h-px w-12 bg-[color:var(--color-mars)] transition-all duration-500 group-hover:w-24" />
              See the full rover breakdown
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
