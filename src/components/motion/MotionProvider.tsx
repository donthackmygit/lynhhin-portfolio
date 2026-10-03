"use client";

import { MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
