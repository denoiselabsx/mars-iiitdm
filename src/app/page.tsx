import { ScrollHero } from "@/components/hero/scroll-hero";
import { TheBoard } from "@/components/home/the-board";
import { SpecSheet } from "@/components/home/spec-sheet";
import { Closer } from "@/components/home/closer";

export default function Home() {
  return (
    <>
      {/* Preload hero GLB so download starts in parallel with JS chunks */}
      <link rel="preload" as="fetch" href="/models/rover.glb" crossOrigin="anonymous" />
      {/* DRACO decoder lives on gstatic — open connection early so it's warm by GLB-decode time */}
      <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />

      <ScrollHero />
      <TheBoard />
      <SpecSheet />
      <Closer />
    </>
  );
}
