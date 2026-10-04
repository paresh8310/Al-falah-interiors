import Navbar from "./components/Navbar";
import MobileBar from "./components/MobileBar";
import Hero from "./components/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import WhyUs from "./components/sections/WhyUs";
import Portfolio from "./components/sections/Portfolio";
import Process from "./components/sections/Process";
import Reviews from "./components/sections/Reviews";
import FinalCta from "./components/sections/FinalCta";
import Contact from "./components/sections/Contact";
import Faq from "./components/sections/Faq";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ivory text-charcoal">
      <a
        href="#about"
        className="sr-only z-[80] rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <Navbar />

      <main className="pb-[68px] md:pb-0">
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Portfolio />
        <Process />
        <Reviews />
        <FinalCta />
        <Contact />
        <Faq />
      </main>

      <Footer />
      <MobileBar />
    </div>
  );
}
