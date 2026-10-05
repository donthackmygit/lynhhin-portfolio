"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language/LanguageProvider";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { useActiveSection } from "@/hooks/useActiveSection";

export function Navbar() {
  const {
    content: { navigation, profile, ui },
  } = useLanguage();
  const { activeSection, scrolled } = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const navItems = navigation.filter((item) => item.id !== "lien-he");

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
      const controls = Array.from(
        headerRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
      if (event.shiftKey && document.activeElement === first) {
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
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? "is-scrolled" : ""}`}
    >
      <div className="nav-container">
        <a
          href="#trang-chu"
          className="brand"
          aria-label={`${profile.name} - ${navigation[0].label}`}
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-monogram">{profile.initials}</span>
          <span className="brand-name">
            {profile.shortName}
            <span>{ui.travelJournal}</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label={ui.mainNavigation}>
          {navItems.map((item) => (
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
        <div className="nav-actions">
          <LanguageSwitcher />
          <a
            href="#lien-he"
            className="nav-contact"
            aria-label={ui.contactName}
            title={ui.contactName}
            aria-current={activeSection === "lien-he" ? "location" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <ArrowUpRight size={18} />
            <span>{ui.contact}</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="icon-button menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
            title={menuOpen ? ui.closeMenu : ui.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
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
              {ui.journeyWith} {profile.shortName.toUpperCase()}
            </p>
            <nav aria-label={ui.mobileNavigation}>
              {navItems.map((item, index) => (
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
              href="#lien-he"
              className="button button-primary"
              onClick={() => setMenuOpen(false)}
            >
              <ArrowUpRight size={19} />
              {ui.contact}
            </a>
            <p className="mobile-menu-location">{profile.location}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
