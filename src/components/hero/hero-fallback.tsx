import Link from "next/link";
import { MonoLabel } from "@/components/motion/mono-label";

export function HeroFallback() {
  return (
    <section className="relative min-h-svh flex items-end overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, color-mix(in oklab, var(--color-mars) 28%, transparent) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px -z-10 bg-gradient-to-r from-transparent via-[color:var(--color-mars)]/40 to-transparent"
      />

      <div className="container-page pb-20 md:pb-32 pt-32">
        <MonoLabel index={1}>Mars Rover Students Club · IIITDM Kancheepuram</MonoLabel>
        <h1 className="mt-8 max-w-5xl text-balance font-sans text-6xl md:text-8xl lg:text-[9rem] font-medium leading-[0.92] tracking-tight">
          Exploration{" "}
          <span className="font-serif italic text-[color:var(--color-mars)]">begins</span>{" "}
          here.
        </h1>
        <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-[color:var(--color-muted)]">
          We design, build, and field autonomous rovers for Mars-analog terrains —
          competing on the world stage at IRC, ISDC, and IRoC-U.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/rovers"
            className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--color-paper)] bg-[color:var(--color-paper)] px-6 py-3 text-sm font-medium text-[color:var(--color-void)] transition-colors hover:bg-[color:var(--color-signal)] hover:border-[color:var(--color-signal)] hover:text-[color:var(--color-void)]"
          >
            See our rovers
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/join"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)] px-6 py-3 text-sm font-medium text-[color:var(--color-paper)] transition-colors hover:border-[color:var(--color-paper)]"
          >
            Join the team
          </Link>
        </div>
      </div>
    </section>
  );
}
