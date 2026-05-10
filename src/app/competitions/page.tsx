import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Reveal, RevealStagger } from "@/components/motion/reveal";
import { MonoLabel } from "@/components/motion/mono-label";

export const metadata: Metadata = {
  title: "Competitions",
  description:
    "MaRS at IRC, ISDC, IRoC-U, and SHAASTRA — international rankings, awards, and the journey behind them.",
};

const events = [
  {
    code: "IRC 2026",
    name: "International Rover Challenge",
    org: "Space Robotics Society",
    venue: "Manipal Institute of Technology, Udupi",
    dates: "28 Jan – 2 Feb 2026",
    rank: "10th internationally",
  },
  {
    code: "ISDC 2026",
    name: "International Space Drone Challenge",
    org: "Space Robotics Society",
    venue: "MIT, Udupi",
    dates: "28 Jan – 2 Feb 2026",
    rank: "9th internationally",
  },
  {
    code: "SHAASTRA 2026",
    name: "Caterpillar Autonomy Challenge",
    org: "IIT Madras",
    venue: "IIT Madras, Chennai",
    dates: "Jan 2026",
    rank: "Design Innovation Award",
  },
  {
    code: "IRoC-U 2024",
    name: "ISRO Robotics Challenge — University",
    org: "ISRO / U R Rao Satellite Centre",
    venue: "URSC Bengaluru",
    dates: "Aug 2024",
    rank: "National finalists",
  },
];

export default function CompetitionsPage() {
  return (
    <>
      <PageHero
        index={2}
        eyebrow="Competitions"
        title={
          <>
            Where the rover{" "}
            <span className="font-serif italic text-[color:var(--color-mars)]">earns</span>{" "}
            its name.
          </>
        }
        lead="Designs survive in lab. Rankings are earned in the dust. Here's where MaRS has competed and what we brought home."
      />

      <section className="container-page pb-32">
        <RevealStagger className="grid gap-px bg-[color:var(--color-line)]/40 border border-[color:var(--color-line)]/40">
          {events.map((e) => (
            <Reveal
              key={e.code}
              className="bg-[color:var(--color-void)] p-6 md:p-8 hover:bg-[color:var(--color-surface)] transition-colors grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 md:items-baseline"
            >
              <p className="md:col-span-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-mars)]">
                {e.code}
              </p>
              <div className="md:col-span-5">
                <h3 className="font-sans text-xl md:text-2xl font-medium tracking-tight text-[color:var(--color-paper)]">
                  {e.name}
                </h3>
                <p className="mt-1 text-sm text-[color:var(--color-muted)]">
                  {e.org}
                </p>
              </div>
              <div className="md:col-span-3 text-sm text-[color:var(--color-muted)]">
                <p>{e.venue}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-faint)]">
                  {e.dates}
                </p>
              </div>
              <p className="md:col-span-2 md:text-right text-sm font-medium text-[color:var(--color-paper)]">
                {e.rank}
              </p>
            </Reveal>
          ))}
        </RevealStagger>
      </section>
    </>
  );
}
