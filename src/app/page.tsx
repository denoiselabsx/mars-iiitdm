import { ScrollHero } from "@/components/hero/scroll-hero";
import { TheBoard } from "@/components/home/the-board";
import { Subsystems } from "@/components/home/subsystems";
import { TeamMarquee } from "@/components/home/team-marquee";
import { FieldStrip } from "@/components/home/field-strip";
import { Closer } from "@/components/home/closer";

export default function Home() {
  return (
    <>
      {/* Preload hero GLB so download starts in parallel with JS chunks */}
      <link rel="preload" as="fetch" href="/models/rover.glb" crossOrigin="anonymous" />

      <ScrollHero />
      <TheBoard />
      <Subsystems />
      <TeamMarquee />
      <FieldStrip />
      <Closer />
    </>
  );
}
