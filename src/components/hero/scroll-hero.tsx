"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  const velocityRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const lastScrollY = useRef(0);
  const lastScrollT = useRef(0);

  const [isTouch, setIsTouch] = useState(false);
  const [showDragHint, setShowDragHint] = useState(false);
  const dragInteracted = useRef(false);

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touch);
    if (touch) {
      const t = window.setTimeout(() => setShowDragHint(true), 1500);
      const dismiss = window.setTimeout(() => setShowDragHint(false), 6500);
      return () => {
        window.clearTimeout(t);
        window.clearTimeout(dismiss);
      };
    }
  }, []);

  useEffect(() => {
    if (reduced || !containerRef.current) return;

    const touch = window.matchMedia("(pointer: coarse)").matches;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current!,
        start: "top top",
        end: "bottom top",
        // Tighter scrub on touch — native scroll spikes need instant tracking, no easing lag
        scrub: touch ? 0.08 : 0.4,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
    }, containerRef);

    // Desktop only: track scroll velocity for inertial spin overlay.
    // Mobile: skip — drag handles the rotation interaction; scroll is ambient only.
    if (touch) {
      return () => ctx.revert();
    }

    lastScrollY.current = window.scrollY;
    lastScrollT.current = performance.now();

    const onScroll = () => {
      const now = performance.now();
      const dy = window.scrollY - lastScrollY.current;
      const dt = Math.max(1, now - lastScrollT.current);
      const v = Math.max(-4, Math.min(4, dy / dt));
      velocityRef.current = velocityRef.current * 0.85 + v;
      lastScrollY.current = window.scrollY;
      lastScrollT.current = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  // Touch-drag rotation on mobile.
  // - Starts "armed" on pointerdown
  // - Engages rotation only once horizontal motion dominates (>8px AND |dx|>|dy|)
  // - Once engaged, captures the pointer and writes drag offset
  // - Inertia: on release, last velocity decays into dragOffsetRef
  useEffect(() => {
    if (reduced) return;
    if (!isTouch) return;

    const root = containerRef.current;
    if (!root) return;
    const dragLayer = root.querySelector<HTMLDivElement>("[data-drag-layer]");
    if (!dragLayer) return;

    let armed = false;
    let engaged = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let baseOffset = 0;
    let rafId = 0;

    const decay = () => {
      if (Math.abs(velocity) < 0.0005) {
        velocity = 0;
        rafId = 0;
        return;
      }
      dragOffsetRef.current += velocity;
      velocity *= 0.92;
      rafId = requestAnimationFrame(decay);
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      armed = true;
      engaged = false;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
      lastT = e.timeStamp;
      velocity = 0;
      baseOffset = dragOffsetRef.current;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!armed) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!engaged) {
        // Engage only after a clear horizontal-intent threshold.
        if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
          engaged = true;
          dragInteracted.current = true;
          setShowDragHint(false);
          try {
            dragLayer.setPointerCapture(e.pointerId);
          } catch {}
        } else if (Math.abs(dy) > 8) {
          // User is scrolling vertically — disarm
          armed = false;
          return;
        } else {
          return;
        }
      }

      // 1 px ≈ 0.012 rad
      dragOffsetRef.current = baseOffset + dx * 0.012;

      // Track velocity for release inertia
      const now = e.timeStamp;
      const dt = Math.max(1, now - lastT);
      velocity = ((e.clientX - lastX) * 0.012) / dt * 16; // ≈ per-frame delta
      lastX = e.clientX;
      lastT = now;
    };

    const onUp = (e: PointerEvent) => {
      if (!armed) return;
      armed = false;
      if (engaged) {
        try {
          dragLayer.releasePointerCapture(e.pointerId);
        } catch {}
        engaged = false;
        // Kick off inertia
        if (Math.abs(velocity) > 0.002 && !rafId) {
          rafId = requestAnimationFrame(decay);
        }
      }
    };

    dragLayer.addEventListener("pointerdown", onDown);
    dragLayer.addEventListener("pointermove", onMove);
    dragLayer.addEventListener("pointerup", onUp);
    dragLayer.addEventListener("pointercancel", onUp);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      dragLayer.removeEventListener("pointerdown", onDown);
      dragLayer.removeEventListener("pointermove", onMove);
      dragLayer.removeEventListener("pointerup", onUp);
      dragLayer.removeEventListener("pointercancel", onUp);
    };
  }, [isTouch, reduced]);

  if (reduced) return <HeroFallback />;

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      // 240svh desktop, 160svh mobile (less runway needed since drag drives interaction)
      style={{ height: isTouch ? "160svh" : "240svh" }}
      aria-label="Hero"
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* ── 3D rover ─────────────────────────────────────────────────────
            Desktop: right-anchored, 55-58% width, scroll-driven rotation
            Mobile: bottom-half of viewport, drag-driven rotation
        */}
        {/* Desktop scene */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-[58%] lg:w-[55%] -z-0">
          <RoverScene
            progressRef={progressRef}
            velocityRef={velocityRef}
            dragOffsetRef={dragOffsetRef}
            className="absolute inset-0 h-full w-full"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[color:var(--color-void)] to-transparent"
          />
        </div>

        {/* Mobile scene — full viewport. touch-action pan-y lets vertical scroll
            pass through; only horizontal drag is captured for rotation. */}
        <div
          data-drag-layer
          className="md:hidden absolute inset-0 -z-0"
          style={{ touchAction: "pan-y" }}
        >
          <RoverScene
            progressRef={progressRef}
            velocityRef={velocityRef}
            dragOffsetRef={dragOffsetRef}
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* Mars horizon glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] -z-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 70% at 50% 100%, color-mix(in oklab, var(--color-mars) 26%, transparent) 0%, transparent 75%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-mars)]/40 to-transparent"
        />

        {/* ── Text column ──────────────────────────────────────────────── */}
        {/* Desktop: vertically centered, left-anchored */}
        <div className="hidden md:flex relative z-10 h-full">
          <div className="container-page h-full flex items-center">
            <div className="max-w-3xl">
              <DesktopHeroText />
            </div>
          </div>
        </div>

        {/* Mobile: text overlay anchored bottom with readability scrim */}
        <div className="md:hidden relative z-10 h-full pointer-events-none flex flex-col">
          {/* Scrim from void at top blending out, so headline sits over rover safely */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[28svh] bg-gradient-to-b from-[color:var(--color-void)]/70 via-[color:var(--color-void)]/30 to-transparent"
          />
          {/* Bottom scrim — strong enough for text legibility */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[58svh] bg-gradient-to-t from-[color:var(--color-void)] from-30% via-[color:var(--color-void)]/85 to-transparent"
          />

          <div className="container-page pt-24 pointer-events-auto relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]"
            >
              <span className="text-[color:var(--color-mars)]">—</span>{" "}
              Mars Rover Students Club
            </motion.p>
          </div>

          {/* Headline + meta — anchored bottom over scrim */}
          <div className="mt-auto container-page pb-12 pointer-events-auto relative z-10">
            <MobileHeroText />
          </div>
        </div>

        {/* Mobile drag hint */}
        <AnimatePresence>
          {isTouch && showDragHint && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute inset-x-0 bottom-6 z-10 flex justify-center pointer-events-none"
              aria-hidden
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-surface)]/80 backdrop-blur px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] border border-[color:var(--color-line)]/60">
                <span aria-hidden>←</span>
                Drag to rotate
                <span aria-hidden>→</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

