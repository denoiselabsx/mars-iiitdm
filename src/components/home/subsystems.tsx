"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/motion/section-header";
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

export function Subsystems() {
  return (
    <section className="relative py-32 md:py-48">
      <div className="container-page">
        <SectionHeader
          channel="TLM-002 // SUBSYSTEMS"
          eyebrow="What we build"
          title={
            <>
              Every bolt, board, and{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                line of code
              </span>{" "}
              — student-built.
            </>
          }
        />

        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12">
          {subsystems.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={[
                "md:col-span-6 group relative",
                i % 2 === 1 ? "md:mt-24" : "",
              ].join(" ")}
            >
              {/* Number plate */}
              <div className="flex items-baseline gap-6">
                <span
                  className="font-mono text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]"
                >
                  {s.n}
                </span>
                <span className="flex-1 h-px bg-gradient-to-r from-[color:var(--color-mars)]/60 via-[color:var(--color-line)] to-transparent transition-all duration-700 group-hover:from-[color:var(--color-mars)]" />
              </div>

              <h3 className="mt-6 font-sans text-4xl md:text-5xl font-medium tracking-tight leading-[1] text-[color:var(--color-paper)]">
                {s.name}
              </h3>
              <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                {s.spec}
              </p>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-[color:var(--color-muted)]">
                {s.detail}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-24 md:mt-32">
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
