"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Magnetic } from "@/components/motion/magnetic";
import { MonoLabel } from "@/components/motion/mono-label";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { HeroFallback } from "./hero-fallback";

const RoverScene = dynamic(
  () => import("./rover-scene").then((m) => m.RoverScene),
  { ssr: false },
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const chapters = [
  {
    index: 1,
    eyebrow: "Mars Rover Students Club · IIITDM Kancheepuram",
    title: (
      <>
        Exploration{" "}
        <span className="font-serif italic text-[color:var(--color-mars)]">begins</span>{" "}
        here.
      </>
    ),
    body:
      "We design, build, and field autonomous rovers for Mars-analog terrains — engineered, fabricated, and flown by undergrads.",
    primary: { label: "See our rovers", href: "/rovers" },
    secondary: { label: "Join the team", href: "/join" },
  },
  {
    index: 2,
    eyebrow: "Chassis & Drivetrain",
    title: (
      <>
        A six-wheel rocker-bogie,{" "}
        <span className="font-serif italic text-[color:var(--color-mars)]">built in-house</span>.
      </>
    ),
    body:
      "Custom suspension, low centre of gravity, independent wheel motors. Survives rocks, sand, and slope.",
  },
  {
    index: 3,
    eyebrow: "Manipulator",
    title: (
      <>
        Five degrees of freedom.{" "}
        <span className="font-serif italic text-[color:var(--color-mars)]">One arm</span>{" "}
        that does the science.
      </>
    ),
    body:
      "Sample handling, valve actuation, and the underbelly scooping mechanism that won SHAASTRA's Design Innovation Award.",
  },
  {
    index: 4,
    eyebrow: "Autonomy",
    title: (
      <>
        Path planning that{" "}
        <span className="font-serif italic text-[color:var(--color-mars)]">doesn't get stuck</span>.
      </>
    ),
    body:
      "Perception, SLAM, and decision-making — the software stack behind every competition run.",
  },
  {
    index: 5,
    eyebrow: "2025–26 season",
    title: (
      <>
        Now competing on the{" "}
        <span className="font-serif italic text-[color:var(--color-mars)]">world stage</span>.
      </>
    ),
    body:
      "10th internationally at IRC 2026. 9th at ISDC 2026. Design Innovation Award at SHAASTRA. The next rover is already on the bench.",
    primary: { label: "View competitions", href: "/competitions" },
  },
];

export function ScrollHero() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef(0);

  useEffect(() => {
    if (reduced) return;
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current!,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      // Per-chapter opacity windows
      const total = chapters.length;
      chaptersRef.current.forEach((el, i) => {
        if (!el) return;
        const slot = 1 / total;
        const start = i * slot;
        const peak = start + slot * 0.5;
        const end = start + slot;

        gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 24 });

        ScrollTrigger.create({
          trigger: containerRef.current!,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            let op = 0;
            let y = 24;
            if (p < start) {
              op = i === 0 ? 1 - p / start : 0;
              y = i === 0 ? 0 : 24;
            } else if (p < peak) {
              const t = (p - start) / (peak - start);
              op = t;
              y = (1 - t) * 24;
            } else if (p < end) {
              const t = (p - peak) / (end - peak);
              op = 1 - t;
              y = -t * 24;
            } else {
              op = 0;
              y = -24;
            }
            gsap.set(el, { opacity: Math.max(0, Math.min(1, op)), y });
          },
        });
      });

      return () => trigger.kill();
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) return <HeroFallback />;

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${chapters.length * 100}svh` }}
      aria-label="Hero"
    >
      <div ref={stageRef} className="sticky top-0 h-svh w-full overflow-hidden">
        {/* 3D scene */}
        <div className="absolute inset-0 -z-0">
          <RoverScene
            progressRef={progressRef}
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* Mars horizon glow at the bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[50vh] -z-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% 100%, color-mix(in oklab, var(--color-mars) 32%, transparent) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-mars)]/50 to-transparent"
        />

        {/* Chapters — pinned overlay text */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="container-page h-full flex flex-col justify-end pb-20 md:pb-28">
            <div className="relative max-w-2xl">
              {chapters.map((c, i) => (
                <div
                  key={c.index}
                  ref={(el) => {
                    if (el) chaptersRef.current[i] = el;
                  }}
                  className="absolute inset-x-0 bottom-0 pointer-events-auto"
                  style={{ willChange: "opacity, transform" }}
                >
                  <MonoLabel index={c.index}>{c.eyebrow}</MonoLabel>
                  <h1 className="mt-6 text-balance font-sans text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight">
                    {c.title}
                  </h1>
                  <p className="mt-6 max-w-xl text-pretty text-base md:text-lg leading-relaxed text-[color:var(--color-muted)]">
                    {c.body}
                  </p>
                  {(c.primary || c.secondary) && (
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      {c.primary && (
                        <Magnetic>
                          <Link
                            href={c.primary.href}
                            className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--color-paper)] bg-[color:var(--color-paper)] px-6 py-3 text-sm font-medium text-[color:var(--color-void)] transition-all hover:bg-[color:var(--color-mars)] hover:border-[color:var(--color-mars)] hover:text-[color:var(--color-paper)]"
                          >
                            {c.primary.label}
                            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                              →
                            </span>
                          </Link>
                        </Magnetic>
                      )}
                      {c.secondary && (
                        <Magnetic>
                          <Link
                            href={c.secondary.href}
                            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)] px-6 py-3 text-sm font-medium text-[color:var(--color-paper)] transition-colors hover:border-[color:var(--color-paper)]"
                          >
                            {c.secondary.label}
                          </Link>
                        </Magnetic>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll-hint indicator */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-6 bottom-6 z-20 hidden md:flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)]"
        >
          <span className="rotate-90 origin-center">Scroll</span>
          <span className="h-12 w-px bg-gradient-to-b from-[color:var(--color-faint)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
