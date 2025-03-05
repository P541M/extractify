// tailwind.config.ts
import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212", // Dark background
        foreground: "#F9FAFB",
        primary: "#6366F1", // Purple accent color
        secondary: "#8B5CF6", // Secondary purple
        accent: "#EC4899", // Pink accent
        muted: "#6B7280", // Gray for secondary text
        card: "#1E1E1E", // Card background
        "card-hover": "#252525", // Card hover state
        border: "#333333", // Border color
        "border-light": "#444444", // Lighter border color
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Modern, friendly font
      },
      borderRadius: {
        xl: "1rem", // Softer corners
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        gradient: "gradient 15s ease infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        glow: "0 0 15px 2px rgba(99, 102, 241, 0.3)",
        "glow-success": "0 0 15px 2px rgba(139, 92, 246, 0.3)",
        "glow-warning": "0 0 15px 2px rgba(236, 72, 153, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionDuration: {
        "2000": "2000ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
