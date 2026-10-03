"use client";

import {
  ArrowUpRight,
  Download,
  MessageCircle,
  Mail,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const {
    content: { profile, ui },
  } = useLanguage();
  const copy = profile.contact;
  return (
    <section
      id="lien-he"
      className="section contact-section"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="section-number">07</span>
            <span className="eyebrow">{copy.eyebrow}</span>
          </div>
        </Reveal>
        <div className="contact-grid">
          <div className="contact-main">
            <Reveal>
              <h2 id="contact-title">
                {copy.title}
                <br />
                <em>{copy.italicTitle}</em>
              </h2>
              <p className="contact-description">{copy.description}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(copy.mailSubject)}`}
                className="button button-primary contact-cta"
              >
                <Mail size={18} />
                {copy.cta}
                <ArrowUpRight size={20} />
              </a>
              {profile.cv && (
                <a href={profile.cv} download className="text-link contact-cv">
                  <Download size={16} />
                  {ui.downloadCv}
                </a>
              )}
            </Reveal>
          </div>
          <Reveal className="contact-details" delay={0.12}>
            <p className="contact-availability">
              <span />
              {profile.availability}
            </p>
            <a className="contact-link" href={`mailto:${profile.email}`}>
              <Mail size={18} />
              <span>
                <small>EMAIL</small>
                {profile.email}
              </span>
              <ArrowUpRight size={18} />
            </a>
            <a
              className="contact-link"
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} />
              <span>
                <small>WHATSAPP</small>
                {profile.phone}
              </span>
              <ArrowUpRight size={18} />
            </a>
            <p className="contact-location">
              <MapPin size={15} />
              {profile.location}
            </p>
          </Reveal>
        </div>
        <Reveal>
          <div className="contact-closing">
            <span className="contact-closing-line" />
            <p>{ui.contactClosing}</p>
            <span className="contact-signature">{profile.shortName}.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
