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
