import { Reveal } from "../ui";

const PRINCIPLES = [
  {
    num: "01",
    title: "Superior Designs",
    text: "Thoughtful design focused on aesthetics and functionality.",
  },
  {
    num: "02",
    title: "High Quality Products",
    text: "A commitment to quality products and materials.",
  },
  {
    num: "03",
    title: "Transparency",
    text: "Clear and transparent project communication.",
  },
  {
    num: "04",
    title: "On-Time Delivery",
    text: "A strong focus on completing projects on schedule.",
  },
  {
    num: "05",
    title: "Post-Sales Service",
    text: "Support continues beyond project completion.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="scroll-mt-20 relative overflow-hidden bg-charcoal py-24 text-ivory sm:py-32">
      {/* faint architectural arch watermark */}
      <svg
        aria-hidden
        viewBox="0 0 800 800"
        className="pointer-events-none absolute top-1/2 -right-40 h-[42rem] -translate-y-1/2 opacity-[0.06]"
        fill="none"
      >
        {[300, 240, 180, 120].map((r) => (
          <path key={r} d={`M ${400 - r} 620 A ${r} ${r} 0 0 1 ${400 + r} 620`} stroke="#cfc3ab" strokeWidth="1.4" />
        ))}
        <path d="M60 620h680" stroke="#cfc3ab" strokeWidth="1.4" />
      </svg>

      <div className="container-x relative grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow">Why Choose Us</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-3xl leading-[1.12] font-medium text-balance text-ivory sm:text-4xl lg:text-[2.75rem]">
              Why <span className="font-light text-bronze italic">Al Falah Interiors?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ivory/60 sm:text-base">
              Every project is guided by the same five principles — the way we design, the way we
              execute and the way we look after you afterwards.
            </p>
          </Reveal>
        </div>

        <ol className="flex flex-col">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.06}>
              <li className="group flex items-start gap-6 border-b border-ivory/10 py-7 transition-colors duration-500 first:border-t hover:border-bronze/40 sm:gap-10 sm:py-9">
                <span className="font-display text-2xl font-light text-bronze transition-transform duration-500 group-hover:-translate-y-1 sm:text-3xl">
                  {p.num}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium text-ivory sm:text-2xl">{p.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ivory/55 sm:text-[15px]">{p.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
