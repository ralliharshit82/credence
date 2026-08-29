import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        risk: {
          low: "#10b981",      // emerald-500
          lowBg: "rgba(16, 185, 129, 0.1)",
          caution: "#f59e0b",  // amber-500
          cautionBg: "rgba(245, 158, 11, 0.1)",
          high: "#ef4444",     // red-500
          highBg: "rgba(239, 68, 68, 0.1)",
        },
        brand: {
          50: "#eef8ff",
          100: "#d8eeff",
          200: "#b9e2ff",
          300: "#89d0ff",
          400: "#52b4ff",
          500: "#2a92ff",
          600: "#1371f6",
          700: "#0d5ae3",
          800: "#1148b8",
          900: "#143f90",
          950: "#091738",
        },
        cyber: {
          dark: "#050811",
          card: "#0b1120",
          cardHover: "#0f172a",
          border: "#1e293b",
          borderHighlight: "#38bdf8",
          neonGreen: "#00ff88",
          neonCyan: "#00e5ff",
          neonRed: "#ff3366",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
        "radar-sweep": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        }
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "radar-sweep": "radar-sweep 4s linear infinite",
        "scan-line": "scan-line 3s linear infinite",
        "shimmer": "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
