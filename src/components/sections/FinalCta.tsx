import { BUSINESS, whatsappLink } from "../../data/business";
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "../icons";
import { Reveal } from "../ui";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-ivory sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 60% at 50% 110%, rgba(169,138,95,0.22) 0%, rgba(38,34,29,0) 70%)",
        }}
      />
      <div className="container-x relative text-center">
        <Reveal>
          <p className="eyebrow">Start Your Project</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-[1.12] font-medium text-balance text-ivory sm:text-4xl lg:text-[2.9rem]">
            Let&rsquo;s Create a Space <span className="font-light text-bronze italic">You&rsquo;ll Love.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ivory/60 sm:text-base">
            Have a home, office or commercial space in mind? Talk to Al Falah Interiors about your
            interior requirements.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <a href="#contact" className="btn-gold group">
              Book a Consultation
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href={BUSINESS.phoneHref} className="btn-outline-light">
              <PhoneIcon className="h-4 w-4" />
              Call Now
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
