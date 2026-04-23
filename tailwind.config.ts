import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E63329",
          redDark: "#C42820",
          dark: "#1A2332",
          darker: "#0F1620",
          gray: "#8A8F98",
          grayLight: "#E5E7EB",
          teal: "#0FB5A5",
          tealDark: "#0A8F82",
          bg: "#FAFAF8",
          ink: "#0B1220"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        tightest: "-0.04em"
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(15, 22, 32, 0.15)",
        glow: "0 0 0 4px rgba(15, 181, 165, 0.18), 0 20px 60px -20px rgba(15, 181, 165, 0.35)",
        card: "0 4px 24px -6px rgba(15, 22, 32, 0.08)"
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "slow-zoom": {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1.15)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        "pulse-ring": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(15, 181, 165, 0.35)" },
          "50%": { boxShadow: "0 0 0 18px rgba(15, 181, 165, 0)" }
        }
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "fade-in": "fade-in 1s ease-out forwards",
        "slow-zoom": "slow-zoom 20s ease-in-out infinite alternate",
        shimmer: "shimmer 2.4s linear infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
