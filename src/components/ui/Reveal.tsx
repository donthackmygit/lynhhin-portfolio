"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePageReady } from "@/components/motion/PageTransition";

const StaggerContext = createContext<boolean | null>(null);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const pageReady = usePageReady();
  const groupVisible = useContext(StaggerContext);
  const [hydrated, setHydrated] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const visible =
    !hydrated ||
    reduceMotion ||
    focused ||
    (pageReady && inView && (groupVisible ?? true));

  useEffect(() => setHydrated(true), []);

  return (
    <motion.div
      ref={ref}
      className={className}
      onFocusCapture={() => setFocused(true)}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        delay: reduceMotion ? 0 : delay,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className }: Omit<RevealProps, "delay">) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.01 });

  return (
    <StaggerContext.Provider value={inView}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </StaggerContext.Provider>
  );
}
