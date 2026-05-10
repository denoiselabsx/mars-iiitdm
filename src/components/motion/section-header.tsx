"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, className, align = "left" }: Props) {
  return (
    <div className={cn(align === "center" && "text-center mx-auto", className)}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: align === "center" ? 60 : 96 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "h-px bg-[color:var(--color-mars)] mb-6",
          align === "center" && "mx-auto",
        )}
      />
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-muted)]"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "mt-6 text-balance font-sans text-4xl md:text-6xl lg:text-7xl font-medium leading-[0.98] tracking-tight",
          align === "center" && "max-w-4xl mx-auto",
        )}
      >
        {title}
      </motion.h2>
    </div>
  );
}
