/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#523a28",
        },
        secondary: {
          DEFAULT: "#a47551",
        },
        tertiary: {
          DEFAULT: "#d0b49f",
		},
        mute: {
          DEFAULT: "#e4d4c8",
		},
        black: {
          100: "#333333",
          200: "#141413",
          300: "#7D8087",
          DEFAULT: "#071330",
        },
        white: {
          100: "#F7F7F7",
          DEFAULT: "#FFFFFF",
        },
      },
	  gradientColorStopPositions: {
        33: '33%',
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
