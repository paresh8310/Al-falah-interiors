import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.4 3.5h3l1.6 4-2 1.5a12.7 12.7 0 0 0 6.5 6.5l1.5-2 4 1.6v3a1.9 1.9 0 0 1-2.1 1.9A16.8 16.8 0 0 1 3.5 5.6a1.9 1.9 0 0 1 1.9-2.1Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-6.8-5.4-6.8-10A6.8 6.8 0 0 1 12 4.2 6.8 6.8 0 0 1 18.8 11c0 4.6-6.8 10-6.8 10Z" />
      <circle cx="12" cy="10.8" r="2.4" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.4l-5.8 3-1.1-6.4L.4 9.4l6.5-.9L12 2.6Z" transform="translate(1.6 0.8) scale(0.87)" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7m0 0H8m9 0v9" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
      <path d="M8 14h3M8 17h6" opacity=".6" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.05 2.5a9.4 9.4 0 0 0-8.1 14.1L2.5 21.5l5.1-1.34A9.4 9.4 0 1 0 12.05 2.5Zm0 1.7a7.7 7.7 0 1 1-3.92 14.32l-.28-.17-3.02.8.8-2.95-.18-.3A7.7 7.7 0 0 1 12.05 4.2Zm-3.3 3.55c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.7 2.72 4.22 3.7 2.09.82 2.51.66 2.96.62.45-.04 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.1-.22-.16-.46-.28s-1.46-.72-1.68-.8c-.23-.09-.39-.12-.55.12s-.64.8-.78.97c-.15.16-.29.18-.53.06a6.8 6.8 0 0 1-2-1.24 7.5 7.5 0 0 1-1.38-1.72c-.15-.25 0-.39.1-.51.1-.11.23-.29.34-.43.11-.15.15-.25.22-.42.08-.16.04-.31-.02-.43-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.42-.55-.43l-.48-.02Z" />
    </svg>
  );
}

export function GoogleGlyphIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.4a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.9-1.74 2.97-4.3 2.97-7.35Z" opacity=".85" />
      <path d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.23-2.5c-.9.6-2.04.96-3.39.96a5.94 5.94 0 0 1-5.58-4.1H3.06v2.59A10 10 0 0 0 12 22Z" opacity=".6" />
      <path d="M6.42 13.94a6 6 0 0 1 0-3.83V7.52H3.06a10 10 0 0 0 0 8.96l3.36-2.54Z" opacity=".4" />
      <path d="M12 6.06c1.47 0 2.79.5 3.83 1.5l2.87-2.87A9.98 9.98 0 0 0 3.06 7.52l3.36 2.6A5.94 5.94 0 0 1 12 6.05Z" opacity=".75" />
    </svg>
  );
}

/* ---- Service line icons ---- */

export function SofaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 11V8.5A2.5 2.5 0 0 1 7.5 6h9A2.5 2.5 0 0 1 19 8.5V11" />
      <path d="M3.5 13.5A1.9 1.9 0 0 1 5.4 11.6c1.05 0 1.9.85 1.9 1.9v.5h9.4v-.5a1.9 1.9 0 1 1 3.8 0V17a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-3.5Z" />
      <path d="M6 18.5v1.5M18 18.5v1.5" />
    </svg>
  );
}

export function CompassRulerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" />
      <path d="M12 3.5V6" opacity=".55" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m4 10.5 8-6.5 8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8.5Z" />
      <path d="M9.5 20.5v-6h5v6" />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 12.5h17" />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 20.5V5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 15 5v15.5" />
      <path d="M15 9.5h3.5A1.5 1.5 0 0 1 20 11v9.5M3.5 20.5h18" />
      <path d="M8 7h4M8 10.5h4M8 14h4" opacity=".6" />
    </svg>
  );
}

export function SupportIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="m6.3 6.3 3.2 3.2m5-5-1.6 3.7m4.8 6.5-3.2-3.2m-5 5 1.6-3.7m-4.8-6.5 3.2 3.2" opacity=".5" />
    </svg>
  );
}
