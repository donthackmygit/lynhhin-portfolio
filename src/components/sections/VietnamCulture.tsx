"use client";

import { ArrowRight, ArrowUpRight, MapPin, Quote } from "lucide-react";
import { useRef, useState } from "react";
import type { gsap } from "gsap";
import { cultureNotes } from "@/data/destinations";
import { sectionCopy } from "@/data/profile";
import type { CultureNote } from "@/data/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JournalPhoto } from "@/components/ui/JournalPhoto";
import { Dialog } from "@/components/ui/Dialog";
import { Reveal } from "@/components/ui/Reveal";
import { useScrollStory } from "@/hooks/useScrollStory";

function cultureAnimation(
  root: HTMLElement,
  animation: typeof gsap,
  desktop: boolean,
) {
  root.querySelectorAll<HTMLElement>(".destination").forEach((item, index) => {
    const photo = item.querySelector(".destination-photo");
    animation.from(photo, {
      clipPath: "inset(10% 0 0 0)",
      opacity: 0,
      duration: 0.8,
      delay: (index % 2) * 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: item, start: "top 85%", once: true },
    });
    animation.from(item.querySelector(".destination-copy"), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      delay: 0.1 + (index % 2) * 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: item, start: "top 82%", once: true },
    });
    if (desktop)
      animation.fromTo(
        item.querySelector(".destination-photo img"),
        { yPercent: -3, scale: 1.08 },
        {
          yPercent: 3,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
  });
}

export function VietnamCulture() {
  const ref = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<CultureNote | null>(null);
  const copy = sectionCopy.culture;
  useScrollStory(ref, cultureAnimation);

  return (
    <section
      ref={ref}
      id="goc-du-lich"
      className="section culture-section"
      aria-labelledby="culture-title"
    >
      <div className="culture-watermark" aria-hidden="true">
        VIỆT NAM
      </div>
      <div className="container">
        <SectionHeading
          number="04"
          eyebrow={copy.eyebrow}
          title={copy.title}
          italic={copy.italic}
          description={copy.description}
          id="culture-title"
        />
        <Reveal className="culture-lens">
          <p>{copy.introduction}</p>
        </Reveal>
        <div className="culture-intro-line">
          <span>{copy.noteLabel}</span>
          <span>03 GÓC NHÌN / NHỮNG CÂU CHUYỆN CÓ THỂ PHÁT TRIỂN</span>
        </div>
        <div className="destination-gallery">
          {cultureNotes.map((destination) => (
            <article
              className={`destination destination-${destination.id}`}
              key={destination.id}
            >
              <button
                type="button"
                className="destination-image-button"
                onClick={() => setSelected(destination)}
                aria-label={`Khám phá góc nhìn: ${destination.name}`}
              >
                <JournalPhoto
                  image={destination.image}
                  className="destination-photo"
                  sizes="(max-width: 767px) 100vw, 55vw"
                />
                <span className="destination-photo-label">
                  <MapPin size={14} />
                  {destination.name}
                </span>
                <span className="destination-photo-arrow">
                  <ArrowUpRight size={22} />
                </span>
              </button>
              <div className="destination-copy">
                <div className="destination-meta">
                  <span>{destination.region}</span>
                  <span>{destination.number} / 03</span>
                </div>
                <h3>
                  {destination.name}
                  <span>.</span>
                </h3>
                <p className="destination-title">{destination.title}</p>
                <p className="destination-description">
                  {destination.description}
                </p>
                <ul className="inline-tags">
                  {destination.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setSelected(destination)}
                >
                  {copy.detailLabel}
                  <ArrowRight size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="culture-endnote">
          <span />
          Việt Nam vẫn còn nhiều điều để khám phá.
          <span />
        </p>
      </div>
      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected ? `Ghi chép về ${selected.name}` : "Ghi chép du lịch"}
      >
        {selected && (
          <>
            <JournalPhoto
              image={selected.image}
              className="dialog-photo"
              sizes="(max-width: 767px) 95vw, 820px"
            />
            <div className="dialog-content">
              <span className="eyebrow">
                {copy.noteLabel} / {selected.region}
              </span>
              <h3>
                {selected.name}
                <span className="text-red">.</span>
              </h3>
              <p className="dialog-subtitle">{selected.title}</p>
              <blockquote className="destination-quote">
                <Quote size={26} strokeWidth={1.5} />
                <p>{selected.note}</p>
              </blockquote>
              <section>
                <h4>{copy.experienceLabel}</h4>
                <ul className="destination-experiences">
                  {selected.questions.map((experience) => (
                    <li key={experience}>
                      <ArrowUpRight size={16} />
                      {experience}
                    </li>
                  ))}
                </ul>
              </section>
              <div className="destination-dialog-footer">
                <span>{copy.noteLabel}</span>
                <a
                  href={selected.image.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ảnh: {selected.image.credit}
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </>
        )}
      </Dialog>
    </section>
  );
}
