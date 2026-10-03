import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PageTransition } from "@/components/motion/PageTransition";
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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: `${profile.name} (Lynhin) | Travel & Culture`,
  description: `${profile.name} — Lynhin. Hướng dẫn du lịch, thiết kế trải nghiệm văn hóa, vận hành tour và kết nối với du khách quốc tế.`,
  applicationName: "Lynhin Travel Journal",
  openGraph: {
    title: `${profile.name} (Lynhin) | Travel & Culture`,
    description: profile.hero.quote,
    type: "website",
    locale: "vi_VN",
    images: [
      { url: images.hero.src, width: 1800, height: 1200, alt: images.hero.alt },
    ],
  },
  robots: { index: !profile.isPlaceholder, follow: !profile.isPlaceholder },
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
    <html lang="vi" className={`${lora.variable} ${beVietnam.variable}`}>
      <body>
        <a className="skip-link" href="#noi-dung">
          Đến nội dung chính
        </a>
        <MotionProvider>
          <PageTransition>{children}</PageTransition>
        </MotionProvider>
      </body>
    </html>
  );
}
