import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ArrowRight = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export const Check = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M4 12.5l5 5L20 6" />
  </svg>
);

/* Benefit icons */
export const IconConversion = (props: IconProps) => (
  <svg {...baseProps} {...props} viewBox="0 0 32 32" width={32} height={32}>
    <path d="M4 24 L12 16 L18 20 L28 8" />
    <path d="M22 8 H28 V14" />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    <circle cx="18" cy="20" r="1.5" fill="currentColor" />
  </svg>
);

export const IconSpeed = (props: IconProps) => (
  <svg {...baseProps} {...props} viewBox="0 0 32 32" width={32} height={32}>
    <path d="M16 28 C9.4 28 4 22.6 4 16 S9.4 4 16 4 28 9.4 28 16" />
    <path d="M16 16 L22 10" strokeWidth={2} />
    <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    <path d="M8 22 L10 22 M22 22 L24 22" />
  </svg>
);

export const IconClarity = (props: IconProps) => (
  <svg {...baseProps} {...props} viewBox="0 0 32 32" width={32} height={32}>
    <circle cx="16" cy="16" r="12" />
    <circle cx="16" cy="16" r="6" />
    <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

export const IconHuman = (props: IconProps) => (
  <svg {...baseProps} {...props} viewBox="0 0 32 32" width={32} height={32}>
    <circle cx="16" cy="11" r="5" />
    <path d="M5 28 C5 21.4 9.9 17 16 17 S27 21.4 27 28" />
  </svg>
);

/* Form/state icons */
export const IconAlert = (props: IconProps) => (
  <svg {...baseProps} {...props} width={14} height={14}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4M12 16v.01" strokeWidth={2} />
  </svg>
);

export const IconLoader = ({ className, ...props }: IconProps) => (
  <svg {...baseProps} {...props} className={`animate-spin ${className ?? ""}`}>
    <path d="M12 3a9 9 0 1 0 9 9" strokeWidth={2} />
  </svg>
);

export const IconLock = (props: IconProps) => (
  <svg {...baseProps} {...props} width={14} height={14}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11 V7 a4 4 0 0 1 8 0 V11" />
  </svg>
);

export const IconGlobe = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </svg>
);

export const IconSparkle = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path
      d="M12 3 L13.5 10.5 L21 12 L13.5 13.5 L12 21 L10.5 13.5 L3 12 L10.5 10.5 Z"
      fill="currentColor"
    />
  </svg>
);

export const IconLogo = (props: IconProps) => (
  <svg
    {...baseProps}
    {...props}
    width={28}
    height={28}
    viewBox="0 0 32 32"
    strokeWidth={2}
  >
    <rect x="4" y="4" width="24" height="24" rx="2" />
    <path d="M11 16 L15 20 L22 12" strokeWidth={2.2} />
  </svg>
);

export function Star({ ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
