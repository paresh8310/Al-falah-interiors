/**
 * Single source of truth for business information.
 * Every value here comes from the verified business brief — nothing invented.
 */

export const BUSINESS = {
  name: "Al Falah Interiors",
  tagline: "Make Your Home A Dream Place",
  type: "Interior Design Company",
  locality: "Lakshmipura, Bangalore, Karnataka",
  addressFull:
    "No 26 and No 25, Lakshmipura, North Road, Prakruthi Layout, Lakshmipura, Chikkabanavara, Bengaluru, Karnataka 560097",
  phoneDisplay: "+91 9886998363",
  phoneHref: "tel:+919886998363",
  email: "Alfalahinteriors2@gmail.com",
  emailHref: "mailto:Alfalahinteriors2@gmail.com",
  hoursLines: ["Monday – Saturday", "10:00 AM – 7:00 PM"],
  ratingValue: "4.9",
  ratingCount: 14,
} as const;

const WHATSAPP_NUMBER = "919886998363";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello Al Falah Interiors, I would like to discuss an interior design requirement. I found your website and would like to know more about your services.";

export function whatsappLink(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const MAPS_QUERY = encodeURIComponent(
  "Al Falah Interiors, No 26 and No 25, Lakshmipura, North Road, Prakruthi Layout, Lakshmipura, Chikkabanavara, Bengaluru, Karnataka 560097",
);

export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;
export const MAPS_LISTING_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

/** Responsive Unsplash image URL (free-to-use imagery via images.unsplash.com). */
export function unsplash(id: string, w: number): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
}
