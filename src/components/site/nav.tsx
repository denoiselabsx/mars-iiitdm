"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { nav as primaryNav, site } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

const visibleNav = primaryNav.filter((n) => n.href !== "/");

// ─────────────────────────────────────────────────────────────────────────
// FLOATING NAV — no-reflow technique
// ----------------------------------------------------------------------
// The bar's GEOMETRY (position, size, layout) is identical in both states.
// Only the CHROME (bg, blur, shadow, ring, rounded corners) fades in on
// scroll. This eliminates the jitter that comes from transitioning
// max-width / padding / border-radius simultaneously.
//
// Top edge (page-top): chrome opacity 0, hairline visible below.
// On scroll > 24px:    chrome opacity 1 (glass, ring, shadow, pill).
// ─────────────────────────────────────────────────────────────────────────

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Outer fixed wrapper — constant geometry. The inner pill is always
          centered with the same max-width. We only animate visual chrome. */}
      <header className="fixed inset-x-0 top-3 md:top-4 z-50 pointer-events-none px-3 md:px-6">
        <div className="relative mx-auto max-w-5xl">
          {/* Glass chrome layer — fades in on scroll. Absolutely positioned
              so it doesn't affect layout of the bar's children. */}
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 rounded-full",
              "transition-opacity duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              scrolled ? "opacity-100" : "opacity-0",
            )}
            style={{
              backgroundColor: "color-mix(in oklab, var(--color-void) 75%, transparent)",
              backdropFilter: "blur(20px) saturate(140%)",
              WebkitBackdropFilter: "blur(20px) saturate(140%)",
              boxShadow:
                "0 10px 40px -10px rgba(0,0,0,0.5), 0 0 0 1px color-mix(in oklab, var(--color-line) 65%, transparent), 0 0 0 1px color-mix(in oklab, var(--color-mars) 6%, transparent)",
            }}
          />

          {/* The actual bar — constant size & layout in both states */}
          <div className="relative pointer-events-auto h-16 flex items-center justify-between px-4 md:px-6">
            {/* Left: MaRS primary mark + IIITDM parent-org satellite.
                Hierarchy: 40px primary · hairline · 26–28px satellite (white
                disc, permanent). Desktop spacing relaxes on scroll-top, snugs
                on scrolled. Mobile is its own tight variant — smaller disc,
                tighter gap, no divider — so the pill never crowds. */}
            <div className="inline-flex items-center shrink-0">
              <Link
                href="/"
                aria-label={`${site.name} home`}
                className="group inline-flex items-center shrink-0"
              >
                <Image
                  src="/brand/mars-logo.png"
                  alt={site.name}
                  width={56}
                  height={56}
                  priority
                  className="h-10 w-10 object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[12deg]"
                  style={{
                    filter:
                      "drop-shadow(0 0 12px color-mix(in oklab, var(--color-mars) 30%, transparent))",
                  }}
                />
              </Link>

              {/* Hairline divider — desktop only. Constant geometry. */}
              <span
                aria-hidden
                className="hidden md:inline-block h-6 w-px bg-[color:var(--color-line)]/60 mx-3"
              />

              {/* IIITDM parent-institute satellite mark — permanent white disc,
                  always legible against the dark bar. Tight gap on mobile, more
                  breathing room on desktop. */}
              <a
                href="https://www.iiitdm.ac.in"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="IIITDM Kancheepuram"
                className="group inline-flex items-center ml-2 md:ml-0"
              >
                <span
                  className={cn(
                    "relative inline-block rounded-full overflow-hidden",
                    "ring-1 ring-[color:var(--color-line)]/40",
                    "transition-[transform,box-shadow,ring-color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "group-hover:ring-[color:var(--color-mars)]/50 group-hover:-translate-y-px group-hover:scale-[1.06]",
                    // Constant size — no scroll-tied animation. Mobile 28px,
                    // desktop 36px, regardless of scroll state. Matches the
                    // 40px MaRS hex closely enough to read as a peer mark.
                    "h-7 w-7 md:h-9 md:w-9",
                  )}
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow:
                      "inset 0 0 0 1px rgba(255,255,255,0.6), 0 4px 14px -4px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Soft inner halo — gives the white disc subtle depth so it
                      doesn't read as a flat sticker against the dark bar */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 70% at 50% 30%, #ffffff 0%, #fafafa 65%, #ececec 100%)",
                    }}
                  />
                  <Image
                    src="/brand/iiitdm.webp"
                    alt=""
                    fill
                    sizes="(min-width: 768px) 36px, 28px"
                    className="object-contain p-[2px] md:p-[3px] relative"
                  />
                  {/* Mars-tinted halo on hover — replaces the caption as the
                      "this is interactive" affordance */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-mars) 35%, transparent) 0%, transparent 70%)",
                    }}
                  />
                </span>
              </a>
            </div>

            {/* Center: editorial masthead links */}
            <nav
              className="hidden md:flex items-center gap-7 lg:gap-9"
              aria-label="Primary"
            >
              {visibleNav.map((item, i) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex items-baseline gap-1.5 py-1 transition-colors",
                      active
                        ? "text-[color:var(--color-paper)]"
                        : "text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)]",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "font-mono text-[9px] tracking-[0.18em] leading-none transition-colors",
                        active
                          ? "text-[color:var(--color-mars)]"
                          : "text-[color:var(--color-faint)] group-hover:text-[color:var(--color-mars)]",
                      )}
                    >
                      0{i + 1}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] leading-none">
                      {item.label}
                    </span>
                    {/* Sweep hairline */}
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute left-0 right-0 -bottom-1.5 h-px origin-left bg-[color:var(--color-mars)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right: theme toggle + mobile toggle */}
            <div className="flex items-center gap-3 sm:gap-5 shrink-0">
              <ThemeToggle className="hidden sm:inline-flex" />

              <button
                aria-label="Open menu"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="md:hidden p-2 -m-2 text-[color:var(--color-paper)] hover:text-[color:var(--color-mars)] transition-colors"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>

          {/* Page-top hairline — only visible when not scrolled. Sits BELOW
              the bar, decorative only. Fades out as the glass fades in. */}
          <div
            aria-hidden
            className={cn(
              "absolute left-4 right-4 -bottom-px h-px transition-opacity duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              scrolled ? "opacity-0" : "opacity-60",
            )}
            style={{
              background:
                "linear-gradient(to right, transparent 0%, color-mix(in oklab, var(--color-mars) 60%, transparent) 18%, color-mix(in oklab, var(--color-mars) 60%, transparent) 82%, transparent 100%)",
            }}
          />
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
