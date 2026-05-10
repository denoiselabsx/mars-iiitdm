"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type Props = {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
};

export function CountUp({ to, duration = 1.2, suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let started = false;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / (duration * 1000));
              const eased = 1 - Math.pow(1 - p, 4);
              setValue(Math.round(eased * to));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
