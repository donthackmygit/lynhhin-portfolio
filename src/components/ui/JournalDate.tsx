"use client";

import { useLanguage } from "@/components/language/LanguageProvider";
import type { CalendarMonth } from "@/data/types";

type JournalDateProps = {
  year: string;
  month?: CalendarMonth;
  showYear?: boolean;
  className?: string;
};

export function JournalDate({
  year,
  month,
  showYear = true,
  className,
}: JournalDateProps) {
  const { locale } = useLanguage();
  const dateTime =
    month === undefined ? year : `${year}-${String(month).padStart(2, "0")}`;
  const label =
    month === undefined
      ? year
      : new Intl.DateTimeFormat(locale, {
          month: "long",
          year: showYear ? "numeric" : undefined,
          timeZone: "UTC",
        }).format(new Date(Date.UTC(Number(year), month - 1, 1)));

  return (
    <time className={className} dateTime={dateTime}>
      {label}
    </time>
  );
}
