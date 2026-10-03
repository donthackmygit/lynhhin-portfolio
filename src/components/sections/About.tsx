"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JournalPhoto } from "@/components/ui/JournalPhoto";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const {
    content: { profile, images, ui },
  } = useLanguage();
  return (
    <section
      id="ve-toi"
      className="section about-section"
      aria-labelledby="about-title"
    >
      <div className="container">
        <SectionHeading
          number="01"
          eyebrow={profile.about.eyebrow}
          title={profile.about.title}
          italic={profile.about.italicTitle}
          id="about-title"
        />
        <div className="about-grid">
          <Reveal className="about-image-column">
            <figure className="about-figure">
              <JournalPhoto
                image={images.portrait}
                className="about-photo"
                sizes="(max-width: 767px) 90vw, 40vw"
              />
              <figcaption>
                <span>{ui.aboutImageEyebrow}</span>
                <span>{profile.about.imageCaption}</span>
              </figcaption>
            </figure>
            <div className="about-location">
              <MapPin size={14} />
              {profile.location}
            </div>
          </Reveal>
          <div className="about-text-column">
            <Reveal delay={0.08}>
              <p className="about-lead">{profile.about.lead}</p>
            </Reveal>
            {profile.about.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={0.1 + index * 0.06}>
                <p className="about-paragraph">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.16}>
              <ul className="interest-list" aria-label={ui.interests}>
                {profile.about.interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <dl className="about-facts">
                {profile.about.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <a href="#hanh-trinh" className="text-link">
                {ui.continueJourney}
                <ArrowUpRight size={18} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
