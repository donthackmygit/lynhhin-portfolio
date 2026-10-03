"use client";

import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { navigation, profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";

export function Navbar() {
  const { activeSection, scrolled } = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    const inertElements = [main, footer].filter(
      (element): element is HTMLElement => element instanceof HTMLElement,
    );
    const previousInert = inertElements.map((element) => element.inert);
    inertElements.forEach((element) => {
      element.inert = true;
    });
    menuRef.current
      ?.querySelector<HTMLAnchorElement>("a")
      ?.focus({ preventScroll: true });

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key !== "Tab") return;
      const links = Array.from(
        menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
      );
      const last = links[links.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        toggleRef.current?.focus();
      }
      if (event.shiftKey && document.activeElement === toggleRef.current) {
        event.preventDefault();
        last?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1100px)");
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      inertElements.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      document.removeEventListener("keydown", handleKey);
      desktop.removeEventListener("change", onDesktop);
      toggleRef.current?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-container">
        <a
          href="#trang-chu"
          className="brand"
          aria-label={`${profile.name} - Trang chủ`}
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-monogram">{profile.initials}</span>
          <span className="brand-name">
            {profile.shortName}
            <span>TRAVEL JOURNAL</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Điều hướng chính">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? "location" : undefined}
              className={activeSection === item.id ? "is-active" : ""}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={profile.cv ?? "#lien-he"}
          download={profile.cv ? true : undefined}
          className="nav-cv"
          aria-label={profile.cv ? "Tải CV" : "Liên hệ Lynhin"}
          title={profile.cv ? "Tải CV" : "Liên hệ Lynhin"}
        >
          {profile.cv ? <Download size={15} /> : <ArrowUpRight size={18} />}
          <span>{profile.cv ? "Tải CV" : "Liên hệ"}</span>
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="icon-button menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          title={menuOpen ? "Đóng menu" : "Mở menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            className="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            <p className="eyebrow">
              MỘT HÀNH TRÌNH CÙNG {profile.shortName.toUpperCase()}
            </p>
            <nav aria-label="Điều hướng di động">
              {navigation.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={activeSection === item.id ? "is-active" : ""}
                  aria-current={
                    activeSection === item.id ? "location" : undefined
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mobile-nav-number">0{index + 1}</span>
                  <span>{item.label}</span>
                  <ArrowUpRight size={23} />
                </a>
              ))}
            </nav>
            <a
              href={profile.cv ?? "#lien-he"}
              download={profile.cv ? true : undefined}
              className="button button-primary"
              onClick={() => setMenuOpen(false)}
            >
              {profile.cv ? <Download size={17} /> : <ArrowUpRight size={19} />}
              {profile.cv ? "Tải CV" : "Kết nối với tôi"}
            </a>
            <p className="mobile-menu-location">{profile.location}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
