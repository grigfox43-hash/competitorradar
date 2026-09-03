import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        radar: {
          bg: "#0B0E14",
          card: "#111620",
          cardLighter: "#161C28",
          border: "#1E2638",
          accent: "#3DFFB0",
          accentGlow: "rgba(61, 255, 176, 0.15)",
          alert: "#FF5C5C",
          info: "#4C8CFF",
          warning: "#F5A623",
          text: "#F2F4F8",
          muted: "#8B93A7",
          subtle: "#4B5568",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      animation: {
        "radar-sweep": "radarSweep 4s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        radarSweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
