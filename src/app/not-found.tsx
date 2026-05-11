import type { Metadata } from "next";
import Link from "next/link";
import { Magnetic } from "@/components/motion/magnetic";
import { DenoiseMark } from "@/components/site/denoise-mark";

export const metadata: Metadata = {
  title: "Lost signal — 404",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative min-h-svh flex items-center overflow-hidden">
      {/* Mars horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] -z-10"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% 100%, color-mix(in oklab, var(--color-mars) 22%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-mars)]/40 to-transparent"
      />

      <div className="container-page py-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-muted)]">
          <span className="text-[color:var(--color-mars)]">—</span> Lost signal · 404
        </p>

        <h1 className="mt-8 max-w-4xl font-sans text-7xl md:text-9xl lg:text-[12rem] font-medium leading-[0.92] tracking-[-0.025em] text-balance">
          Off the{" "}
          <span className="font-serif italic text-[color:var(--color-mars)]">map</span>.
        </h1>

        <p className="mt-8 max-w-md text-base md:text-lg leading-relaxed text-[color:var(--color-muted)]">
          That page doesn&rsquo;t exist — at least not at this address. The rover&rsquo;s still
          running; this URL just isn&rsquo;t one we mapped.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Magnetic>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-paper)] hover:bg-[color:var(--color-signal)] text-[color:var(--color-void)] px-6 py-3 text-sm font-medium transition-colors"
            >
              Return to base
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </Magnetic>
          <Link
            href="/rovers"
            className="group inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-paper)] transition-colors"
          >
            See the rovers
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {/* Tiny Denoise mark — bottom corner of the editorial space */}
        <div className="mt-32 flex items-center justify-between">
          <p className="font-serif italic text-base text-[color:var(--color-faint)]">
            &mdash; lost, not gone.
          </p>
          <Link
            href="/credits"
            className="group inline-flex items-center gap-3 text-[10px] text-[color:var(--color-faint)] hover:text-[color:var(--color-paper)] transition-colors"
          >
            <span className="font-mono uppercase tracking-[0.2em]">Crafted by</span>
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">
              <DenoiseMark height={18} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
