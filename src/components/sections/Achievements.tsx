"use client";

import { ArrowUpRight, Award } from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Achievements() {
  const {
    content: { achievements, sectionCopy },
  } = useLanguage();
  const copy = sectionCopy.achievements;
  return (
    <section
      id="thanh-tich"
      className="section achievements-section"
      aria-labelledby="achievements-title"
    >
      <div className="container">
        <SectionHeading
          number="05"
          eyebrow={copy.eyebrow}
          title={copy.title}
          italic={copy.italic}
          description={copy.description}
          id="achievements-title"
        />
        <div className="achievement-list">
          {achievements.map((achievement, index) => (
            <Reveal key={achievement.id} delay={index * 0.1}>
              <article className="achievement-row">
                <span className="achievement-year">{achievement.number}</span>
                <Award
                  size={27}
                  strokeWidth={1.3}
                  className="achievement-icon"
                />
                <div className="achievement-main">
                  <span className="eyebrow">{achievement.type}</span>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.organization}</p>
                </div>
                <p className="achievement-description">
                  {achievement.description}
                </p>
                <ArrowUpRight
                  size={20}
                  className="achievement-arrow"
                  aria-hidden="true"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
