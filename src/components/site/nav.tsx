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
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,height] duration-500",
          scrolled
            ? "backdrop-blur-xl bg-[color:var(--color-void)]/75"
            : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between transition-[height] duration-500",
            scrolled ? "h-16" : "h-20",
          )}
        >
          {/* Left: logo + wordmark + status dot */}
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="group flex items-center gap-3"
          >
            <Image
              src="/brand/mars-logo.png"
              alt=""
              width={56}
              height={56}
              priority
              className={cn(
                "object-contain transition-all duration-700 group-hover:rotate-[12deg]",
                scrolled ? "h-9 w-9" : "h-11 w-11",
              )}
              style={{
                filter:
                  "drop-shadow(0 0 12px color-mix(in oklab, var(--color-mars) 30%, transparent))",
              }}
            />
            <span className="hidden sm:flex items-baseline gap-2">
              <span className="font-serif italic text-lg leading-none text-[color:var(--color-paper)]">
                MaRS
              </span>
              <span
                aria-hidden
                className="font-mono text-[9px] uppercase tracking-[0.28em] text-[color:var(--color-faint)] leading-none translate-y-[-1px]"
              >
                IIITDM
              </span>
            </span>
          </Link>

          {/* Center: editorial masthead links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 absolute left-1/2 -translate-x-1/2">
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
                  {/* Sweep hairline — anchored to the type, not a pill */}
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

          {/* Right: theme toggle + typographic Join CTA + mobile toggle */}
          <div className="flex items-center gap-3 sm:gap-5">
            <ThemeToggle className="hidden sm:inline-flex" />

            {/* Typographic Join — no pill, hairline under the arrow */}
            <Link
              href="/join"
              className="group hidden sm:inline-flex items-baseline gap-2 py-1 text-[color:var(--color-paper)] hover:text-[color:var(--color-mars)] transition-colors"
            >
              <span className="font-serif italic text-[15px] leading-none">
                Join
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] leading-none">
                MaRS
              </span>
              <span
                aria-hidden
                className="relative inline-block w-5 overflow-hidden font-mono text-[13px] leading-none translate-y-[1px]"
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
            </Link>

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

        {/* The horizon — single 1px mars-red hairline the whole nav sits on.
            Fades up subtly when not scrolled (transparent header) and asserts
            itself once the backdrop blurs in. */}
        <div
          aria-hidden
          className={cn(
            "h-px w-full transition-opacity duration-500",
            scrolled ? "opacity-100" : "opacity-40",
          )}
          style={{
            background:
              "linear-gradient(to right, transparent 0%, color-mix(in oklab, var(--color-mars) 60%, transparent) 18%, color-mix(in oklab, var(--color-mars) 60%, transparent) 82%, transparent 100%)",
          }}
        />
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
