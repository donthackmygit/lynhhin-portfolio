import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  number: string;
  eyebrow: string;
  title: string;
  italic?: string;
  description?: string;
  id?: string;
  className?: string;
};

export function SectionHeading({
  number,
  eyebrow,
  title,
  italic,
  description,
  id,
  className = "",
}: SectionHeadingProps) {
  return (
    <Reveal className={`section-heading ${className}`}>
      <div className="section-label">
        <span className="section-number">{number}</span>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div className="heading-grid">
        <h2 id={id}>
          {title}
          {italic && (
            <>
              <br />
              <em>{italic}</em>
            </>
          )}
        </h2>
        {description && <p className="section-description">{description}</p>}
      </div>
    </Reveal>
  );
}
