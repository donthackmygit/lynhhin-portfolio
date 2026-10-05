"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";

export function Footer() {
  const {
    content: { profile, ui },
  } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <a href="#trang-chu" className="footer-brand">
            {profile.shortName}
            <span>.</span>
          </a>
          <p>{profile.footer.tagline}</p>
          <a href="#trang-chu" className="text-link">
            {ui.backToTop}
            <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>{profile.footer.note}</span>
        </div>
      </div>
    </footer>
  );
}
