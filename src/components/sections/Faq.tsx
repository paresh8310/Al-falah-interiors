import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BUSINESS } from "../../data/business";
import { ChevronDownIcon } from "../icons";
import { Reveal, SectionHeading } from "../ui";

const FAQS = [
  {
    q: "What areas does Al Falah Interiors serve?",
    a: "We serve residential and commercial clients across Bangalore. Our studio is located in Lakshmipura, near Chikkabanavara in North Bengaluru, and we work on projects in and around the city.",
  },
  {
    q: "Where is Al Falah Interiors located?",
    a: `You'll find us at ${BUSINESS.addressFull}. Directions are available on our Google Maps listing.`,
  },
  {
    q: "What types of spaces do you work on?",
    a: "We design and execute interiors for homes (residential), offices and commercial spaces — from single rooms to complete interiors.",
  },
  {
    q: "Do you provide customized furniture?",
    a: "Yes. Customized furniture and interiors are one of our core services — designed around your space, preferences and requirements.",
  },
  {
    q: "Do you provide project management?",
    a: "Yes. Our design and project management service takes your project from design planning through execution, with clear and transparent communication throughout.",
  },
  {
    q: "Do you provide post-sales service?",
    a: "Yes. Our support continues after project completion — we remain available to our clients after handover.",
  },
  {
    q: "What are your working hours?",
    a: `We work ${BUSINESS.hoursLines[0]}, ${BUSINESS.hoursLines[1]}.`,
  },
  {
    q: "How can I contact Al Falah Interiors?",
    a: `Call or WhatsApp us at ${BUSINESS.phoneDisplay}, email ${BUSINESS.email}, or send the consultation form above — whichever is easiest for you.`,
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-parchment py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Frequently Asked <span className="font-light text-bronze-deep italic">Questions</span>
            </>
          }
        />

        <div className="mx-auto mt-12 max-w-3xl">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.04}>
                <div className="border-b border-charcoal/10 first:border-t">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[15px] font-semibold text-charcoal sm:text-base">{faq.q}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
                        isOpen ? "rotate-180 border-bronze bg-bronze text-white" : "border-charcoal/20 text-charcoal"
                      }`}
                    >
                      <ChevronDownIcon className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-sm leading-relaxed text-taupe sm:text-[15px]">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
