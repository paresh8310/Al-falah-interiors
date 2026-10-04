import { useState, type FormEvent, type ReactNode } from "react";
import {
  BUSINESS,
  MAPS_DIRECTIONS_URL,
  MAPS_EMBED_URL,
  whatsappLink,
} from "../../data/business";
import { ArrowUpRightIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "../icons";
import { Reveal, SectionHeading } from "../ui";

const PROJECT_TYPES = ["Home", "Office", "Commercial", "Customized Furniture", "Other"] as const;

const inputCls = "input-field";

function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-bold tracking-wide text-charcoal">
      {children}
    </label>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Home",
    location: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof typeof form) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hello Al Falah Interiors,",
      "",
      "I would like to book a consultation.",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : "",
      `Project Type: ${form.projectType}`,
      form.location ? `Location: ${form.location}` : "",
      form.message ? `Message: ${form.message}` : "",
      "",
      "(Sent from your website)",
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const emailHref = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(
    `Consultation Request — ${form.projectType}`,
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nPhone: ${form.phone}\nProject Type: ${form.projectType}\nLocation: ${form.location}\n\n${form.message}`,
  )}`;

  return (
    <section id="contact" className="scroll-mt-20 bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Get In Touch"
          title={
            <>
              Talk To Us About <span className="font-light text-bronze-deep italic">Your Space</span>
            </>
          }
          description="Call, WhatsApp, email or send the form below — we usually respond during working hours."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          {/* Info + map */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <ul className="flex flex-col divide-y divide-charcoal/8 rounded-3xl border border-charcoal/10 bg-white/50 backdrop-blur-sm">
                <li className="flex items-start gap-4 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-bronze/12 text-bronze-deep">
                    <MapPinIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-charcoal">Visit Us</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-taupe">
                      <strong className="font-semibold text-charcoal">{BUSINESS.name}</strong>
                      <br />
                      {BUSINESS.addressFull}
                    </p>
                    <a
                      href={MAPS_DIRECTIONS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-[13px] font-bold text-bronze-deep hover:underline"
                    >
                      Get Directions
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-bronze/12 text-bronze-deep">
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-charcoal">Call / WhatsApp</p>
                    <a href={BUSINESS.phoneHref} className="mt-1 block text-[15px] font-semibold text-charcoal hover:text-bronze-deep">
                      {BUSINESS.phoneDisplay}
                    </a>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <a href={BUSINESS.phoneHref} className="rounded-full border border-charcoal/15 px-3.5 py-1.5 text-xs font-bold text-charcoal transition-colors hover:border-bronze hover:text-bronze-deep">
                        Call Now
                      </a>
                      <a
                        href={whatsappLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-charcoal/15 px-3.5 py-1.5 text-xs font-bold text-charcoal transition-colors hover:border-bronze hover:text-bronze-deep"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-bronze/12 text-bronze-deep">
                    <MailIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-charcoal">Email</p>
                    <a href={BUSINESS.emailHref} className="mt-1 block text-[15px] break-all font-semibold text-charcoal hover:text-bronze-deep">
                      {BUSINESS.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-bronze/12 text-bronze-deep">
                    <ClockIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-charcoal">Working Hours</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-taupe">
                      {BUSINESS.hoursLines[0]}
                      <br />
                      {BUSINESS.hoursLines[1]}
                    </p>
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-charcoal/10 shadow-[0_30px_60px_-40px_rgba(38,34,29,0.35)]">
                <iframe
                  title="Al Falah Interiors location on Google Maps"
                  src={MAPS_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-[280px] w-full border-0 grayscale-[0.25] sm:h-[320px]"
                />
              </div>
            </Reveal>
          </div>

          {/* Consultation form */}
          <Reveal delay={0.08}>
            <div id="consultation" className="scroll-mt-28 rounded-3xl border border-charcoal/10 bg-parchment p-7 sm:p-10">
              <h3 className="font-display text-2xl font-medium text-charcoal">Book a Consultation</h3>
              <p className="mt-2 text-sm leading-relaxed text-taupe">
                Share your requirement — the form opens WhatsApp with your details pre-filled, so
                nothing is stored on this website.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="cf-name">Name</Label>
                  <input
                    id="cf-name"
                    className={inputCls}
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cf-phone">Phone Number</Label>
                  <input
                    id="cf-phone"
                    className={inputCls}
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    pattern="[+\d][\d\s\-()]{6,}"
                    placeholder="+91 ..."
                    value={form.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cf-email">Email <span className="font-normal text-taupe">(optional)</span></Label>
                  <input
                    id="cf-email"
                    className={inputCls}
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => set("email")(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cf-type">Project Type</Label>
                  <select
                    id="cf-type"
                    className={inputCls}
                    value={form.projectType}
                    onChange={(e) => set("projectType")(e.target.value)}
                  >
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="cf-location">Location</Label>
                  <input
                    id="cf-location"
                    className={inputCls}
                    placeholder="Your area or locality in Bangalore"
                    value={form.location}
                    onChange={(e) => set("location")(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="cf-message">Message</Label>
                  <textarea
                    id="cf-message"
                    className={`${inputCls} min-h-[110px] resize-y`}
                    placeholder="Tell us briefly about your space and requirements..."
                    value={form.message}
                    onChange={(e) => set("message")(e.target.value)}
                  />
                </div>

                <div className="mt-2 flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                  <button type="submit" className="btn-primary flex-1">
                    <WhatsAppIcon className="h-4 w-4" />
                    Send via WhatsApp
                  </button>
                  <a href={emailHref} className="btn-outline flex-1">
                    <MailIcon className="h-4 w-4" />
                    Send via Email
                  </a>
                </div>
                <p aria-live="polite" className="text-center text-xs text-taupe sm:col-span-2">
                  {submitted
                    ? "Opening WhatsApp with your details — we'll reply during working hours."
                    : "Prefer email? Use “Send via Email” — it opens your mail app with everything filled in."}
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
