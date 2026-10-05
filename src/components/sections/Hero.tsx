"use client";

import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { gsap } from "gsap";
import { useLanguage } from "@/components/language/LanguageProvider";
import { usePageReady } from "@/components/motion/PageTransition";
import { JournalPhoto } from "@/components/ui/JournalPhoto";
import { useScrollStory } from "@/hooks/useScrollStory";

const CAROUSEL_INTERVAL = 6000;

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
    content: { profile, heroCarousel, ui },
  } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [inView, setInView] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const pageReady = usePageReady();
  const rotating = !reduceMotion && inView && documentVisible && pageReady;
  const slideCount = heroCarousel.length;
  useScrollStory(ref, heroAnimation);

  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(
      ([entry]) =>
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.1),
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!rotating || slideCount < 2) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideCount);
    }, CAROUSEL_INTERVAL);
    return () => window.clearInterval(timer);
  }, [activeSlide, rotating, slideCount]);

  const moveSlide = (direction: number) => {
    setActiveSlide(
      (current) => (current + direction + slideCount) % slideCount,
    );
  };

  return (
    <section
      ref={ref}
      id="trang-chu"
      className="hero"
      aria-labelledby="hero-title"
    >
      <div className="hero-scene">
        <div
          id="hero-carousel-images"
          className="hero-photograph"
          role="group"
          aria-roledescription={ui.carousel}
          aria-label={ui.hanoiCarousel}
        >
          {heroCarousel.map((image, index) => (
            <div
              key={image.src}
              className="hero-slide"
              data-active={index === activeSlide}
              aria-hidden={index !== activeSlide}
              role="group"
              aria-label={`${ui.slide} ${index + 1} / ${slideCount}`}
            >
              <JournalPhoto
                image={image}
                className="hero-slide-photo"
                sizes="100vw"
                priority={index === 0}
                quality={85}
              />
            </div>
          ))}
        </div>
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
          <p className="hero-quote hero-support">{profile.hero.quote}</p>
          <div className="hero-actions hero-support">
            <a className="button button-white" href="#hanh-trinh">
              {profile.hero.primaryCta}
              <ArrowDownRight size={19} />
            </a>
            <a className="hero-cv" href="#lien-he">
              {profile.hero.secondaryCta}
              <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="hero-carousel-controls hero-support">
            <span
              className="hero-carousel-count"
              aria-live={rotating ? "off" : "polite"}
              aria-atomic="true"
            >
              <span className="sr-only">{ui.slide} </span>
              {String(activeSlide + 1).padStart(2, "0")}
              <span aria-hidden="true"> / </span>
              <span className="sr-only"> / </span>
              {String(slideCount).padStart(2, "0")}
            </span>
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
        <div
          className="hero-carousel-navigation"
          role="group"
          aria-label={ui.hanoiCarousel}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              moveSlide(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          <button
            type="button"
            className="hero-carousel-button hero-carousel-previous"
            onClick={() => moveSlide(-1)}
            aria-label={ui.previousImage}
            title={ui.previousImage}
            aria-controls="hero-carousel-images"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="hero-carousel-button hero-carousel-next"
            onClick={() => moveSlide(1)}
            aria-label={ui.nextImage}
            title={ui.nextImage}
            aria-controls="hero-carousel-images"
          >
            <ChevronRight size={20} />
          </button>
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
