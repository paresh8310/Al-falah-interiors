import { BUSINESS, MAPS_LISTING_URL } from "../../data/business";
import { ArrowUpRightIcon, GoogleGlyphIcon, StarIcon } from "../icons";
import { Reveal, SectionHeading } from "../ui";

/** Verbatim review excerpts from the business's Google listing — nothing invented. */
const REVIEWS = [
  {
    quote: "Amazing interior done by Mr Syed, absolutely loved it... Highly recommended.",
    stars: 5,
  },
  {
    quote: "It was amazing and damn good, more than expectations.",
    stars: 5,
  },
  {
    quote: "Nice interior works.... One of the best interior company in and around areas.",
    stars: 5,
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Client Reviews"
          title={
            <>
              What Our Clients <span className="font-light text-bronze-deep italic">Say About Us</span>
            </>
          }
        />

        {/* Google rating summary */}
        <Reveal delay={0.18}>
          <a
            href={MAPS_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-10 flex w-fit items-center gap-6 rounded-3xl border border-charcoal/10 bg-white/60 px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:border-bronze/50 hover:shadow-[0_20px_50px_-30px_rgba(38,34,29,0.4)]"
          >
            <span className="font-display text-5xl font-light text-charcoal">{BUSINESS.ratingValue}</span>
            <span className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1 text-bronze" aria-label={`${BUSINESS.ratingValue} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold text-taupe">
                <GoogleGlyphIcon className="h-4 w-4" />
                {BUSINESS.ratingCount} Google Reviews
              </span>
            </span>
            <ArrowUpRightIcon className="h-4 w-4 text-taupe transition-transform duration-300 hover:translate-x-0.5" />
          </a>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.quote} delay={i * 0.08}>
              <figure className="card-lift flex h-full flex-col rounded-3xl border border-charcoal/8 bg-parchment p-8">
                <span aria-hidden className="font-display text-6xl leading-none font-light text-bronze/50">
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 font-display text-lg leading-relaxed text-charcoal italic">
                  {review.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center justify-between border-t border-charcoal/10 pt-5">
                  <span className="flex items-center gap-1 text-bronze" aria-label={`${review.stars} star review`}>
                    {Array.from({ length: review.stars }).map((_, s) => (
                      <StarIcon key={s} className="h-3.5 w-3.5" />
                    ))}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-taupe uppercase">
                    <GoogleGlyphIcon className="h-3.5 w-3.5" />
                    Google Review
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
