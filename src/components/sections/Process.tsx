import { Reveal, SectionHeading } from "../ui";

const STEPS = [
  {
    num: "01",
    title: "Consultation",
    text: "Understand the client's requirements and space.",
  },
  {
    num: "02",
    title: "Design",
    text: "Develop the interior concept around the client's needs.",
  },
  {
    num: "03",
    title: "Project Management",
    text: "Coordinate design and execution.",
  },
  {
    num: "04",
    title: "Completion & Support",
    text: "Complete the project and provide post-sales support.",
  },
];

export default function Process() {
  return (
    <section id="process" className="scroll-mt-20 bg-parchment py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="How We Work"
          title={
            <>
              A Clear, Simple <span className="font-light text-bronze-deep italic">Process</span>
            </>
          }
          description="From the first conversation to after the handover — you always know what happens next."
        />

        <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* connecting line (desktop) */}
          <div
            aria-hidden
            className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-bronze/40 to-transparent lg:block"
          />

          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <div className="group relative text-center lg:px-2">
                <div className="relative mx-auto grid h-12 w-12 place-items-center rounded-full border border-bronze/40 bg-ivory font-display text-sm font-medium text-bronze-deep shadow-[0_10px_24px_-14px_rgba(169,138,95,0.7)] transition-all duration-500 group-hover:bg-bronze group-hover:text-white">
                  {step.num}
                </div>
                <h3 className="mt-5 font-display text-xl font-medium text-charcoal">{step.title}</h3>
                <p className="mx-auto mt-2.5 max-w-[26ch] text-sm leading-relaxed text-taupe">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-14 max-w-xl text-center text-xs leading-relaxed text-taupe/80">
            Project schedules are discussed and agreed during the consultation stage, based on your
            scope and space.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
