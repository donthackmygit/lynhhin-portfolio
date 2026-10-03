"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language/LanguageProvider";

type ProjectLinkProps = {
  label: string;
  url: string | null;
};

export function ProjectLink({ label, url }: ProjectLinkProps) {
  const {
    content: { ui },
  } = useLanguage();
  const [qr, setQr] = useState<{ url: string; image: string } | null>(null);

  useEffect(() => {
    if (!url) return;
    let disposed = false;
    void import("qrcode")
      .then(async ({ default: QRCode }) => {
        const image = await QRCode.toDataURL(url, {
          width: 320,
          margin: 4,
          errorCorrectionLevel: "M",
          color: { dark: "#25221FFF", light: "#FFFFFFFF" },
        });
        if (!disposed) setQr({ url, image });
      })
      .catch(() => {
        /* The direct link remains usable if QR generation is unavailable. */
      });
    return () => {
      disposed = true;
    };
  }, [url]);

  if (!url) return null;

  return (
    <div className="project-external-link">
      <a
        className="button button-primary"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{label}</span>
        <ArrowUpRight size={19} />
      </a>
      <a
        className="project-qr"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={ui.openRecommendations}
      >
        {qr?.url === url && (
          <Image
            src={qr.image}
            width={160}
            height={160}
            unoptimized
            alt={ui.qrRecommendations}
          />
        )}
        <span>NextbyLocal</span>
      </a>
    </div>
  );
}
