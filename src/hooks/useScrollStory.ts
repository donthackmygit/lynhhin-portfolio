"use client";

import { useEffect, type RefObject } from "react";
import type { gsap } from "gsap";
import { usePageReady } from "@/components/motion/PageTransition";

type StorySetup = (
  root: HTMLElement,
  animation: typeof gsap,
  desktop: boolean,
) => void;

export function useScrollStory(
  ref: RefObject<HTMLElement | null>,
  setup: StorySetup,
) {
  const ready = usePageReady();
  useEffect(() => {
    if (!ready) return;
    let disposed = false;
    let media: ReturnType<typeof gsap.matchMedia> | undefined;
    let frame = 0;

    async function start() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const [{ gsap: animation }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed || !ref.current) return;
      animation.registerPlugin(ScrollTrigger);
      media = animation.matchMedia();
      media.add(
        {
          enabled: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px)",
        },
        (context) => {
          if (!context.conditions?.enabled || !ref.current) return;
          setup(ref.current, animation, Boolean(context.conditions.desktop));
        },
        ref.current,
      );
      frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    }

    void start().catch(() => {
      /* Content remains visible if the animation bundle cannot load. */
    });
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      media?.revert();
    };
  }, [ref, setup, ready]);
}
