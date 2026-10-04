import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fade-and-rise reveal on scroll; respects prefers-reduced-motion. */
export function Reveal({ children, delay = 0, y = 26, className }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({ eyebrow, title, description, align = "center", dark = false }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-4 font-display text-3xl leading-[1.12] font-medium tracking-[-0.01em] text-balance sm:text-4xl lg:text-[2.75rem] ${
            dark ? "text-ivory" : "text-charcoal"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-[15px] leading-relaxed sm:text-base ${dark ? "text-ivory/65" : "text-taupe"}`}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
