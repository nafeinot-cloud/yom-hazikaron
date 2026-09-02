// Shared stroke-based SVG icons (16/20/24px grid), matching the approved design mockup.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function FlameIcon(props) {
  return (
    <svg {...base} width={props.size ?? 20} height={props.size ?? 20} {...props}>
      <path d="M12 2c-1 3-4 4.5-4 8.5A4 4 0 0 0 12 15a4 4 0 0 0 4-4.5C16 6.5 13 5 12 2Z" />
      <path d="M9 20h6M12 15v5" />
    </svg>
  );
}

// The app's own logo mark (same flame used for the home-screen icon) —
// a filled, two-tone flame with an inner "flame within a flame" notch, for
// use inside the topbar's gold-soft circle badge.
export function AppFlameIcon(props) {
  const size = props.size ?? 20;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...props}>
      <path
        fill="currentColor"
        d="M12 1.5C8.5 6 5.5 9.5 5.5 14C5.5 19 8.2 22.5 12 22.5C15.8 22.5 18.5 19.3 18.5 14.5C18.5 10.5 16 8 13.8 6C14.5 8.5 13.5 10 12 9C11 8.3 12 5 12 1.5Z"
      />
      <path
        fill="var(--gold-soft)"
        d="M12 12.5C10.3 14.3 9.5 15.8 9.5 17.3C9.5 19.2 10.5 20.7 12 20.7C13.5 20.7 14.5 19.2 14.5 17.5C14.5 15.8 13.3 14.5 12 12.5Z"
      />
    </svg>
  );
}

// A filled candle-with-flame glyph — unambiguous even at small reaction-
// button sizes (unlike a bare flame outline, which can read as a leaf or
// droplet). Solid silhouette in currentColor, no stroke.
export function CandleIcon(props) {
  const size = props.size ?? 17;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" stroke="none" {...props}>
      <g transform="translate(12 7) scale(0.46)">
        <path d="M12 1.5C8.5 6 5.5 9.5 5.5 14C5.5 19 8.2 22.5 12 22.5C15.8 22.5 18.5 19.3 18.5 14.5C18.5 10.5 16 8 13.8 6C14.5 8.5 13.5 10 12 9C11 8.3 12 5 12 1.5Z" transform="translate(-12 -12)" />
      </g>
      <rect x="9.3" y="12.5" width="5.4" height="9" rx="1" />
      <rect x="8.7" y="12" width="6.6" height="1.6" rx="0.8" />
    </svg>
  );
}

export function CalendarIcon(props) {
  return (
    <svg {...base} width={props.size ?? 15} height={props.size ?? 15} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

export function BookIcon(props) {
  return (
    <svg {...base} width={props.size ?? 17} height={props.size ?? 17} {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 0 4 23V5.5Z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 1 2.5 2" />
    </svg>
  );
}

export function PrayerIcon(props) {
  return (
    <svg {...base} width={props.size ?? 17} height={props.size ?? 17} {...props}>
      <path d="M12 3v10M12 3c-1.5 0-3 1-3 3s1.5 3 3 4M12 3c1.5 0 3 1 3 3s-1.5 3-3 4" />
      <path d="M5 21c0-4 3-7 7-7s7 3 7 7" />
    </svg>
  );
}

export function WallIcon(props) {
  return (
    <svg {...base} width={props.size ?? 17} height={props.size ?? 17} {...props}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M21 15l-5-5-4 4-2-2-4 4" />
    </svg>
  );
}

export function BackIcon(props) {
  return (
    <svg {...base} width={props.size ?? 16} height={props.size ?? 16} strokeWidth={2} {...props}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function PlusIcon(props) {
  return (
    <svg {...base} width={props.size ?? 26} height={props.size ?? 26} strokeWidth={2} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function ChevronDownIcon(props) {
  return (
    <svg {...base} width={props.size ?? 16} height={props.size ?? 16} strokeWidth={1.8} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function HeartIcon(props) {
  return (
    <svg {...base} width={props.size ?? 17} height={props.size ?? 17} {...props}>
      <path d="M12 20.5c-.3 0-.6-.1-.8-.3C7 16.6 4 13.9 4 10.5 4 7.9 6 6 8.5 6c1.3 0 2.6.6 3.5 1.7C12.9 6.6 14.2 6 15.5 6 18 6 20 7.9 20 10.5c0 3.4-3 6.1-7.2 9.7-.2.2-.5.3-.8.3Z" />
    </svg>
  );
}

export function SmileIcon(props) {
  return (
    <svg {...base} width={props.size ?? 17} height={props.size ?? 17} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 10.5h.01M15.5 10.5h.01M8 14.5c1 1.2 2.4 1.8 4 1.8s3-.6 4-1.8" />
    </svg>
  );
}

export function EditIcon(props) {
  return (
    <svg {...base} width={props.size ?? 16} height={props.size ?? 16} {...props}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export function TrashIcon(props) {
  return (
    <svg {...base} width={props.size ?? 16} height={props.size ?? 16} {...props}>
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m3 0-1 13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L6 7" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function CalendarPlusIcon(props) {
  return (
    <svg {...base} width={props.size ?? 15} height={props.size ?? 15} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
      <path d="M12 13.5v5M9.5 16h5" />
    </svg>
  );
}

export function WhatsAppIcon(props) {
  const size = props.size ?? 17;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" stroke="none" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.4-1.36a9.86 9.86 0 0 0 4.64 1.16h.01c5.46 0 9.91-4.45 9.91-9.9C21.96 6.45 17.51 2 12.04 2Zm0 18.08a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.09.78.82-3.02-.19-.31a8.16 8.16 0 0 1-1.26-4.32c0-4.52 3.68-8.2 8.19-8.2 2.18 0 4.24.85 5.78 2.39a8.11 8.11 0 0 1 2.41 5.8c0 4.52-3.69 8.2-8.2 8.2Zm4.48-6.13c-.24-.12-1.44-.71-1.67-.8-.22-.08-.38-.12-.55.12-.16.24-.63.8-.77.97-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42-.14-.01-.31-.01-.47-.01-.16 0-.43.06-.65.31-.22.24-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.19 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.44-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export function CommentIcon(props) {
  return (
    <svg {...base} width={props.size ?? 17} height={props.size ?? 17} {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v9A2.5 2.5 0 0 1 17.5 17H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 14.5v-9Z" />
    </svg>
  );
}
