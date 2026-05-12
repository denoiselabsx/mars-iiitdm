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
// MOBILE MENU — tight, non-scrolling, choreographed
// ----------------------------------------------------------------------
// Vertical budget for 360×640 / 375×667 (iPhone SE class):
//   header ~64px · nav ~280px · footer ~140px · safe-area ~16px ≈ 500px
// The layout is `h-[100dvh] flex flex-col justify-between` — no overflow,
// no scroll. Visual rhythm: links sit closer together, footer is one
// compact strip + denoise mark on its own hairline.
//
// Animation pass:
//   Open  → backdrop drops in (260ms) → topbar settles (220ms) → eyebrow,
//           links cascade (440ms each, 38ms stagger), each with a blur
//           release + y-translate → footer rises (320ms) → denoise plate
//           fades last.
//   Hover → hairline sweep grows from left under each link.
//   Close → reverse stagger, exits in ~320ms total.
// All transforms are translate/opacity/filter — no layout thrash.
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
      staggerChildren: 0.038,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.28,
      ease: EASE_IN,
      when: "afterChildren",
      staggerChildren: 0.022,
      staggerDirection: -1,
    },
  },
};

const topBarVariants: Variants = {
  initial: { opacity: 0, y: -8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: EASE_OUT },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.22, ease: EASE_IN } },
};

const eyebrowVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: EASE_OUT },
  },
  exit: { opacity: 0, y: 4, transition: { duration: 0.22, ease: EASE_IN } },
};

const linksListVariants: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
  exit: {
    transition: { staggerChildren: 0.028, staggerDirection: -1 },
  },
};

const linkItemVariants: Variants = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.44, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: 8,
    filter: "blur(4px)",
    transition: { duration: 0.22, ease: EASE_IN },
  },
};

const footerVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT, delay: 0.08 },
  },
  exit: { opacity: 0, y: 6, transition: { duration: 0.22, ease: EASE_IN } },
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
          {/* Subtle Mars horizon glow — pinned bottom */}
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

          {/* Content — three zones, no scroll */}
          <div className="relative h-[100dvh] flex flex-col">
            {/* ── Top bar ──────────────────────────────────────────── */}
            <motion.div
              variants={topBarVariants}
              className="container-page flex items-center justify-between h-16 shrink-0"
            >
              <Link
                href="/"
                onClick={onClose}
                aria-label="MaRS home"
                className="group inline-flex items-center"
              >
                <Image
                  src="/brand/mars-logo.png"
                  alt="MaRS"
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain transition-transform duration-700 group-hover:rotate-[14deg]"
                  style={{
                    filter:
                      "drop-shadow(0 0 14px color-mix(in oklab, var(--color-mars) 35%, transparent))",
                  }}
                />
              </Link>
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

            {/* ── Nav (flex-1, vertically centered) ───────────────── */}
            <nav
              className="container-page flex-1 min-h-0 flex flex-col justify-center"
              aria-label="Primary"
            >
              <motion.p
                variants={eyebrowVariants}
                className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]"
              >
                <span className="text-[color:var(--color-mars)]">—</span> Navigate
              </motion.p>

              <motion.ul
                variants={linksListVariants}
                className="mt-3 xs:mt-4"
              >
                {items.map((item, i) => (
                  <motion.li
                    key={item.href}
                    variants={linkItemVariants}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group relative flex items-baseline justify-between gap-4 py-1.5 xs:py-2"
                    >
                      <span className="font-sans text-[1.85rem] xs:text-[2.1rem] sm:text-[2.5rem] font-medium tracking-tight leading-[1.05] text-[color:var(--color-paper)] group-hover:text-[color:var(--color-mars)] transition-colors duration-400">
                        {item.label}
                      </span>
                      <span
                        aria-hidden
                        className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)] group-hover:text-[color:var(--color-mars)] transition-colors translate-y-[-2px]"
                      >
                        0{i + 1}
                      </span>

                      {/* Static hairline divider */}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-px bg-[color:var(--color-line)]/40"
                      />
                      {/* Sweep hairline — grows from left on hover/focus */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 bg-[color:var(--color-mars)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            {/* ── Footer block — compact, single zone ─────────────── */}
            <motion.div
              variants={footerVariants}
              className="container-page shrink-0 pb-[max(env(safe-area-inset-bottom),1rem)]"
            >
              {/* Primary CTA — Instagram (no duplicate chip below) */}
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
                className="mt-3 pt-3 border-t border-[color:var(--color-line)]/40 flex items-center justify-between gap-3 text-[color:var(--color-faint)] hover:text-[color:var(--color-paper)] transition-colors"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.22em]">
                  Crafted by
                </span>
                <span className="inline-flex items-center opacity-80 group-hover:opacity-100 transition-opacity">
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
