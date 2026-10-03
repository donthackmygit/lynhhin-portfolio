"use client";

import { useEffect, useState } from "react";
import { navigation } from "@/data/profile";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("trang-chu");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section[id]"),
    );
    const available = new Set(navigation.map((item) => item.id));

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
      let current = "trang-chu";
      for (const section of sections) {
        if (
          section.getBoundingClientRect().top <= 160 &&
          available.has(section.id)
        )
          current = section.id;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40
      )
        current = "lien-he";
      setActiveSection(current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return { activeSection, scrolled };
}
