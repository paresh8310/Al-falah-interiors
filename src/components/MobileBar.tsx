import { BUSINESS, whatsappLink } from "../data/business";
import { CalendarIcon, PhoneIcon, WhatsAppIcon } from "./icons";

/** Persistent bottom contact bar — mobile only. */
export default function MobileBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-charcoal/10 bg-ivory/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
      role="navigation"
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-3 divide-x divide-charcoal/10">
        <a
          href={BUSINESS.phoneHref}
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-bold tracking-wide text-charcoal active:bg-charcoal/5"
        >
          <PhoneIcon className="h-[18px] w-[18px] text-bronze" />
          Call Now
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-bold tracking-wide text-charcoal active:bg-charcoal/5"
        >
          <WhatsAppIcon className="h-[18px] w-[18px] text-bronze" />
          WhatsApp
        </a>
        <a
          href="#contact"
          className="flex flex-col items-center gap-1 bg-charcoal py-2.5 text-[11px] font-bold tracking-wide text-ivory active:bg-espresso"
        >
          <CalendarIcon className="h-[18px] w-[18px]" />
          Book
        </a>
      </div>
    </div>
  );
}
