"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const TRAIL_LEN = 14;
const IDLE_TIMEOUT_MS = 220; // pause RAF after this long without movement

export function CursorTrail() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const points: { x: number; y: number }[] = [];
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let lastMoveAt = 0;
    let raf = 0;
    let running = false;

    const tick = () => {
      points.push({ x: mx, y: my });
      while (points.length > TRAIL_LEN) points.shift();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < points.length; i++) {
        const p = points[i - 1];
        const q = points[i];
        const t = i / points.length;
        ctx.strokeStyle = `rgba(220, 38, 38, ${0.04 + t * 0.08})`;
        ctx.lineWidth = 1 + t * 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }

      // Idle: tail collapsed AND no recent move → pause until next move
      const idle = performance.now() - lastMoveAt > IDLE_TIMEOUT_MS;
      if (idle && points.length > 1 && points.every((p) => p.x === mx && p.y === my)) {
        // Final clear so no stale trail lingers
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        running = false;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      lastMoveAt = performance.now();
      start();
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen"
    />
  );
}
