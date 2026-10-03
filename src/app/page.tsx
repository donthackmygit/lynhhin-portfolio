import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { VietnamCulture } from "@/components/sections/VietnamCulture";
import { Skills } from "@/components/sections/Skills";
import { Achievements } from "@/components/sections/Achievements";
import { Strengths } from "@/components/sections/Strengths";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="noi-dung">
        <Hero />
        <About />
        <Journey />
        <Projects />
        <VietnamCulture />
        <Skills />
        <Achievements />
        <Strengths />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
