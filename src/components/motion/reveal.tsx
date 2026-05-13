"use client";

import { motion, type Variants, useReducedMotion as motionUseReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "header" | "li" | "p" | "span";
  once?: boolean;
  id?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
  once = true,
  id,
}: Props) {
  const MotionTag = motion[as];
  const reduced = motionUseReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Reduced-motion users: skip the reveal entirely. Content is visible from initial render —
  // avoids any chance of keyboard-focus landing on a hidden element below the fold.
  if (reduced) {
    return <MotionTag id={id} className={cn(className)}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      id={id}
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealStagger({
  children,
  className,
  stagger = 0.06,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const MotionTag = motion[as];
  const reduced = motionUseReducedMotion();

  if (reduced) {
    return <MotionTag className={cn(className)}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}
