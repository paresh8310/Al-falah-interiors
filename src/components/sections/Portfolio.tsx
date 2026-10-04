import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { unsplash } from "../../data/business";
import { Reveal, SectionHeading } from "../ui";

type Category = "Residential" | "Office" | "Commercial" | "Furniture";

interface GalleryItem {
  imgId: string;
  category: Category;
  caption: string;
  alt: string;
}

/**
 * Representative imagery of the kinds of spaces Al Falah Interiors designs —
 * no project names, clients, budgets or dates are claimed.
 */
const GALLERY: GalleryItem[] = [
  {
    imgId: "photo-1618221195710-dd6b41faaea6",
    category: "Residential",
    caption: "Warm neutral living spaces with custom furniture and layered lighting.",
    alt: "Modern beige living room with a plush sofa and warm lighting",
  },
  {
    imgId: "photo-1616594039964-ae9021a400a0",
    category: "Residential",
    caption: "Calm bedrooms designed around rest, storage and soft earthy palettes.",
    alt: "Serene neutral bedroom with soft bedding and warm wood tones",
  },
  {
    imgId: "photo-1556911220-bff31c812dba",
    category: "Residential",
    caption: "Kitchens that balance workflow, storage and warm materiality.",
    alt: "Kitchen with wooden countertop and thoughtfully arranged cabinetry",
  },
  {
    imgId: "photo-1497366754035-f200968a6e72",
    category: "Office",
    caption: "Workspaces planned for focus, comfort and everyday productivity.",
    alt: "Bright modern office with plants and organized workstations",
  },
  {
    imgId: "photo-1524758631624-e2822e304c36",
    category: "Office",
    caption: "Meeting rooms with clean lines and a professional, welcoming feel.",
    alt: "Office meeting room with a large wooden table and chairs",
  },
  {
    imgId: "photo-1441986300917-64674bd600d8",
    category: "Commercial",
    caption: "Retail environments where layout and lighting guide the customer.",
    alt: "Retail store interior with clothing racks and warm spot lighting",
  },
  {
    imgId: "photo-1519167758481-83f550bb49b3",
    category: "Commercial",
    caption: "Hospitality and event spaces with warm ambient design.",
    alt: "Elegant banquet hall with warm chandeliers and round tables",
  },
  {
    imgId: "photo-1503602642458-232111445657",
    category: "Furniture",
    caption: "Bespoke furniture crafted around your space and the way you use it.",
    alt: "Minimal crafted chair in a bright studio setting",
  },
];

const FILTERS = ["All", "Residential", "Office", "Commercial", "Furniture"] as const;
type Filter = (typeof FILTERS)[number];

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter);

  return (
    <section id="portfolio" className="scroll-mt-20 bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Work"
          title={
            <>
              Spaces We <span className="font-light text-bronze-deep italic">Bring To Life</span>
            </>
          }
          description="A look at the homes, offices and commercial environments we design — representative visuals of our residential, office, commercial and furniture work."
        />

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filter portfolio by category">
            {FILTERS.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-5 py-2 text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "border-charcoal bg-charcoal text-ivory shadow-[0_10px_24px_-12px_rgba(38,34,29,0.6)]"
                      : "border-charcoal/15 bg-transparent text-taupe hover:border-charcoal/40 hover:text-charcoal"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.article
                layout
                key={item.imgId}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="card-lift group relative overflow-hidden rounded-3xl bg-parchment"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={unsplash(item.imgId, 900)}
                    srcSet={`${unsplash(item.imgId, 640)} 640w, ${unsplash(item.imgId, 900)} 900w`}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-ivory/90 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-charcoal uppercase backdrop-blur-sm">
                    {item.category}
                  </span>
                  <p className="absolute right-5 bottom-5 left-5 text-sm leading-snug font-semibold text-ivory">
                    {item.caption}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-xs leading-relaxed text-taupe/80">
            Imagery is representative of the styles and spaces we deliver. Visit our Google listing
            or call us to discuss your own space.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
