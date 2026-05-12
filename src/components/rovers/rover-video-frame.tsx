"use client";

import { useEffect, useRef } from "react";

import type { RoverVideo } from "@/lib/data";

// ──────────────────────────────────────────────────────────────────────────
// RoverVideoFrame.
//
// Renders a looping, muted, autoplay clip inside the same posterized frame
// as the still-photo variant. Two non-obvious bits, both driven by data:
//   - `startSeconds` — seek on load AND re-seek every time the clip loops,
//     so the intro frames stay clipped on every pass.
//   - `playbackRate` — set imperatively after metadata loads, since the
//     `playbackRate` HTML attribute does not exist (it's a property only).
// ──────────────────────────────────────────────────────────────────────────
export function RoverVideoFrame({
  video,
  aspectClass,
}: {
  video: RoverVideo;
  aspectClass: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const start = video.startSeconds ?? 0;
    const rate = video.playbackRate ?? 1;

    const applyRate = () => {
      el.playbackRate = rate;
    };
    const seekToStart = () => {
      if (Number.isFinite(start) && Math.abs(el.currentTime - start) > 0.05) {
        try {
          el.currentTime = start;
        } catch {
          // currentTime can throw if metadata isn't ready yet — onLoadedMetadata
          // covers that case below.
        }
      }
    };

    // Loop back to startSeconds: the native `loop` attribute restarts at 0,
    // so we listen for "ended" and rewind manually instead.
    const handleEnded = () => {
      seekToStart();
      void el.play().catch(() => {});
    };

    const handleLoadedMetadata = () => {
      seekToStart();
      applyRate();
    };

    // First-mount: if metadata is already available (cached navigation), apply
    // immediately; otherwise wait for the event.
    if (el.readyState >= 1) {
      handleLoadedMetadata();
    }

    el.addEventListener("loadedmetadata", handleLoadedMetadata);
    el.addEventListener("ended", handleEnded);
    el.addEventListener("ratechange", applyRate);

    return () => {
      el.removeEventListener("loadedmetadata", handleLoadedMetadata);
      el.removeEventListener("ended", handleEnded);
      el.removeEventListener("ratechange", applyRate);
    };
  }, [video.startSeconds, video.playbackRate]);

  return (
    <figure className="group/frame">
      <div
        className={[
          "relative overflow-hidden bg-[color:var(--color-void)] border border-[color:var(--color-line)]/50",
          aspectClass,
        ].join(" ")}
      >
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          autoPlay
          muted
          playsInline
          preload="metadata"
          // We don't set `loop` so the "ended" listener can seek to startSeconds
          // on each pass instead of bouncing to 0.
          aria-label={video.caption ?? "MaRS rover clip"}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/frame:scale-[1.03]"
        />
        {/* Mars-red wash on hover — same tie-in as the photo frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-700 mix-blend-soft-light"
          style={{
            background:
              "linear-gradient(140deg, color-mix(in oklab, var(--color-mars) 28%, transparent) 0%, transparent 55%)",
          }}
        />
        {/* Bottom fade for caption legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to top, color-mix(in oklab, var(--color-void) 70%, transparent) 0%, transparent 100%)",
          }}
        />
      </div>
      {video.caption && (
        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-faint)] leading-snug">
          {video.caption}
        </figcaption>
      )}
    </figure>
  );
}
