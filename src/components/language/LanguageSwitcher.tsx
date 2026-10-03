"use client";

import { useLanguage } from "./LanguageProvider";

export function LanguageSwitcher() {
  const { locale, setLocale, content } = useLanguage();

  return (
    <div
      className="language-switcher"
      data-locale={locale}
      role="group"
      aria-label={content.ui.languageSelector}
    >
      <button
        type="button"
        lang="vi"
        aria-label="Tiếng Việt"
        title="Tiếng Việt"
        aria-pressed={locale === "vi"}
        onClick={() => setLocale("vi")}
      >
        VI
      </button>
      <button
        type="button"
        lang="en"
        aria-label="English"
        title="English"
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        EN
      </button>
    </div>
  );
}
