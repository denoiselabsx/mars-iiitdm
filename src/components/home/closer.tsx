"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Magnetic } from "@/components/motion/magnetic";
import { site } from "@/lib/site";

export function Closer() {
  return (
    <section className="relative py-40 md:py-56 overflow-hidden">
      {/* Asymmetric Mars-rust wash — pushed right + low, not centered */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 w-[120%] h-[80vh] -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 85% 90%, color-mix(in oklab, var(--color-mars) 24%, transparent) 0%, transparent 65%)",
        }}
      />

      <div className="container-page relative">
        {/* Top row: small label + recruitment status, on the left */}
        <div className="flex justify-start mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-faint)]" />
            Recruitment closed · Next intake March 2027
          </motion.div>
        </div>

        {/* Headline — left-aligned, oversized, bleeds toward the right edge */}
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[16ch] md:max-w-none text-balance font-sans text-[2.75rem] sm:text-6xl md:text-[8vw] lg:text-[7vw] font-medium leading-[1] sm:leading-[0.95] tracking-[-0.025em] text-[color:var(--color-paper)]"
        >
          Build something that{" "}
          <span className="font-serif italic text-[color:var(--color-mars)]">
            moves
          </span>
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[16ch] md:max-w-none -mt-1 md:-mt-4 text-balance font-sans text-[2.75rem] sm:text-6xl md:text-[8vw] lg:text-[7vw] font-medium leading-[1] sm:leading-[0.95] tracking-[-0.025em] text-[color:var(--color-paper)]"
        >
          on{" "}
          <span className="font-serif italic text-[color:var(--color-mars)]">
            another world
          </span>
          .
        </motion.h2>

        {/* CTA row — left-aligned, doesn't return to center */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 md:mt-20 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <Magnetic>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-signal)] text-[color:var(--color-void)] px-8 py-4 text-sm font-medium transition-colors"
            >
              Follow on Instagram
              <span aria-hidden className="transition-transform group-hover:translate-x-1">↗</span>
            </a>
          </Magnetic>
          <Link
            href="/team"
            className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
          >
            Meet the team
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>

        {/* Team group photo — anchors the CTA with a concrete face of the club */}
        <motion.figure
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-20 md:mt-28"
        >
          <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[21/9] w-full overflow-hidden rounded-2xl md:rounded-3xl ring-1 ring-white/10">
            <Image
              src="/team/team_shunya.jpeg"
              alt="Team Shunya — Mars Rover Students Club"
              fill
              sizes="(min-width: 1024px) 90vw, 100vw"
              priority={false}
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
            />
          </div>
          <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
            Team Shunya · IRC 2026
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
