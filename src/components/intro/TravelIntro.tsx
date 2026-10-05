"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import type { gsap } from "gsap";
import { CloudTransition } from "./CloudTransition";
import { WorldMap } from "./WorldMap";
import { hasSeenIntro, markIntroSeen } from "./intro-session";
import "./intro.css";

type TravelIntroProps = {
  onReveal: () => void;
  onComplete: () => void;
};

const COVER_TIME = 3.5;
const END_TIME = 4.2;

export function TravelIntro({ onReveal, onComplete }: TravelIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const finishRef = useRef<(() => void) | null>(null);
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const bootstrap = document.getElementById("travel-intro-first-paint");
    startedAtRef.current ??=
      Number(bootstrap?.dataset.startedAt) || performance.now();
    const startedAt = startedAtRef.current;
    let disposed = false;
    let finished = false;
    let revealed = false;
    let media: ReturnType<typeof gsap.matchMedia> | undefined;
    let timeline: ReturnType<typeof gsap.timeline> | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

    function reveal() {
      if (disposed || finished || revealed) return;
      revealed = true;
      onReveal();
    }

    function finish() {
      if (disposed || finished) return;
      finished = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      timeline?.kill();
      media?.revert();
      if (root) root.hidden = true;
      document.getElementById("travel-intro-first-paint")?.remove();
      markIntroSeen();
      onComplete();
    }

    finishRef.current = finish;
    if (preference.matches || hasSeenIntro()) {
      finish();
      return () => {
        disposed = true;
        finishRef.current = null;
      };
    }

    root.style.display = "block";
    document.getElementById("travel-intro-first-paint")?.remove();
    // A failed chunk or stalled animation must never block the portfolio.
    fallbackTimer = setTimeout(
      finish,
      Math.max(0, 4600 - (performance.now() - startedAt)),
    );
    const onPreferenceChange = () => {
      if (preference.matches) finish();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      finish();
    };
    preference.addEventListener("change", onPreferenceChange);
    window.addEventListener("keydown", onKeyDown);

    async function start() {
      const [{ gsap: animation }, { MotionPathPlugin }] = await Promise.all([
        import("gsap"),
        import("gsap/MotionPathPlugin"),
      ]);
      if (disposed || finished || !root) return;
      animation.registerPlugin(MotionPathPlugin);
      media = animation.matchMedia(root);
      media.add(
        { desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" },
        (context) => {
          if (disposed || finished) return;
          const map = root?.querySelector<SVGSVGElement>(
            context.conditions?.desktop
              ? ".intro-map-desktop"
              : ".intro-map-mobile",
          );
          if (!root || !map) return;

          const scene = root.querySelector(".intro-scene");
          const title = root.querySelector(".intro-heading");
          const skip = root.querySelector(".intro-skip");
          const clouds = [
            {
              element: root.querySelector(".intro-cloud-left"),
              xPercent: -115,
              yPercent: 0,
            },
            {
              element: root.querySelector(".intro-cloud-right"),
              xPercent: 115,
              yPercent: 0,
            },
            {
              element: root.querySelector(".intro-cloud-top"),
              xPercent: 0,
              yPercent: -120,
            },
            {
              element: root.querySelector(".intro-cloud-bottom"),
              xPercent: 0,
              yPercent: 120,
            },
          ];

          animation.set(root, { backgroundColor: "#ffffff" });
          animation.set(scene, { autoAlpha: 1 });
          animation.set(map, { opacity: 0, y: 12 });
          animation.set(title, { opacity: 0, y: 12 });
          animation.set(map.querySelectorAll(".intro-plane, .intro-origin"), {
            opacity: 0,
          });
          animation.set(map.querySelector(".intro-target-marker"), {
            scale: 0,
            transformOrigin: "50% 50%",
          });
          animation.set(map.querySelector(".intro-target-label"), {
            opacity: 0,
            y: 4,
          });
          animation.set(map.querySelectorAll(".intro-target-pulse"), {
            opacity: 0,
            scale: 1,
            transformOrigin: "50% 50%",
          });
          animation.set(root.querySelector(".intro-cloud-cover"), {
            opacity: 0,
          });
          for (const cloud of clouds) {
            animation.set(cloud.element, {
              xPercent: cloud.xPercent,
              yPercent: cloud.yPercent,
              opacity: 1,
            });
          }

          timeline = animation.timeline({
            defaults: { ease: "power2.inOut" },
            onComplete: finish,
          });
          timeline
            .to(map, { opacity: 1, y: 0, duration: 0.45 }, 0.1)
            .to(title, { opacity: 1, y: 0, duration: 0.4 }, 0.25)
            .to(
              map.querySelectorAll(".intro-origin"),
              { opacity: 1, duration: 0.3 },
              0.45,
            );

          map
            .querySelectorAll<SVGPathElement>("[data-flight-path]")
            .forEach((path, index) => {
              const plane = map.querySelector<SVGGElement>(
                `[data-flight-plane="${path.dataset.flightPath}"]`,
              );
              if (!plane) return;
              const departure = 0.5 + index * 0.08;
              const duration = 2.12;
              const firstPoint = path.getPointAtLength(0);
              const nextPoint = path.getPointAtLength(1);
              const rotation =
                (Math.atan2(
                  nextPoint.y - firstPoint.y,
                  nextPoint.x - firstPoint.x,
                ) *
                  180) /
                Math.PI;

              animation.set(path, { strokeDashoffset: 1 });
              animation.set(plane, {
                x: firstPoint.x,
                y: firstPoint.y,
                rotation,
                svgOrigin: "0 0",
              });
              timeline!
                .to(plane, { opacity: 1, duration: 0.12 }, departure)
                .to(
                  plane,
                  {
                    motionPath: {
                      path: path.getAttribute("d")!,
                      autoRotate: true,
                    },
                    duration,
                  },
                  departure,
                )
                .to(path, { strokeDashoffset: 0, duration }, departure)
                .to(
                  plane,
                  { opacity: 0, duration: 0.13 },
                  departure + duration - 0.08,
                );
            });

          timeline
            .to(
              map.querySelector(".intro-target-marker"),
              { scale: 1, duration: 0.3, ease: "power2.out" },
              2.45,
            )
            .to(
              map.querySelector(".intro-target-label"),
              { opacity: 1, y: 0, duration: 0.3 },
              2.55,
            )
            .fromTo(
              map.querySelector(".intro-target-pulse"),
              { scale: 1, opacity: 0.45 },
              {
                scale: 2.5,
                opacity: 0,
                duration: 0.55,
                ease: "power1.out",
                immediateRender: false,
              },
              2.6,
            )
            .fromTo(
              map.querySelector(".intro-target-pulse-second"),
              { scale: 1, opacity: 0.3 },
              {
                scale: 2.1,
                opacity: 0,
                duration: 0.45,
                ease: "power1.out",
                immediateRender: false,
              },
              2.85,
            )
            .to(title, { opacity: 0, y: -8, duration: 0.3 }, 2.85);

          for (const cloud of clouds) {
            timeline.to(
              cloud.element,
              { xPercent: 0, yPercent: 0, duration: 0.6 },
              2.9,
            );
          }

          // Switch the scene only once every edge is covered by white clouds.
          timeline
            .set(
              root.querySelector(".intro-cloud-cover"),
              { opacity: 1 },
              COVER_TIME,
            )
            .set(scene, { autoAlpha: 0 }, COVER_TIME)
            .set(root, { backgroundColor: "transparent" }, COVER_TIME)
            .call(reveal, [], COVER_TIME)
            .to(
              root.querySelector(".intro-cloud-cover"),
              { opacity: 0, duration: 0.45 },
              COVER_TIME + 0.04,
            )
            .to(skip, { opacity: 0, duration: 0.25 }, COVER_TIME);

          for (const cloud of clouds) {
            timeline.to(
              cloud.element,
              {
                xPercent: cloud.xPercent * 0.65,
                yPercent: cloud.yPercent * 0.65,
                opacity: 0,
                duration: END_TIME - COVER_TIME,
                ease: "power2.out",
              },
              COVER_TIME,
            );
          }

          // Keep the same deadline if the viewport changes during the intro.
          timeline.totalTime(
            Math.min((performance.now() - startedAt) / 1000, END_TIME),
            false,
          );
          return () => {
            timeline?.kill();
          };
        },
      );
    }

    void start().catch(finish);
    return () => {
      disposed = true;
      finishRef.current = null;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      timeline?.kill();
      media?.revert();
      preference.removeEventListener("change", onPreferenceChange);
      window.removeEventListener("keydown", onKeyDown);
      document.getElementById("travel-intro-first-paint")?.remove();
    };
  }, [onComplete, onReveal]);

  return (
    <div
      ref={rootRef}
      className="travel-intro"
      role="region"
      aria-label="Travel introduction"
    >
      <div className="intro-scene" aria-hidden="true">
        <div className="intro-heading" lang="en">
          <p className="intro-eyebrow">
            <span />
            EXPLORE THE WORLD
            <span />
          </p>
          <p className="intro-title">Every journey leads somewhere.</p>
        </div>
        <div className="intro-atlas">
          <WorldMap />
          <WorldMap mobile />
        </div>
      </div>
      <CloudTransition />
      <button
        type="button"
        className="intro-skip"
        onClick={() => finishRef.current?.()}
        lang="en"
      >
        Skip intro <ArrowRight size={15} aria-hidden="true" />
      </button>
    </div>
  );
}
