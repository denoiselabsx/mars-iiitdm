"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/motion/section-header";

// Placeholder until real photos come in (W4)
const frames = [
  {
    title: "URSC Bengaluru",
    sub: "IRoC-U 2024",
    date: "06.08.2024",
    bg: "from-[#3a1d0e] via-[#1a0d07] to-[#08080c]",
  },
  {
    title: "Manipal Udupi",
    sub: "IRC 2026",
    date: "02.02.2026",
    bg: "from-[#4a2010] via-[#1d0c06] to-[#08080c]",
  },
  {
    title: "IIT Madras",
    sub: "SHAASTRA Caterpillar",
    date: "04.01.2026",
    bg: "from-[#2a1208] via-[#150905] to-[#08080c]",
  },
  {
    title: "IIITDM Open House",
    sub: "Recruitment '25",
    date: "02.02.2025",
    bg: "from-[#1f1006] via-[#100804] to-[#08080c]",
  },
  {
    title: "Tambaram AFB",
    sub: "AI Symposium",
    date: "20.03.2026",
    bg: "from-[#321a0b] via-[#180c05] to-[#08080c]",
  },
  {
    title: "Lab · IIITDM",
    sub: "Build session",
    date: "ongoing",
    bg: "from-[#2c1408] via-[#140803] to-[#08080c]",
  },
];

export function FieldStrip() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <div className="container-page mb-16 md:mb-20">
        <SectionHeader
          eyebrow="From the field"
          title={
            <>
              The work,{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">in pictures</span>.
            </>
          }
        />
      </div>

      <div className="relative">
        {/* Edge fade masks */}
        <div className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-px-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex gap-5 md:gap-7 px-[var(--gutter)] pb-2">
            {frames.map((f, i) => (
              <motion.li
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="snap-start shrink-0 w-[78vw] md:w-[520px] lg:w-[600px]"
              >
                <div
                  className={[
                    "relative aspect-[4/5] md:aspect-[3/4] bg-gradient-to-br overflow-hidden",
                    f.bg,
                  ].join(" ")}
                  style={{
                    clipPath:
                      "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
                  }}
                >
                  {/* Subtle pattern overlay */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
                      {f.date}
                    </p>
                    <p className="mt-2 font-sans text-2xl md:text-3xl font-medium tracking-tight text-[color:var(--color-paper)]">
                      {f.title}
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
                      {f.sub}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page mt-16">
        <Link
          href="/gallery"
          className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-paper)]"
        >
          <span className="h-px w-12 bg-[color:var(--color-mars)] transition-all duration-500 group-hover:w-24" />
          Open the full gallery
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
