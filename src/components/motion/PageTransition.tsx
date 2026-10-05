"use client";

import { animate } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { profile } from "@/data/profile";
import { TravelIntro } from "@/components/intro/TravelIntro";
import { hasSeenIntro, markIntroSeen } from "@/components/intro/intro-session";

const PageReadyContext = createContext(true);
const ease = [0.25, 1, 0.5, 1] as const;

export function usePageReady() {
  return useContext(PageReadyContext);
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [readyPath, setReadyPath] = useState<string | null>(null);
  const ready = readyPath === pathname;
  const [introVisible, setIntroVisible] = useState(pathname === "/");
  const introFinishedRef = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stopAnimations = useRef<Array<() => void>>([]);
  const overflowRef = useRef<string | null>(null);
  const gutterRef = useRef<string | null>(null);
  const skipLinkRef = useRef<{ element: HTMLElement; inert: boolean } | null>(
    null,
  );
  const navigatingRef = useRef(false);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const unlockContent = useCallback(() => {
    if (contentRef.current) contentRef.current.inert = false;
    if (overflowRef.current !== null) {
      document.body.style.overflow = overflowRef.current;
      overflowRef.current = null;
    }
    if (gutterRef.current !== null) {
      document.documentElement.style.scrollbarGutter = gutterRef.current;
      gutterRef.current = null;
    }
    if (skipLinkRef.current) {
      skipLinkRef.current.element.inert = skipLinkRef.current.inert;
      skipLinkRef.current = null;
    }
  }, []);

  const lockContent = useCallback(() => {
    if (contentRef.current) contentRef.current.inert = true;
    if (gutterRef.current === null) {
      gutterRef.current = document.documentElement.style.scrollbarGutter;
      document.documentElement.style.scrollbarGutter = "stable";
    }
    if (!skipLinkRef.current) {
      const element = document.querySelector<HTMLElement>(".skip-link");
      if (element) {
        skipLinkRef.current = { element, inert: element.inert };
        element.inert = true;
      }
    }
    if (overflowRef.current === null) {
      overflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
  }, []);

  const revealIntro = useCallback(() => setReadyPath(pathname), [pathname]);
  const completeIntro = useCallback(() => {
    const focusWasInIntro = document.activeElement?.closest(".travel-intro");
    introFinishedRef.current = true;
    setIntroVisible(false);
    unlockContent();
    setReadyPath(pathname);
    if (focusWasInIntro) {
      document.getElementById("noi-dung")?.focus({ preventScroll: true });
    }
  }, [pathname, unlockContent]);

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
      setReadyPath(pathname);
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

    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    navigationTimer.current = null;
    navigatingRef.current = false;

    // The homepage uses the travel intro instead of stacking two entry screens.
    // Keep the existing transition for navigation to other pages.
    if (pathname === "/") {
      overlay.hidden = true;
      if (preference.matches || hasSeenIntro() || introFinishedRef.current) {
        document.getElementById("travel-intro-first-paint")?.remove();
        setIntroVisible(false);
        finish();
      } else {
        setIntroVisible(true);
        lockContent();
      }
      return () => {
        controller.abort();
        stop();
        if (navigationTimer.current) clearTimeout(navigationTimer.current);
        unlockContent();
      };
    }

    if (preference.matches) {
      finish();
      return;
    }

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
  }, [pathname, lockContent, unlockContent]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      if (overlayRef.current) overlayRef.current.hidden = true;
      if (introVisible) markIntroSeen();
      introFinishedRef.current = true;
      setIntroVisible(false);
      unlockContent();
      navigatingRef.current = false;
      setReadyPath(pathname);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
    };
  }, [introVisible, pathname, unlockContent]);

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
    setReadyPath(null);
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
      setReadyPath(pathname);
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
      {introVisible && pathname === "/" && (
        <TravelIntro onReveal={revealIntro} onComplete={completeIntro} />
      )}
    </PageReadyContext.Provider>
  );
}
