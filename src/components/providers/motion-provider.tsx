"use client";

import { MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      transition={{
        type: "tween",
        ease: [0.16, 1, 0.3, 1],
        duration: 0.6,
      }}
      reducedMotion="user"
    >
      {children}
    </MotionConfig>
  );
}
