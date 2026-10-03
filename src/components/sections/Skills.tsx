"use client";

import { Compass, Languages, MessagesSquare, PenTool } from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger } from "@/components/ui/Reveal";

const icons = {
  communication: MessagesSquare,
  tourism: Compass,
  tools: PenTool,
  languages: Languages,
};

export function Skills() {
  const {
    content: { skillGroups, sectionCopy },
  } = useLanguage();
  const copy = sectionCopy.skills;
  return (
    <section
      id="ky-nang"
      className="section skills-section"
      aria-labelledby="skills-title"
    >
      <div className="container">
        <SectionHeading
          number="04"
          eyebrow={copy.eyebrow}
          title={copy.title}
          italic={copy.italic}
          description={copy.description}
          id="skills-title"
        />
        <Stagger className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = icons[group.icon];
            return (
              <Reveal
                className="skill-group"
                delay={index * 0.1}
                key={group.id}
              >
                <div className="skill-group-top">
                  <Icon size={25} strokeWidth={1.4} />
                  <span>{group.number}</span>
                </div>
                <p className="eyebrow">{group.english}</p>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
