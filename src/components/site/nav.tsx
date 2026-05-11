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
          "fixed inset-x-0 top-0 z-50 transition-[background,border] duration-500",
          scrolled
            ? "backdrop-blur-xl bg-[color:var(--color-void)]/70 border-b border-[color:var(--color-line)]/40"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="container-page flex h-20 items-center justify-between">
          {/* Left: logo + wordmark */}
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
              className="h-11 w-11 object-contain drop-shadow-[0_0_12px_rgba(220, 38, 38,0.3)] transition-transform duration-700 group-hover:rotate-[12deg]"
            />
            <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-paper)]">
              MaRS
            </span>
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
                          ? "opacity-100 translate-x-0 text-[color:var(--color-signal)]"
                          : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[color:var(--color-signal)]",
                      )}
                    >
                      →
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right: theme toggle + persistent CTA + mobile toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle className="hidden sm:inline-flex" />

            <Link
              href="/join"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)] hover:border-[color:var(--color-signal)] hover:text-[color:var(--color-signal)] px-5 py-2 text-sm font-medium text-[color:var(--color-paper)] transition-all"
            >
              Join MaRS
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>

            <button
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="md:hidden p-2 -m-2 text-[color:var(--color-paper)]"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
