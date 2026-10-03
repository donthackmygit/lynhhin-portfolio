"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language/LanguageProvider";

export function ScrollToTop() {
  const {
    content: { ui },
  } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "80px 0px 0px 0px" },
    );
    const hero = document.getElementById("trang-chu");
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#trang-chu"
          className="scroll-top icon-button"
          title={ui.backToTop}
          aria-label={ui.backToTop}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUp size={19} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