function DesktopHeroText() {
  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]"
      >
        <span className="text-[color:var(--color-mars)]">—</span>{" "}
        Mars Rover Students Club
      </motion.p>

      <h1 className="mt-8 font-sans text-[5.4vw] lg:text-[4.8vw] xl:text-[4.4vw] font-medium leading-[0.96] tracking-[-0.025em] text-balance text-[color:var(--color-paper)]">
        <HeroLine delay={0.2}>India&rsquo;s student rover team,</HeroLine>
        <HeroLine delay={0.4}>
          out of IIITDM{" "}
          <span className="font-serif italic text-[color:var(--color-mars)]">
            Kancheepuram
          </span>
          .
        </HeroLine>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 max-w-md text-lg leading-relaxed text-[color:var(--color-muted)]"
      >
        We design, build, and field autonomous rovers for international competition —
        IRC, ISDC, IRoC-U.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4"
      >
        <Magnetic>
          <Link
            href="/rovers"
            className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-signal)] text-[color:var(--color-void)] px-6 py-3 text-sm font-medium transition-colors"
          >
            See our rovers
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </Magnetic>
        <Link
          href="/join"
          className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
        >
          Join the team
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </motion.div>
    </>
  );
}

function MobileHeroText() {
  return (
    <>
      <h1 className="font-sans text-[8.5vw] xs:text-[7.5vw] sm:text-[6.5vw] font-medium leading-[1.02] tracking-[-0.02em] text-balance text-[color:var(--color-paper)]">
        <HeroLine delay={0.2}>India&rsquo;s student rover team,</HeroLine>
        <HeroLine delay={0.4}>
          out of IIITDM{" "}
          <span className="font-serif italic text-[color:var(--color-mars)]">
            Kancheepuram
          </span>
          .
        </HeroLine>
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3"
      >
        <Link
          href="/rovers"
          className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-signal)] text-[color:var(--color-void)] px-5 py-2.5 text-sm font-medium transition-colors"
        >
          See our rovers
          <span aria-hidden>→</span>
        </Link>
        <Link
          href="/join"
          className="inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-signal)] transition-colors"
        >
          Join →
        </Link>
      </motion.div>
    </>
  );
}

function HeroLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="block"
    >
      {children}
    </motion.span>
  );
}
