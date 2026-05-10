import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { MissionClock } from "@/components/motion/mission-clock";

export function Footer() {
  return (
    <footer className="relative mt-40 border-t border-[color:var(--color-line)]/50 overflow-hidden">
      {/* Mars horizon glow at the very top of the footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1 h-24"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 0%, color-mix(in oklab, var(--color-mars) 25%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* ──────────── EDITORIAL CLOSER ──────────── */}
      <div className="container-page py-24 md:py-32 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color:var(--color-faint)]">
          ░░░  Transmission continues  ░░░
        </p>
        <h2 className="mt-8 text-balance font-sans text-4xl md:text-6xl lg:text-7xl font-medium leading-[0.98] tracking-tight">
          Stay on{" "}
          <span className="font-serif italic text-[color:var(--color-mars)]">frequency</span>.
        </h2>
        <p className="mt-6 mx-auto max-w-md text-sm text-[color:var(--color-muted)] leading-relaxed">
          Mission updates, recruitment windows, competition results — direct from MaRS, no fluff.
        </p>

        {/* Email subscribe — wired up in W5; for now mailto stub */}
        <form
          action={`mailto:${site.email}?subject=Subscribe`}
          method="get"
          className="mt-10 mx-auto flex max-w-md items-stretch border border-[color:var(--color-line)] hover:border-[color:var(--color-mars)]/60 transition-colors"
          style={{
            clipPath:
              "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
          }}
        >
          <input
            type="email"
            name="subject"
            required
            placeholder="you@university.edu"
            className="flex-1 bg-transparent px-5 py-3.5 text-sm text-[color:var(--color-paper)] placeholder:text-[color:var(--color-faint)] focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[color:var(--color-mars)] hover:bg-[color:var(--color-mars-glow)] text-[color:var(--color-paper)] px-5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors"
          >
            Uplink →
          </button>
        </form>
      </div>

      {/* ──────────── TELEMETRY STRIP ──────────── */}
      <div className="border-y border-[color:var(--color-line)]/40 bg-[color:var(--color-surface)]/30">
        <div className="container-page py-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          <div className="flex items-center gap-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5cf2b0] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5cf2b0]" />
            </span>
            <span className="text-[#5cf2b0]">UPLINK STABLE</span>
          </div>
          <MissionClock />
          <span>
            <span className="text-[color:var(--color-mars)]">LAT</span> 12.8221° N ·{" "}
            <span className="text-[color:var(--color-mars)]">LON</span> 80.0436° E
          </span>
          <span>
            <span className="text-[color:var(--color-mars)]">NEXT</span> Recruitment '26 · Jul
          </span>
        </div>
      </div>

      {/* ──────────── LINKS GRID ──────────── */}
      <div className="container-page py-16 grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12">
        <div className="col-span-2 md:col-span-5">
          <div className="flex items-center gap-4">
            <Image
              src="/brand/mars-logo.png"
              alt=""
              width={64}
              height={64}
              className="h-14 w-14 object-contain drop-shadow-[0_0_12px_rgba(193,68,14,0.3)]"
            />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-paper)]">
                {site.name}
              </p>
              <p className="mt-1 text-[11px] text-[color:var(--color-faint)] font-mono tracking-[0.12em]">
                {site.parent}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[color:var(--color-muted)]">
            {site.description}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
            // Explore
          </p>
          <ul className="mt-5 space-y-3">
            {[
              { href: "/rovers", label: "Rovers" },
              { href: "/competitions", label: "Competitions" },
              { href: "/team", label: "Team" },
              { href: "/gallery", label: "Gallery" },
              { href: "/join", label: "Join" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors"
                >
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[color:var(--color-mars)]">
                    →
                  </span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mars)]">
            // Channels
          </p>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors"
              >
                Instagram · @mars_iiitdm
              </a>
            </li>
            <li>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors"
              >
                LinkedIn · mars-research-station
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ──────────── BASELINE ──────────── */}
      <div className="border-t border-[color:var(--color-line)]/40">
        <div className="container-page py-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-faint)]">
            © {new Date().getFullYear()} {site.fullName} · all rights reserved
          </p>
          <a
            href={site.agency.url}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-3 text-[10px] text-[color:var(--color-faint)] hover:text-[color:var(--color-paper)] transition-colors"
          >
            <span className="font-mono uppercase tracking-[0.2em]">Crafted by</span>
            <Image
              src="/brand/denoise-horizontal.png"
              alt={site.agency.name}
              width={92}
              height={16}
              className="h-3.5 w-auto opacity-50 group-hover:opacity-100 transition-opacity"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
