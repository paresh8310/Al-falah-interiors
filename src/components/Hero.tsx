import { motion, useReducedMotion } from "framer-motion";
import { BUSINESS, MAPS_LISTING_URL, whatsappLink } from "../data/business";
import { ArrowRightIcon, GoogleGlyphIcon, StarIcon, WhatsAppIcon } from "./icons";
import HeroScene from "./HeroScene";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const entrance = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden">
      {/* warm atmospheric washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 46% at 74% 30%, rgba(207,195,171,0.4) 0%, rgba(246,243,236,0) 70%), radial-gradient(40% 36% at 12% 78%, rgba(228,216,192,0.5) 0%, rgba(246,243,236,0) 70%)",
        }}
      />

      <div className="container-x relative grid min-h-[100svh] grid-cols-1 items-center gap-10 pt-32 pb-24 lg:grid-cols-[1.02fr_1fr] lg:gap-6 lg:pt-24 lg:pb-16">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <motion.p {...entrance(0.05)} className="eyebrow">
            Interior Design Studio · Lakshmipura, Bangalore
          </motion.p>

          <motion.h1
            {...entrance(0.14)}
            className="mt-5 font-display text-[2.6rem] leading-[1.06] font-medium tracking-[-0.015em] text-balance text-charcoal sm:text-6xl lg:text-[4.1rem]"
          >
            Make Your Home
            <br />
            <span className="font-light text-bronze-deep italic">A Dream Place.</span>
          </motion.h1>

          <motion.p {...entrance(0.24)} className="mt-6 max-w-md text-[15px] leading-relaxed text-taupe sm:text-base">
            Functional, aesthetic and modern interiors designed around the way you live and work.
          </motion.p>

          <motion.div {...entrance(0.34)} className="mt-9 flex flex-wrap items-center gap-3.5">
            <a href="#contact" className="btn-primary group">
              Book a Consultation
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#portfolio" className="btn-outline">
              Explore Our Work
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="grid h-[50px] w-[50px] place-items-center rounded-full border border-charcoal/20 text-charcoal transition-all duration-300 hover:border-bronze hover:bg-bronze hover:text-white"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </motion.div>

          <motion.a
            {...entrance(0.46)}
            href={MAPS_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-charcoal/10 bg-white/50 py-2 pr-4 pl-3 backdrop-blur-sm transition-colors duration-300 hover:border-bronze/50"
          >
            <span className="flex items-center gap-0.5 text-bronze" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-3.5 w-3.5" />
              ))}
            </span>
            <span className="text-[13px] font-bold text-charcoal">{BUSINESS.ratingValue} / 5</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-taupe">
              <GoogleGlyphIcon className="h-3.5 w-3.5" />
              {BUSINESS.ratingCount} Google Reviews
            </span>
          </motion.a>
        </div>

        {/* 3D architectural composition */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
          className="relative h-[400px] sm:h-[500px] lg:h-[640px]"
        >
          <HeroScene />
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
        aria-hidden
      >
        <span className="text-[10px] font-bold tracking-[0.34em] text-taupe uppercase">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-charcoal/15">
          <span className="scroll-dot absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-bronze" />
        </span>
      </motion.div>
    </section>
  );
}
