"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/site";

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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-xl bg-[color:var(--color-void)]/70 border-b border-[color:var(--color-line)]/50"
          : "bg-transparent",
      )}
      style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="flex items-center gap-2.5 group"
        >
          <Image
            src="/brand/mars-logo.png"
            alt=""
            width={32}
            height={32}
            priority
            className="h-8 w-8 object-contain transition-transform duration-500 group-hover:rotate-[10deg]"
          />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--color-paper)]">
            MaRS
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3.5 py-2 text-sm transition-colors",
                  active
                    ? "text-[color:var(--color-paper)]"
                    : "text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)]",
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3.5 -bottom-px h-px bg-[color:var(--color-mars)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 -m-2 text-[color:var(--color-paper)]"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[color:var(--color-line)]/50 bg-[color:var(--color-void)]/95 backdrop-blur-xl"
          >
            <ul className="container-page py-4 space-y-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="block py-2.5 text-base text-[color:var(--color-paper)]"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
