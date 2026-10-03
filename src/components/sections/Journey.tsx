"use client";

import { MapPin, MoveDown } from "lucide-react";
import { useRef } from "react";
import type { gsap } from "gsap";
import { experiences } from "@/data/experiences";
import { sectionCopy } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useScrollStory } from "@/hooks/useScrollStory";

function journeyAnimation(root: HTMLElement, animation: typeof gsap) {
  const timeline = root.querySelector(".journey-timeline");
  animation.fromTo(
    root.querySelector(".timeline-progress"),
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: timeline,
        start: "top 68%",
        end: "bottom 65%",
        scrub: 0.65,
      },
    },
  );
  root.querySelectorAll<HTMLElement>(".timeline-item").forEach((item) => {
    animation.from(item.querySelector(".timeline-content"), {
      y: 30,
      opacity: 0,
      duration: 0.65,
      ease: "power3.out",
      scrollTrigger: { trigger: item, start: "top 82%", once: true },
    });
    animation.to(item.querySelector(".timeline-dot"), {
      backgroundColor: "#B8403A",
      borderColor: "#B8403A",
      scale: 1.1,
      duration: 0.25,
      scrollTrigger: {
        trigger: item,
        start: "top 68%",
        toggleActions: "play none none reverse",
      },
    });
    animation.to(item.querySelector(".timeline-year"), {
      color: "#B8403A",
      duration: 0.25,
      scrollTrigger: {
        trigger: item,
        start: "top 68%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const copy = sectionCopy.journey;
  useScrollStory(ref, journeyAnimation);

  return (
    <section
      ref={ref}
      id="hanh-trinh"
      className="section journey-section"
      aria-labelledby="journey-title"
    >
      <div className="container">
        <SectionHeading
          number="02"
          eyebrow={copy.eyebrow}
          title={copy.title}
          italic={copy.italic}
          description={copy.description}
          id="journey-title"
        />
        <div className="journey-grid">
          <div className="journey-aside">
            <span className="journey-large-type">
              Hành
              <br />
              <em>trình.</em>
            </span>
            <p>
              Học từ môi trường thực tế, từ những chuyến tour và từ những người
              tôi đồng hành.
            </p>
            <div className="journey-aside-line" />
            <MapPin size={20} strokeWidth={1.4} />
            <span className="eyebrow">TRẢI NGHIỆM & KẾT NỐI</span>
          </div>
          <ol className="journey-timeline">
            <li className="timeline-track" aria-hidden="true">
              <span className="timeline-progress" />
            </li>
            {experiences.map((experience, index) => (
              <li key={experience.id} className="timeline-item">
                <div className="timeline-marker">
                  <span className="timeline-dot" />
                  <span className="timeline-year">
                    {experience.year ?? String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="timeline-content">
                  <div className="timeline-meta">
                    <span className="eyebrow">{experience.category}</span>
                    {experience.period && <time>{experience.period}</time>}
                  </div>
                  <h3>{experience.title}</h3>
                  <p className="timeline-organization">
                    {experience.organization}
                  </p>
                  <p className="timeline-description">
                    {experience.description}
                  </p>
                  <ul className="inline-tags">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            <li className="timeline-next">
              <span className="timeline-dot" />
              <MoveDown size={17} />
              <span>{copy.note}</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
