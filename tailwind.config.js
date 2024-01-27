/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      border: "hsl(180,4%,86%)",
      white: "hsl(0,0%,100%)",
      background: "hsl(0,0%,99%)",
      foreground: "hsl(0,0%,13%)",
      primary: {
        DEFAULT: "hsl(165,59%,50%)",
        foreground: "hsl(0,0%,100%)",
      },
      secondary: {
        DEFAULT: "hsl(38,74%,57%)",
        foreground: "hsl(0,0%,100%)",
      },
      accent: {
        purple: "hsl(240,64%,62%)",
        red: "hsl(2,82%,62%)",
        green: "hsl(133,47%,59%)",
        blue: "hsl(195,79%,63%)",
        yellow: "hsl(49,100%,48%)",
      },
      gray: {
        50: "hsl(0,0%,98%)",
        100: "hsl(0,0%,96%)",
        200: "hsl(0,0%,90%)",
        300: "hsl(0,0%,83%)",
        400: "hsl(0,0%,64%)",
        500: "hsl(0,0%,45%)",
        600: "hsl(0,0%,32%)",
        700: "hsl(0,0%,25%)",
        800: "hsl(0,0%,15%)",
        900: "hsl(0,0%,9%)",
      },
    },
    extend: {
      fontFamily: {
        jakata: ["Plus Jakarta Sans", "sans-serif"],
      },
      fontSize: {
        xxs: ["0.625rem", "0.875rem"],
        md: ["1.125rem", "1.625rem"],
        "6xl": ["4rem", "4.5rem"],
        "5xl": ["3rem", "3.5rem"],
        "4xl": ["2rem", "2.5rem"],
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
