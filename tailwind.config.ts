import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Enable dark mode via a class on the html element
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1F2937", // Dark background
        foreground: "#F9FAFB", // Light text for dark mode
        primary: "#2563EB", // Blue tone for primary actions
        secondary: "#10B981", // Green tone for secondary actions
      },
    },
  },
  plugins: [],
} satisfies Config;
