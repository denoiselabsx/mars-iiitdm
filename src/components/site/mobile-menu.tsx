"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";
import { X } from "lucide-react";

import { site } from "@/lib/site";

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[70] md:hidden h-[100dvh] overflow-y-auto overscroll-contain"
        >
          {/* Full-bleed backdrop */}
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-[color:var(--color-void)]"
          />

          {/* Subtle Mars horizon glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[50vh]"
            style={{
              background:
                "radial-gradient(ellipse 100% 70% at 50% 100%, color-mix(in oklab, var(--color-mars) 25%, transparent) 0%, transparent 70%)",
            }}
          />

          {/* Content */}
          <div className="relative min-h-[100dvh] flex flex-col">
            {/* Top bar */}
            <div className="container-page flex items-center justify-between h-20">
              <Link
                href="/"
                onClick={onClose}
                aria-label="Home"
                className="flex items-center gap-3"
              >
                <Image
                  src="/brand/mars-logo.png"
                  alt=""
                  width={44}
                  height={44}
                  className="h-10 w-10 object-contain drop-shadow-[0_0_10px_rgba(220, 38, 38,0.3)]"
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-paper)]">
                  MaRS
                </span>
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 -m-2 text-[color:var(--color-paper)]"
              >
                <X size={22} />
              </button>
            </div>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="container-page mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]"
            >
              <span className="text-[color:var(--color-mars)]">—</span> Navigate
            </motion.p>

            {/* Links — big editorial */}
            <nav className="container-page flex-1 flex flex-col justify-center py-6">
              <ul className="space-y-0.5">
                {items.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: 0.4 + i * 0.07,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline justify-between gap-4 py-2.5 border-b border-[color:var(--color-line)]/40"
                    >
                      <span className="font-sans text-[2.25rem] sm:text-5xl font-medium tracking-tight leading-[1] text-[color:var(--color-paper)] group-hover:text-[color:var(--color-signal)] transition-colors">
                        {item.label}
                      </span>
                      <span
                        aria-hidden
                        className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)] group-hover:text-[color:var(--color-signal)] transition-colors translate-y-[-2px]"
                      >
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Italic accent line */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.6 }}
                className="mt-8 max-w-xs font-serif italic text-xl sm:text-2xl leading-snug text-[color:var(--color-muted)]"
              >
                Exploration begins{" "}
                <span className="text-[color:var(--color-mars)]">here</span>.
              </motion.p>
            </nav>

            {/* Footer block — Join CTA + socials */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.6 }}
              className="container-page pb-[max(env(safe-area-inset-bottom),2rem)]"
            >
              <Link
                href="/join"
                onClick={onClose}
                className="group flex items-center justify-between w-full bg-[color:var(--color-mars)] hover:bg-[color:var(--color-mars-glow)] px-6 py-4 text-[color:var(--color-paper)] transition-colors rounded-full"
              >
                <span className="font-sans text-base font-medium">Join MaRS</span>
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-y-2">
                <div className="flex items-center gap-5">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]"
                  >
                    Instagram
                  </a>
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]"
                  >
                    LinkedIn
                  </a>
                </div>
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)]"
                >
                  {site.email}
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
