"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";

export function Footer() {
  const {
    content: { profile, images, projects, heroCarousel, ui },
  } = useLanguage();
  const displayedImages = [
    ...heroCarousel,
    images.portrait,
    ...projects.flatMap((project) =>
      project.modalImage
        ? [project.image, project.modalImage]
        : [project.image],
    ),
  ];
  const credits = Array.from(
    new Map(
      displayedImages
        .filter((image) => /^https?:\/\//.test(image.source))
        .map((image) => [image.source, image]),
    ).values(),
  );

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
        {credits.length > 0 && (
          <details className="photo-credits">
            <summary>{ui.photoCredits}</summary>
            <div>
              {credits.map((image) => (
                <a
                  key={image.source}
                  href={image.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {image.credit}
                  <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </details>
        )}
      </div>
    </footer>
  );
}
