import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BUSINESS, NAV_LINKS, SECTION_IDS, whatsappLink } from "../data/business";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <a href="#home" onClick={onClick} className="group flex items-center gap-3" aria-label="Al Falah Interiors — home">
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-bronze/50 bg-charcoal font-display text-[15px] font-medium text-bronze transition-transform duration-500 group-hover:rotate-[8deg]">
        AF
      </span>
      <span className="leading-none">
        <span className="block whitespace-nowrap font-display text-[17px] font-medium tracking-wide text-charcoal">
          Al Falah <span className="hidden sm:inline">Interiors</span>
        </span>
        <span className="mt-1 block text-[9px] font-bold tracking-[0.34em] text-taupe uppercase">
          Interior Design Studio
        </span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-charcoal/10 bg-ivory/85 shadow-[0_10px_40px_-25px_rgba(38,34,29,0.35)] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex xl:gap-9">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-[13px] font-semibold tracking-wide transition-colors duration-300 ${
                    isActive ? "text-charcoal" : "text-taupe hover:text-charcoal"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-bronze transition-all duration-400 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !px-5 !py-2.5 text-[13px]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </a>
            <a href="#contact" className="btn-primary !px-5 !py-2.5 text-[13px]">
              Book a Consultation
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:bg-charcoal/5 md:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-ivory md:hidden"
          >
            <div className="container-x flex h-[72px] items-center justify-between">
              <Logo onClick={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/15"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-x mt-6 flex flex-1 flex-col overflow-y-auto">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.4 }}
                    className="border-b border-charcoal/8"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 font-display text-[26px] font-medium text-charcoal transition-colors active:text-bronze"
                    >
                      {link.label}
                      <span className="text-xs font-sans font-bold tracking-widest text-sand">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 pb-10">
                <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Book a Consultation
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp Us
                </a>
                <p className="mt-4 text-center text-xs text-taupe">
                  {BUSINESS.phoneDisplay} · {BUSINESS.hoursLines.join(", ")}
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
