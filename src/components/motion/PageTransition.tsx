"use client";

import { animate } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { profile } from "@/data/profile";

const PageReadyContext = createContext(true);
const ease = [0.25, 1, 0.5, 1] as const;

export function usePageReady() {
  return useContext(PageReadyContext);
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stopAnimations = useRef<Array<() => void>>([]);
  const overflowRef = useRef<string | null>(null);
  const navigatingRef = useRef(false);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function unlockContent() {
    if (contentRef.current) contentRef.current.inert = false;
    if (overflowRef.current !== null) {
      document.body.style.overflow = overflowRef.current;
      overflowRef.current = null;
    }
  }

  function lockContent() {
    if (contentRef.current) contentRef.current.inert = true;
    if (overflowRef.current === null) {
      overflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
  }

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const line = lineRef.current;
    if (!overlay || !line) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const controller = new AbortController();
    const { signal } = controller;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

    function finish() {
      if (!overlay) return;
      overlay.hidden = true;
      unlockContent();
      navigatingRef.current = false;
      setReady(true);
    }

    function stop() {
      stopAnimations.current.splice(0).forEach((cancel) => cancel());
    }

    const onPreferenceChange = () => {
      if (!preference.matches) return;
      controller.abort();
      stop();
      finish();
    };

    if (preference.matches) {
      finish();
      return;
    }

    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    navigatingRef.current = false;
    setReady(false);
    lockContent();
    overlay.hidden = false;
    overlay.style.opacity = "1";
    line.style.transform = "scaleX(0)";
    preference.addEventListener("change", onPreferenceChange);

    async function enter() {
      if (!overlay || !line) return;
      const progress = animate(
        line,
        { scaleX: [0, 1] },
        { duration: 0.85, ease },
      );
      stopAnimations.current.push(() => progress.stop());
      const heroImage = document.querySelector<HTMLImageElement>(
        ".hero-photograph img",
      );
      const assets = Promise.allSettled([
        document.fonts.ready,
        heroImage?.decode() ?? Promise.resolve(),
      ]);
      const timeout = new Promise<void>((resolve) => {
        fallbackTimer = setTimeout(resolve, 1800);
      });
      await Promise.all([progress, Promise.race([assets, timeout])]);
      if (signal.aborted) return;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      const fade = animate(overlay, { opacity: 0 }, { duration: 0.45, ease });
      stopAnimations.current.push(() => fade.stop());
      await fade;
      if (!signal.aborted) finish();
    }

    void enter().catch(() => {
      if (!signal.aborted) finish();
    });

    return () => {
      controller.abort();
      stop();
      if (fallbackTimer) clearTimeout(fallbackTimer);
      preference.removeEventListener("change", onPreferenceChange);
      overlay.hidden = true;
      unlockContent();
    };
  }, [pathname]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      if (overlayRef.current) overlayRef.current.hidden = true;
      unlockContent();
      navigatingRef.current = false;
      setReady(true);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
    };
  }, []);

  function onNavigate(event: MouseEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const link =
      event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;
    if (
      !link ||
      link.hasAttribute("download") ||
      (link.target && link.target !== "_self") ||
      link.dataset.transition === "none"
    )
      return;
    const url = new URL(link.href, window.location.href);
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.origin !== window.location.origin ||
      url.pathname === window.location.pathname
    )
      return;
    const overlay = overlayRef.current;
    const line = lineRef.current;
    if (!overlay || !line) return;
    event.preventDefault();
    if (navigatingRef.current || !ready) return;
    navigatingRef.current = true;
    lockContent();
    overlay.hidden = false;
    line.style.transform = "scaleX(0)";
    const cover = animate(
      overlay,
      { opacity: [0, 1] },
      { duration: 0.25, ease },
    );
    stopAnimations.current.push(() => cover.stop());
    navigationTimer.current = setTimeout(() => {
      stopAnimations.current.splice(0).forEach((cancel) => cancel());
      overlay.hidden = true;
      unlockContent();
      navigatingRef.current = false;
      setReady(true);
    }, 5000);
    void Promise.resolve(cover).then(() => {
      if (!navigatingRef.current) return;
      const progress = animate(line, { scaleX: 1 }, { duration: 0.6, ease });
      stopAnimations.current.push(() => progress.stop());
      router.push(`${url.pathname}${url.search}${url.hash}`);
    });
  }

  return (
    <PageReadyContext.Provider value={ready}>
      <div
        ref={contentRef}
        className="page-content"
        onClickCapture={onNavigate}
      >
        {children}
      </div>
      <div
        ref={overlayRef}
        className="page-transition"
        aria-hidden="true"
        hidden
      >
        <div className="page-transition-content">
          <span className="page-transition-monogram">{profile.initials}</span>
          <span className="page-transition-name">{profile.shortName}</span>
          <span className="page-transition-track">
            <span ref={lineRef} />
          </span>
        </div>
      </div>
    </PageReadyContext.Provider>
  );
}
