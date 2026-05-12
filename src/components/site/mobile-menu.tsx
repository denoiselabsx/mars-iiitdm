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
// MOBILE MENU — variants pattern
// ----------------------------------------------------------------------
// Both open AND close are choreographed. AnimatePresence runs `exit`
// variants in reverse-stagger, so the last-in-first-out feel is automatic.
//
//   Open  : backdrop fade-up (200ms) → topbar (100ms in) → links cascade
//           (each 320ms in, 40ms stagger) → footer (200ms in)
//   Close : footer fades out → links cascade out (reverse) → topbar →
//           backdrop. Total ≈ 380ms.
//
// No clipPath, no scale tricks — pure opacity + y. Reads as premium.
// ─────────────────────────────────────────────────────────────────────────

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN = [0.6, 0, 0.4, 1] as const;

const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: EASE_OUT,
      when: "beforeChildren",
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: EASE_IN,
      when: "afterChildren",
      staggerChildren: 0.025,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: 12,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: EASE_IN },
  },
};

const topBarVariants: Variants = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2, ease: EASE_IN } },
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
          className="fixed inset-0 z-[70] md:hidden h-[100dvh] overflow-y-auto overscroll-contain bg-[color:var(--color-void)]"
        >
          {/* Subtle Mars horizon glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[50vh]"
            style={{
              background:
                "radial-gradient(ellipse 100% 70% at 50% 100%, color-mix(in oklab, var(--color-mars) 22%, transparent) 0%, transparent 70%)",
            }}
          />

          {/* Content */}
          <div className="relative min-h-[100dvh] flex flex-col">
            {/* Top bar */}
            <motion.div
              variants={topBarVariants}
              className="container-page flex items-center justify-between h-20"
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
                  width={44}
                  height={44}
                  className="h-10 w-10 object-contain transition-transform duration-700 group-hover:rotate-[14deg]"
                  style={{
                    filter:
                      "drop-shadow(0 0 14px color-mix(in oklab, var(--color-mars) 35%, transparent))",
                  }}
                />
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="p-2 -m-2 text-[color:var(--color-paper)] hover:text-[color:var(--color-mars)] transition-colors"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              variants={itemVariants}
              className="container-page mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]"
            >
              <span className="text-[color:var(--color-mars)]">—</span> Navigate
            </motion.p>

            {/* Links — big editorial */}
            <nav className="container-page flex-1 flex flex-col justify-center py-6">
              <ul className="space-y-0.5">
                {items.map((item, i) => (
                  <motion.li key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline justify-between gap-4 py-2.5 border-b border-[color:var(--color-line)]/40"
                    >
                      <span className="font-sans text-[2.25rem] sm:text-5xl font-medium tracking-tight leading-[1] text-[color:var(--color-paper)] group-hover:text-[color:var(--color-mars)] transition-colors">
                        {item.label}
                      </span>
                      <span
                        aria-hidden
                        className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)] group-hover:text-[color:var(--color-mars)] transition-colors translate-y-[-2px]"
                      >
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Italic accent line */}
              <motion.p
                variants={itemVariants}
                className="mt-8 max-w-xs font-serif italic text-xl sm:text-2xl leading-snug text-[color:var(--color-muted)]"
              >
                Exploration begins{" "}
                <span className="text-[color:var(--color-mars)]">here</span>.
              </motion.p>
            </nav>

            {/* Footer block — Join CTA + socials */}
            <motion.div
              variants={itemVariants}
              className="container-page pb-[max(env(safe-area-inset-bottom),2rem)]"
            >
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center justify-between w-full bg-[color:var(--color-mars)] hover:bg-[color:var(--color-mars-glow)] px-6 py-4 text-white transition-colors rounded-full"
              >
                <span className="font-sans text-base font-medium">
                  Follow on Instagram
                </span>
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  ↗
                </span>
              </a>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-muted)] hover:text-[color:var(--color-mars)] transition-colors"
                  >
                    Instagram
                  </a>
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
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)] hover:text-[color:var(--color-mars)] transition-colors"
                >
                  {site.email}
                </a>
              </div>

              {/* Crafted-by: Denoise Labs */}
              <Link
                href="/credits"
                onClick={onClose}
                className="mt-6 pt-5 border-t border-[color:var(--color-line)]/40 flex items-center justify-between gap-3 text-[color:var(--color-faint)] hover:text-[color:var(--color-paper)] transition-colors"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                  Crafted by
                </span>
                <span className="inline-flex items-center gap-2 opacity-80">
                  <DenoiseMark height={20} variant="plate" />
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
