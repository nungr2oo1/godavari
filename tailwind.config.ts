import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        lg: "2.5rem",
      },
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        river: {
          50: "#f1f7f8",
          100: "#dceaee",
          200: "#bcd5dc",
          300: "#8fb6c1",
          400: "#5e93a3",
          500: "#427786",
          600: "#356070",
          700: "#2c4e5b",
          800: "#26414c",
          900: "#1f3640",
        },
        forest: {
          50: "#f1f6f3",
          100: "#dde9e1",
          200: "#bbd2c4",
          300: "#90b3a0",
          400: "#67917b",
          500: "#4d765f",
          600: "#3c5e4b",
          700: "#314c3d",
          800: "#293e33",
          900: "#22322a",
        },
        saffron: {
          50: "#faf3ec",
          100: "#f3e2cf",
          200: "#e6c39e",
          300: "#d59f6c",
          400: "#c47e44",
          500: "#a96434",
          600: "#8b502b",
          700: "#704123",
          800: "#5a361e",
          900: "#492c1a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      backgroundImage: {
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.12) translate3d(-1.5%, -1%, 0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" },
        },
        "scroll-hint": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "20%": { opacity: "1" },
          "100%": { transform: "translateY(10px)", opacity: "0" },
        },
        "aurora": {
          "0%, 100%": { transform: "translate(0%, 0%) rotate(0deg)" },
          "50%": { transform: "translate(15%, -10%) rotate(180deg)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "blob": {
          "0%, 100%": { borderRadius: "60% 40% 50% 50% / 50% 50% 60% 40%", transform: "translate(0,0) rotate(0deg)" },
          "33%": { borderRadius: "40% 60% 60% 40% / 60% 40% 50% 50%", transform: "translate(20px,-15px) rotate(40deg)" },
          "66%": { borderRadius: "50% 50% 40% 60% / 40% 60% 60% 40%", transform: "translate(-15px,10px) rotate(-25deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.4s ease-out both",
        "ken-burns": "ken-burns 22s ease-out forwards",
        "shimmer": "shimmer 2.4s linear infinite",
        "marquee": "marquee 38s linear infinite",
        "float": "float 4.5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 5s ease-in-out infinite",
        "scroll-hint": "scroll-hint 1.8s ease-in-out infinite",
        "aurora": "aurora 16s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        "blob": "blob 18s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
