"use client";

import { ArrowUpRight, Check, Plus } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/language/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JournalPhoto } from "@/components/ui/JournalPhoto";
import { JournalDate } from "@/components/ui/JournalDate";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { Dialog } from "@/components/ui/Dialog";
import { ProjectLink } from "@/components/ui/ProjectLink";

export function Projects() {
  const {
    content: { projects, sectionCopy, ui },
  } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects.find((project) => project.id === selectedId);
  const selectedImage = selected?.modalImage ?? selected?.image;
  const copy = sectionCopy.projects;

  return (
    <section
      id="du-an"
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <SectionHeading
          number="03"
          eyebrow={copy.eyebrow}
          title={copy.title}
          italic={copy.italic}
          description={copy.description}
          id="projects-title"
        />
        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <article
                className={`project-row ${index % 2 ? "project-row-reversed" : ""}`}
              >
                <button
                  type="button"
                  className="project-image-button"
                  onClick={() => setSelectedId(project.id)}
                  aria-label={`${ui.viewProject} ${project.title}`}
                >
                  <JournalPhoto
                    image={project.image}
                    className="project-photo"
                    aspectRatio={project.image.width / project.image.height}
                  />
                  <span className="project-image-index">
                    {ui.projectLabel} / {project.number}
                  </span>
                  <span className="project-image-caption">
                    {project.imageCaption}
                  </span>
                  <span className="project-image-open">
                    <Plus size={22} />
                  </span>
                </button>
                <div className="project-copy">
                  <div className="project-topline">
                    <span className="eyebrow">{project.category}</span>
                    {project.year && (
                      <JournalDate
                        className="project-year"
                        year={project.year}
                        month={project.month}
                      />
                    )}
                  </div>
                  <span className="project-number" aria-hidden="true">
                    {project.number}
                  </span>
                  <h3>{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-description">{project.description}</p>
                  {project.stats && (
                    <Stagger className="project-stats">
                      {project.stats.map((stat, statIndex) => (
                        <Reveal key={statIndex} delay={statIndex * 0.1}>
                          <span className="project-stat-value">
                            {stat.value}
                          </span>
                          <span className="project-stat-label">
                            {stat.label}
                          </span>
                        </Reveal>
                      ))}
                    </Stagger>
                  )}
                  <p className="project-role">
                    <span>{ui.role}</span>
                    {project.role}
                  </p>
                  <ul className="inline-tags">
                    {project.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => setSelectedId(project.id)}
                  >
                    {copy.detailLabel}
                    <ArrowUpRight size={19} />
                  </button>
                  {project.link && <ProjectLink {...project.link} />}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelectedId(null)}
        title={selected?.title ?? ui.projectDetails}
      >
        {selected && selectedImage && (
          <>
            <JournalPhoto
              image={selectedImage}
              sizes="(max-width: 767px) 95vw, 820px"
              fit="contain"
              quality={85}
              aspectRatio={selectedImage.width / selectedImage.height}
            />
            <div className="dialog-content">
              <div className="dialog-eyebrow">
                <span className="eyebrow">
                  {selected.category}
                  {selected.year && (
                    <>
                      {" / "}
                      <JournalDate
                        year={selected.year}
                        month={selected.month}
                      />
                    </>
                  )}
                </span>
                {selected.badge && (
                  <span className="project-badge">{selected.badge}</span>
                )}
              </div>
              <h3>{selected.title}</h3>
              <p className="dialog-subtitle">{selected.subtitle}</p>
              <dl className="dialog-role">
                <dt>{ui.role}</dt>
                <dd>{selected.role}</dd>
              </dl>
              <section>
                <h4>{copy.briefLabel}</h4>
                <p>{selected.brief}</p>
              </section>
              {selected.roleDescription && (
                <section>
                  <h4>{copy.roleLabel}</h4>
                  <p>{selected.roleDescription}</p>
                </section>
              )}
              {selected.challenge && (
                <section>
                  <h4>{copy.challengeLabel}</h4>
                  <p>{selected.challenge}</p>
                </section>
              )}
              {selected.deliverables.length > 0 && (
                <section>
                  <h4>{copy.deliverablesLabel}</h4>
                  <ul className="deliverable-list">
                    {selected.deliverables.map((item) => (
                      <li key={item}>
                        <Check size={15} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <section className="dialog-takeaway">
                <h4>{selected.takeawayLabel ?? copy.takeawayLabel}</h4>
                <p>{selected.takeaway}</p>
              </section>
              {selected.link && <ProjectLink {...selected.link} />}
            </div>
          </>
        )}
      </Dialog>
    </section>
  );
}
