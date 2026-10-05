import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Dancing_Script, Lora } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PageTransition } from "@/components/motion/PageTransition";
import {
  LanguageProvider,
  SkipLink,
} from "@/components/language/LanguageProvider";
import { profile } from "@/data/profile";
import { images } from "@/data/images";
import "./globals.css";

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  variable: "--font-lora",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const handwriting = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  weight: "600",
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: `${profile.name} (Lynhhin) | Du lịch & Văn hóa`,
  description: `${profile.name} — Lynhhin. Hướng dẫn du lịch, thiết kế trải nghiệm văn hóa, vận hành tour và kết nối với du khách quốc tế.`,
  applicationName: "Lynhhin Travel Journal",
  openGraph: {
    title: `${profile.name} (Lynhhin) | Du lịch & Văn hóa`,
    description: profile.hero.quote,
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: images.hero.src,
        width: images.hero.width,
        height: images.hero.height,
        alt: images.hero.alt,
      },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#B8403A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${lora.variable} ${beVietnam.variable} ${handwriting.variable}`}
    >
      <body>
        <LanguageProvider>
          <SkipLink />
          <MotionProvider>
            <PageTransition>{children}</PageTransition>
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
