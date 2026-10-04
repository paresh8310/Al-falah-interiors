import { useState } from "react";
import { BUSINESS, unsplash } from "../../data/business";
import { CheckIcon } from "../icons";
import { Reveal, SectionHeading } from "../ui";

const PILLARS = [
  "Functional, aesthetic & modern interiors",
  "Customized furniture for every space",
  "Residential, office & commercial projects",
];

export default function About() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="about" className="scroll-mt-20 bg-ivory py-24 sm:py-32">
      <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Text — left */}
        <div>
          <SectionHeading
            align="left"
            eyebrow="About Us"
            title={
              <>
                Thoughtful Design.
                <br />
                <span className="font-light text-bronze-deep italic">Beautifully Executed.</span>
              </>
            }
          />

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-taupe sm:text-base">
              {BUSINESS.name} is a Bangalore-based interior design company located in Lakshmipura,
              specializing in functional, aesthetic and modern interiors for homes, offices and
              commercial spaces — from customized furniture to complete design and project
              management.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <ul className="mt-8 flex flex-col gap-3.5">
              {PILLARS.map((pillar) => (
                <li key={pillar} className="flex items-center gap-3 text-[15px] font-semibold text-charcoal">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-bronze/15 text-bronze-deep">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  {pillar}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="mt-10 flex items-center gap-5 border-t border-charcoal/10 pt-8">
              <span className="font-display text-5xl font-light text-charcoal">
                {BUSINESS.ratingValue}
                <span className="text-2xl text-taupe">/5</span>
              </span>
              <p className="text-xs leading-relaxed font-semibold tracking-wide text-taupe uppercase">
                Rated {BUSINESS.ratingValue} out of 5
                <br />
                from {BUSINESS.ratingCount} Google reviews
              </p>
            </div>
          </Reveal>
        </div>

        {/* Visual — right */}
        <Reveal delay={0.15} className="relative">
          <div
            aria-hidden
            className="absolute -top-6 -right-4 hidden h-full w-full rounded-t-[10rem] border border-bronze/30 lg:block"
          />
          {imgFailed ? (
            <div className="flex aspect-[4/5] w-full items-center justify-center rounded-t-[10rem] bg-gradient-to-b from-linen to-parchment">
              <span className="font-display text-6xl font-light text-sand">AF</span>
            </div>
          ) : (
            <img
              src={unsplash("photo-1600607687939-ce8a6c25118c", 1100)}
              srcSet={`${unsplash("photo-1600607687939-ce8a6c25118c", 700)} 700w, ${unsplash("photo-1600607687939-ce8a6c25118c", 1100)} 1100w`}
              sizes="(min-width: 1024px) 44vw, 92vw"
              alt="Warm modern living space with natural light, layered textures and elegant furniture"
              loading="lazy"
              decoding="async"
              onError={() => setImgFailed(true)}
              className="aspect-[4/5] w-full rounded-t-[10rem] object-cover shadow-[0_40px_80px_-40px_rgba(38,34,29,0.4)]"
            />
          )}
          <div
            aria-hidden
            className="absolute right-6 bottom-6 left-6 hidden items-center gap-3 rounded-2xl border border-white/40 bg-white/80 px-5 py-4 backdrop-blur-md sm:flex"
          >
            <span className="h-8 w-1 rounded-full bg-bronze" />
            <p className="text-[13px] leading-snug font-semibold text-charcoal">
              {BUSINESS.type} — {BUSINESS.locality}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
