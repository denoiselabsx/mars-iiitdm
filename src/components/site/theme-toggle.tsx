"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

/**
 * Read/write the user's chosen theme. The initial value is read from the
 * <html data-theme="…"> attribute set by the inline FOUC-prevention script
 * in layout.tsx, so server and client agree on first render.
 */
function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    if (t === "light" || t === "dark") setThemeState(t);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("mars:theme", next);
    } catch {
      /* private mode etc — ignore */
    }
    // Keep the theme-color <meta> in sync with the new background
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "light" ? "#f5f2ee" : "#08080c");
  };

  return [theme, setTheme];
}

type Props = {
  className?: string;
  /** "icon" — just the sun/moon. "labeled" — icon + word, for menus. */
  variant?: "icon" | "labeled";
};

export function ThemeToggle({ className, variant = "icon" }: Props) {
  const [theme, setTheme] = useTheme();
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${next} mode`;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
      className={cn(
        "group inline-flex items-center justify-center gap-2 transition-colors",
        variant === "icon"
          ? "size-9 rounded-full border border-[color:var(--color-line)] hover:border-[color:var(--color-signal)] text-[color:var(--color-paper)] hover:text-[color:var(--color-signal)]"
          : "px-4 py-2 rounded-full border border-[color:var(--color-line)] hover:border-[color:var(--color-signal)] text-[color:var(--color-paper)] hover:text-[color:var(--color-signal)] font-mono text-[11px] uppercase tracking-[0.22em]",
        className,
      )}
    >
      {/* sun / moon stack — animated swap */}
      <span className="relative inline-flex items-center justify-center size-[18px]">
        <Sun
          size={16}
          className={cn(
            "absolute transition-all duration-500 ease-out",
            theme === "light"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-75",
          )}
        />
        <Moon
          size={16}
          className={cn(
            "absolute transition-all duration-500 ease-out",
            theme === "dark"
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-75",
          )}
        />
      </span>
      {variant === "labeled" && (
        <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
      )}
    </button>
  );
}
