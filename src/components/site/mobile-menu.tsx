"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { useEffect } from "react";
import { X } from "lucide-react";

import { site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { DenoiseMark } from "./denoise-mark";

type Item = { href: string; label: string };

const items: Item[] = [
  { href: "/rovers", label: "Rovers" },
  { href: "/competitions", label: "Competitions" },
  { href: "/team", label: "Team" },
  { href: "/alumni", label: "Alumni" },
  { href: "/gallery", label: "Gallery" },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

// ─────────────────────────────────────────────────────────────────────────
// MOBILE MENU — display-scale, edge-to-edge, kinetic
// ----------------------------------------------------------------------
// Layout target: 360×640 (iPhone SE class) up. Three zones, no scroll.
//
// LINK ROW ANATOMY (top→bottom):
//   ┌──────────────────────────────────────────────────────────┐
//   │                                          01 / →   eyebrow│  ← right-aligned
//   │ COMPETITIONS                                              │  ← full row width
//   ├──────────────────────────────────────────────────────────┤  ← hairline
//
// Eyebrow above (counter + arrow) keeps the label free of right-edge
// competition so it can scale to text-[3rem]+ without overflowing the
// longest item ("Competitions" = 12ch).
//
// Animation pass — "credits-sequence" feel:
//   Open  → backdrop fades in (260ms) → topbar settles (320ms) → each
//           row enters: eyebrow fades from right (380ms), label wipes
//           via clip-path left→right (600ms), hairline draws beneath
//           (550ms) — all on the same per-row timeline. 80ms stagger
//           between rows. Footer rises last (420ms).
//   Hover → eyebrow goes Mars · arrow swings 12px right with a Mars
//           ghost arrow sliding in from -12px · label nudges 4px right
//           and shifts to Mars · hairline brightens line/45 → full Mars.
//           Four coordinated micro-moves.
//   Close → reverse stagger, exits in ~340ms.
// All transforms are translate/opacity/clip-path — no layout thrash.
// ─────────────────────────────────────────────────────────────────────────

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN = [0.6, 0, 0.4, 1] as const;

const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.26,
      ease: EASE_OUT,
      when: "beforeChildren",
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: EASE_IN,
      when: "afterChildren",
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const topBarVariants: Variants = {
  initial: { opacity: 0, y: -8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: EASE_OUT },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.22, ease: EASE_IN } },
};

const linksListVariants: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: {
    transition: { staggerChildren: 0.035, staggerDirection: -1 },
  },
};

// Each link is a single orchestrator variant — its CHILDREN (the label
// clip-path wipe, the hairline draw, the counter+arrow fade) ride off
// the same timeline so they enter as one event.
const linkRowVariants: Variants = {
  initial: {},
  animate: {
    transition: { duration: 0.54, ease: EASE_OUT },
  },
  exit: {
    transition: { duration: 0.24, ease: EASE_IN },
  },
};

const labelWipeVariants: Variants = {
  initial: { clipPath: "inset(0 100% 0 0)", y: 6 },
  animate: {
    clipPath: "inset(0 0% 0 0)",
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
  exit: {
    clipPath: "inset(0 100% 0 0)",
    y: 4,
    transition: { duration: 0.28, ease: EASE_IN },
  },
};

const hairlineDrawVariants: Variants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 0.55, ease: EASE_OUT, delay: 0.08 },
  },
  exit: {
    scaleX: 0,
    transition: { duration: 0.22, ease: EASE_IN },
  },
};

const metaFadeVariants: Variants = {
  initial: { opacity: 0, x: 8 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: EASE_OUT, delay: 0.04 },
  },
  exit: {
    opacity: 0,
    x: 4,
    transition: { duration: 0.18, ease: EASE_IN },
  },
};

const footerVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE_OUT, delay: 0.18 },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.22, ease: EASE_IN } },
};

