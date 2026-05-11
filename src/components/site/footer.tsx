import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { sponsors as realSponsors } from "@/lib/data";
import { DenoiseMark } from "./denoise-mark";

const sponsors: { name: string; logo?: string; href?: string }[] = realSponsors.map(
  (s) => ({ name: s.name, href: s.href }),
);

export function Footer() {
  return (
    <footer className="relative mt-40 border-t border-[color:var(--color-line)]/50 overflow-hidden">
      {/* Mars horizon glow at the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1 h-24"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 0%, color-mix(in oklab, var(--color-mars) 22%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* ──────────── SPONSORS ──────────── */}
      <div className="container-page pt-24 md:pt-32">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div>
            <div className="h-px w-16 bg-[color:var(--color-mars)] mb-6" />
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]">
              Partners & Sponsors
            </p>
            <h2 className="mt-5 text-balance font-sans text-3xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              Building rovers is{" "}
              <span className="font-serif italic text-[color:var(--color-mars)]">
                expensive
              </span>
              .
            </h2>
          </div>
          <Link
            href="/join#sponsors"
            className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors"
          >
            Become a sponsor
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <ul className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40">
          {sponsors.map((s, i) => (
            <li
              key={`${s.name}-${i}`}
              className="group bg-[color:var(--color-void)] aspect-[3/2] flex items-center justify-center px-4 hover:bg-[color:var(--color-surface)] transition-colors"
            >
              {s.logo ? (
                <Image
                  src={s.logo}
                  alt={s.name}
                  width={120}
                  height={48}
                  className="max-h-10 w-auto opacity-50 group-hover:opacity-90 transition-opacity"
                />
              ) : (
                <span className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-faint)] group-hover:text-[color:var(--color-muted)] transition-colors">
                  {s.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* ──────────── LINKS + IDENTITY ──────────── */}
      <div className="container-page pt-28 md:pt-36 pb-12 grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12">
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
              <p className="mt-1 text-[11px] text-[color:var(--color-faint)]">
                {site.parent}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[color:var(--color-muted)]">
            {site.description}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)]">
            Explore
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
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[color:var(--color-signal)]">
                    →
                  </span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)]">
            Connect
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
            © {new Date().getFullYear()} {site.fullName}
          </p>
          <Link
            href="/credits"
            className="group inline-flex items-center gap-3 text-[10px] text-[color:var(--color-faint)] hover:text-[color:var(--color-paper)] transition-colors"
          >
            <span className="font-mono uppercase tracking-[0.2em]">Crafted by</span>
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">
              <DenoiseMark height={18} />
            </span>
            <span className="overflow-hidden inline-flex items-center max-w-0 group-hover:max-w-[260px] transition-[max-width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap">
              <span className="font-mono uppercase tracking-[0.2em] pl-3 border-l border-[color:var(--color-line)] ml-3">
                Studio out of IIITDM
              </span>
              <span aria-hidden className="ml-2 text-[color:var(--color-signal)] transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
