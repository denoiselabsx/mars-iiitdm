export function CoordinateStamp() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-3 left-3 z-30 hidden md:block font-mono text-[9px] uppercase tracking-[0.16em] text-[color:var(--color-faint)]/70 mix-blend-screen"
    >
      <span className="text-[color:var(--color-mars)]/70">◉</span>{" "}
      12.8221° N · 80.0436° E · IIITDM Kancheepuram
    </div>
  );
}
