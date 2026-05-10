"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Magnetic } from "@/components/motion/magnetic";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { HeroFallback } from "./hero-fallback";

const RoverScene = dynamic(
  () => import("./rover-scene").then((m) => m.RoverScene),
  { ssr: false },
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollHero() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (reduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current!,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) return <HeroFallback />;

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: "120svh" }}
      aria-label="Hero"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* ── 3D rover canvas — right-anchored, 55% width on desktop ──────── */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[58%] lg:w-[55%] -z-0">
          <RoverScene
            progressRef={progressRef}
            className="absolute inset-0 h-full w-full"
          />
          {/* Edge fade on the left so rover bleeds softly into text column */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[color:var(--color-void)] to-transparent"
          />
        </div>

        {/* ── Mars horizon glow — bottom only, faint ──────────────────── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[35vh] -z-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 70% at 50% 100%, color-mix(in oklab, var(--color-mars) 22%, transparent) 0%, transparent 75%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-mars)]/40 to-transparent"
        />

        {/* ── Headline column — left, vertically centered ───────────────── */}
        <div className="relative z-10 h-full">
          <div className="container-page h-full flex items-center">
            <div className="max-w-xl md:max-w-2xl">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]"
              >
                <span className="text-[color:var(--color-mars)]">—</span>{" "}
                Mars Rover Students Club
              </motion.p>

              {/* Headline */}
              <h1 className="mt-8 font-sans text-[12vw] md:text-[7.2vw] lg:text-[6.4vw] xl:text-[6vw] font-medium leading-[0.95] tracking-[-0.025em] text-balance text-[color:var(--color-paper)]">
                <motion.span
                  initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  India's student
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  rover team,
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  out of{" "}
                  <span className="font-serif italic text-[color:var(--color-mars)]">
                    Kancheepuram
                  </span>
                  .
                </motion.span>
              </h1>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 max-w-md text-base md:text-lg leading-relaxed text-[color:var(--color-muted)]"
              >
                We design, build, and field autonomous rovers for international competition —
                IRC, ISDC, IRoC-U.
              </motion.p>

              {/* Proof line */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.95 }}
                className="mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-paper)]"
              >
                <span className="h-px w-8 bg-[color:var(--color-mars)]" />
                Ranked 10<sup className="text-[7px] -top-1.5 relative">th</sup> · IRC 2026
                <span className="text-[color:var(--color-faint)]">·</span>
                9<sup className="text-[7px] -top-1.5 relative">th</sup> · ISDC 2026
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
              >
                <Magnetic>
                  <Link
                    href="/rovers"
                    className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-mars)] text-[color:var(--color-void)] hover:text-[color:var(--color-paper)] px-6 py-3 text-sm font-medium transition-colors"
                  >
                    See our rovers
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </Magnetic>
                <Link
                  href="/join"
                  className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors"
                >
                  Join the team
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Scroll indicator — bottom-center ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-faint)]">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-px bg-gradient-to-b from-[color:var(--color-paper)] via-[color:var(--color-faint)] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
