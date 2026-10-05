import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Achievements } from "@/components/sections/Achievements";
import { Strengths } from "@/components/sections/Strengths";
import { Contact } from "@/components/sections/Contact";
import { IntroBootstrap } from "@/components/intro/IntroBootstrap";

export default function Home() {
  return (
    <>
      <IntroBootstrap />
      <Navbar />
      <main id="noi-dung" tabIndex={-1}>
        <Hero />
        <About />
        <Journey />
        <Projects />
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
