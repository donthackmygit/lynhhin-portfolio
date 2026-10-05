"use client";

import { MapPin, MoveDown } from "lucide-react";
import { useRef } from "react";
import type { gsap } from "gsap";
import { useLanguage } from "@/components/language/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JournalDate } from "@/components/ui/JournalDate";
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
    item
      .querySelectorAll<HTMLElement>(".timeline-activity")
      .forEach((activity) => {
        const month = activity.querySelector(".timeline-month");
        if (!month) return;
        animation.to(month, {
          color: "#B8403A",
          duration: 0.25,
          scrollTrigger: {
            trigger: activity,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        });
        const dot = activity.querySelector(".timeline-month-dot");
        if (!dot) return;
        animation.to(dot, {
          backgroundColor: "#B8403A",
          borderColor: "#B8403A",
          scale: 1.1,
          duration: 0.25,
          scrollTrigger: {
            trigger: activity,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        });
      });
  });
}

export function Journey() {
  const {
    content: { experiences, sectionCopy, ui },
  } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const copy = sectionCopy.journey;
  const years = Array.from(
    new Set(experiences.map((experience) => experience.year)),
  );
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
          id="journey-title"
        />
        <div className="journey-grid">
          <div className="journey-aside">
            <span className="journey-large-type">
              {ui.journeyFirstLine}
              <br />
              <em>{ui.journeySecondLine}</em>
            </span>
            <p>{ui.journeyDescription}</p>
            <div className="journey-aside-line" />
            <MapPin size={20} strokeWidth={1.4} />
            <span className="eyebrow">{ui.journeyEyebrow}</span>
          </div>
          <ol className="journey-timeline">
            <li className="timeline-track" aria-hidden="true">
              <span className="timeline-progress" />
            </li>
            {years.map((year) => (
              <li key={year} className="timeline-item">
                <div className="timeline-marker">
                  <JournalDate className="timeline-year" year={year} />
                  <span className="timeline-dot" aria-hidden="true" />
                </div>
                <div className="timeline-content">
                  {experiences
                    .filter((experience) => experience.year === year)
                    .sort(
                      (first, second) =>
                        (first.month ?? 13) - (second.month ?? 13),
                    )
                    .map((experience, activityIndex) => (
                      <article
                        key={experience.id}
                        id={experience.id}
                        className="timeline-activity"
                      >
                        {experience.month !== undefined && (
                          <div className="timeline-activity-date">
                            {activityIndex > 0 && (
                              <span
                                className="timeline-dot timeline-month-dot"
                                aria-hidden="true"
                              />
                            )}
                            <JournalDate
                              className="timeline-month"
                              year={experience.year}
                              month={experience.month}
                              showYear={false}
                            />
                          </div>
                        )}
                        <div className="timeline-meta">
                          <span className="eyebrow">{experience.category}</span>
                          {experience.period && (
                            <span className="timeline-period">
                              {experience.period}
                            </span>
                          )}
                        </div>
                        <h3>{experience.title}</h3>
                        <p className="timeline-organization">
                          {experience.organization}
                        </p>
                        <p className="timeline-description">
                          {experience.description}
                        </p>
                        {experience.details?.map((detail, index) => (
                          <div key={index} className="timeline-detail">
                            <h4>{detail.title}</h4>
                            <p>{detail.description}</p>
                          </div>
                        ))}
                        <ul className="inline-tags">
                          {experience.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
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
