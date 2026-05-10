import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { MonoLabel } from "@/components/motion/mono-label";

export const metadata: Metadata = {
  title: "Rovers",
  description:
    "Every rover MaRS has built — from rocker-bogie suspensions to autonomous arms. Specs, subsystems, and competition history.",
};

export default function RoversPage() {
  return (
    <>
      <PageHero
        index={1}
        eyebrow="Rovers"
        title={
          <>
            Built from the chassis up,{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">in-house</span>.
          </>
        }
        lead="Every drivetrain, arm, and PCB on our rovers was designed and machined by students. This page documents what we've built — KUTTI, our SHAASTRA debut, and the rovers before it."
      />

      <section className="container-page py-20 md:py-28">
        <Reveal>
          <MonoLabel index={2}>Coming next</MonoLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[color:var(--color-muted)]">
            Detailed rover pages — specs, subsystems, photo galleries, and per-competition
            results — are being assembled with the MaRS team. Check back soon.
          </p>
        </Reveal>
      </section>
    </>
  );
}
