"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Magnetic } from "@/components/motion/magnetic";

export function Closer() {
  return (
    <section className="relative py-40 md:py-56 overflow-hidden">
      {/* Horizon glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[60vh]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in oklab, var(--color-mars) 20%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="container-page relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--color-faint)]"
        >
          ◉ Recruitment opens · July 2026
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-5xl mx-auto text-balance font-sans text-5xl md:text-7xl lg:text-[7.5rem] font-medium leading-[0.96] tracking-tight"
        >
          Build something that{" "}
          <span className="font-serif italic text-[color:var(--color-mars)]">
            moves on another world
          </span>
          .
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 inline-block"
        >
          <Magnetic>
            <Link
              href="/join"
              className="group inline-flex items-center gap-3 bg-[color:var(--color-mars)] hover:bg-[color:var(--color-mars-glow)] px-8 py-4 font-mono text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-paper)] transition-colors"
              style={{
                clipPath:
                  "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#5cf2b0] animate-pulse" />
              Apply to MaRS
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Magnetic>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faint)]"
        >
          mars@iiitdm.ac.in · @mars_iiitdm
        </motion.p>
      </div>
    </section>
  );
}
