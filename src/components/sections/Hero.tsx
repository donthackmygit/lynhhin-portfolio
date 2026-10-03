"use client";

import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Download,
  MapPin,
} from "lucide-react";
import { useRef } from "react";
import type { gsap } from "gsap";
import { useLanguage } from "@/components/language/LanguageProvider";
import { JournalPhoto } from "@/components/ui/JournalPhoto";
import { useScrollStory } from "@/hooks/useScrollStory";

function heroAnimation(root: HTMLElement, animation: typeof gsap) {
  const sequence = animation.timeline({ defaults: { ease: "power3.out" } });
  sequence
    .from(
      root.querySelector(".hero-photograph"),
      { clipPath: "inset(0 0 8% 0)", scale: 1.04, duration: 1.1 },
      0,
    )
    .from(
      root.querySelector(".hero-eyebrow"),
      { y: 14, opacity: 0, duration: 0.5 },
      0.15,
    )
    .from(
      root.querySelectorAll(".hero-title-line"),
      { y: 48, opacity: 0, duration: 0.85, stagger: 0.13 },
      0.25,
    )
    .from(
      root.querySelectorAll(".hero-support"),
      { y: 18, opacity: 0, duration: 0.65, stagger: 0.11 },
      0.6,
    )
    .from(
      root.querySelector(".hero-bottom-line"),
      { scaleX: 0, transformOrigin: "left", duration: 0.8 },
      0.8,
    );
}

export function Hero() {
  const {
    content: { profile, images, ui },
  } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  useScrollStory(ref, heroAnimation);

  return (
    <section
      ref={ref}
      id="trang-chu"
      className="hero"
      aria-labelledby="hero-title"
    >
      <div className="hero-scene">
        <JournalPhoto
          image={images.hero}
          className="hero-photograph"
          sizes="100vw"
          priority
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-eyebrow">
            <span className="small-line" />
            {profile.hero.eyebrow}
          </div>
          <p className="hero-greeting hero-support">{profile.hero.greeting}</p>
          <h1 id="hero-title">
            <span className="hero-title-line">{profile.hero.firstLine}</span>
            <span className="hero-title-line hero-name-italic">
              {profile.hero.secondLine}
            </span>
          </h1>
          <p className="hero-disciplines hero-support">
            {profile.disciplines.map((item, index) => (
              <span key={item}>
                {index > 0 && <i aria-hidden="true" />}
                {item}
              </span>
            ))}
          </p>
          <p className="hero-quote hero-support" lang="en">
            {profile.hero.quote}
          </p>
          <div className="hero-actions hero-support">
            <a className="button button-white" href="#hanh-trinh">
              {profile.hero.primaryCta}
              <ArrowDownRight size={19} />
            </a>
            <a
              className="hero-cv"
              href={profile.cv ?? "#lien-he"}
              download={profile.cv ? true : undefined}
            >
              {profile.cv && <Download size={16} />}
              {profile.cv ? ui.downloadCv : profile.hero.secondaryCta}
              <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="hero-location hero-support">
            <MapPin size={16} />
            <span>
              {profile.hero.imageLocation}
              <small>{profile.hero.imageCaption}</small>
            </span>
          </div>
          <a
            href="#ve-toi"
            className="hero-scroll"
            aria-label={ui.scrollToAbout}
            title={ui.about}
          >
            <ArrowDown size={20} />
          </a>
        </div>
        <div className="hero-bottom-line" aria-hidden="true" />
      </div>
      <div className="container hero-journal-strip">
        <p>{profile.hero.bottomNote}</p>
        <span className="availability">
          <span />
          {profile.availability}
        </span>
      </div>
    </section>
  );
}
