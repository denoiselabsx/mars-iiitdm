"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { nav as primaryNav, site } from "@/lib/site";
import { MissionClock } from "@/components/motion/mission-clock";

const visibleNav = primaryNav.filter((n) => n.href !== "/join" && n.href !== "/");

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border] duration-500",
        scrolled
          ? "backdrop-blur-xl bg-[color:var(--color-void)]/70 border-b border-[color:var(--color-line)]/40"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container-page flex h-20 items-center justify-between">
        {/* Left: hex logo + mission clock */}
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="group flex items-center gap-4"
        >
          <div className="relative">
            <Image
              src="/brand/mars-logo.png"
              alt=""
              width={56}
              height={56}
              priority
              className="h-11 w-11 object-contain drop-shadow-[0_0_12px_rgba(193,68,14,0.3)] transition-transform duration-700 group-hover:rotate-[12deg]"
            />
          </div>
          <div className="hidden sm:flex flex-col gap-0.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-paper)] leading-none">
              MaRS
            </span>
            <MissionClock className="leading-none" />
          </div>
        </Link>

        {/* Center: links */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {visibleNav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative font-mono text-[11px] uppercase tracking-[0.22em] transition-colors py-1",
                  active
                    ? "text-[color:var(--color-paper)]"
                    : "text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)]",
                )}
              >
                <span className="relative inline-flex items-center gap-1.5">
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "transition-all duration-300",
                      active
                        ? "opacity-100 translate-x-0 text-[color:var(--color-mars)]"
                        : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0",
                    )}
                  >
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right: persistent CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/join"
            className="hidden sm:inline-flex items-center gap-2 rounded-none border border-[color:var(--color-mars)]/60 bg-[color:var(--color-mars)]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-paper)] transition-all hover:bg-[color:var(--color-mars)] hover:border-[color:var(--color-mars)]"
            style={{
              clipPath:
                "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
            }}
          >
            <span className="h-1 w-1 rounded-full bg-[#5cf2b0] animate-pulse" />
            Join MaRS
          </Link>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 -m-2 text-[color:var(--color-paper)]"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[color:var(--color-line)]/40 bg-[color:var(--color-void)]/95 backdrop-blur-xl"
          >
            <ul className="container-page py-6 space-y-3">
              {visibleNav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-2 font-mono text-sm uppercase tracking-[0.18em] text-[color:var(--color-paper)]"
                  >
                    <span>{item.label}</span>
                    <span aria-hidden className="text-[color:var(--color-mars)]">→</span>
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * visibleNav.length, duration: 0.3 }}
                className="pt-2"
              >
                <Link
                  href="/join"
                  className="flex items-center justify-between py-3 bg-[color:var(--color-mars)] text-[color:var(--color-paper)] font-mono text-sm uppercase tracking-[0.18em] px-4"
                >
                  <span>Join MaRS</span>
                  <span aria-hidden>→</span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
