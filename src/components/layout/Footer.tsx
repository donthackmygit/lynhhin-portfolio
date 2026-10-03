import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { images } from "@/data/images";

export function Footer() {
  const credits = Array.from(
    new Map(
      Object.values(images).map((image) => [image.source, image]),
    ).values(),
  );

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <a href="#trang-chu" className="footer-brand">
            {profile.shortName}
            <span>.</span>
          </a>
          <p>{profile.footer.tagline}</p>
          <a href="#trang-chu" className="text-link">
            Về đầu trang
            <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>{profile.footer.note}</span>
        </div>
        <details className="photo-credits">
          <summary>Nguồn ảnh</summary>
          <div>
            {credits.map((image) => (
              <a
                key={image.source}
                href={image.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                {image.credit}
                <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </details>
      </div>
    </footer>
  );
}