export function MobileMenu({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[70] md:hidden h-[100dvh] overflow-hidden overscroll-contain bg-[color:var(--color-void)]"
        >
          {/* Mars horizon glow — pinned bottom */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[55vh]"
            style={{
              background:
                "radial-gradient(ellipse 110% 75% at 50% 100%, color-mix(in oklab, var(--color-mars) 24%, transparent) 0%, transparent 70%)",
            }}
          />

          {/* Hairline accent at the very top of the panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, color-mix(in oklab, var(--color-mars) 55%, transparent) 18%, color-mix(in oklab, var(--color-mars) 55%, transparent) 82%, transparent 100%)",
            }}
          />

          {/* Three-zone column — no scroll */}
          <div className="relative h-[100dvh] flex flex-col">
            {/* ── Top bar — logo gets full air, h-20 ───────────────── */}
            <motion.div
              variants={topBarVariants}
              className="container-page flex items-center justify-between h-20 shrink-0"
            >
              {/* MaRS × IIITDM lockup — same peer-mark hierarchy as the
                  desktop nav. Two separate links (different destinations). */}
              <div className="inline-flex items-center">
                <Link
                  href="/"
                  onClick={onClose}
                  aria-label="MaRS home"
                  className="group inline-flex items-center"
                >
                  <Image
                    src="/brand/mars-logo.png"
                    alt="MaRS"
                    width={48}
                    height={48}
                    className="h-11 w-11 object-contain transition-transform duration-700 group-hover:rotate-[14deg]"
                    style={{
                      filter:
                        "drop-shadow(0 0 16px color-mix(in oklab, var(--color-mars) 38%, transparent))",
                    }}
                  />
                </Link>

                {/* Hairline divider */}
                <span
                  aria-hidden
                  className="ml-3 mr-3 h-7 w-px bg-[color:var(--color-line)]/60"
                />

                {/* IIITDM parent-org peer mark — always-white disc */}
                <a
                  href="https://www.iiitdm.ac.in"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="IIITDM Kancheepuram"
                  className="group inline-flex items-center"
                >
                  <span
                    className="relative inline-block h-10 w-10 rounded-full overflow-hidden ring-1 ring-[color:var(--color-line)]/40 transition-[transform,ring-color] duration-300 ease-out group-hover:ring-[color:var(--color-mars)]/50 group-hover:-translate-y-px group-hover:scale-[1.06]"
                    style={{
                      backgroundColor: "#ffffff",
                      boxShadow:
                        "0 2px 6px -2px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)",
                    }}
                  >
                    <Image
                      src="/brand/iiitdm.webp"
                      alt=""
                      fill
                      sizes="40px"
                      className="object-contain relative"
                    />
                    {/* Mars-red halo on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-mars) 35%, transparent) 0%, transparent 70%)",
                      }}
                    />
                  </span>
                </a>
              </div>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-2 -m-1 text-[color:var(--color-paper)] hover:text-[color:var(--color-mars)] transition-colors"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>

            {/* ── Nav — display-scale, full-width rows ─────────────── */}
            <nav
              className="container-page flex-1 min-h-0 flex flex-col justify-center"
              aria-label="Primary"
            >
              <motion.ul variants={linksListVariants}>
                {items.map((item, i) => (
                  <motion.li
                    key={item.href}
                    variants={linkRowVariants}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group relative block py-2.5 xs:py-3"
                    >
                      {/* Eyebrow row — right-aligned counter + arrow.
                          Lives ABOVE the label so the label gets the
                          full row width. */}
                      <motion.div
                        variants={metaFadeVariants}
                        className="flex justify-end items-center gap-2 mb-0.5 xs:mb-1"
                      >
                        <span
                          aria-hidden
                          className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)] group-hover:text-[color:var(--color-mars)] transition-colors duration-[400ms]"
                        >
                          0{i + 1}
                        </span>
                        <span
                          aria-hidden
                          className="font-mono text-[10px] text-[color:var(--color-faint)]"
                        >
                          /
                        </span>
                        {/* Two-arrow swing — same trick as desktop "Join" */}
                        <span
                          aria-hidden
                          className="relative inline-block w-4 overflow-hidden font-mono text-[13px] leading-none text-[color:var(--color-faint)] group-hover:text-[color:var(--color-paper)] transition-colors duration-[400ms]"
                        >
                          <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                            →
                          </span>
                          <span
                            aria-hidden
                            className="absolute left-0 top-0 inline-block -translate-x-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 text-[color:var(--color-mars)]"
                          >
                            →
                          </span>
                        </span>
                      </motion.div>

                      {/* Label — clip-path wipes in from left.
                          Wrapper masks overflow so descenders don't bleed
                          past the wipe boundary. Full row width. */}
                      <span className="relative block overflow-hidden pb-1 -mb-1">
                        <motion.span
                          variants={labelWipeVariants}
                          className="block font-sans text-[2.5rem] xs:text-[3rem] sm:text-[3.5rem] font-medium tracking-[-0.025em] leading-[1] text-[color:var(--color-paper)] transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-[color:var(--color-mars)]"
                          style={{ willChange: "clip-path, transform" }}
                        >
                          {item.label}
                        </motion.span>
                      </span>

                      {/* Hairline — DRAWS in from left during entrance,
                          and BRIGHTENS to mars on hover */}
                      <motion.span
                        variants={hairlineDrawVariants}
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-[color:var(--color-line)]/45 group-hover:bg-[color:var(--color-mars)] transition-colors duration-500"
                        style={{ willChange: "transform" }}
                      />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            {/* ── Footer — Instagram pill + socials + denoise credit ─ */}
            <motion.div
              variants={footerVariants}
              className="container-page shrink-0 pb-[max(env(safe-area-inset-bottom),1rem)]"
            >
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative flex items-center justify-between w-full overflow-hidden bg-[color:var(--color-mars)] hover:bg-[color:var(--color-mars-glow)] px-5 py-3 text-white transition-colors rounded-full"
              >
                <span className="font-sans text-[15px] font-medium">
                  Follow on Instagram
                </span>
                <span
                  aria-hidden
                  className="relative inline-block w-5 overflow-hidden font-mono text-[15px] leading-none"
                >
                  <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                    ↗
                  </span>
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 inline-block -translate-x-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
                  >
                    ↗
                  </span>
                </span>
              </a>

              {/* Socials + email on one tight row */}
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] hover:text-[color:var(--color-mars)] transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={site.social.youtube}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] hover:text-[color:var(--color-mars)] transition-colors"
                  >
                    YouTube
                  </a>
                </div>
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)] hover:text-[color:var(--color-mars)] transition-colors truncate"
                >
                  {site.email}
                </a>
              </div>

              {/* Crafted-by — Denoise Labs */}
              <Link
                href="/credits"
                onClick={onClose}
                className="group/credit mt-3 pt-3 border-t border-[color:var(--color-line)]/40 flex items-center justify-between gap-3 text-[color:var(--color-faint)] hover:text-[color:var(--color-paper)] transition-colors"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.22em]">
                  Crafted by
                </span>
                <span className="inline-flex items-center opacity-80 group-hover/credit:opacity-100 transition-opacity">
                  <DenoiseMark height={18} variant="plate" />
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
