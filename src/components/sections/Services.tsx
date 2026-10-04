import { ArrowUpRightIcon, BriefcaseIcon, BuildingIcon, CompassRulerIcon, HomeIcon, SofaIcon, SupportIcon } from "../icons";
import { Reveal, SectionHeading } from "../ui";

const SERVICES = [
  {
    icon: SofaIcon,
    title: "Customized Furniture & Interiors",
    description:
      "Customized interior solutions and furniture designed around your space, preferences and requirements.",
  },
  {
    icon: CompassRulerIcon,
    title: "Design & Project Management",
    description:
      "From design planning through project execution, bringing structure and clarity to your interior project.",
  },
  {
    icon: HomeIcon,
    title: "Residential Interiors",
    description: "Modern, functional and aesthetic interior solutions for homes.",
  },
  {
    icon: BriefcaseIcon,
    title: "Office Interiors",
    description: "Thoughtfully planned interiors designed for productive and professional workspaces.",
  },
  {
    icon: BuildingIcon,
    title: "Commercial Interiors",
    description: "Interior solutions for commercial environments with a focus on aesthetics and functionality.",
  },
  {
    icon: SupportIcon,
    title: "Post-Sales Service",
    description: "Continued support after project completion.",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-parchment py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="What We Do"
          title={
            <>
              Interior Solutions <span className="font-light text-bronze-deep italic">Built Around You</span>
            </>
          }
          description="Six focused services covering everything from a single piece of customized furniture to complete turnkey interiors."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.08}>
                <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-3xl border border-charcoal/8 bg-ivory p-8">
                  <span
                    aria-hidden
                    className="absolute -top-10 -right-6 font-display text-[7rem] leading-none font-light text-charcoal/[0.05] transition-colors duration-500 group-hover:text-bronze/15"
                  >
                    0{i + 1}
                  </span>

                  <span className="grid h-13 w-13 place-items-center rounded-2xl border border-bronze/30 bg-bronze/10 text-bronze-deep transition-all duration-500 group-hover:bg-bronze group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="mt-6 font-display text-xl leading-snug font-medium text-charcoal">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-taupe">{service.description}</p>

                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold tracking-wide text-charcoal uppercase transition-colors duration-300 hover:text-bronze-deep"
                  >
                    Discuss your project
                    <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
