import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#faf9f6",
        white: "#ffffff",
        ink: "#111111",
        "ink-80": "#313130",
        "ink-60": "#626260",
        muted: "#7b7b78",
        tertiary: "#9c9fa5",
        oat: "#dedbd6",
        sand: "#d3cec6",
        fin: "#ff5600",
        "fin-deep": "#fe4c02",
        "r-blue": "#65b5ff",
        "r-green": "#0bdf50",
        "r-red": "#c41c1c",
        "r-pink": "#ff2067",
        "r-lime": "#b3e01c",
        "deep-blue": "#0007cb",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      letterSpacing: {
        "display-hero": "-0.03em",
        "display-lg": "-0.028em",
        "display-md": "-0.025em",
        "display-sm": "-0.02em",
        "tight-1": "-0.01em",
      },
      fontSize: {
        hero: ["clamp(2.75rem, 7vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        h1: ["clamp(2rem, 4.5vw, 3.375rem)", { lineHeight: "1", letterSpacing: "-0.028em" }],
        h2: ["clamp(1.625rem, 3vw, 2.5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        h3: ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        label: ["0.75rem", { lineHeight: "1", letterSpacing: "0.08em" }],
      },
      borderRadius: {
        sharp: "4px",
        nav: "6px",
        card: "8px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-8px)", maxHeight: "0" },
          "100%": { opacity: "1", transform: "translateY(0)", maxHeight: "600px" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.5s ease-out both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "slide-down": "slide-down 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
