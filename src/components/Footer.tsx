import { BUSINESS, MAPS_DIRECTIONS_URL, NAV_LINKS, whatsappLink } from "../data/business";
import { ArrowUpRightIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="container-x grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <a href="#home" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-bronze/50 font-display text-base text-bronze">
              AF
            </span>
            <span className="leading-none">
              <span className="block font-display text-xl font-medium">Al Falah Interiors</span>
              <span className="mt-1.5 block text-[9px] font-bold tracking-[0.34em] text-ivory/50 uppercase">
                {BUSINESS.tagline}
              </span>
            </span>
          </a>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/55">
            A Bangalore-based interior design company creating functional, aesthetic and modern
            interiors for homes, offices and commercial spaces.
          </p>
          <p className="mt-6 flex items-center gap-2 text-xs font-semibold tracking-wide text-ivory/40">
            <span className="text-bronze">{BUSINESS.ratingValue} ★</span>
            · {BUSINESS.ratingCount} Google Reviews
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer">
          <h3 className="text-xs font-bold tracking-[0.28em] text-ivory/40 uppercase">Explore</h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm font-semibold text-ivory/70 transition-colors hover:text-bronze">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-bold tracking-[0.28em] text-ivory/40 uppercase">Contact</h3>
          <ul className="mt-5 flex flex-col gap-4 text-sm text-ivory/70">
            <li className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
              <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="leading-relaxed hover:text-bronze">
                {BUSINESS.addressFull}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <PhoneIcon className="h-4 w-4 shrink-0 text-bronze" />
              <a href={BUSINESS.phoneHref} className="hover:text-bronze">
                {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MailIcon className="h-4 w-4 shrink-0 text-bronze" />
              <a href={BUSINESS.emailHref} className="break-all hover:text-bronze">
                {BUSINESS.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <ClockIcon className="h-4 w-4 shrink-0 text-bronze" />
              <span>
                {BUSINESS.hoursLines[0]} · {BUSINESS.hoursLines[1]}
              </span>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-gold !px-5 !py-2.5 text-[13px]">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp Us
            </a>
            <a
              href={MAPS_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ivory/25 px-5 py-2.5 text-[13px] font-semibold text-ivory transition-colors hover:border-ivory/70 hover:bg-ivory/5"
            >
              Directions
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-ivory/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Al Falah Interiors. All rights reserved.</p>
          <p>Interior Design Company · Lakshmipura, Bangalore, Karnataka</p>
        </div>
      </div>
    </footer>
  );
}
