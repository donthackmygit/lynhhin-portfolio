"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import { contentByLocale, type Locale } from "@/data/content";

const storageKey = "lynhhin-language";
const languageEvent = "lynhhin-language-change";
let sessionLocale: Locale | null = null;

function getLocale(): Locale {
  if (sessionLocale) return sessionLocale;
  try {
    return window.localStorage.getItem(storageKey) === "en" ? "en" : "vi";
  } catch {
    return "vi";
  }
}

function getServerLocale(): Locale {
  return "vi";
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) {
      sessionLocale = null;
      onChange();
    }
  };
  window.addEventListener(languageEvent, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(languageEvent, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function setLocale(locale: Locale) {
  sessionLocale = locale;
  try {
    window.localStorage.setItem(storageKey, locale);
  } catch {
    // Keep switching available when browser storage is disabled.
  }
  window.dispatchEvent(new Event(languageEvent));
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: (typeof contentByLocale)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getLocale, getServerLocale);
  const content = contentByLocale[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `${content.profile.name} (Lynhhin) | Travel & Culture`;
    const metaValues: Record<string, string> = {
      'meta[name="description"]': content.ui.siteDescription,
      'meta[property="og:title"]': document.title,
      'meta[property="og:description"]': content.profile.hero.quote,
      'meta[property="og:locale"]': locale === "en" ? "en_US" : "vi_VN",
      'meta[property="og:image:alt"]': content.images.hero.alt,
    };
    for (const [selector, value] of Object.entries(metaValues)) {
      document
        .querySelector<HTMLMetaElement>(selector)
        ?.setAttribute("content", value);
    }

    let disposed = false;
    const frame = window.requestAnimationFrame(() => {
      void import("gsap/ScrollTrigger")
        .then(({ ScrollTrigger }) => {
          if (!disposed) ScrollTrigger.refresh();
        })
        .catch(() => {
          // Translated content remains available without the animation bundle.
        });
      window.dispatchEvent(new Event("resize"));
    });
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
    };
  }, [locale, content]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, content }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage requires LanguageProvider");
  return context;
}

export function SkipLink() {
  const { content } = useLanguage();
  return (
    <a className="skip-link" href="#noi-dung">
      {content.ui.skipToContent}
    </a>
  );
}
