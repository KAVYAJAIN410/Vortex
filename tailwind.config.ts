import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        marquee: "marquee 40s linear infinite", // Smooth infinite loop for Sponsors
        speakersMarquee: "speakersMarquee 80s linear infinite", // Custom speed for Meet Our Speakers
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }, // Moves exactly half the width
        },
        speakersMarquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }, // Moves exactly half the width, but slower
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
