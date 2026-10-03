"use client";

import { BookOpen, Ear, Globe2, Route } from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger } from "@/components/ui/Reveal";

const icons = {
  curiosity: Globe2,
  empathy: Ear,
  storytelling: BookOpen,
  adaptability: Route,
};

export function Strengths() {
  const {
    content: { strengths, sectionCopy },
  } = useLanguage();
  const copy = sectionCopy.strengths;
  return (
    <section
      id="diem-manh"
      className="section strengths-section"
      aria-labelledby="strengths-title"
    >
      <div className="container">
        <SectionHeading
          number="06"
          eyebrow={copy.eyebrow}
          title={copy.title}
          italic={copy.italic}
          description={copy.description}
          id="strengths-title"
        />
        <Stagger className="strengths-grid">
          {strengths.map((strength, index) => {
            const Icon = icons[strength.icon];
            return (
              <Reveal
                className="strength"
                key={strength.number}
                delay={index * 0.1}
              >
                <div className="strength-top">
                  <Icon size={27} strokeWidth={1.3} />
                  <span>{strength.number}</span>
                </div>
                <h3>{strength.title}</h3>
                <p>{strength.description}</p>
              </Reveal>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
